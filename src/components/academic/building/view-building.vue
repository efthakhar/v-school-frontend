<script>
import axios from 'axios'  
import loader from '../../shared/loader.vue'  
export default{
    props:['buiding_id'],
    components:{loader},
    data(){
        return{
            loading:false,
            building_data:{
               building_name:'', 
               building_location:'', 
            }
        }
    },
    methods:{

        async getBuilding(id){
            this.loading = true
            await  axios.get(`${this.api_url}/api/buildings/${id}`)
            .then((response) => {
               this.building_data = response.data
            })
            this.loading = false
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
    <loader v-if='loading==true' />
    <div v-if='loading==false'>
        <div class="form_item ">
            <label class="my-2">building name <span class="required">*</span></label>
            <input disabled type="text" class="form-control mb-2" v-model="building_data.building_name">
        </div>
        <div class="form_item ">
            <label class="my-2">building location <span class="required">*</span></label>
            <input disabled type="text" class="form-control mb-2" v-model="building_data.building_location">
        </div>
    </div>

</div>    
</template>
