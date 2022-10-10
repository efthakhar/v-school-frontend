<script setup>
import { reactive, ref,computed } from "@vue/reactivity";
import { useBuildingStore } from "../store";

import { onMounted } from "@vue/runtime-core";
import Loader from "../../../../components/shared/loader.vue";

const props = defineProps(['building_id'])
const emit = defineEmits(['close','refreshData'])

const loading = ref(false)
const buildingStore = useBuildingStore()


const building_data = computed(()=> buildingStore.current_building_item )

async function submitData(){

    try{

        await buildingStore.editBuilding(buildingStore.current_building_item)
        emit('refreshData')
        emit('close')

    }catch(error){

        console.log('validation error occured')
    }
    
}

async  function fetchData(id){
    loading.value = true
    await buildingStore.fetchBuilding(id)
    loading.value = false
}

async function closeEditBuildingSidebar(){
    buildingStore.resetCurrentBuildingData()
    emit('close')
}

onMounted(()=>{
    fetchData(props.building_id)
})
</script>


<template>

    <div class="side_component">
        
        <a class="btn close_sidebar btn-sm btn-danger " @click="closeEditBuildingSidebar">close</a>
        <h5 class="mt-1"> Edit building </h5> 
        <hr>
        <Loader  v-if="loading"/>
        <form class="row mb-2" @submit.prevent="submitData" v-if="loading==false">

                <div class="form_item ">
                    <label class="my-2">building name</label>
                    <p class="error_txt" 
                    v-if="buildingStore.edit_building_errors.building_name"
                    >
                        {{buildingStore.edit_building_errors.building_name}}
                    </p>
                    <input type="text" class="form-control" v-model="building_data.building_name">
                </div>

                <div class="form_item ">
                    <label class="my-2">location details</label>
                    <p class="error_txt" 
                    v-if="buildingStore.edit_building_errors.building_location"
                    >
                        {{buildingStore.edit_building_errors.building_location}}
                    </p>
                    <input type="text" class="form-control" v-model="building_data.building_location">
                    
                </div>

                <div class="form_item col-md-10">
                    <button type="submit" class="btn btn-primary my-3">edit building data</button>
                </div>
                
        </form>
    </div> 
       
</template>