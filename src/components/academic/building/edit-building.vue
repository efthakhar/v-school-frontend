<script>
import axios from 'axios'    
export default{
    props:['buiding_id'],
    data(){
        return{
            building_data:{
               building_name:'', 
               building_location:'', 
            },
            building_name_error: '',
            building_location_error:''
        }
    },
    methods:{

        async getBuilding(id){

            await  axios.get(`${this.api_url}/api/buildings/${id}`)
            .then((response) => {
               this.building_data = response.data
            })
        },

       async editBuilding(){
            axios.put(`${this.api_url}/api/buildings/${this.building_data.id}`, this.building_data)
                .then((response) => {
                    this.$emit('close')
                    this.$emit('refreshData')
                   
                }).catch((error) =>{
                    this.building_name_error     =  error.response.data.errors.building_name
                    this.building_location_error =  error.response.data.errors.building_location
                })
        },
        
    },
    mounted(){
        this.getBuilding(this.buiding_id)
    }
}
</script>

<template>
<div class="side_component">
    <a class="btn close_sidebar btn-sm btn-danger " @click="$emit('close')">close</a>
    <h5 class="mt-1">Edit Building Data</h5> 
    <hr>
    <div class="form_item ">
        <label class="my-2">building name <span class="required">*</span></label>
        <p class="error_txt" v-if="building_name_error">{{building_name_error}}</p>
        <input type="text" class="form-control mb-2" v-model="building_data.building_name">
    </div>
    <div class="form_item ">
        <label class="my-2">building location <span class="required">*</span></label>
        <p class="error_txt" v-if="building_location_error">{{building_location_error}}</p>
        <input type="text" class="form-control mb-2" v-model="building_data.building_location">
    </div>

    <div class="form_item ">
        <a class="btn btn-primary my-3" @click="editBuilding">update building data</a>
    </div>
</div>    
</template>