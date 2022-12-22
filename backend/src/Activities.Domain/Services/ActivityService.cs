using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Activities.Domain.Entities;
using Activities.Domain.Interfaces.Repositories;
using Activities.Domain.Interfaces.Services;

namespace Activities.Domain.Services
{
    public class ActivityService : IActivityService
    {
        private readonly IActivityRepository _activityRepository;

        public ActivityService(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }

        public async Task<Activity?> AddActivity(Activity model)
        {
            if (await _activityRepository.GetByTitleAsync(model.Title).ConfigureAwait(false) != null)
                throw new InvalidOperationException("Already exists an activity with this title");

            if (await _activityRepository.GetByIdAsync(model.Id) != null)
                return null;

            _activityRepository.Add(model);
            await _activityRepository.SaveChangesAsync();
            return model;
        }

        public async Task<Activity?> UpdateActivity(Activity model)
        {
            if (model.ConclusionTimeDate != null)
                throw new InvalidOperationException("Cannot update already finished activity");

            if (await _activityRepository.GetByIdAsync(model.Id) != null)
                return null;

            _activityRepository.Update(model);
            await _activityRepository.SaveChangesAsync();
            return model;
        }

        public async Task<IEnumerable<Activity>?> GetAllActivitiesAsync()
        {
            try
            {
                var activities = await _activityRepository.GetAllAsync();

                return activities ?? null;
            }
            catch (Exception e)
            {
                throw new InvalidOperationException($"Internal error {e}");
            }
        }

        public async Task<Activity?> GetActivityById(int id)
        {
            try
            {
                var activity = await _activityRepository.GetByIdAsync(id);

                return activity ?? null;
            }
            catch (Exception e)
            {
                throw new InvalidOperationException($"Internal error {e}");
            }
        }

        public async Task<bool> DeleteActivity(int id)
        {
            var activity = await _activityRepository.GetByIdAsync(id);
            if (activity == null)
                return false;

            _activityRepository.Delete(activity);
            return await _activityRepository.SaveChangesAsync();
        }

        public async Task<bool> FinishActivity(Activity? model)
        {
            if (model == null)
                return false;

            _activityRepository.Update(model);
            return await _activityRepository.SaveChangesAsync();
        }
    }
}