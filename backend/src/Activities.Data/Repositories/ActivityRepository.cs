using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Activities.Data.Context;
using Activities.Domain.Entities;
using Activities.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Activities.Data.Repositories
{
    public class ActivityRepository : GeneralRepository, IActivityRepository
    {
        private readonly DataContext _dataContext;

        public ActivityRepository(DataContext dataContext) : base(dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Activity>?> GetAllAsync()
        {
            return await _dataContext.Activities
                .AsNoTracking()
                .ToListAsync(CancellationToken.None);
        }

        public async Task<Activity?> GetByIdAsync(int id)
        {
            var a = _dataContext.Activities
                .AsNoTracking()
                .OrderByDescending(activity => activity.Id)
                .FirstOrDefaultAsync(activity => activity.Id == id);
            return await a;
        }

        public async Task<Activity?> GetByTitleAsync(string title)
        {
            return await _dataContext.Activities
                .AsNoTracking()
                .FirstOrDefaultAsync(activity => activity.Title == title);
        }
    }
}