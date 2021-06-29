import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/integration",
    name: "Integration",
    component: () => import("../views/Integration.vue")
  },
  {
    path: "/confrontChannel",
    name: "ConfrontChannel",
    component: () => import("../views/ConfrontChannel.vue")
  },
  {
      path: "/newsList",
      name: "newsList",
      component: () => import("../views/newsList.vue")
  },
    {
        path: "/newsDetails",
        name: "newsDetails",
        component: () => import("../views/newsDetails.vue"),
        meta:{
          pName:'confrontChannel',
        }
    },
    {
      path: "/pandemicProduct",
      name: "pandemicProduct",
      component: () => import("../views/pandemicProduct.vue"),
       meta:{
          pName:'confrontChannel',
        }
  },
  {
      path: "/pandemicProductList",
      name: "pandemicProductList",
      component: () => import("../views/pandemicProductList.vue"),
       meta:{
          pName:'confrontChannel',
        }
  },
  {
      path: "/register",
      name: "register",
      component: () => import("../views/register.vue")
  },
    {
        path: "/recruit",
        name: "recruit",
        component: () => import("../views/recruit.vue")
    },
    {
        path: "/expertOnline",
        name: "expertOnline",
        component: () => import("../views/expertOnline.vue")
    },
    {
        path: "/prevention",
        name: "prevention",
        component: () => import("../views/prevention.vue"),
        meta:{
          pName:'confrontChannel'
        }
    },
    {
        path: "/supplyChannel",
        name: "supplyChannel",
        component: () => import("../views/supplyChannel.vue"),
        meta:{
            pName:'confrontChannel'
        }
    },
    {
        path: "/statement",
        name: "statement",
        component: () => import("../views/statement.vue")
    },
    {
        path: "/ww",
        name: "ww",
        component: () => import("../views/ww.vue")
    },
    {
        path: "/traceability",
        name: "traceability",
        component: () => import("../views/traceability.vue")
    }
];

const router = new VueRouter({
  linkActiveClass: '',
  linkExactActiveClass: '',
  mode: 'history', // hash
  routes
});
export default router;
