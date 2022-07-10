export default [

    {
        path: '/auth',
        component: () => import('layouts/AuthLayout'),
        children: [
            { path: 'login', name: 'login', component: () => import('pages/Auth/Login/Index'), meta: { title: 'ورود به حساب', middleware: 'guest' } },
            { path: 'login/password', name: 'login.pwd', component: () => import('pages/Auth/Login/Password'), meta: { title: 'ورود با رمزعبور', middleware: 'guest' } },

            { path: 'register', name: 'register', component: () => import('pages/Auth/Register/Index'), meta: { title: 'ساخت حساب', middleware: 'guest' } },

            { path: 'verify', name: 'verify', component: () => import('pages/Auth/Verify'), meta: { title: 'احراز پیامک تایید', middleware: 'guest' } },
        ]
    }

]
