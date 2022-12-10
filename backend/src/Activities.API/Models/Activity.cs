using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Activities.API.Enums;

namespace Activities.API.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Priority Priority { get; set; }

        public Activity()
        {
        }

        public Activity(int id)
        {
            Id = id;
        }
    }
}