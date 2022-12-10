using System;
using System.Collections.Generic;
using System.Linq;
using Activities.API.Data;
using Activities.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Activities.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public ActivityController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("GetActivities")]
        public IEnumerable<Activity> Get()
        {
            return _dataContext.Activities;
        }

        [HttpGet("GetActivityById/{id:int}")]
        public Activity Get(int id)
        {
            return _dataContext.Activities.FirstOrDefault(item => item.Id == id);
        }

        [HttpPost("CreateActivity")]
        public IEnumerable<Activity> CreateActivity(Activity activity)
        {
            _dataContext.Activities.Add(activity);

            if (_dataContext.SaveChanges() > 0)
                return _dataContext.Activities;

            throw new InvalidOperationException("Could not save the object");
        }

        [HttpPut("UpdateActivity/{id:int}")]
        public Activity UpdateActivity(int id, Activity activity)
        {
            if (activity.Id != id)
                throw new InvalidOperationException("Could not update the activity because the id doesn't match");

            _dataContext.Update(activity);

            if (_dataContext.SaveChanges() > 0)
                return _dataContext.Activities.FirstOrDefault(item => item.Id == id);

            throw new InvalidOperationException(
                "Could not save the activity, check the information and try again later");
        }

        [HttpDelete("DeleteActivity/{id:int}")]
        public bool DeleteActivity(int id)
        {
            var activityToDelete = _dataContext.Activities.FirstOrDefault(item => item.Id == id);

            if (activityToDelete is null)
                throw new InvalidOperationException("Cannot delete. Item doesn't exists");

            _dataContext.Remove(activityToDelete);

            return _dataContext.SaveChanges() > 0;
        }
    }
}