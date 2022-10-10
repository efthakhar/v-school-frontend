<script setup>
import { useAuthInfo } from '../../../../stores/authinfo';

import { computed, onMounted, ref } from '@vue/runtime-core';    
import { useBuildingStore } from '../store';


import pagination from '../../../../components/shared/pagination.vue';
import loader from '../../../../components/shared/loader.vue';

import AddBuilding from '../components/add-building.vue';
import EditBuilding from '../components/edit-building.vue';
import ViewBuilding from '../components/view-building.vue';


const userPermissions  = useAuthInfo().getPermissions

const buildingStore = useBuildingStore()

const buildings = computed(()=> buildingStore.buildings) 

const editBuildingSidebar = ref(false)
const addBuildingSidebar = ref(false)
const viewBuildingSidebar = ref(false)

const loading = ref(false)

async function fetchData(page){

    try{
        loading.value =  true
        await buildingStore.fetchBuildings(page)
        loading.value = false
    }catch(errors){  
        console.log('error occured')
        loading.value = false
    }
    
}
async function deleteData(id){

try{
    
    loading.value =  true
    await buildingStore.deleteBuilding(id)
    loading.value = false
    
}catch(errors){  
    console.log('error occured')
    loading.value = false
}

}
onMounted(()=>{
    fetchData(1)
})

function openEditBuildingSidebar(id){
    buildingStore.edit_building_id = id
    editBuildingSidebar.value = true
}
function openViewBuildingSidebar(id){
    buildingStore.view_building_id = id
    viewBuildingSidebar.value = true
}


</script>
    
<template>
<div class="page-view">
    <div class="page-top-nav">
        <h4 class="blue-txt">All Building</h4>
        <a class="btn btn-primary btn-sm ms-auto" @click="addBuildingSidebar=true" >
            Add Building
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
                            <th class="text-right">location</th>
                            <th class="text-right">action</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="building in buildings" :key="building.id">
                            <td class="text-right">{{building.building_name}}</td>
                            <td class="text-right">{{building.building_location}}</td>
                            <td class="text-right">

                                <a class="action_btn action_edit_btn" title="edit" 
                                    v-if="userPermissions.includes('building_update')"
                                    @click="openEditBuildingSidebar(building.id)"
                                >
                                    &#9998;
                                </a>
                                
                                <a class="action_btn action_view_btn" 
                                    title="view" 
                                    v-if="userPermissions.includes('class_view')"
                                    @click="openViewBuildingSidebar(building.id)"
                                >          
                                        &#128065;
                                </a>

                                <span class="action_btn action_delete_btn" title="delete" 
                                    v-if="userPermissions.includes('building_delete')"
                                    @click="deleteData(building.id)"
                                >
                                    &#9746;
                                </span> 

                            </td>
                        </tr>
                    </tbody>
                </table>
                <pagination  
                    v-if="buildingStore.buildings.length>0"
                    :total_pages=buildingStore.total_pages 
                    @pageChange='fetchData' 
                    :current_page=buildingStore.current_page
                />
                </div> 
            </div>

        </div>
    </div>

    
        <div class="side_component_container" 
            v-if=" addBuildingSidebar==true || editBuildingSidebar==true || viewBuildingSidebar == true"
        >
            <AddBuilding 
                v-if="addBuildingSidebar"
                @close="addBuildingSidebar=false" 
                @refreshData='fetchData(1)' 
            />      
            <EditBuilding
                v-if="editBuildingSidebar" 
                :building_id="buildingStore.edit_building_id"
                @refreshData='fetchData(buildingStore.current_page)' 
                @close="editBuildingSidebar=false" 
            />
            <ViewBuilding
                v-if="viewBuildingSidebar" 
                :building_id="buildingStore.view_building_id"
                @close="viewBuildingSidebar=false" 
            />  
        </div>
    

</div>           
       
</template>