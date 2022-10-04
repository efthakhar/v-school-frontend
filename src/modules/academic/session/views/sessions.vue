<script setup>

import { onMounted, ref } from '@vue/runtime-core';
import { useSessionStore } from '../store';
import pagination from '../../../../components/shared/pagination.vue';
import loader from '../../../../components/shared/loader.vue';
import AddSession from '../../../../modules/academic/session/components/add-session.vue';


const loading = ref(false)
const addSessionSidebar = ref(false)
const sesstionStore = useSessionStore()

async function fetchData(page){
    loading.value =  true
    await sesstionStore.fetchSessions(page)
    loading.value = false
}

onMounted(()=>{
    fetchData(1)
})

</script>

<template>
    
    <div class="page-view">
        <div class="page-top-nav">
            <h4 class="blue-txt">All Sessions</h4>
            <a class="btn btn-primary btn-sm ms-auto" @click="addSessionSidebar=true" >
                add session
            </a> 
        </div>
        <div class="page-main-content">
             
            <div class="table_container" >
                
                <div class="col-lg-8 col-md-10 ml-auto mr-auto" >
                    <loader v-if="loading"/>
                    <div class="table-responsive" v-if="loading==false">
                    <table class="table">
                        <thead >
                            <tr>
                                <th class="text-right">name</th>
                                <th class="text-right">code</th>
                                <th class="text-right">start date</th>
                                <th class="text-right">end date</th>
                                <th class="text-right">active status</th>
                                <th class="text-right">action</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr v-for="session in sesstionStore.sessions" :key="session.id">
                                <td class="text-right">{{session.session_name}}</td>
                                <td class="text-right">{{session.session_code}}</td>
                                <td class="text-right">{{session.start_date}}</td>
                                <td class="text-right">{{session.end_date}}</td>
                                <td class="text-right">
                                    <input type="checkbox" :checked="session.active_status" disabled>
                                </td>
                                <td class="text-right">
    
                                    <!-- <router-link class="action_btn action_edit_btn" 
                                    title="edit" :to="{ name: 'edit-session', params:{id:session.id} }"
                                    v-if="userPermissions.includes('session_update')"
                                    >
                                        &#9998;
                                    </router-link>
    
                                    <router-link class="action_btn action_view_btn" 
                                    title="view" :to="{ name: 'view-session', params:{id:session.id} }">
                                    
                                         &#128065;
                                    </router-link>
    
                                    
                                    <span class="action_btn action_delete_btn" title="delete" 
                                    v-if="userPermissions.includes('session_delete')"
                                    @click="deleteSession(session.id)">
                                        &#9746;
                                    </span> -->
    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <pagination  
                            :total_pages=sesstionStore.total_pages 
                            @pageChange='fetchData' 
                            :current_page=sesstionStore.current_page
                    />
                    </div> 
                </div>
    
            </div>
        </div>

        <div class="side_component_container">
               <AddSession 
                   v-if="addSessionSidebar==true"
                   @close="addSessionSidebar=false" 
                   @refreshData='fetchData(1)' 
               />      
                <!-- <addRoom
                   @refreshData='this.fetchData(1)'
                    v-if="addRoomSidebar"
                    @close="addRoomSidebar=false"
                />
                <editRoom
                    @refreshData='getRooms(current_page)' 
                    v-if="editRoomSidebar" :room_id="edit_room_id"
                    @close="editRoomSidebar=false" 
                />
                <viewRoom 
                    v-if="viewRoomSidebar" :room_id="view_room_id"
                    @close="viewRoomSidebar=false" 
                /> -->
        </div>


    </div>    
</template>
