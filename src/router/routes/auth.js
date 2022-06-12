export default [

    {
        path: '/auth',
        component: () => import('layouts/GuestLayout'),
        meta: { permissions: 'Guest' },
        children: [
            { path: 'login', name: 'login', component: () => import('pages/Auth/LoginPage'), meta: { title: 'ورود به حساب', middleware: 'guest' } },
            { path: 'register', name: 'register', component: () => import('pages/Auth/RegisterPage'), meta: { title: 'فعالسازی حساب', middleware: 'guest' } }
        ]
    }

]
