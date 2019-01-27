using Microsoft.AspNet.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace TestApiSignalR_2.Models
{
    public class InitSignalRHub
    {
        //public string Url { get; set; }
        public HubConnection Connection { get; set; }
        public IHubProxy Hub { get; set; }

        public InitSignalRHub(string url)
        {
            Connection = new HubConnection(url, useDefaultUrl: false);
            Hub = Connection.CreateHubProxy("MyHubTest1");
            Connection.Start().Wait();
            Hub.On<string>("readData", (s) =>
            {
                Console.WriteLine("Message received: " + s);
            });
        }
        public void SayHello(string message)
        {
            Hub.Invoke("hello", message);
            Console.WriteLine("hello method is called!");
        }

        public void Stop()
        {
            Connection.Stop();
        }
    }
}