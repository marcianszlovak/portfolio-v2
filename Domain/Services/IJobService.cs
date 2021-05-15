using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using portfolio.Domain.Models;

namespace portfolio.Domain.Services
{
    public interface IJobService
    {
        Task<IEnumerable<Job>> ListAsync();
    }
}