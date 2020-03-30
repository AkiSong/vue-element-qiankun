/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const subRouter = {
  path: '/subapp',
  component: Layout,
  redirect: '/subapp/app1',
  name: 'sub',
  meta: {
    title: 'sub-app',
    icon: 'table'
  },
  children: [
    {
      path: 'app1',
      name: 'sub-app1',
      meta: { title: 'sub-app1' }
    },
    {
      path: 'app2',
      name: 'sub-app2',
      meta: { title: 'sub-app2' }
    }
  ]
}
export default subRouter
