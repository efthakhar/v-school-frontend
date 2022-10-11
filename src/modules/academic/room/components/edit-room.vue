<script setup>
    
import { reactive, ref,computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useBuildingStore } from "../../building/store";
import { useRoomStore } from "../store";

import Loader from '../../../../components/shared/loader.vue';

const loading = ref(false)
const props = defineProps(['room_id'])
const emit = defineEmits(['close','refreshData'])

const roomStore = useRoomStore()
const buildingStore = useBuildingStore()

const room_data = computed(()=> roomStore.current_room_item )

async function submitData(){

    try{
        await roomStore.editRoom(roomStore.current_room_item)
        emit('refreshData')
        emit('close')
    }catch(error){
        console.log('validation error occured')
    }
    
}
async  function fetchData(id){
    loading.value = true
    await roomStore.fetchRoom(id)
    loading.value = false
}
async function closeEditRoomSidebar(){
    roomStore.resetCurrentRoomData()
    emit('close')
}

onMounted(()=>{
    buildingStore.fetchBuildingsList()
    fetchData(props.room_id)
})
</script>
    
<template>
    <div class="side_component">
        
        <a class="btn close_sidebar btn-sm btn-danger " @click="closeEditRoomSidebar">close</a>
        <h5 class="mt-1">edit room</h5> 
        <hr>
        <Loader v-if="loading" />
        <form class="row mb-2" @submit.prevent="submitData" v-if="loading==false">

                <div class="form_item ">
                    <label class="my-2">room name</label>
                    <p class="error_txt" 
                    v-if="roomStore.edit_room_errors.room_name"
                    >
                        {{roomStore.edit_room_errors.room_name}}
                    </p>
                    <input type="text" class="form-control" v-model="room_data.room_name">
                </div>

                <div class="form_item ">
                    <label class="my-2">room no</label>
                    <p class="error_txt" 
                    v-if="roomStore.edit_room_errors.room_no"
                    >
                        {{roomStore.edit_room_errors.room_no}}
                    </p>
                    <input type="text" class="form-control" v-model="room_data.room_no">
                </div>

                <div class="form_item  check_box_container">
                    <label class="my-2">Building</label>
                    <p class="error_txt" 
                    v-if="roomStore.edit_room_errors.building_id"
                    >
                        {{roomStore.edit_room_errors.building_id}}
                    </p>
                    <select  class="form-control" v-model="room_data.building_id">
                        <option value="">select a building</option>
                        <option :value="building.id"
                                 v-for="building in buildingStore.buildings_list"
                                 :key="building.id"
                        >
                        {{building.building_name}}
                        </option>
                    </select>
                </div>

                <div class="form_item col-md-10">
                    <button type="submit" class="btn btn-primary my-3">update room data</button>
                </div>
                
        </form>
    </div>    
</template>