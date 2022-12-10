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
        [HttpGet("GetActivity")]
        public IEnumerable<Activity> Get()
        {
            return new List<Activity>()
            {
                new(1),
                new(2),
                new(3),
            };
        }

        [HttpGet("GetActivity/{id:int}")]
        public string Get(int id)
        {
            return $"aaa{id}";
        }

        [HttpPost("CreateActivity")]
        public Activity CreateActivity()
        {
            return new Activity(2);
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