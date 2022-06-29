export default [

    {
        path: '/auth',
        component: () => import('layouts/AuthLayout'),
        children: [
            { path: 'login', name: 'login', component: () => import('pages/Auth/Login/Index'), meta: { title: 'ورود به حساب', middleware: 'guest' } },
            // { path: 'login/password', name: 'login.pwd', component: () => import('pages/Auth/LoginPage'), meta: { title: 'ورود به حساب', middleware: 'guest' } },


            { path: 'register', name: 'register', component: () => import('pages/Auth/RegisterPage'), meta: { title: 'ساخت حساب', middleware: 'guest' } },
            { path: 'verify', name: 'verify', component: () => import('pages/Auth/VerifyPage'), meta: { title: 'تایید کد فعالسازی', middleware: 'guest' } },
        ]
    }

]
