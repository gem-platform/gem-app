import LoginView from "@/modules/auth/views/LoginView.vue";
import HomeView from "@/views/Home.vue";
import Vue from "vue";
import Router from "vue-router";

import { Auth } from "@/modules/auth/store/auth";

Vue.use(Router);
const router = new Router({
  base: process.env.BASE_URL,
  mode: "history",
  routes: [
    {
      component: LoginView,
      name: "login",
      path: "/login"
    },
    {
      component: () =>
        import(/* webpackChunkName: "admin" */ "./modules/admin/views/AdminIndexView.vue"),
      meta: {
        requiresAuth: true
      },
      name: "admin",
      path: "/admin"
    },
    {
      component: () =>
        import(/* webpackChunkName: "admin" */ "./modules/admin/views/UsersView.vue"),
      meta: {
        requiresAuth: true
      },
      name: "admin-users",
      path: "/admin/users"
    },
    {
      component: () =>
        import(/* webpackChunkName: "admin" */ "./modules/admin/views/ProposalsView.vue"),
      meta: {
        requiresAuth: true
      },
      name: "admin-proposals",
      path: "/admin/proposals"
    },
    {
      component: () =>
        import(/* webpackChunkName: "admin" */ "./modules/admin/views/EventsView.vue"),
      meta: {
        requiresAuth: true
      },
      name: "admin-events",
      path: "/admin/events"
    },
    {
      component: HomeView,
      meta: {
        requiresAuth: true
      },
      name: "home",
      path: "/"
    },
    {
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: {
        requiresAuth: true
      },
      name: "about",
      path: "/about"
    },
    {
      component: () =>
        import(/* webpackChunkName: "admin" */ "./modules/admin/views/LawsView.vue"),
      meta: {
        requiresAuth: true
      },
      name: "admin-laws",
      path: "/admin/laws"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Set token if it is provided as a query string
    // Works only for development environment
    if (to.query.token && process.env.NODE_ENV === "development") {
      Auth.setToken(to.query.token.toString());
    }

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
