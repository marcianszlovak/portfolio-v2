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
        private static readonly HttpClient Client = new HttpClient();
        private readonly string _baseUrl;


        public JobController(IJobService jobService)
        {
            _jobService = jobService;
            _baseUrl = "https://jobs.github.com/positions.json?markdown=true";
        }

        [HttpGet]
        public async Task<IEnumerable<Job>> GetAllAsync()
        {
            var streamTask = await Client.GetStreamAsync($"{_baseUrl}");
            var jobs = await JsonSerializer.DeserializeAsync<List<Job>>(streamTask);

            return jobs;
        }

        [HttpGet("page/{pageNum}")]
        public async Task<IEnumerable<Job>> GetJobsByPageNumber(string pageNum)
        {
            var streamTask = await Client.GetStreamAsync($"{_baseUrl}&page={pageNum}");
            var jobs = await JsonSerializer.DeserializeAsync<List<Job>>(streamTask);

            return jobs;
        }

        [HttpGet("description")]
        public async Task<IEnumerable<Job>> GetJobsByDescription(string description, string isFullTime, string location,
            string pageNum)
        {
            var streamTask =
                await Client.GetStreamAsync(
                    $"{_baseUrl}&description={description}&full_time={isFullTime}&location={location}&page={pageNum}");
            var jobs = await JsonSerializer.DeserializeAsync<List<Job>>(streamTask);

            return jobs;
        }
    }
}