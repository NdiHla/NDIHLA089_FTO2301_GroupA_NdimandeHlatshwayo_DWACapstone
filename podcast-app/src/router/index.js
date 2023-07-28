// Composables
import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/clients/supabase";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/HomeView.vue"),
      },
    ],
  },
  {
    path: "/season",
    component: () => import("@/layouts/default/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Season",
        component: () => import("@/views/SeasonView.vue"),
      },
    ],
  },
  {
    path: "/show",
    component: () => import("@/layouts/default/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Show",
        component: () => import("@/views/ShowView.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/favorites",
    component: () => import("@/layouts/default/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Favorites",
        component: () => import("@/views/FavoritesView.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/layouts/default/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/LoginView.vue"),
      },
    ],
  },
  {
    path: "/unauthorized",
    component: () => import("@/layouts/default/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Unauthorized",
        component: () => import("@/views/UnauthorizedView.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

let localUser;

// checks if user has session
const getUser = async (next) => {
  localUser = await supabase.auth.getSession();
  if (localUser.data.session === null) {
    next("/unauthorized");
  } else {
    next();
  }
};

// auth requirements, check if page being routed to has access restrictions
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next);
  } else {
    next();
  }
});

export default router;
