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
            <h4 class="blue-txt">View Session details</h4>
        </div>
        <div class="page-main-content">
                <form action="" class="row mb-2">
    
                <div class="form_item col-md-5">
                    <label class="my-2">session name</label>
                    <input type="text" class="form-control" v-model="session_data.session_name" disabled>
                </div>
                <div class="form_item col-md-5">
                    <label class="my-2">session code</label>
                    <input type="text" class="form-control" v-model="session_data.session_code" disabled> 
                </div>
                <div class="form_item col-md-5">
                    <label class="my-2">From</label>
                    <input type="date" class="form-control" v-model="session_data.start_date" disabled>
                </div>
                <div class="form_item col-md-5">
                    <label class="my-2">To</label>
                    <input type="date" class="form-control" v-model="session_data.end_date" disabled>
                </div>
                
                <div class="form_item col-md-5 check_box_container">
                    <input class="" type="checkbox" :checked="session_data.active_status" disabled id="flexCheckDefault"> 
                    <label class="form-check-label" for="flexCheckDefault" >
                        is Active ?
                    </label>
                </div>
    
                <div class="form_item col-md-10">
                    <label class="my-2">Description</label>
                    <textarea disabled  v-model="session_data.session_description" class="form-control"></textarea>
                </div>
                
                </form>
        </div>
    </div>    
        
    </template>