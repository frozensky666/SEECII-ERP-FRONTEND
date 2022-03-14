import Vue from "vue";
import VueRouter from "vue-router";
import { ROLE, PATH } from "../common/const";
import { auth, login } from "../network/auth";

const Error = () => import("../components/content/Error");
const Home = () => import("../views/Home");
const CommodityManagement = () => import("../views/commodity/CommodityManagement");
const CommodityClassification = () => import("../views/commodity/CommodityClassification");
const InventoryCheck = () => import("../views/inventory/InventoryCheck");
const InventoryLoss = () => import("../views/inventory/InventoryLoss");
const InventoryOverflow = () => import("../views/inventory/InventoryOverflow");
const InventoryPresent = () => import("../views/inventory/InventoryPresent");
const InventoryView = () => import("../views/inventory/InventoryView");
const InventoryWarning = () => import("../views/inventory/InventoryWarning");
const Approval = () => import("../views/approval/Approval");

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/error',
    component: Error
  },
  // 商品管理
  {
    path: PATH.COMMODITY_CLASSIFICATION.path,
    component: CommodityClassification,
    meta: { requiresAuth: PATH.COMMODITY_CLASSIFICATION.requiresAuth }
  },
  {
    path: PATH.COMMODITY_MANAGEMENT.path,
    component: CommodityManagement,
    meta: { requiresAuth: PATH.COMMODITY_MANAGEMENT.requiresAuth }
  },
  // 库存管理
  {
    path: PATH.INVENTORY_CHECK.path,
    component: InventoryCheck,
    meta: { requiresAuth: PATH.INVENTORY_CHECK.requiresAuth }
  },
  {
    path: PATH.INVENTORY_LOSS.path,
    component: InventoryLoss,
    name: "InventoryLoss",
    meta: { requiresAuth: PATH.INVENTORY_LOSS.requiresAuth }
  },
  {
    path: PATH.INVENTORY_OVERFLOW.path,
    component: InventoryOverflow,
    name: "InventoryOverflow",
    meta: { requiresAuth: PATH.INVENTORY_OVERFLOW.requiresAuth}
  },
  {
    path: PATH.INVENTORY_PRESENT.path,
    component: InventoryPresent,
    name: "InventoryPresent",
    meta: { requiresAuth: PATH.INVENTORY_PRESENT.requiresAuth }
  },
  {
    path: PATH.INVENTORY_VIEW.path,
    component: InventoryView,
    meta: { requiresAuth: PATH.INVENTORY_VIEW.requiresAuth }
  },
  {
    path: PATH.INVENTORY_WARNING.path,
    component: InventoryWarning,
    name: "InventoryWarning",
    meta: { requiresAuth: PATH.INVENTORY_WARNING.requiresAuth }
  },
  // 审批
  {
    path: PATH.GM_APPROVAL.path,
    component: Approval,
    meta: { requiresAuth: PATH.GM_APPROVAL.requiresAuth }
  },

// -----------------------未找到页面-----------------------------
  {
    path: '*',
    redirect: '/error'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


router.beforeEach(async (to,from,next) => {
  // TODO, 需要判断是否访问的登陆页面
  let token = sessionStorage.getItem("token");
  console.log(to.path)
  
  if(token == null) { // TODO, 理论上这里需要跳转登录界面进行登录
    console.log("需要登录")
    await login().then(_res => token = _res.data.token);
    if (token) {
      sessionStorage.setItem("token", token); // get token 
      // TODO : 后端验证token
      let res = null;
      await auth().then(_res => res = _res);
      console.log(res);
      if(res?.data?.user_info) {
        sessionStorage.setItem("role", res.data.user_info.role);
        sessionStorage.setItem("name", res.data.user_info.name);
      } else {
        console.log("token认证失败")
        next("/error");
      }
    } else {
      console.log("token获取失败")
      next("/error");
    }
  }

  if(to.meta.requiresAuth) {
    if(to.meta.requiresAuth.some(role => role.toString() === sessionStorage.getItem("role"))) { //有权限
      console.log("获得访问权限")
      next();
    } else {
      console.log("无权限访问")
      next("/error"); //无权限
    }
  }
  else { //页面没有权限限制，直接访问
    console.log("直接访问")
    next();
  }
});

export default router;
