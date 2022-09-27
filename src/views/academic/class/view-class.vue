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

       
        async getClass(id){   
          await  axios.get(`${this.api_url}/api/classes/${id}`)
            .then((response) => {
               this.class_data = response.data
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
        this.getClass(this.$route.params.id);
    }
}
       
</script>
<template>
    <div class="page-view">
       
        <div class="page-top-nav">
            <h4 class="blue-txt">class details</h4>
        </div>
        <div class="page-main-content">
             <form action="" class="row mb-2">
    
                <div class="form_item col-md-5">
                    <label class="my-2">class name</label>
                    <p class="error_txt" v-if="class_name_error">{{class_name_error}}</p>
                    <input disabled type="text" class="form-control" v-model="class_data.class_name">
                </div>
                <div class="form_item col-md-5">
                    <label class="my-2">session</label>
                    <p class="error_txt" v-if="session_name_error">{{session_name_error}}</p>
                    <select disabled v-model="class_data.session_id" class="form-control">
                        <option selected disabled value="">select session</option>
                        <option :value="session.id" v-for="session in sessions" :key="session.id">
                            {{session.session_name}}
                        </option>
                    </select>
                   
                </div>
             </form>
        </div>
    </div>    
        
</template>
