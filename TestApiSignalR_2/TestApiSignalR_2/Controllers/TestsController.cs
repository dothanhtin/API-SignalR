using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestApiSignalR_2.Models;

namespace TestApiSignalR_2.Controllers
{
    public class TestsController : ApiController
    {
        //private readonly IHubContext _hubContext = GlobalHost.ConnectionManager.GetHubContext<MyHubTest1>();

        //public IHubContext Context
        //{
        //    get { return _hubContext; }
        //}
        //public TestsController(IHubContext<MyHubTest1> hubContext)
        //{
        //    _hubContext = hubContext;
        //}
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult getAll()
        {
            TestTable cs = new TestTable();
            var res = cs.DM_TEST.ToList();
            //MyHubTest1.ReadAllNew("Cập nhật tổng");
            return Json(res);
        }
        //[AcceptVerbs("GET", "POST")]
        [HttpPost]
        //[Route("api/Tests/add1Record/")]
        public IHttpActionResult add1Record(object obj)
        {
            //var client = new InitSignalRHub("http://localhost:65292/SignalR/hubs");
            TestTable cs = new TestTable();
            DM_TEST ite = new DM_TEST();
            string jsonStr = JsonConvert.SerializeObject(obj);
            var p = JsonConvert.DeserializeObject<dynamic>(jsonStr);
            ite.Name = p.name;
            ite.Description = p.des;
            cs.DM_TEST.Add(ite);
            cs.SaveChanges();
            MyHubTest1.ReadAllNew();

            return Json("Ok");
        }

        //[AcceptVerbs("GET", "POST")]

        [HttpPost]
        //[Route("api/Tests/delete1Record/{id}")]
        public IHttpActionResult delete1Record(string id)
        {
            TestTable cs = new TestTable();
            //string jsonStr = JsonConvert.SerializeObject(obj);
            //var p = JsonConvert.DeserializeObject<dynamic>(jsonStr);
            DM_TEST ite = cs.DM_TEST.Find(Int32.Parse(id));
            cs.DM_TEST.Remove(ite);
            cs.SaveChanges();
            MyHubTest1.ReadAllNew();

            return Json("Ok");
        }

        [HttpGet]
        public IHttpActionResult getRecordById(string id)
        {
            TestTable cs = new TestTable();
            DM_TEST ite = cs.DM_TEST.Find(Int32.Parse(id));
            return Json(ite);
        }

        [HttpPost]
        public IHttpActionResult UpdateRecord(object obj)
        {
            TestTable cs = new TestTable();
            string jsonStr = JsonConvert.SerializeObject(obj);
            var p = JsonConvert.DeserializeObject<dynamic>(jsonStr);
            int id = p.ID;
            DM_TEST ite = cs.DM_TEST.Find(id);
            ite.Name = p.name==ite.Name?ite.Name:p.name;
            ite.Description = p.des==ite.Description?ite.Description:p.des;
            cs.SaveChanges();

            MyHubTest1.ReadAllNew();
            return Json("OK");
        }
    }
}
