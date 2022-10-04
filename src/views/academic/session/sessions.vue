<script>
import axios from 'axios'
import { useAuthInfo } from '@/stores/authinfo.js' 
import loader from '../../../components/shared/loader.vue'
 export default{
    components: {loader},
    data(){
        return{

            sessions:[],
            userPermissions: useAuthInfo().getPermissions,
            loading: false
        }
    },
    
    methods:{

       async getSessions(){ 
          this.loading = true  
          await  axios.get(`${this.api_url}/api/sessions`)
            .then((response) => {
               this.sessions = response.data
               this.loading = false
            })
        },

       async deleteSession(id){
           await axios.delete(`${this.api_url}/api/sessions/${id}`)
            .then((response) => console.log(response.data))
            this.getSessions()
        }

    },
    mounted(){
        this.getSessions()
    }

 }   
</script>

<template>
<div class="page-view">
    <div class="page-top-nav">
        <h4 class="blue-txt">All Sessions</h4>
        <router-link :to="{ name: 'add-session' }" class="btn btn-primary btn-sm ms-auto" > 
            add session 
        </router-link>
    </div>
    <div class="page-main-content">
         
        <div class="table_container" >
            
            <div class="col-lg-8 col-md-10 ml-auto mr-auto" >
                <loader v-if="loading"/>
                <div class="table-responsive" v-if="loading==false">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="text-right">name</th>
                            <th class="text-right">code</th>
                            <th class="text-right">start date</th>
                            <th class="text-right">end date</th>
                            <th class="text-right">active status</th>
                            <th class="text-right">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="session in sessions" :key="session.id">
                            <td class="text-right">{{session.session_name}}</td>
                            <td class="text-right">{{session.session_code}}</td>
                            <td class="text-right">{{session.start_date}}</td>
                            <td class="text-right">{{session.end_date}}</td>
                            <td class="text-right">
                                <input type="checkbox" :checked="session.active_status" disabled>
                            </td>
                            <td class="text-right">

                                <router-link class="action_btn action_edit_btn" 
                                title="edit" :to="{ name: 'edit-session', params:{id:session.id} }"
                                v-if="userPermissions.includes('session_update')"
                                >
                                    &#9998;
                                </router-link>

                                <router-link class="action_btn action_view_btn" 
                                title="view" :to="{ name: 'view-session', params:{id:session.id} }">
                                    <!-- &#9906; -->
                                     &#128065;
                                </router-link>

                                <!-- <span class="action_btn action_view_btn" title="view">&#9906;</span> -->
                                <span class="action_btn action_delete_btn" title="delete" 
                                v-if="userPermissions.includes('session_delete')"
                                @click="deleteSession(session.id)">
                                    &#9746;
                                </span>

                            </td>
                        </tr>
                    </tbody>
                </table>
                </div> 
            </div>

        </div>
    </div>
</div>    
</template>