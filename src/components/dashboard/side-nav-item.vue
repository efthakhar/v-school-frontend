<script>
import { useAuthInfo } from '../../stores/authinfo';    
export default{
    props:{ navdetails: Object },

    data(){
        return{
            show_item:false,
            subnav : this.navdetails.subnavlinks? true : false,
            isOpened: false,
            userPermissions: useAuthInfo().getPermissions,
       }      
    },
    methods:{
        toggle(){
            this.isOpened = !this.isOpened
           
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
       
    }

    
}
</script>

<template>

<div class="side-nav-item"  >

             <RouterLink  
                :to="subnav ?'' : navdetails.navlink"
                v-if="userPermissions.includes(navdetails.permission)||subnav!=false"
                :class="this.$route.path==navdetails.navlink && !subnav ?'active-nav-link':''"
                class="side-nav-link" @click="toggle"
              >
                {{navdetails.navlinktext}}
             </RouterLink>

             <div class="side-nav-sublinks" v-if="isOpened&&subnav">

                <div v-for="sublink in navdetails.subnavlinks" :key="sublink" >
                    <RouterLink
                         v-if="userPermissions.includes(sublink.permission)"
                        :class="this.$route.path.includes(sublink.subnavtext)?'active-nav-link':''"
                        :to="sublink.subnavlink" class="side-nav-sublink"
                    >
                        {{sublink.subnavtext}}
                    </RouterLink>
                </div>
             
             </div>
</div>



</template>

