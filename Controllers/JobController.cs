using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using portfolio.Domain.Models;
using portfolio.Domain.Services;

namespace portfolio.Controllers
{
    [Route("/api/jobs")]
    [Produces("application/json")]
    [ApiController]
    public class JobController : Controller
    {
        private readonly IJobService _jobService;
        private static readonly HttpClient Client = new();


        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public async Task<IEnumerable<Job>> GetAllAsync()
        {
            var streamTask = await Client.GetStreamAsync("https://jobs.github.com/positions.json");
            var jobs = await JsonSerializer.DeserializeAsync<List<Job>>(streamTask);

            return jobs;
        }
    }
}