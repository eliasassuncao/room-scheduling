using SchedulingAPI;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduling.Infra.Mappings
{
    public class RoomsMap : EntityTypeConfiguration<Rooms>
    {
        public RoomsMap()
        {
            //minha tabela
            ToTable("Room");

            //chave da tabela é o id
            HasKey(x => x.Id);
            //Titulo deve ter no máximo 60 caracteres e é obrigatória.
            Property(x => x.Title).HasMaxLength(60).IsRequired();
            //Campo obrigatório
            Property(x => x.Room).IsRequired();
        }
    }
}
