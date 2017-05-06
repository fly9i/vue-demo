import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import TicketContent from '@/components/TicketContent'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/ticket/upload',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/ticket/review',
      name: 'TicketList',
      component: TicketContent
    }
  ]
})
