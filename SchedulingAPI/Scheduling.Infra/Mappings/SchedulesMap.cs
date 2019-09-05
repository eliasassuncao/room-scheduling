using SchedulingAPI;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduling.Infra.Mappings
{
    public class SchedulesMap : EntityTypeConfiguration<Schedules>
    {
        public SchedulesMap()
        {
            //minha tabela
            ToTable("Scheduling");

            //chave da tabela é o id
            HasKey(x => x.Id);
            //Campo Obrigatório
            Property(x => x.Created).IsRequired();
            //referência
            HasRequired(x => x.Rooms);
        }
    }
}
