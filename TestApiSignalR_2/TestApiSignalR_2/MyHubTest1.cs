using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace TestApiSignalR_2
{
    public class MyHubTest1 : Hub
    {
        private static IHubContext _hubContext = GlobalHost.ConnectionManager.GetHubContext<MyHubTest1>();
        //public void Hello()
        //{
        //    Clients.All.hello();
        //}
        public void ReadAll(string s)
        {
             Clients.All.readData(s);
        }

        public static async Task ReadAllNew()
        {
            await _hubContext.Clients.All.readData();
        }
    }
}