import Todo from './components/todo/Todo.vue';
import Login from './components/signin/Login.vue';
import Config from './components/config/Config.vue';

export const routes =[
    {path:'*', redirect: '/'},
    {path:'/', component: Todo},
    {path:'/login', name: 'login', component: Login},
    {
        path:'/config', 
        component: Config,
        meta:{
            requiresAuth: true
        }
    }
];