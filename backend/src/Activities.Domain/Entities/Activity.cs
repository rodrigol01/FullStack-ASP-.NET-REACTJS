using System;
using Activities.Domain.Enums;

namespace Activities.Domain.Entities
{
    public class Activity
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Priority Priority { get; set; }
        private DateTime CreatingTimeDate { get; set; }
        public DateTime? ConclusionTimeDate { get; set; }

        public Activity()
        {
            CreatingTimeDate = DateTime.Now;
            ConclusionTimeDate = null;
        }

        public Activity(int id, string title, string description) : this()
        {
            Id = id;
            Title = title;
            Description = description;
        }

        public void Conclude()
        {
            if (ConclusionTimeDate == null)
                ConclusionTimeDate = DateTime.Now;
            else
                throw new InvalidOperationException(
                    $"Activity already concluded: {ConclusionTimeDate.Value:MM/dd/yyyy hh:mm}");
        }
    }
}