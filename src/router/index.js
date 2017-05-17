import Vue from "vue";
import Router from "vue-router";
import TicketList from "@/view/ticket/TicketList";
import UserManager from "@/view/user/UserManager";
import WithDraw from "@/view/withdraw/WithDraw";
import LoggedView from "@/view/LoggedView";
import Forbidden from '@/view/Forbidden';
import Login from '@/view/Login';
import TicketContent from '@/view/ticket/TicketContent';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path:'/ticket',
      component:LoggedView,
      name:'logged',
      redirect:"/",
      children:[
        {
          path:':step',
          meta:{title:'受理操作'},
          component:TicketContent,
          children:[
            {
              path:':id',
              meta:{title:'受理列表'},
              component:TicketList
            }
          ]
        }
      ]
    },
    {
      path: '/user',
      name: 'UserManager',
      meta: {title: '用户管理'},
      component: LoggedView,
      children:[
        {
          path:'',
          meta:{title:'用户管理'},
          component:UserManager
        }
      ]
    },
    {
      path: '/withdraw',
      name: 'WithDraw',
      meta: {title: '出入金管理'},
      component: LoggedView,
      children:[
        {
          path:'',
          meta:{title:'用户管理'},
          component:WithDraw
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/403',
      name:'forbidden',
      component:Forbidden
    }
  ]
});
