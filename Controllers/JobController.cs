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
            _baseUrl = "https://jobs.github.com/positions.json/";
        }

        [HttpGet]
        public async Task<IEnumerable<Job>> GetAllAsync()
        {
            var streamTask = await Client.GetStreamAsync($"{_baseUrl}");
            var jobs = await JsonSerializer.DeserializeAsync<List<Job>>(streamTask);

            return jobs;
        }

        // [HttpGet("id/{id}")]
        // public async Task<Job> GetJobById(string id)
        // {
        //     var streamTask = await Client.GetStreamAsync($"{_baseUrl}/positions/{id}.json");
        //     var job = await JsonSerializer.DeserializeAsync<Job>(streamTask);
        //
        //     return job;
        // }

        [HttpGet("page/{pageNum}")]
        public async Task<IEnumerable<Job>> GetJobsByPageNumber(string pageNum)
        {
            var streamTask = await Client.GetStreamAsync($"{_baseUrl}?page={pageNum}");
            var jobs = await JsonSerializer.DeserializeAsync<List<Job>>(streamTask);

            return jobs;
        }

        [HttpGet("description/{description}")]
        public async Task<IEnumerable<Job>> GetJobsByDescription(string description, string type, string location, string pageNum)
        {
            var streamTask =
                await Client.GetStreamAsync($"{_baseUrl}?description={description}&full_time={type}&location={location}&page={pageNum}"); 
            var jobs = await JsonSerializer.DeserializeAsync<List<Job>>(streamTask);

            return jobs;
        }
    }
}