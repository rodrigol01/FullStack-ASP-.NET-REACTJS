using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Activities.Data.Context;
using Activities.Domain.Entities;
using Activities.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Activities.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityService _activityService;

        public ActivityController(IActivityService activityService)
        {
            _activityService = activityService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var activities = await _activityService.GetAllActivitiesAsync();

                if (activities == null)
                    return NoContent();

                return Ok(activities);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error when trying to get activities: {e.Message}");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var activity = await _activityService.GetActivityById(id);

                if (activity == null)
                    return NoContent();

                return Ok(activity);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error when trying to get activity {id}: {e.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Activity activity)
        {
            try
            {
                var toUpdate = await _activityService.UpdateActivity(activity);

                if (toUpdate == null)
                    return NoContent();

                return Ok(toUpdate);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error when trying to add activity {activity.Id}: {e.Message}");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, Activity activity)
        {
            try
            {
                if (activity.Id != id)
                    return NotFound("Trying to edit wrong activity");

                var updated = await _activityService.UpdateActivity(activity);

                if (updated == null)
                    return NoContent();

                return Ok(updated);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error when trying to update activity: {e.Message}");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var wasDeleted = await _activityService.DeleteActivity(id);

                if (wasDeleted is false)
                    return BadRequest("Could not possible delete activity");

                return Ok(wasDeleted);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error when trying to delete activity: {e.Message}");
            }
        }
    }
}