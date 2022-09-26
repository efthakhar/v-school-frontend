<script>
import axios from 'axios'     
export default{
        data(){
            return{
                session_data:{
                    id: '',
                    session_name:'',
                    session_code:'',
                    start_date:'',
                    end_date: '',
                    session_description:'',
                    active_status: false,
                    session_description: ''
                }
            }    
        },
        methods:{
           async getSession(id){
               await axios.get(`${this.api_url}/api/sessions/${id}`)
                .then((response) => {
                   this.session_data = response.data
                })
           },
           editSession(id){

                axios.put(`${this.api_url}/api/sessions/${id}`, this.session_data)
                    .then((response) => {
                        this.$router.push({name:'sessions'})
                    //    this.$router.push({name:'edit-session', params: { id: this.session_data.id } })
                    })
           }
        },
        mounted(){
            this.session_data.id = this.$route.params.id
            this.getSession(this.session_data.id)     
        }
}
       
    </script>
    
    <template>
    <div class="page-view">
        <div class="page-top-nav">
            <h4 class="blue-txt">Edit Session</h4>
        </div>
        <div class="page-main-content">
             <form action="" class="row mb-2">
    
                <div class="form_item col-md-5">
                    <label class="my-2">session name</label>
                    <input type="text" class="form-control" v-model="session_data.session_name">
                </div>
                <div class="form_item col-md-5">
                    <label class="my-2">session code</label>
                    <input type="text" class="form-control" v-model="session_data.session_code">
                </div>
                <div class="form_item col-md-5">
                    <label class="my-2">From</label>
                    <input type="date" class="form-control" v-model="session_data.start_date">
                </div>
                <div class="form_item col-md-5">
                    <label class="my-2">To</label>
                    <input type="date" class="form-control" v-model="session_data.end_date">
                </div>
              
                <div class="form_item col-md-5 check_box_container">
                    <input class="" type="checkbox" :checked="session_data.active_status" 
                    v-on:change="session_data.active_status=!session_data.active_status"
                    id="flexCheckDefault"> 
                    <label class="form-check-label" for="flexCheckDefault" >
                       is Active ?
                    </label>
                </div>
    
                <div class="form_item col-md-10">
                    <label class="my-2">Description</label>
                    <textarea v-model="session_data.session_description" class="form-control"></textarea>
                </div>
    
                <div class="form_item col-md-10">
                    <a class="btn btn-primary my-3" @click="editSession(this.session_data.id)">update session data</a>
                </div>
                
    
                
             </form>
        </div>
    </div>    
        
    </template>