using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Activities.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Activities.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {
        public IEnumerable<Activity> Activities = new List<Activity>()
        {
            new(1),
            new(2),
            new(3),
        };

        [HttpGet("GetActivities")]
        public IEnumerable<Activity> Get()
        {
            return Activities;
        }

        [HttpGet("GetActivityById/{id:int}")]
        public Activity Get(int id)
        {
            return !Activities.Any() ? new Activity(id: 0) : Activities.First(item => item.Id == id);
        }

        [HttpPost("CreateActivity")]
        public IEnumerable<Activity> CreateActivity(Activity activity)
        {
            return Activities.Append(activity);
        }

        [HttpPut("UpdateActivity/{id:int}")]
        public string UpdateActivity(int id)
        {
            return $"update my first method {id}";
        }

        [HttpDelete("DeleteActivity/{id:int}")]
        public string DeleteActivity(int id)
        {
            return $"delete my first method {id}";
        }
    }
}