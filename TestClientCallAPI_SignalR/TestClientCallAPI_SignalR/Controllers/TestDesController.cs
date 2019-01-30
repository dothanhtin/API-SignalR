using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestClientCallAPI_SignalR.Models;

namespace TestClientCallAPI_SignalR.Controllers
{
    public class TestDesController : Controller
    {
        // GET: TestDes
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult getAll()
        {
            TestDemo cs = new TestDemo();
            var res = cs.DM_TEST.ToList();
            return Json(res);
        }

        //public JsonResult Add(object item)
        //{

        //}

        public JsonResult Update(object item)
        {
            try
            {
                string jsonStr = JsonConvert.SerializeObject(item);
                var p = JsonConvert.DeserializeObject<dynamic>(jsonStr);
                TestDemo cs = new TestDemo();
                if (p.ID = 0)//Add
                {
                    DM_TEST ite = new DM_TEST();
                    ite.Name = p.name;
                    ite.Description = p.des;
                    cs.DM_TEST.Add(ite);
                    cs.SaveChanges();
                }
                else //Edit
                {
                    DM_TEST ite = cs.DM_TEST.Find(p.ID);
                    ite.Name = p.name == ite.Name ? ite.Name : p.name;
                    ite.Description = p.des == ite.Description ? ite.Description : p.des;
                    cs.SaveChanges();
                }
                return Json("1");
            }
            catch(Exception e)
            {
                throw e;
            }
            
        }

        public JsonResult Del(string id)
        {
            try
            {
                TestDemo cs = new TestDemo();
                DM_TEST ite = cs.DM_TEST.Find(int.Parse(id));
                cs.DM_TEST.Remove(ite);
                cs.SaveChanges();
                return Json("1");
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}