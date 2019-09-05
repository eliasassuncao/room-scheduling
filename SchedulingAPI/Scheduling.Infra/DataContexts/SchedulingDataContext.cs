using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using SchedulingAPI;
using Scheduling.Infra.Mappings;

namespace Scheduling.Infra.DataContexts
{
    public class SchedulingDataContext : DbContext
    {
        public SchedulingDataContext() : base("SchedulingConnectionString")
        {
            Database.SetInitializer<SchedulingDataContext>(new SchedulingDataContextInitializer());
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Rooms> Rooms { get; set; }
        public DbSet<Schedules> Schedules { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //configurações para criar com base no modelo de mapeamento
            modelBuilder.Configurations.Add(new RoomsMap());
            modelBuilder.Configurations.Add(new SchedulesMap());
            base.OnModelCreating(modelBuilder);
        }
    }

    //Ao rodar a aplicação, irá dropar o banco e criar denovo com base nos dominios criados, criando a tabela de sala e agendamentos.
    public class SchedulingDataContextInitializer : DropCreateDatabaseAlways<SchedulingDataContext>
    {
        protected override void Seed(SchedulingDataContext context)
        {
            //salas criadas
            context.Rooms.Add(new Rooms { Id = 1, Title = "Sala 1", Room = 12, Status = 1 });
            context.Rooms.Add(new Rooms { Id = 2, Title = "Sala 2", Room = 16, Status = 0 });
            context.Rooms.Add(new Rooms { Id = 3, Title = "Sala 3", Room = 34, Status = 1 });
            context.Rooms.Add(new Rooms { Id = 4, Title = "Sala 4", Room = 35, Status = 1 });
            context.Rooms.Add(new Rooms { Id = 5, Title = "Sala 5", Room = 42, Status = 0 });
            context.Rooms.Add(new Rooms { Id = 6, Title = "Sala 6", Room = 50, Status = 1 });
            context.Rooms.Add(new Rooms { Id = 7, Title = "Sala 7", Room = 51, Status = 1 });
            context.SaveChanges();

            //agendamentos criados
            context.Schedules.Add(new Schedules { Id = 1, RoomsId = 2, Created = DateTime.Now });
            context.Schedules.Add(new Schedules { Id = 2, RoomsId = 5, Created = DateTime.Now });
            context.SaveChanges();

            base.Seed(context);
        }
    }
}
