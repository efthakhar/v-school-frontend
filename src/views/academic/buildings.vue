<script>
import axios from 'axios'
import { useAuthInfo } from '@/stores/authinfo.js' 

import loader from '../../components/loader.vue'
import pagination from '../../components/pagination.vue'

import addBuilding from '../../components/academic/building/add-building.vue'
import editBuilding from '../../components/academic/building/edit-building.vue'
import viewBuilding from '../../components/academic/building/view-building.vue'


export default{
    components:{ loader, pagination, addBuilding,editBuilding, viewBuilding},
    data(){
        return{
            loading:false,

            current_page:1,
            total_pages:0,

            userPermissions: useAuthInfo().getPermissions,
            buildings:[],
            edit_building_id: null,
            view_building_id: null,

            addBuildingSidebar : false,
            editBuildingSidebar: false,
            viewBuildingSidebar: false

        }
    },
    methods:{
       async getBuildings(page){
             this.current_page = page
             this.loading = true
             await  axios.get(`${this.api_url}/api/buildings?page=${page}`)
            .then((response) => {
                this.buildings = response.data.data
                this.total_pages= Math.ceil(response.data.total/response.data.per_page)
                this.loading = false
            })
        },

       async change_page(page_no){
            this.current_page = page_no
            this.getBuildings(this.current_page)
        },
        async deleteBuilding(id){
            await axios.delete(`${this.api_url}/api/buildings/${id}`)
            .then((response) => {
                
                if(this.buildings.length==1){
                    this.current_page -=1
                    this.getBuildings(this.current_page)
                }else{
                    this.getBuildings(this.current_page)
                }
            })
            
            
        },
        openEditSidebar(id){
            this.editBuildingSidebar = true
            this.edit_building_id = id
        },
        openViewSidebar(id){
            this.viewBuildingSidebar = true
            this.view_building_id = id
        }
    },
    mounted(){
        this.getBuildings(this.current_page)
    }
}
</script>
<template>
    <div class="page-view">
        <div class="page-top-nav">
            <h4 class="blue-txt">Academic Buildings</h4>
            <a @click="this.addBuildingSidebar = true" class="btn btn-primary btn-sm ms-auto" > 
                add building
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
                                <th class="text-right">name</th>
                                <th class="text-right">location</th>
                                <th class="text-right">action</th>
                            </tr>
                        </thead>             
                        <tbody>
                            <tr v-for="building in buildings" :key="building.id">
                                <td class="text-right">{{building.building_name}}</td>
                                <td class="text-right">{{building.building_location}}</td>
                                <td class="text-right">
    
                                    <a class="action_btn action_edit_btn" 
                                    title="edit" @click='openEditSidebar(building.id)'
                                    v-if="userPermissions.includes('building_update')"
                                    >
                                        &#9998;
                                    </a>
    
                                    <a class="action_btn action_view_btn" 
                                    title="view" @click='openViewSidebar(building.id)'
                                    v-if="userPermissions.includes('building_view')"
                                    >
                                         &#128065;
                                    </a>
    
                                    <span class="action_btn action_delete_btn" title="delete" 
                                    v-if="userPermissions.includes('building_delete')"
                                    @click="deleteBuilding(building.id)">
                                        &#9746;
                                    </span>
    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div> 

                    <pagination  :total_pages='total_pages' 
                     @pageChange='change_page' :current_page="current_page"
                     />

                </div>
            </div>     
        </div>
        <div class="side_component_container">
            
            <addBuilding 
                @refreshData='getBuildings(1)' v-if="addBuildingSidebar"
                @close="addBuildingSidebar=false"
            />
            <editBuilding 
                @refreshData='getBuildings(current_page)' v-if="editBuildingSidebar" :buiding_id="edit_building_id"
                @close="editBuildingSidebar=false" 
            />
            <viewBuilding 
                v-if="viewBuildingSidebar" :buiding_id="view_building_id"
                @close="viewBuildingSidebar=false" 
            />
        </div>
    </div>

</template>

<style>


</style>