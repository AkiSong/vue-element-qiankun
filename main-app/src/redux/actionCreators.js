import { SIDEBAR_OPEN } from './actionTypes'
export function toggleSideBarOpen(status) {
  return {
    type: SIDEBAR_OPEN,
    status
  }
}
