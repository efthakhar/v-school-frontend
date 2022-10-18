<script>
 import { sidebarStatus } from  '../../stores/sidebar-status.js'
import { useAuthInfo } from '../../stores/authinfo';    
export default{
    props:{ navdetails: Object },

    data(){
        return{
            show_item:false,
            subnav : this.navdetails.subnavlinks? true : false,
            isOpened: false,
            userPermissions: useAuthInfo().getPermissions,
            sideNav: sidebarStatus(),
            screen_width: ''
       }      
    },
    methods:{
        toggle(link){
            this.isOpened = !this.isOpened
            
            this.screen_width<=450 && link ? this.sideNav.toggleCollapse():''
           
        },
        handleResize() {
            this.screen_width = window.innerWidth;
        }
    },
    mounted(){
       let subnavs = this.navdetails.subnavlinks
       for (const key in subnavs) {
        if(this.userPermissions.includes(subnavs[key].permission)){
            this.show_item = true
            break;
        }
       }
       
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    

    
}
</script>

<template>

<div class="side-nav-item"  >

             <RouterLink  
                :to="subnav ?'' : navdetails.navlink"
                v-if="userPermissions.includes(navdetails.permission)||subnav!=false"
                :class="this.$route.path==navdetails.navlink && !subnav ?'active-nav-link':''"
                class="side-nav-link" @click="toggle(navdetails.navlink)"
              >
                {{navdetails.navlinktext}}
             </RouterLink>

             <div class="side-nav-sublinks" v-if="isOpened&&subnav">

                <div v-for="sublink in navdetails.subnavlinks" :key="sublink" >
                    <RouterLink
                         v-if="userPermissions.includes(sublink.permission)"
                        :class="this.$route.path.includes(sublink.subnavtext)?'active-nav-link':''"
                        :to="sublink.subnavlink" class="side-nav-sublink"
                        v-on:click="screen_width<=450? sideNav.toggleCollapse():''"
                       
                    >
                        {{sublink.subnavtext}}
                    </RouterLink>
                </div>
             
             </div>
</div>



</template>

