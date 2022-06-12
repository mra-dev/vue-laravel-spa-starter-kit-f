export default [

    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {path: '', name: 'index', component: () => import('pages/IndexPage')},
            // {path: 'home', name: 'home', component: () => import('pages/Dashboard/IndexPage'), meta: { middleware: 'auth' }},
            {path: 'home', name: 'home', component: () => import('pages/Dashboard/IndexPage'), meta: { title: 'صفحه اصلی' }},
        ]
    },

]
