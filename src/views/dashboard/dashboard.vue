<script setup>
import {useConfirmStore}  from '../../stores/confirm'
import { RouterLink, RouterView } from 'vue-router'
import { sidebarStatus } from '../../stores/sidebar-status.js'

import Sidebar from '../../components/dashboard/sidebar.vue';
import Header from '../../components/dashboard/header.vue';
import NotificationsContainer from '../../components/shared/notifications-container.vue';

import { computed, onMounted } from '@vue/runtime-core';
import ConfirmBox from '../../components/shared/confirmBox.vue';

const sidebar_status = sidebarStatus()

const confirmStore = useConfirmStore()

onMounted(()=>{
    
    if (window.innerWidth < 760) 
    {
         sidebar_status.hideSidebar()
    } 
})



</script>

<template>

<div class="dashboard">
    <div>
        <ConfirmBox v-if="confirmStore.show_confirm_box" />
    </div>
    <div class="dashboard-sidebar" 
     :class=" sidebar_status.collapsed == true ? 'dashboard-sidebar-responsive':''">
        <Sidebar/>
    </div>
    <div>
        <NotificationsContainer />
    </div>
    
    <div class="dashboard-content">
        <Header />
        
        <div class="main-content">
            
             <RouterView />
        </div>
       
    </div>

</div>

</template>

<style>
.dashboard{
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
}

.dashboard-sidebar{
    border-right: 2px solid #5797F8;
    width: 200px;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.959);
    z-index: 10;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.37);
    height: 100vh;
    overflow: auto;
    transition: all .5s;
}
.dashboard-content{
    flex: 1 1 0;
    background-color: rgb(255, 255, 255);
    overflow: auto;
}

.main-content{
    margin:10px;
    box-shadow: 1px 1px 12px grey;
    padding:10px;
    border-radius: 10px;
    padding-left: 20px;
}

.dashboard-sidebar-responsive{
        position: absolute;
        left:-100%;
}


</style>