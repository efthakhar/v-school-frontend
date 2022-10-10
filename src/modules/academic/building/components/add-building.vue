<script setup>
import { reactive, ref,computed } from "@vue/reactivity";
import { useBuildingStore } from "../store";

import { onMounted } from "@vue/runtime-core";

const emit = defineEmits(['close','refreshData'])

const buildingStore = useBuildingStore()


const building_data = computed(()=> buildingStore.current_building_item )

async function submitData(){

    try{
        await buildingStore.addBuilding(buildingStore.current_building_item)
        emit('refreshData')
        emit('close')
    }catch(error){
        console.log('error occured')
    }
    
}

async function closeAddBuildingSidebar(){
    buildingStore.resetCurrentBuildingData()
    emit('close')
}

</script>
    
<template>
    <div class="side_component">
        
        <a class="btn close_sidebar btn-sm btn-danger " @click="closeAddBuildingSidebar">close</a>
        <h5 class="mt-1"> add new building </h5> 
        <hr>
        <form class="row mb-2" @submit.prevent="submitData">

                <div class="form_item ">
                    <label class="my-2">building name</label>
                    <p class="error_txt" 
                    v-if="buildingStore.add_building_errors.building_name"
                    >
                        {{buildingStore.add_building_errors.building_name}}
                    </p>
                    <input type="text" class="form-control" v-model="building_data.building_name">
                </div>

                <div class="form_item ">
                    <label class="my-2">location details</label>
                    <p class="error_txt" 
                    v-if="buildingStore.add_building_errors.building_location"
                    >
                        {{buildingStore.add_building_errors.building_location}}
                    </p>
                    <input type="text" class="form-control" v-model="building_data.building_location">
                    
                </div>

                <div class="form_item col-md-10">
                    <button type="submit" class="btn btn-primary my-3">Submit building data</button>
                </div>
                
        </form>
    </div>    
</template>