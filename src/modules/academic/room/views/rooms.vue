<script setup>
import { useAuthInfo } from '../../../../stores/authinfo';

import { computed, onMounted, ref, watch } from '@vue/runtime-core';    
import { useRoomStore } from '../store';

import {useConfirmStore} from '../../../../stores/confirm'

import pagination from '../../../../components/shared/pagination.vue';
import loader from '../../../../components/shared/loader.vue';

import AddRoom from '../components/add-room.vue';
import EditRoom from '../components/edit-room.vue';
import ViewRoom from '../components/view-room.vue';
import { storeToRefs } from 'pinia';

const confirmStore = useConfirmStore()
const userPermissions  = useAuthInfo().getPermissions
const roomStore = useRoomStore()

const rooms = computed(()=> roomStore.rooms ) 

const editRoomSidebar = ref(false)
const addRoomSidebar = ref(false)
const viewRoomSidebar = ref(false)

const loading = ref(false)

async function fetchData(page){

    try{
        loading.value =  true
        await roomStore.fetchRooms(page)
        loading.value = false
    }catch(errors){  
        console.log('error occured')
        loading.value = false
    }
    
}

function deleteData(id){
   
    confirmStore.show_box()
    .then((res)=> confirmStore.do_action==true ? 
                  roomStore.deleteRoom(id) : '' )
}


onMounted(()=>{
    fetchData(1) 
})


function openEditRoomSidebar(id){ 
    roomStore.edit_room_id = id
    editRoomSidebar.value = true
}
function openViewRoomSidebar(id){
    roomStore.view_room_id = id
    viewRoomSidebar.value = true
}


</script>
<template>
        <div class="page-view">
            <div class="page-top-nav">
                <h4 class="blue-txt">Rooms</h4>
                <a @click="addRoomSidebar=true" class="btn btn-primary btn-sm ms-auto" > 
                    add room
                </a>
            </div>
            <loader v-if='loading'></loader>
            <div class="page-main-content">
                <div class="table_container">
                    <div class="col-lg-8 col-md-10 ml-auto mr-auto" v-if="loading==false">
    
                        <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="text-right">room no</th>
                                    <th class="text-right">room name</th>
                                    <th class="text-right">building</th>
                                    <th class="text-right">action</th>
                                </tr>
                            </thead>             
                            <tbody>
                                <tr v-for="room in rooms" :key="room.id">
                                    <td class="text-right">{{room.room_no}}</td>
                                    <td class="text-right">{{room.room_name}}</td>
                                    <td class="text-right">{{room.building_name}}</td>
                                    <td class="text-right">
        
                                        <a class="action_btn action_edit_btn" 
                                        title="edit" @click='openEditRoomSidebar(room.id)'
                                        v-if="userPermissions.includes('room_update')"
                                        >
                                            &#9998;
                                        </a>
        
                                        <a class="action_btn action_view_btn" 
                                        title="view" @click='openViewRoomSidebar(room.id)'
                                        v-if="userPermissions.includes('room_view')"
                                        >
                                             &#128065;
                                        </a>
        
                                        <span class="action_btn action_delete_btn" title="delete" 
                                        v-if="userPermissions.includes('room_delete')"
                                        @click="deleteData(room.id)">
                                            &#9746;
                                        </span>
        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div> 
    
                        <pagination  
                            v-if="roomStore.rooms.length>0"
                            :total_pages=roomStore.total_pages 
                            @pageChange='fetchData' 
                            :current_page=roomStore.current_page
                        />
    
                    </div>
                </div>     
            </div>
            <div class="side_component_container" 
                v-if="addRoomSidebar==true||editRoomSidebar==true||viewRoomSidebar==true"
            >
                
                
                <AddRoom
                    @refreshData='fetchData(1)'
                    v-if="addRoomSidebar"
                    @close="addRoomSidebar=false"
                />
                <EditRoom
                    v-if="editRoomSidebar" 
                    :room_id="roomStore.edit_room_id"
                    @refreshData='fetchData(roomStore.current_page)' 
                    @close="editRoomSidebar=false" 
                />
                <ViewRoom
                    v-if="viewRoomSidebar" 
                    :room_id="roomStore.view_room_id"
                    @close="viewRoomSidebar=false" 
                />  
            </div>
        </div>
    
</template>