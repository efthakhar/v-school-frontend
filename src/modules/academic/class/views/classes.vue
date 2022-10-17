<script setup>
import { useAuthInfo } from '../../../../stores/authinfo';
import {useConfirmStore} from '../../../../stores/confirm'
import { computed, onMounted, ref } from '@vue/runtime-core';    
import { useClassStore } from '../store';
import {useSessionStore} from '../../session/store'

import AddClass from '../../../../modules/academic/class/components/add-class.vue';
import EditClass from '../../../../modules/academic/class/components/edit-class.vue';
import ViewClass from '../../../../modules/academic/class/components/view-class.vue';
import pagination from '../../../../components/shared/pagination.vue';
import loader from '../../../../components/shared/loader.vue';

const confirmStore = useConfirmStore()
const userPermissions  = useAuthInfo().getPermissions

const classStore = useClassStore()
const sessionStore = useSessionStore()

const classes = computed(()=> classStore.classes) 

let filterSessionId = ref('')

const editClassSidebar = ref(false)
const addClassSidebar = ref(false)
const viewClassSidebar = ref(false)

const loading = ref(false)

async function fetchData(page){

    try{
        loading.value =  true
        await classStore.fetchClasses(page,classStore.filter_session_id)
        loading.value = false
    }catch(errors){  
        console.log('error occured')
        loading.value = false
    }
    
}
async function deleteData(id){

   await confirmStore.show_box()
   .then(async () =>confirmStore.do_action==true?
   classStore.deleteClass(id):'') 
}
onMounted(()=>{
    sessionStore.fetchSessionsList()
    fetchData(1)
})

async function onSessionChange(){
    loading.value =  true
    await classStore.fetchClasses(1,classStore.filter_session_id)
    loading.value =  false
}

function openEditClassSidebar(id){
    classStore.edit_class_id = id
    editClassSidebar.value = true
}
function openViewClassSidebar(id){
    classStore.view_class_id = id
    viewClassSidebar.value = true
}


</script>
    
<template>
        
        <div class="page-view">
            <div class="page-top-nav">
                <h4 class="blue-txt">All Classes</h4>
                <a class="btn btn-primary btn-sm ms-auto" @click="addClassSidebar=true" >
                    add class
                </a> 
            </div>
            <div class="filterbar">
                <div class="filterbar_item">
                    <select class="form-select form-select-sm inline"
                     v-model="classStore.filter_session_id"
                     v-on:change="onSessionChange"
                     >
                        <option value="" selected>select session</option>
                        <option :value="session.id" :key="session.id"
                        v-for="session in sessionStore.sessions_list"
                        >{{session.session_name}}
                        </option>
                    </select>
                </div>
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
        
                                        <a class="action_btn action_edit_btn" title="edit" 
                                           v-if="userPermissions.includes('class_update')"
                                           @click="openEditClassSidebar(class_item.id)"
                                        >
                                            &#9998;
                                        </a>
                                        
                                        <a class="action_btn action_view_btn" 
                                           title="view" 
                                           v-if="userPermissions.includes('class_view')"
                                           @click="openViewClassSidebar(class_item.id)"
                                        >          
                                             &#128065;
                                        </a>
        
                                        <span class="action_btn action_delete_btn" title="delete" 
                                            v-if="userPermissions.includes('class_delete')"
                                            @click="deleteData(class_item.id)"
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
                        @refreshData='fetchData(1,classStore.filter_session_id)' 
                    />      
                    <EditClass
                        v-if="editClassSidebar" 
                        :class_id="classStore.edit_class_id"
                        @refreshData='fetchData(classStore.current_page)' 
                        @close="editClassSidebar=false" 
                    />
                    <ViewClass
                        v-if="viewClassSidebar" 
                        :class_id="classStore.view_class_id"
                        @close="viewClassSidebar=false" 
                    />  
                </div>
            
    
        </div>    
</template>