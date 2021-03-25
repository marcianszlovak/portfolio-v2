import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, interval, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import monsters from './monsters.json';
import { BfgExplosion } from '../interfaces/bfg-visualizer/bfg-explosion';
import { BfgTracer } from '../interfaces/bfg-visualizer/bfg-tracer';
import { BfgProjectile } from '../interfaces/bfg-visualizer/bfg-projectile';
import { Player } from '../interfaces/bfg-visualizer/player';
import { PlayerAim } from '../interfaces/bfg-visualizer/player-aim';

@Component({
  selector: 'app-bfg-visualizer',
  templateUrl: './bfg-visualizer.component.html',
  styleUrls: ['./bfg-visualizer.component.scss'],
})
export class BfgVisualizerComponent implements AfterViewInit {
  @ViewChild('canvas') private ctx: ElementRef | any;
  private centreX: number;
  private centreY: number;
  private mouseX: number;
  private mouseY: number;
  private keys: boolean[] = [];
  private projectiles: BfgProjectile[] = [];
  private tracers: BfgTracer[] = [];
  private explosions: BfgExplosion[] = [];
  private speed = 10;
  private friction = 0.925;
  private ticks = 0;
  private sprPlayer: HTMLImageElement;
  private sprBFG: HTMLImageElement;
  private sprBFGExplosion: HTMLImageElement;
  private color = '#BBBBBB';
  private player: Player;
  private readonly playerAim: PlayerAim;
  public monsters = monsters;

  constructor(@Inject(DOCUMENT) private document: Document) {
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
    this.ctx = this.ctx.nativeElement.getContext('2d');
    this.centreX = this.ctx.canvas.width / 2;
    this.centreY = this.ctx.canvas.height / 2;
    this.mouseX = this.centreX;
    this.mouseY = this.centreY;
    this.init();
    fromEvent(this.ctx.canvas, 'mousedown')
      .pipe(map(() => this.fireBFG(), false))
      .subscribe();

    fromEvent(this.document.body, 'keydown')
      .pipe(map((e: KeyboardEvent) => (this.keys[e.key] = true)))
      .subscribe();

    fromEvent(this.document.body, 'keyup')
      .pipe(map((e: KeyboardEvent) => (this.keys[e.key] = false)))
      .subscribe();
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
      this.player.x + this.player.width / 2,
      this.player.y + this.player.height / 2
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

      const destX: number = this.player.x + Math.cos(angles) * 2056;
      const destY: number = this.player.y + Math.sin(angles) * 2056;

      this.tracers.push(
        this.bfgTracer({
          x: this.player.x + this.player.width / 2,
          y: this.player.y + this.player.height / 2,
          toX: destX,
          toY: destY,
        })
      );
    }
  };

  bfgTracer = (tracer: BfgTracer) => {
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

  bfgExplosion = (exp: BfgExplosion) => {
    exp.active = true;

    exp.frame = 0;
    exp.maxFrame = 4;

    exp.draw = () => {
      const spriteX: number = exp.frame * 144;
      this.ctx.drawImage(
        this.sprBFGExplosion,
        spriteX,
        0,
        144,
        115,
        exp.x - 72,
        exp.y - 72,
        144,
        115
      );

      if (this.ticks % 15 === 0) {
        exp.frame++;
      }
      if (exp.frame > exp.maxFrame) {
        exp.active = false;
      }
    };

    return exp;
  };

  isInBounds = (x: number, y: number) => {
    return (
      x >= 0 &&
      x <= this.ctx.canvas.width &&
      y >= 0 &&
      y <= this.ctx.canvas.height
    );
  };

  bfgBall = (proj: BfgProjectile) => {
    proj.active = true;
    proj.width = 16;
    proj.height = 16;
    proj.destX = this.mouseX + proj.width / 2;
    proj.destY = this.mouseY + proj.height / 2;
    proj.angle = Math.atan2(proj.destY - proj.y, proj.destX - proj.x);

    proj.frame = 0;
    proj.maxFrame = 1;

    proj.draw = () => {
      const spriteX: number = proj.frame * 45;
      this.ctx.drawImage(
        this.sprBFG,
        spriteX,
        0,
        45,
        45,
        proj.x - 22,
        proj.y - 22,
        45,
        45
      );

      if (this.ticks % 5 === 0) {
        proj.frame++;
      }

      if (proj.frame > proj.maxFrame) {
        proj.frame = 0;
      }
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

        of(true)
          .pipe(
            delay(457),
            tap(() => this.drawTracers(proj.angle))
          )
          .subscribe();
      }
    };

    return proj;
  };

  fireBFG = () => {
    if (this.player.firing) {
      return;
    }

    this.player.firing = true;

    of(true)
      .pipe(
        delay(857),
        tap(() => {
          this.projectiles.push(
            this.bfgBall({ x: this.playerAim.x + 28, y: this.playerAim.y + 28 })
          );
        }),
        delay(250),
        tap(() => {
          this.player.firing = false;
          this.player.frame = 0;
        })
      )
      .subscribe();
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
    this.projectiles.forEach((proj: BfgProjectile) => proj.update());

    this.projectiles = this.projectiles.filter((proj: BfgProjectile) => {
      return proj.active;
    });
  };

  updateTracers = () => {
    this.tracers.forEach((tracer: BfgTracer) => {
      tracer.update();
    });

    this.tracers = this.tracers.filter((tracer: BfgTracer) => {
      return tracer.active;
    });
  };

  update = () => {
    this.player.moving = false;

    if (this.keys['w'] && this.player.velY > -this.speed) {
      this.player.velY--;
      this.player.moving = true;
    }
    if (this.keys['s'] && this.player.velY < this.speed) {
      this.player.velY++;
      this.player.moving = true;
    }
    if (this.keys['d'] && this.player.velX < this.speed) {
      this.player.velX++;
      this.player.moving = true;
    }
    if (this.keys['a'] && this.player.velX > -this.speed) {
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

    this.projectiles.forEach((proj: BfgProjectile) => {
      proj.draw();
    });
    this.explosions.forEach((exp: BfgExplosion) => {
      exp.draw();
    });
    this.ctx.beginPath();

    this.tracers.forEach((tracer: BfgTracer) => {
      tracer.draw();
    });
    this.ctx.stroke();
  };

  getMousePos = (event: MouseEvent) => {
    const rect: DOMRect = this.ctx.canvas.getBoundingClientRect();

    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  };

  initSprites = () => {
    this.sprPlayer = new Image();
    this.sprBFG = new Image();
    this.sprBFGExplosion = new Image();

    this.sprPlayer.src = '../assets/images/spr_marine.png';
    this.sprBFG.src = '../assets/images/spr_bfgball.png';
    this.sprBFGExplosion.src = '../assets/images/spr_bfgexp.png';
  };

  init = () => {
    const FPS = 60;

    this.player.x = this.centreX;
    this.player.y = this.centreY;
    this.initSprites();

    fromEvent(this.ctx.canvas, 'mousemove')
      .pipe(map((event: MouseEvent) => this.getMousePos(event), false))
      .subscribe();

    interval(1000 / FPS).subscribe(() => {
      this.update();
      this.draw();
    });
  };
}
