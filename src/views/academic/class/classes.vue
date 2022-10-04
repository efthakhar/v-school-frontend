<script>
import axios from 'axios'
import { useAuthInfo } from '@/stores/authinfo.js' 

import loader from '../../../components/shared/loader.vue'
import pagination from '../../../components/shared/pagination.vue'

export default{
    components: {loader,pagination },
    data(){
        return{
            loading:false,
            classes:[],
            userPermissions: useAuthInfo().getPermissions,

            current_page:1,
            total_pages:0,
        }
    },
    methods:{

        async getClasses(current_page){
            

             this.loading = true

             await  axios.get(`${this.api_url}/api/classes?page=${current_page}`)

            .then((response) => {
                this.classes = response.data.data
                this.total_pages= Math.ceil(response.data.total/response.data.per_page)
               // alert(this.total_pages)
                this.loading = false
            })
        },

        change_page(page_no){
            this.current_page = page_no
            this.getClasses(this.current_page)
        },

        async deleteClass(id){
            await axios.delete(`${this.api_url}/api/classes/${id}`)
            .then((response) => {
                
                if(this.classes.length==1){
                    this.current_page -=1
                    this.getClasses(this.current_page)
                }else{
                    this.getClasses(this.current_page)
                }
            })
            
            
        }

    },
    mounted(){
        this.getClasses(this.current_page)
    }
}    
</script>

<template>
    <div class="page-view">
        <div class="page-top-nav">
            <h4 class="blue-txt">Classes</h4>
            <router-link :to="{ name: 'add-class' }" class="btn btn-primary btn-sm ms-auto" > 
                add class 
            </router-link>
        </div>
        <loader v-if='loading'></loader>
        <div class="page-main-content">
            <div class="table_container">
                <div class="col-lg-8 col-md-10 ml-auto mr-auto" v-if="loading==false">

                    <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="text-right">class name</th>
                                <th class="text-right">session name</th>
                                <th class="text-right">action</th>
                            </tr>
                        </thead>             
                        <tbody>
                            <tr v-for="class_item in classes" :key="class_item.id">
                                <td class="text-right">{{class_item.class_name}}</td>
                                <td class="text-right">{{class_item.session_name}}</td>
                                <td class="text-right">
    
                                    <router-link class="action_btn action_edit_btn" 
                                    title="edit" :to="{ name: 'edit-class', params:{id: class_item.id} }"
                                    v-if="userPermissions.includes('class_update')"
                                    >
                                        &#9998;
                                    </router-link>
    
                                    <router-link class="action_btn action_view_btn" 
                                    title="view" :to="{ name: 'view-class', params:{id:class_item.id} }">
                                         &#128065;
                                    </router-link>
    
                                    <span class="action_btn action_delete_btn" title="delete" 
                                    v-if="userPermissions.includes('class_delete')"
                                    @click="deleteClass(class_item.id)">
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
    </div>    
</template>

<style>


</style>