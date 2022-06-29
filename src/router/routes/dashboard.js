export default [

    {
        path: '/dashboard',
        component: () => import('layouts/DashboardLayout'),
        meta: { middleware: 'auth', permissions: [ 'user list', 'user show', 'user edit', 'user update', 'user delete' ] },
        children: [
            { path: '', name: 'dashboard', component: () => import('pages/Dashboard/IndexPage'), meta: { title: 'داشبورد', permission: 'user list' } }
        ]
    }

]
