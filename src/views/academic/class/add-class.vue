<script>
import axios from 'axios'     
export default{

    data(){
        return{
            sessions  :[],

            class_data :{
                class_name:'',
                session_id:'',     
               },

            class_name_error : '',
            session_name_error: '', 
        }    
    },

    methods:{

        addClass(){
            axios.post(`${this.api_url}/api/classes`, this.class_data)
                .then((response) => {
                    this.$router.push({name:'classes'})
                }).catch((error) =>{
                    this.class_name_error =  error.response.data.errors.class_name
                    this.session_name_error = error.response.data.errors.session_id
                })
        },

        async getSessions(){   
          await  axios.get(`${this.api_url}/api/sessions`)
            .then((response) => {
               this.sessions = response.data
            })
        },


    },

    mounted(){
        this.getSessions();
    }
}
       
</script>
<template>
    <div class="page-view">
       
        <div class="page-top-nav">
            <h4 class="blue-txt">Add new class</h4>
        </div>
        <div class="page-main-content">
             <form action="" class="row mb-2">
    
                <div class="form_item col-md-5">
                    <label class="my-2">class name</label>
                    <p class="error_txt" v-if="class_name_error">{{class_name_error}}</p>
                    <input type="text" class="form-control" v-model="class_data.class_name">
                </div>
                
                <div class="form_item col-md-5">
                    <label class="my-2">session</label>
                    <p class="error_txt" v-if="session_name_error">{{session_name_error}}</p>
                    <select v-model="class_data.session_id" class="form-control">
                        <option selected disabled value="">select session</option>
                        <option :value="session.id" v-for="session in sessions" :key="session.id">
                            {{session.session_name}}
                        </option>
                    </select>
                   
                </div>
                <div class="form_item col-md-10">
                    <a class="btn btn-primary my-3" @click="addClass">Submit class data</a>
                </div>
                
    
                
             </form>
        </div>
    </div>    
        
</template>