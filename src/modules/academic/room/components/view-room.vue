<script setup>
    
import { reactive, ref,computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

import { useRoomStore } from "../store";

import Loader from '../../../../components/shared/loader.vue';

const loading = ref(false)
const props = defineProps(['room_id'])
const emit = defineEmits(['close','refreshData'])

const roomStore = useRoomStore()


const room_data = computed(()=> roomStore.current_room_item )


async  function fetchData(id){
    loading.value = true
    await roomStore.fetchRoom(id)
    loading.value = false
}
async function closeViewRoomSidebar(){
    roomStore.resetCurrentRoomData()
    emit('close')
}

onMounted(()=>{
    fetchData(props.room_id)
})
</script>
    
<template>
    <div class="side_component">
        
        <a class="btn close_sidebar btn-sm btn-danger " @click="closeViewRoomSidebar">close</a>
        <h5 class="mt-1">room details</h5> 
        <hr>
        <Loader v-if="loading" />
        <form class="row mb-2" v-if="loading==false">

                <div class="form_item ">
                    <label class="my-2">room name</label>
                    <input disabled type="text" class="form-control" v-model="room_data.room_name">
                </div>

                <div class="form_item ">
                    <label class="my-2">room no</label>
                    <input disabled type="text" class="form-control" v-model="room_data.room_no">
                </div>

                <div class="form_item  check_box_container">
                    <label class="my-2">Building</label>
                    <input disabled type="text" class="form-control" v-model="room_data.building_name">
                </div>

                
        </form>
    </div>    
</template>