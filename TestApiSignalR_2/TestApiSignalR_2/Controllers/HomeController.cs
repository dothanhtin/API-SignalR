using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestApiSignalR_2.Controllers
{
    public class HomeController : Controller
    {
        //Call Interface Hubcontext
        private readonly IHubContext<MyHubTest1> _hubContext;

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

    }
}
