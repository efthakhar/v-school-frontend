<script setup>
import { useAuthInfo } from '../../../../stores/authinfo';

import { computed, onMounted, ref } from '@vue/runtime-core';    

import {useClassStore } from '../../class/store';
import {useSectionStore} from '../store'
import {useSessionStore} from '../../session/store'
import {useConfirmStore} from '../../../../stores/confirm'

// import AddClass from '../../../../modules/academic/class/components/add-class.vue';
// import EditClass from '../../../../modules/academic/class/components/edit-class.vue';
// import ViewClass from '../../../../modules/academic/class/components/view-class.vue';
import pagination from '../../../../components/shared/pagination.vue';
import loader from '../../../../components/shared/loader.vue';

const userPermissions  = useAuthInfo().getPermissions

 const confirmStore = useConfirmStore()
const classStore   = useClassStore()
const sectionStore = useSectionStore()
const sessionStore = useSessionStore()

const classes  = computed(() =>  classStore.classes) 
const classes_list  = computed(() =>  classStore.classes_list) 
const sections = computed(() =>  sectionStore.sections) 
const sessions_list= computed(() =>  sessionStore.sessions_list) 

const editSectionSidebar = ref(false)
const addSectionSidebar = ref(false)
const viewSectionSidebar = ref(false)

const loading = ref(false)

async function fetchData(page){

    try{
        loading.value =  true
        await sectionStore.fetchSections(page)
        loading.value = false
    }catch(errors){  
        console.log('error occured')
        loading.value = false
    }
    
}

async function onSessionChange(){
        loading.value = true
        sectionStore.filterClassId = ''
        await classStore.fetchClassesList(sectionStore.filterSessionId)
        await sectionStore.fetchSections(1,sectionStore.filterSessionId)
        loading.value = false
}

async function onClassChange(){
        loading.value = true
        await  sectionStore.fetchSections(1,sectionStore.filterSessionId,sectionStore.filterClassId)
        loading.value = false
}


async function deleteData(id){
    
    try{
        loading.value =  true
        await sectionStore.deleteSection(id)
        loading.value = false
    }catch(errors){  
        console.log('error occured')
        loading.value = false
    }

}

onMounted(()=>{
    fetchData(1)
    sessionStore.fetchSessionsList()
})

// function openEditClassSidebar(id){
//     classStore.edit_class_id = id
//     editClassSidebar.value = true
// }
// function openViewClassSidebar(id){
//     classStore.view_class_id = id
//     viewClassSidebar.value = true
// }


</script>
    
<template>
        
        <div class="page-view">
            <div class="page-top-nav">
                <h4 class="blue-txt">All Sections</h4>
                <a class="btn btn-primary btn-sm ms-auto" @click="addSectionSidebar=true" >
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
                        v-for="class_item in classStore.classes_list"
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
                                    <th class="text-right">building</th>
                                    <th class="text-right">room</th>
                                    <th class="text-right">action</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="section in sections" :key="section.id">
                                    <td class="text-right">{{section.section_name}}</td>
                                    <td class="text-right">{{section.class_name}}</td>
                                    <td class="text-right">{{section.session_name}}</td>
                                    <td class="text-right">{{section.building_name}}</td>
                                    <td class="text-right">{{section.room_no}}</td>
                                    <td class="text-right">
        
                                        <!-- <a class="action_btn action_edit_btn" title="edit" 
                                           v-if="userPermissions.includes('class_update')"
                                           @click="openEditClassSidebar(class_item.id)"
                                        >
                                            &#9998;
                                        </a> -->
                                        
                                        <!-- <a class="action_btn action_view_btn" 
                                           title="view" 
                                           v-if="userPermissions.includes('class_view')"
                                           @click="openViewClassSidebar(class_item.id)"
                                        >          
                                             &#128065;
                                        </a> -->
        
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
                        <h4 class="my-4 error_txt" v-if="!sections.length>0">Opps! no result found</h4>
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
                    <!-- <AddClass 
                        v-if="addClassSidebar"
                        @close="addClassSidebar=false" 
                        @refreshData='fetchData(1)' 
                    />       -->
                    <!-- <EditClass
                        v-if="editClassSidebar" 
                        :class_id="classStore.edit_class_id"
                        @refreshData='fetchData(classStore.current_page)' 
                        @close="editClassSidebar=false" 
                    /> -->
                    <!-- <ViewClass
                        v-if="viewClassSidebar" 
                        :class_id="classStore.view_class_id"
                        @close="viewClassSidebar=false" 
                    />   -->
            </div>
            
    
        </div>    
</template>
<style>

</style>