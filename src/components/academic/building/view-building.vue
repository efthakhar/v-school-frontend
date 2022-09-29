<script>
import axios from 'axios'    
export default{
    props:['buiding_id'],
    data(){
        return{
            building_data:{
               building_name:'', 
               building_location:'', 
            }
        }
    },
    methods:{

        async getBuilding(id){

            await  axios.get(`${this.api_url}/api/buildings/${id}`)
            .then((response) => {
               this.building_data = response.data
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
    <a class="btn close_sidebar btn-sm btn-danger" @click="$emit('close')" >close</a>
    <h5 class="mt-1">Detail Building Data</h5> 
    <hr>
    <div class="form_item ">
        <label class="my-2">building name <span class="required">*</span></label>
        <input disabled type="text" class="form-control mb-2" v-model="building_data.building_name">
    </div>
    <div class="form_item ">
        <label class="my-2">building location <span class="required">*</span></label>
        <input disabled type="text" class="form-control mb-2" v-model="building_data.building_location">
    </div>

</div>    
</template>
