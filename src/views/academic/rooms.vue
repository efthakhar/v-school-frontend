<script>
import axios from 'axios'
import { useAuthInfo } from '@/stores/authinfo.js' 
import { useRoomStore } from '../../stores/academic/roomStore'

import loader from '../../components/shared/loader.vue'
import pagination from '../../components/shared/pagination.vue'

import addRoom from '../../components/academic/room/add-room.vue'
import editRoom from '../../components/academic/room/edit-room.vue'
import viewRoom from '../../components/academic/room/view-room.vue'
import { mapState, mapStores } from 'pinia'
    
    
export default{

       

        computed:{
            ...mapStores(useRoomStore),
          
        },
       
        components:{ loader, pagination, addRoom,editRoom, viewRoom},
        data(){
            
            return{
               
                loading:false,
                userPermissions: useAuthInfo().getPermissions,
                
                addRoomSidebar : false,
                editRoomSidebar: false,
                viewRoomSidebar: false
    
            }
        },
        methods:{

            async fetchData(page){
                this.loading = true
                await this.roomStore.fetchRooms(page)
                this.loading = false
            },
           async changePage(page){
                this.loading = true
                await this.roomStore.change_page(page)
                this.loading = false
            },

            openEditSidebar(id){ 
                this.editRoomSidebar = true
                this.edit_room_id = id
            },
            openViewSidebar(id){
                this.view_room_id = id
                this.viewRoomSidebar = true
            }
        },

        mounted(){
            this.fetchData(1)
        }

    }
    </script>
    <template>
        <div class="page-view">
            <div class="page-top-nav">
                <h4 class="blue-txt">Rooms</h4>
                <a @click="this.addRoomSidebar = true" class="btn btn-primary btn-sm ms-auto" > 
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
                                <tr v-for="room in roomStore.getRooms" :key="room.id">
                                    <td class="text-right">{{room.room_no}}</td>
                                    <td class="text-right">{{room.room_name}}</td>
                                    <td class="text-right">{{room.building_name}}</td>
                                    <td class="text-right">
        
                                        <a class="action_btn action_edit_btn" 
                                        title="edit" @click='openEditSidebar(room.id)'
                                        v-if="userPermissions.includes('room_update')"
                                        >
                                            &#9998;
                                        </a>
        
                                        <a class="action_btn action_view_btn" 
                                        title="view" @click='openViewSidebar(room.id)'
                                        v-if="userPermissions.includes('room_view')"
                                        >
                                             &#128065;
                                        </a>
        
                                        <span class="action_btn action_delete_btn" title="delete" 
                                        v-if="userPermissions.includes('room_delete')"
                                        @click="roomStore.deleteRoom(room.id)">
                                            &#9746;
                                        </span>
        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div> 
    
                        <pagination  
                            :total_pages='roomStore.total_pages' 
                            @pageChange='changePage' 
                            :current_page="roomStore.current_page"
                         />
    
                    </div>
                </div>     
            </div>
            <div class="side_component_container">
                
                
                <addRoom
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
                />
            </div>
        </div>
    
    </template>
    
