import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/api/authStore";

const routes = [
  {
    path: "/login",
    name: "AuthLayout",
    component: () => import("@/views/auth/IndexView.vue"),
    meta: { guest: true },
    // children: [
    //   {
    //     path: "login",
    //     name: "Login",
    //     component: () => import("@/views/auth/LoginView.vue"),
    //   },
    // ],
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/layouts/HomeLayout.vue"),
    meta: { requiresAuth: true },
    redirect: "/inicio",
    children: [
      {
        path: "/inicio",
        name: "Inicio",
        component: () => import("@/views/HomeView.vue"),
        meta: {
          title: 'Plataforma de vinculación laboral',
          backgroundImage: '@/assets/img/bg-title.jpg',
        },
      },
      {
        path: "/curriculum",
        name: "CurriculumView",
        component: () => import("@/views/users/CurriculumView.vue"),
        meta: {
          title: 'Mi currículum vitae',
        },
      },
      {
        path: "/empresa",
        name: "BusinessView",
        component: () => import("@/views/business/BusinessDataView.vue"),
        meta: {
          title: 'Información de mi empresa'
        },
      },
      {
        path: "/publicaciones",
        name: "BusinessVacanciesView",
        component: () => import("@/views/vacancies/BusinessVacanciesView.vue"),
        meta: {
          title: 'Vacantes publicadas'
        },
      },
      {
        path: "/vacantes",
        name: "VacanciesView",
        component: () => import("@/views/vacancies/VacanciesView.vue"),
        meta: {
          title: 'Vacantes disponibles'
        },
      },
      {
        path: "/vacantes/:id",
        name: "VacantDetailsView",
        component: () => import("@/views/vacancies/VacantDetailsView.vue"),
      },
      {
        path: "/candidatos",
        name: "CandidatesView",
        beforeEnter: async (to, from, next) => {
          const { candidates_view } = storeToRefs(useAuthStore())
          if (candidates_view.value) {
            return next()
          } else {
            return next("/")
          }
        },
        component: () => import("@/views/candidates/CandidatesView.vue"),
        meta: {
          title: 'Candidatos visibles'
        }
      },
      {
        path: "/postulaciones-recibidas",
        name: "JobApplicationsView",
        component: () => import("@/views/applications/JobApplicationsView.vue"),
        meta: {
          title: 'Postulaciones recibidas'
        },
      },
      {
        path: "/postulaciones-realizadas",
        name: "UserApplicationsView",
        component: () => import("@/views/applications/UserApplicationsView.vue"),
        meta: {
          title: 'Postulaciones realizadas'
        },
      },
      {
        path: "/datos",
        name: "DataView",
        component: () => import("@/views/data/DataView.vue"),
        meta: {
          title: 'Jóvenes en formación en búsqueda de oportunidades laborales'
        },
      },
    ],
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Guard global para manejar autenticación
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { getProfile, getUserPermissions } = authStore;
  const { loggedUser } = storeToRefs(authStore);
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth) {
    if (token && loggedUser.value) {
      return next();
    } else if (token && !loggedUser.value) {
      await getProfile(token);
      await getUserPermissions(token)
      if (loggedUser.value) {
        return next();
      } else {
        return next({ path: "/login", query: { redirect: to.fullPath } });
      }
    } else {
      return next({ path: "/login", query: { redirect: to.fullPath } });
    }
  } else if (to.meta.guest && token && loggedUser.value) {
    return next({ path: "/" });
  }
  return next();
});

export default router;