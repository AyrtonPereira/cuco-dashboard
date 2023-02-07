import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "app",
      component: () => import("../views/Index.vue"),
      redirect: { name: "app.clients" },
      children: [
        {
          path: "/clients",
          name: "app.clients",
          meta: { routeName: "Clientes" },
          component: () => import("../views/Clients.vue"),
        },
        {
          path: "/new-client",
          name: "app.newClient",
          meta: { routeName: "Novo Cliente" },
          component: () => import("../views/ClientData.vue"),
        },
        {
          path: "/client-update/:id",
          name: "app.clientUpdate",
          meta: { routeName: "Atualizar Cliente" },
          component: () => import("../views/ClientData.vue"),
        },
      ],
    },
  ],
});

export default router;
