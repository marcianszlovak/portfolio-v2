import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bfg-visualizer',
  templateUrl: './bfg-visualizer.component.html',
  styleUrls: ['./bfg-visualizer.component.css'],
})
export class BfgVisualizerComponent implements AfterViewInit {
  @ViewChild('canvas') private ctx: ElementRef | any;
  private centreX: number;
  private centreY: number;
  private mouseX: number;
  private mouseY: number;
  private keys: number[] = [];
  private projectiles: any[] = [];
  private tracers: any[] = [];
  private explosions: any[] = [];
  private speed = 10;
  private friction = 0.925;
  private ticks = 0;
  private sprPlayer;
  private sprBFG;
  private sprBFGExplosion;
  private color = '#BBBBBB';
  private player;
  private playerAim;

  constructor() {
    this.player = {
      x: this.centreX,
      y: this.centreY,
      width: 56,
      height: 56,
      velY: 0,
      velX: 0,
      angleFrame: 0,
      frame: 0,
      maxFrame: 3,
      firing: false,
      moving: false,
    };

    this.playerAim = {
      x: this.player.x,
      y: this.player.y,
    };
  }

  ngAfterViewInit(): void {
    this.addContext();
    this.init();
    this.ctx.canvas.addEventListener('mousedown', this.fireBFG, false);
  }

  addContext(): void {
    this.ctx = this.ctx.nativeElement.getContext('2d');
    this.centreX = this.ctx.canvas.width / 2;
    this.centreY = this.ctx.canvas.height / 2;
    this.mouseX = this.centreX;
    this.mouseY = this.centreY;
  }

  drawPlayer = () => {
    this.player.angleFrame = Math.round(this.playerAim.angle / 45);

    if (this.player.angleFrame > 7) {
      this.player.angleFrame = 0;
    }

    if (this.player.firing) {
      this.player.frame = 4;
    }

    const spriteX: number = this.player.angleFrame * 56;
    const spriteY: number = this.player.frame * 56;

    this.ctx.drawImage(
      this.sprPlayer,
      spriteX,
      spriteY,
      56,
      56,
      this.player.x,
      this.player.y,
      56,
      56
    );

    if (!this.player.moving || this.player.firing) {
      return;
    }

    if (this.ticks % 5 === 0) {
      this.player.frame++;
    }

    if (this.player.frame > this.player.maxFrame) {
      this.player.frame = 0;
    }
  };

  drawPlayerAim = () => {
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.playerAim.x + this.player.width / 2,
      this.playerAim.y + this.player.height / 2
    );
    this.ctx.lineTo(this.mouseX, this.mouseY);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  };

  drawTracers = (angle: number) => {
    let angles: number = angle;
    const rad: number = 90 * (Math.PI / 180);

    for (let i = 0; i < 40; i++) {
      angles = angle - rad / 2 + (rad / 40) * i;

      const destX = this.player.x + Math.cos(angles) * 2056;
      const destY = this.player.y + Math.sin(angles) * 2056;

      this.tracers.push(
        // @ts-ignore
        this.bfgTracer({
          x: this.player.x + this.player.width / 2,
          y: this.player.y + this.player.height / 2,
          toX: destX,
          toY: destY,
        })
      );
    }
    console.log(this.tracers);
  };

  bfgExplosion = (exp?: {
    x: number;
    y: number;
    active?: boolean;
    frame?: number;
    maxFrame?: number;
  }) => {
    const spriteX = exp.frame * 144;
    this.ctx.drawImage(
      this.sprBFGExplosion,
      spriteX,
      0,
      144,
      115,
      this.playerAim.x - 72,
      this.playerAim.y - 72,
      144,
      114
    );

    if (this.ticks % 15 === 0) {
      exp.frame++;
    }
    if (exp.frame > exp.maxFrame) {
      exp.active = false;
    }
    return exp;
  };

  bfgTracer = (tracer: {
    active?: boolean;
    alpha?: number;
    draw?: () => void;
    update?: () => void;
    x?: number;
    y?: number;
    toX?: number;
    toY?: number;
  }) => {
    tracer.active = true;
    tracer.alpha = 0.75;

    tracer.draw = () => {
      this.ctx.moveTo(tracer.x, tracer.y);
      this.ctx.lineTo(tracer.toX, tracer.toY);
      this.ctx.strokeStyle = 'rgba(0, 255, 0, ' + tracer.alpha + ')';
    };

    tracer.update = () => {
      tracer.alpha -= 0.01;
      if (tracer.alpha <= 0.0) {
        tracer.active = false;
      }
    };
    return tracer;
  };

  isInBounds = (x: number, y: number) => {
    return (
      x >= 0 &&
      x <= this.ctx.canvas.width &&
      y >= 0 &&
      y <= this.ctx.canvas.height
    );
  };

  bfgBall = (proj: {
    x: number;
    y: number;
    active?: boolean;
    width?: number;
    height?: number;
    destX?: number;
    destY?: number;
    angle?: number;
    frame?: number;
    maxFrame?: number;
    draw?: () => void;
    update?: () => void;
  }) => {
    proj.active = true;
    proj.width = 16;
    proj.height = 16;
    proj.destX = this.mouseX + proj.width / 2;
    proj.destY = this.mouseY + proj.height / 2;
    proj.angle = Math.atan2(proj.destY - proj.y, proj.destX - proj.x);

    proj.frame = 0;
    proj.maxFrame = 1;

    proj.draw = () => {
      const spriteX = proj.frame * 45;
      this.ctx.drawImage(
        this.sprBFG,
        spriteX,
        0,
        45,
        45,
        this.player.x - 22,
        this.player.y - 22,
        45,
        45
      );
    };

    proj.update = () => {
      const sin: number = Math.sin(proj.angle) * 12;
      const cos: number = Math.cos(proj.angle) * 12;

      proj.y += sin;
      proj.x += cos;

      proj.active = proj.active && this.isInBounds(proj.x, proj.y);

      if (!this.isInBounds(proj.x, proj.y)) {
        this.explosions.push(
          this.bfgExplosion({
            x: proj.x,
            y: proj.y,
          })
        );

        setTimeout(() => {
          this.drawTracers(proj.angle);
        }, 457);
      }
    };
    return proj;
  };

  fireBFG = () => {
    if (this.player.firing) {
      return;
    }

    this.player.firing = true;

    setTimeout(() => {
      this.projectiles.push(
        this.bfgBall({
          x: this.playerAim.x + 28,
          y: this.playerAim.y + 28,
        })
      );

      setTimeout(() => {
        this.player.firing = false;
        this.player.frame = 0;
      }, 250);
    }, 857);
  };

  updatePlayer = () => {
    this.player.velY *= this.friction;
    this.player.y += this.player.velY;
    this.player.velX *= this.friction;
    this.player.x += this.player.velX;

    if (this.player.x >= this.ctx.canvas.width - this.player.width) {
      this.player.x = this.ctx.canvas.width - this.player.width;
    } else if (this.player.x <= 0) {
      this.player.x = 0;
    }

    if (this.player.y > this.ctx.canvas.height - this.player.height) {
      this.player.y = this.ctx.canvas.height - this.player.height;
    } else if (this.player.y <= 0) {
      this.player.y = 0;
    }
  };

  updatePlayerAim = () => {
    if (!this.isInBounds(this.mouseX, this.mouseY)) {
      return;
    }

    this.playerAim.x = this.player.x;
    this.playerAim.y = this.player.y;

    const angle: number = Math.atan2(
      this.mouseY - this.player.y,
      this.mouseX - this.player.x
    );

    this.playerAim.angle = angle * (180 / Math.PI) + 180;
  };

  updateExplosions = () => {
    this.explosions = this.explosions.filter((exp) => {
      return exp.active;
    });
  };

  updateProjectiles = () => {
    this.projectiles.forEach((proj) => proj.update());

    this.projectiles = this.projectiles.filter((proj) => {
      return proj.active;
    });
  };

  updateTracers = () => {
    this.tracers.forEach((tracer) => {
      tracer.update();
    });

    this.tracers = this.tracers.filter((tracer) => {
      return tracer.active;
    });
  };

  update = () => {
    this.player.moving = false;

    if (this.keys[87] && this.player.velY > -this.speed) {
      this.player.velY--;
      this.player.moving = true;
    }
    if (this.keys[83] && this.player.velY < this.speed) {
      this.player.velY++;
      this.player.moving = true;
    }
    if (this.keys[68] && this.player.velX < this.speed) {
      this.player.velX++;
      this.player.moving = true;
    }
    if (this.keys[65] && this.player.velX > -this.speed) {
      this.player.velX--;
      this.player.moving = true;
    }
    this.updatePlayer();
    this.updatePlayerAim();
    this.updateProjectiles();
    this.updateExplosions();
    this.updateTracers();

    this.ticks++;
  };

  draw = () => {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.drawPlayer();
    this.drawPlayerAim();

    this.projectiles.forEach((proj) => {
      proj.draw();
    });
    this.explosions.forEach((exp) => {
      exp.draw();
    });
    this.ctx.beginPath();

    this.tracers.forEach((tracer) => {
      tracer.draw();
    });
    this.ctx.stroke();
  };

  getMousePos = (event: MouseEvent) => {
    const rect = this.ctx.canvas.getBoundingClientRect();

    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  };

  initSprites = () => {
    this.sprPlayer = new Image();
    this.sprBFG = new Image();
    this.sprBFGExplosion = new Image();

    this.sprPlayer.src =
      'https://decino.nl/images/projects/bfg9000/spr_marine.png';
    this.sprBFG.src =
      'https://decino.nl/images/projects/bfg9000/spr_bfgball.png';
    this.sprBFGExplosion.src =
      'https://decino.nl/images/projects/bfg9000/spr_bfgexp.png';
  };

  init = () => {
    const FPS = 60;

    this.player.x = 0;
    this.player.y = 0;
    this.initSprites();

    this.ctx.canvas.addEventListener(
      'mousemove',
      (event) => {
        this.getMousePos(event);
      },
      false
    );

    setInterval(() => {
      this.update();
      this.draw();
    }, 1000 / FPS);
  };
}
