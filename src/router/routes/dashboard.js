export default [

    {
        path: '/dashboard',
        component: () => import('layouts/GuestLayout'),
        children: [
            { path: '', name: 'dashboard', component: () => import('pages/Dashboard/IndexPage'), meta: { title: 'داشبورد', middleware: 'auth' } }
        ]
    }

]
