using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Scheduling.Infra.DataContexts;
using SchedulingAPI;

namespace Scheduling.Api.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    //Boas práticas para prefixo: api/versão
    [RoutePrefix("api/v1")]
    public class SchedulesController : ApiController
    {
        private SchedulingDataContext db = new SchedulingDataContext();

        //Boas práticas para rota: plural
        [Route("schedules")]
        //HttpResponseMessage = melhor controle do response
        public HttpResponseMessage GetShedules()
        {
            var result = db.Schedules.Include("Rooms").ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        [Route("schedules")]
        public HttpResponseMessage PostSchedules(Schedules schedules)
        {
            //tratar se meu body = null
            if(schedules == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            try
            {
                //add do agendamento vindo do body
                db.Schedules.Add(schedules);
                var room = db.Rooms.First(x => x.Id == schedules.RoomsId);
                room.Status = 0;
                db.SaveChanges();

                //retorno meu agendamento criado.
                var result = schedules;
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch(Exception)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao criar o agendamento.");
            }
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
        }


    }
}