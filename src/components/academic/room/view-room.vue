<script>
    import loader from '../../loader.vue'
    import axios from 'axios'    
    export default{
        props:['room_id'],
        components:{loader},
        data(){
            return{
                loading:false,
                buildings:[],
                room_data:
                {
                   room_no:'', 
                   room_name:'', 
                   building_name:'', 
                },
    
                room_no_error: '',
                room_name_error: '',
                building_name_error:''
            }
        },
        methods:{
    
             async getRoom(id){
               
                await  axios.get(`${this.api_url}/api/rooms/${id}`)
                    .then((response) => {
                        this.room_data = response.data
                    })
                      
                },

                async getAllBuildings(){
                    this.loading = true
                    this.getRoom(this.room_id)
                    await  axios.get(`${this.api_url}/api/buildings/all`)
                    .then((response) => {
                        this.buildings = response.data
                    })
                    
                    this.loading = false
                }, 


                
        },
        mounted(){
                this.getAllBuildings()
        }
                
           
    }
    </script>
    
    <template>
    <div class="side_component">
        <a class="btn close_sidebar btn-sm btn-danger " @click="$emit('close')">close</a>
        <h5 class="mt-1">View Room Data</h5> 
        <hr>
        <loader v-if="loading" />
        <div v-if="loading==false">
                <div class="form_item ">
                <label class="my-2">room no <span class="required">*</span></label>
                <p class="error_txt" v-if="room_no_error">{{room_no_error}}</p>
                <input disabled type="text" class="form-control mb-2" v-model="room_data.room_no">
            </div>
        
            <div class="form_item ">
                <label class="my-2">room name <span class="required">*</span></label>
                <p class="error_txt" v-if="room_no_error">room name duplicated</p>
                <input disabled type="text" class="form-control mb-2" v-model="room_data.room_name">
            </div>
        
            <div class="form_item ">
                <label class="my-2">building <span class="required">*</span></label>
                <p class="error_txt" v-if="building_name_error">{{building_name_error}}</p>
            
                <select disabled class="form-control mb-2" v-model="room_data.building_id">
                                <option selected disabled value="">select building</option>
                                <option :value="building.id" v-for="building in buildings" :key="building.id">
                                    {{building.building_name}}
                                </option>
                </select>
            </div>
        </div>
    </div>    
    </template>