<script>
import axios from 'axios' 
 export default{

    data(){
        return{
            sessions:[]
        }
    },
    methods:{
        getSessions(){
            axios.get(`${this.api_url}/api/sessions`)
            .then((response) => {
               this.sessions = response.data
            })
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
        <a class="btn btn-primary btn-sm ms-auto">add session</a>
    </div>
    <div class="page-main-content">
         
        <div class="table_container">

            <div class="col-lg-8 col-md-10 ml-auto mr-auto">
                <div class="table-responsive">
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
                                <span class="action_btn action_edit_btn" title="edit">&#9998;</span>
                                <span class="action_btn action_delete_btn" title="delete">&#9746;</span>
                                <span class="action_btn action_view_btn" title="view">&#9906;</span>
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