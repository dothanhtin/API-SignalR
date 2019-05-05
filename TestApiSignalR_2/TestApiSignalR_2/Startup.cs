using System;
using System.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;

[assembly: OwinStartup(typeof(TestApiSignalR_2.Startup))]

namespace TestApiSignalR_2
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
            //app.MapSignalR();
            #region backplane SQL Server
            //string sqlConnectionString = ConfigurationManager.AppSettings["SQLServer_Scaleout"].Trim().ToString();
            //GlobalHost.DependencyResolver.UseSqlServer(sqlConnectionString);
            #endregion

            #region map SignalR and process CORS
            app.Map("/signalr/hubs", map =>
            {
                map.UseCors(CorsOptions.AllowAll);
                var hubConfiguration = new HubConfiguration { };
                map.RunSignalR(hubConfiguration);
            });
            #endregion
        }
    }
}
