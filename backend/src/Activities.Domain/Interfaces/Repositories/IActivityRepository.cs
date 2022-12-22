using System.Collections.Generic;
using System.Threading.Tasks;
using Activities.Domain.Entities;

namespace Activities.Domain.Interfaces.Repositories
{
    public interface IActivityRepository : IGeneralRepository
    {
        Task<IEnumerable<Activity>?> GetAllAsync();
        Task<Activity?> GetByIdAsync(int id);
        Task<Activity?> GetByTitleAsync(string title);
    }
}