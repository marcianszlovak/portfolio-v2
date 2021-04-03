using System.Collections.Generic;
using System.Net.Http;
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
        private static readonly HttpClient client = new HttpClient();


        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet]
        public async Task<IEnumerable<Job>> GetAllAsync()
        {
            var jobs = await _jobService.ListAsync();
            return jobs;
        }

        [HttpGet]
        static async Task<IEnumerable<Job>> GetAllJobs()
        {
            var streamTask = client.GetStreamAsync("https://jobs.github.com/positions.json");
            var jobs = await JsonSerializer.DeserializeAsync<List<Job>>(await streamTask);

            return jobs;
        }
    }
}