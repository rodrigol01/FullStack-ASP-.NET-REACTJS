using System;
using System.Collections.Generic;
using System.Linq;
using Activities.Data.Context;
using Activities.Domain.Entities;
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

        [HttpGet]
        public IEnumerable<Activity> Get()
        {
            return _dataContext.Activities;
        }

        [HttpGet("{id:int}")]
        public Activity Get(int id)
        {
            return _dataContext.Activities.FirstOrDefault(item => item.Id == id);
        }

        [HttpPost]
        public Activity Post(Activity activity)
        {
            _dataContext.Activities.Add(activity);

            if (_dataContext.SaveChanges() > 0)
                return activity;

            throw new InvalidOperationException("Could not save the object");
        }

        [HttpPut("{id:int}")]
        public Activity Put(int id, Activity activity)
        {
            if (activity.Id != id)
                throw new InvalidOperationException("Could not update the activity because the id doesn't match");

            _dataContext.Update(activity);

            if (_dataContext.SaveChanges() > 0)
                return _dataContext.Activities.FirstOrDefault(item => item.Id == id);

            throw new InvalidOperationException(
                "Could not save the activity, check the information and try again later");
        }

        [HttpDelete("{id:int}")]
        public bool Delete(int id)
        {
            var activityToDelete = _dataContext.Activities.FirstOrDefault(item => item.Id == id);

            if (activityToDelete is null)
                throw new InvalidOperationException("Cannot delete. Item doesn't exists");

            _dataContext.Remove(activityToDelete);

            return _dataContext.SaveChanges() > 0;
        }
    }
}