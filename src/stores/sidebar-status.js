import { defineStore } from 'pinia'

export const sidebarStatus = defineStore('sidebar_status', {

    state: () =>
     ({ 
        collapsed: false,
        log:false
     }),

    getters: {
      getSidebarStatus: (state) => state.collapsed,
      getLog: (state) => state.log,
    },

    actions: {
      toggleCollapse() {
         this.collapsed = !this.collapsed
      },
      hideSidebar(){
        this.collapsed = true
      }
    },
})
