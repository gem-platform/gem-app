import LoginView from "@/modules/auth/views/LoginView.vue";
import HomeView from "@/views/Home.vue";
import Vue from "vue";
import Router from "vue-router";

import { Auth } from "@/modules/auth/store/auth";

Vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/admin",
      name: "admin",
      meta: {
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "admin" */ "./modules/admin/views/AdminIndexView.vue")
    },
    {
      path: "/admin/users",
      name: "admin-users",
      meta: {
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "admin" */ "./modules/admin/views/UsersView.vue")
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Auth.isAuthenticated) {
      next("/login");
      return;
    }

    if (!Auth.isUserLoaded) {
      Auth.loadUserData().then(() => next());
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
