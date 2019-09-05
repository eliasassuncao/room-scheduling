using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Scheduling.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Serviços e configuração da API da Web

            var formatters = GlobalConfiguration.Configuration.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            //config para o JSON
            var settings = jsonFormatter.SerializerSettings;

            //Não faça referência, traga o objeto
            jsonFormatter.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
            //Não utilizar xml
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            settings.Formatting = Formatting.Indented;
            //Propriedades em letra minúscula
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            //Ja existe a solução para o cors
            config.EnableCors();
            // Rotas da API da Web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
