<script setup>
import { useAuthInfo } from '../../../../stores/authinfo';
import { computed, onMounted, onUnmounted, ref } from '@vue/runtime-core';    
import {useClass} from '../../class/composable/useClass'


import {useSectionStore} from '../store'
import {useSessionStore} from '../../session/store'
import {useConfirmStore} from '../../../../stores/confirm'

import AddSectionSidebar from '../../../../modules/academic/section/components/add-section.vue';
import EditSectionSIdebar from '../../../../modules/academic/section/components/edit-section.vue';
import ViewSectionSidebar from '../../../../modules/academic/section/components/view-section.vue';

import pagination from '../../../../components/shared/pagination.vue';
import loader from '../../../../components/shared/loader.vue';

const userPermissions  = useAuthInfo().getPermissions

const confirmStore = useConfirmStore()
const sectionStore = useSectionStore()
const sessionStore = useSessionStore()


const {classes, getClasses}   = useClass()
 

const editSectionSidebar = ref(false)
const addSectionSidebar = ref(false)
const viewSectionSidebar = ref(false)

const loading = ref(false)

async function fetchData(page='',session_id='',class_id=''){

    try{
        loading.value =  true
        await sectionStore.fetchSections(page,session_id,class_id)
        loading.value = false
    }catch(errors){  
        console.log('error occured')
        loading.value = false
    }
    
}

async function onSessionChange(){
        loading.value = true
        sectionStore.filterClassId = ''
        await getClasses('',sectionStore.filterSessionId)
        await sectionStore.fetchSections(1,sectionStore.filterSessionId)
        loading.value = false
}

async function onClassChange(){
        loading.value = true
        await sectionStore.fetchSections(1,sectionStore.filterSessionId,sectionStore.filterClassId)
        loading.value = false
}

function deleteData(id){
   
   confirmStore.show_box()
   .then((res)=> confirmStore.do_action==true ? 
   sectionStore.deleteSection(id) : '' )
   
}

onMounted(()=>{
    fetchData(1)
    sessionStore.fetchSessionsList()
})

onUnmounted(()=>{
    sectionStore.filterClassId = ''
    sectionStore.filterSessionId = ''
})
function openEditSectionSidebar(id){
    sectionStore.edit_section_id = id
    editSectionSidebar.value = true
}
function openViewClassSidebar(id){
    sectionStore.view_section_id = id
    viewSectionSidebar.value = true
}

function openAddSectionSidebar(){
    addSectionSidebar.value=true
    sectionStore.addMode = true
}
</script>
    
<template>
        
        <div class="page-view">
            <div class="page-top-nav">
                <h4 class="blue-txt">All Sections</h4>
                <a class="btn btn-primary btn-sm ms-auto" @click="openAddSectionSidebar" >
                    add new section
                </a> 
            </div>
            
            <!-- filter bar -->
            <div class="filterbar">
                <div class="filterbar_item">
                    <select class="form-select form-select-sm inline"
                     v-model="sectionStore.filterSessionId"
                     v-on:change="onSessionChange"
                     >
                        <option value="" selected>select session</option>
                        <option :value="session.id" :key="session.id"
                        v-for="session in sessionStore.sessions_list"
                        >{{session.session_name}}
                        </option>
                    </select>
                </div>
                <div class="filterbar_item"  >
                    <select class=" form-select form-select-sm inline"
                        :disabled="!sectionStore.filterSessionId"
                        v-model="sectionStore.filterClassId"
                        v-on:change="onClassChange"
                    >
                        <option value="" selected>select class</option>
                        <option :value="class_item.id" :key="class_item.id"
                        v-for="class_item in classes"
                        >{{class_item.class_name}}
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
                                    <th class="text-right">section name</th>
                                    <th class="text-right">class name</th>
                                    <th class="text-right">session name</th>
                                    <!-- <th class="text-right">building</th>
                                    <th class="text-right">room</th> -->
                                    <th class="text-right">action</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="section in sectionStore.sections" :key="section.id">
                                    <td class="text-right">{{section.section_name}}</td>
                                    <td class="text-right">{{section.class_name}}</td>
                                    <td class="text-right">{{section.session_name}}</td>
                                    <!-- <td class="text-right">{{section.building_name}}</td>
                                    <td class="text-right">{{section.room_no}}</td> -->
                                    <td class="text-right">
        
                                        <a class="action_btn action_edit_btn" title="edit" 
                                           v-if="userPermissions.includes('class_update')"
                                           @click="openEditSectionSidebar(section.id)"
                                        >
                                            &#9998;
                                        </a>
                                        
                                        <a class="action_btn action_view_btn" 
                                           title="view" 
                                           v-if="userPermissions.includes('section_view')"
                                           @click="openViewClassSidebar(section.id)"
                                        >          
                                             &#128065;
                                        </a>
        
                                        <span class="action_btn action_delete_btn" title="delete" 
                                            v-if="userPermissions.includes('section_delete')"
                                            @click="deleteData(section.id)"
                                        >
                                            &#9746;
                                        </span> 
        
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h4 class="my-4 error_txt" 
                            v-if="sectionStore.sections.length<=0"
                        >
                            Opps! no result found
                        </h4>
                        <pagination  
                            v-if="sectionStore.sections.length>0"
                            :total_pages=sectionStore.total_pages 
                            @pageChange='fetchData' 
                            :current_page=sectionStore.current_page
                        />

                        </div> 
                    </div>
        
                </div>
            </div>
       
            <div class="side_component_container" 
                    v-if=" addSectionSidebar==true || editSectionSidebar==true || viewSectionSidebar == true"
            >
                    <AddSectionSidebar 
                        v-if="addSectionSidebar"
                        @close="addSectionSidebar=false" 
                        @refreshData='fetchData(1,sectionStore.filterSessionId,sectionStore.filterClassId)' 
                    />      
                    <EditSectionSIdebar
                        v-if="editSectionSidebar" 
                        :section_id="sectionStore.edit_section_id"
                        @refreshData='fetchData(1,sectionStore.filterSessionId,sectionStore.filterClassId)' 
                        @close="editSectionSidebar=false" 
                    />
                    <ViewSectionSidebar
                        v-if="viewSectionSidebar" 
                        :section_id="sectionStore.view_section_id"
                        @close="viewSectionSidebar=false" 
                    />  
            </div>
            
    
        </div>    
</template>
<style>

</style>