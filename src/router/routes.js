import baseRoutes from "./routes/base"
import authRoutes from "./routes/auth"
import dashboardRoutes from "./routes/dashboard";

const routes = [
    ...baseRoutes,
    ...authRoutes,
    ...dashboardRoutes,


    // Fallback Route - 404 Not Found Page
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]

export default routes
