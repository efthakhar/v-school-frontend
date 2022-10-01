<script>
import axios from 'axios'    
import loader from '../../loader.vue'

export default{
  components: { loader },
    props:['room_id'],
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

       async editRoom(){
            axios.put(`${this.api_url}/api/rooms/${this.room_id}`, this.room_data)
                .then((response) => {
                    this.$emit('close')
                    this.$emit('refreshData')               
                })
                .catch((error) =>
                {  
                    this.room_no_error =  error.response.data.errors.room_no
                    this.building_name_error =  error.response.data.errors.building_id
                })
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
    <h5 class="mt-1">Edit Room Data</h5> 
    <hr>
    <loader v-if="loading"/>
    <div v-if="loading==false">
        <div class="form_item ">
            <label class="my-2">room no <span class="required">*</span></label>
            <p class="error_txt" v-if="room_no_error">{{room_no_error}}</p>
            <input type="text" class="form-control mb-2" v-model="room_data.room_no">
        </div>

        <div class="form_item ">
            <label class="my-2">room name <span class="required">*</span></label>
            <input type="text" class="form-control mb-2" v-model="room_data.room_name">
        </div>

        <div class="form_item ">
            <label class="my-2">building <span class="required">*</span></label>
            <p class="error_txt" v-if="building_name_error">{{building_name_error}}</p>
        
            <select class="form-control mb-2" v-model="room_data.building_id">
                            <option selected disabled value="">select building</option>
                            <option :value="building.id" v-for="building in buildings" :key="building.id">
                                {{building.building_name}}
                            </option>
            </select>
        </div>
        <div class="form_item ">
            <a class="btn btn-primary my-3" @click="editRoom">update room data</a>
        </div>
    </div>    
</div>    
</template>