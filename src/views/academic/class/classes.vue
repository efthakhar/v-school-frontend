<script>
import axios from 'axios'
import { useAuthInfo } from '@/stores/authinfo.js' 

export default{
    data(){
        return{
            classes:[],
            userPermissions: useAuthInfo().getPermissions,
            current_page:1,
            last_page:null,
            pages:[]

        }
    },
    methods:{

        async getClasses(current_page){  

             await  axios.get(`${this.api_url}/api/classes?page=${current_page}`)
            .then((response) => {
                //console.log(response.data.data)
                this.classes = response.data.data
                this.pages= response.data.last_page
                this.last_page = response.data.last_page
            })
        },

        change_page(page_no){
            this.current_page = page_no
            this.getClasses(this.current_page)
        },

        async deleteClass(id){
            await axios.delete(`${this.api_url}/api/classes/${id}`)
            .then((response) => console.log(response.data))
            this.getClasses()
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
        <div class="page-main-content">
             
            <div class="table_container">
    
                <div class="col-lg-8 col-md-10 ml-auto mr-auto">
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
                </div>
    
            </div>

            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item" @click="change_page(current_page-1)" v-if="current_page!=1">
                        <button class="page-link" >Prev </button>
                    </li>  
                    <li class="page-item" :class="current_page==page?'active':''"
                    v-for="page in pages" :key="page" @click="change_page(page)">
                        <button class="page-link" >
                             {{page}}
                        </button>
                    </li>
                    <li class="page-item" @click="change_page(current_page+1)" v-if="current_page!=last_page" >
                        <button class="page-link" >Next </button>
                    </li> 
                </ul>
            </nav>
               
        </div>
    </div>    
</template>

<style>


</style>