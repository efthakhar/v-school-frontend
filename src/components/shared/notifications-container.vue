<script setup>
import { useNotificationStore } from '@/stores/notifications.js';
import notification from './notification.vue';

const notificationStore = useNotificationStore()

</script>


<template>
<div class="notifications_container">
   <notification 
      v-for="notification in notificationStore.notifications" 
      :key="notification.id"
      :data="notification"
      @close="notificationStore.hideNotification(notification)"
    />
</div>    
</template>

<style>
.notifications_container{
    position: absolute;
    bottom: 2%;
    right:5%;
    z-index: 10000;
}    
</style>