using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchedulingAPI
{
    public class Schedules
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public int RoomsId { get; set; }
        public virtual Rooms Rooms { get; set; }
    }
}
