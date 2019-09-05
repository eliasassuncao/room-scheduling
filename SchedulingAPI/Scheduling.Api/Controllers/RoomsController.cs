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
    public class RoomsController : ApiController
    {
        private SchedulingDataContext db = new SchedulingDataContext();

        //Boas práticas para rota: plural
        [Route("rooms")]
        //HttpResponseMessage = melhor controle do response
        public HttpResponseMessage getRooms()
        {
            var result = db.Rooms.ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        [Route("rooms/{roomId}")]
        public HttpResponseMessage getRooms(int roomId)
        {
            var result = db.Rooms.Where(x => x.Room == roomId).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [HttpPost]
        [Route("rooms")]
        public HttpResponseMessage PostRooms(Rooms room)
        {
            if (room == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            try
            {

                db.Rooms.Add(room);
                db.SaveChanges();

                var result = room;
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao criar a sala.");
            }
        }
        protected override void Dispose(bool disposing)
        {
            db.Dispose();
        }

    }
}