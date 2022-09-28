<script>
import axios from 'axios'    
import { useAuthInfo } from '../stores/authinfo'    
import { sidebarStatus } from '../stores/sidebar-status.js'

export default{
    data(){
        return{
             sidebar_status: sidebarStatus(),
             authInfo: useAuthInfo()
        }
    },
    methods:{
        toggleSidebar(){
            this.sidebar_status.toggleCollapse
        },
        async logout(){
            await axios.get('http://127.0.0.1:8000/logout')
            this.authInfo.logout()
            this.$router.push('login')
       },
    },
   
    
}

</script>


<template>
<div class="dashboard-header">
    <div class="menu-icon" v-on:click="sidebar_status.toggleCollapse()">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 377 377" style="enable-background:new 0 0 377 377;" 
            xml:space="preserve">
            <g>
                <circle cx="15" cy="88.5" r="15"/>
                <rect x="75" y="73.5" width="302" height="30"/>
                <circle cx="15" cy="288.5" r="15"/>
                <rect x="75" y="273.5" width="302" height="30"/>
                <circle cx="15" cy="188.5" r="15"/>
                <rect x="75" y="173.5" width="302" height="30"/>
            </g>
            <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
            </svg>
    </div>   
    
    <div class="ms-auto user_info">
        <p class="m-2">hi, 
            {{authInfo.getAuthUser.name}} 
        </p>
        <a @click="logout" class="btn btn-primary">logout</a>
    </div>    
</div> 
</template>

<style>
/* dashboard header */
.dashboard-header{
    margin: 10px;
    box-shadow: 1px 1px 12px grey;
    padding:10px;
    border-radius: 10px; 
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}


.menu-icon{
    display: inline-block;
}
.menu-icon svg{
    width: 30px !important;
    height: 30px !important;
    cursor: pointer;
    fill:#5797F8;
    transition: all .3s;
}
.menu-icon svg:hover{
    width: 33px !important;
    height: 33px !important;
    cursor: pointer;
    fill:#196ce7;
}
.user_info{ display: flex ;}
</style>