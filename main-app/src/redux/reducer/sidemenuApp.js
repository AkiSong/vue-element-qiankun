import Cookies from 'js-cookie'
import { SIDEBAR_OPEN } from '../actionTypes'

const sidebar = {
  opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
  withoutAnimation: false
}

function toggleSideBar(state = sidebar, action) {
  switch (action.type) {
    case SIDEBAR_OPEN:
      if (action.status) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      return {
        withoutAnimation: false,
        opend: action.status
      }
    default:
      return state
  }
}
