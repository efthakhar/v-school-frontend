<script setup>
import { useAuthInfo } from '../../../../stores/authinfo';
import { onMounted, ref } from '@vue/runtime-core';
import { useSessionStore } from '../store';
import pagination from '../../../../components/shared/pagination.vue';
import loader from '../../../../components/shared/loader.vue';
import AddSession from '../../../../modules/academic/session/components/add-session.vue';
import EditSession from '../../../../modules/academic/session/components/edit-session.vue';
import ViewSession from '../../../../modules/academic/session/components/view-session.vue';



const loading = ref(false)

const editSessionSidebar = ref(false)
const addSessionSidebar = ref(false)
const viewSessionSidebar = ref(false)

const sessionStore = useSessionStore()

const userPermissions  = useAuthInfo().getPermissions

async function fetchData(page){
    try{
        loading.value =  true
        await sessionStore.fetchSessions(page)
        loading.value = false
    }catch(errors){
        
        console.log('database error occured')
        loading.value = false
    }
    
}

function openEditSessionSidebar(id){
    sessionStore.edit_session_id = id
    editSessionSidebar.value = true
}
function openViewSessionSidebar(id){
    sessionStore.view_session_id = id
    viewSessionSidebar.value = true
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
                            <tr v-for="session in sessionStore.sessions" :key="session.id">
                                <td class="text-right">{{session.session_name}}</td>
                                <td class="text-right">{{session.session_code}}</td>
                                <td class="text-right">{{session.start_date}}</td>
                                <td class="text-right">{{session.end_date}}</td>
                                <td class="text-right">
                                    <input type="checkbox" :checked="session.active_status" disabled>
                                </td>
                                <td class="text-right">
    
                                    <a class="action_btn action_edit_btn" title="edit" 
                                       v-if="userPermissions.includes('session_update')"
                                       @click="openEditSessionSidebar(session.id)"

                                    >
                                        &#9998;
                                    </a>
                                    
                                    <a class="action_btn action_view_btn" 
                                       title="view" 
                                       v-if="userPermissions.includes('session_view')"
                                       @click="openViewSessionSidebar(session.id)"
                                    >          
                                         &#128065;
                                    </a>
    
                                  
                                    <span class="action_btn action_delete_btn" title="delete" 
                                        v-if="userPermissions.includes('session_delete')"
                                        @click="sessionStore.deleteSession(session.id)"
                                    >
                                        &#9746;
                                    </span> 
    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <pagination  
                            v-if="sessionStore.sessions.length>0"
                            :total_pages=sessionStore.total_pages 
                            @pageChange='fetchData' 
                            :current_page=sessionStore.current_page
                    />
                    </div> 
                </div>
    
            </div>
        </div>

       
            <div class="side_component_container" 
                v-if=" addSessionSidebar==true || editSessionSidebar==true || viewSessionSidebar == true"
            >
                <AddSession 
                    v-if="addSessionSidebar==true"
                    @close="addSessionSidebar=false" 
                    @refreshData='fetchData(1)' 
                />      
                <EditSession
                    v-if="editSessionSidebar" 
                    :session_id="sessionStore.edit_session_id"
                    @refreshData='fetchData(sessionStore.current_page)' 
                    @close="editSessionSidebar=false" 
                />
                <ViewSession
                    v-if="viewSessionSidebar" 
                    :session_id="sessionStore.view_session_id"
                    @close="viewSessionSidebar=false" 
                />  
            </div>
        

    </div>    
</template>
