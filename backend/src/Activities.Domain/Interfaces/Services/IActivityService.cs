using System.Collections.Generic;
using System.Threading.Tasks;
using Activities.Domain.Entities;

namespace Activities.Domain.Interfaces.Services
{
    public interface IActivityService
    {
        Task<Activity?> AddActivity(Activity model);
        Task<Activity?> UpdateActivity(Activity model);
        Task<IEnumerable<Activity>?> GetAllActivitiesAsync();
        Task<Activity?> GetActivityById(int id);
        Task<bool> DeleteActivity(int id);
        Task<bool> FinishActivity(Activity? model);
    }
}