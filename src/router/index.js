import Vue from 'vue'
import Router from 'vue-router'
import head from '@/components/head'
import login from '@/components/Login'
import welcome from '@/components/welcome'
import obj from '@/components/obj'
import sub from '@/components/sub'
import record from '@/components/record'
import userinfo from '@/components/userinfo'
import person from '@/components/person'
import security from '@/components/security'
import body from '@/components/body'
import theory from '@/components/theory'
import model from '@/components/model'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '评教分析系统',
        // keepAlive: false
      }
    },
    {
      path: '/head',
      name: 'head',
      component: head,
      redirect: '/body',
      meta: {
        title: '评教分析系统-主页',
        // keepAlive: false
      },
      children: [
        {
          path: '/body', component: body,
          redirect: '/welcome',
          children: [
            { path: '/obj', name: 'obj', component: obj },
            { path: '/sub', name: 'sub', component: sub },
            { path: '/welcome', name: 'welcome', component: welcome },
            { path: '/record', name: 'record', component: record },
          ]
        },
        {
          path: '/userinfo', name: 'userinfo', component: userinfo,
          redirect: '/person',
          children: [
            { path: '/person', name: 'person', component: person },
            { path: '/security', name: 'security', component: security }
          ]
        },
        { path: '/theory', name: 'theory', component: theory },
        { path: '/model', name: 'model', component: model },

      ]
    },
  ],
  // 改变哈希
  mode:'history',
  
})


