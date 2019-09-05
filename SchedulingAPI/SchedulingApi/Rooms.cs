using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchedulingAPI
{
    public class Rooms
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Room { get; set; }
        public int Status { get; set; }
        public override string ToString()
        {
            return this.Title;
        }
    }
}
