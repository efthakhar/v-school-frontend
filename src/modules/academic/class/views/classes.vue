<script setup>
import { useAuthInfo } from '../../../../stores/authinfo';

import { computed, onMounted, ref } from '@vue/runtime-core';    
import { useClassStore } from '../store';

import AddClass from '../../../../modules/academic/class/components/add-class.vue';
import EditClass from '../../../../modules/academic/class/components/edit-class.vue';
import ViewClass from '../../../../modules/academic/class/components/view-class.vue';
import pagination from '../../../../components/shared/pagination.vue';
import loader from '../../../../components/shared/loader.vue';

const userPermissions  = useAuthInfo().getPermissions
const classStore = useClassStore()


const classes = computed(()=> classStore.classes) 
const editClassSidebar = ref(false)
const addClassSidebar = ref(false)
const viewClassSidebar = ref(false)
const loading = ref(false)

async function fetchData(page){

    try{
        loading.value =  true
        await classStore.fetchClasses(page)
        loading.value = false
    }catch(errors){  
        console.log('error occured')
        loading.value = false
    }
    
}

onMounted(()=>{
    fetchData(1)
})

</script>
    
<template>
        
        <div class="page-view">
            <div class="page-top-nav">
                <h4 class="blue-txt">All Classes</h4>
                <a class="btn btn-primary btn-sm ms-auto" @click="addClassSidebar=true" >
                    add class
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
                                    <th class="text-right">class name</th>
                                    <th class="text-right">session name</th>
                                    <th class="text-right">action</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="class_item in classes" :key="class_item.id">
                                    <td class="text-right">{{class_item.class_name}}</td>
                                    <td class="text-right">{{class_item.session_name}}</td>
                                    <td class="text-right">
        
                                        <!-- <a class="action_btn action_edit_btn" title="edit" 
                                           v-if="userPermissions.includes('session_update')"
                                           @click="openEditSessionSidebar(session.id)"
    
                                        >
                                            &#9998;
                                        </a> -->
                                        
                                        <!-- <a class="action_btn action_view_btn" 
                                           title="view" 
                                           v-if="userPermissions.includes('session_view')"
                                           @click="openViewSessionSidebar(session.id)"
                                        >          
                                             &#128065;
                                        </a> -->
        
                                        <span class="action_btn action_delete_btn" title="delete" 
                                            v-if="userPermissions.includes('class_delete')"
                                            @click="classStore.deleteClass(class_item.id)"
                                        >
                                            &#9746;
                                        </span> 
        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination  
                                v-if="classStore.classes.length>0"
                                :total_pages=classStore.total_pages 
                                @pageChange='fetchData' 
                                :current_page=classStore.current_page
                        />
                        </div> 
                    </div>
        
                </div>
            </div>
    
           
                <div class="side_component_container" 
                    v-if=" addClassSidebar==true || editClassSidebar==true || viewClassSidebar == true"
                >
                    <AddClass 
                        v-if="addClassSidebar"
                        @close="addClassSidebar=false" 
                        @refreshData='fetchData(1)' 
                    />      
                    <!-- <EditSession
                        v-if="editSessionSidebar" 
                        :session_id="sessionStore.edit_session_id"
                        @refreshData='fetchData(sessionStore.current_page)' 
                        @close="editSessionSidebar=false" 
                    /> -->
                    <!-- <ViewSession
                        v-if="viewSessionSidebar" 
                        :session_id="sessionStore.view_session_id"
                        @close="viewSessionSidebar=false" 
                    />   -->
                </div>
            
    
        </div>    
</template>