<script setup>
    
import { reactive, ref,computed } from "@vue/reactivity";
import { useSessionStore } from "../store";

const emit = defineEmits(['close','refreshData'])

const sessionStore = useSessionStore()

const session_data = computed(()=> sessionStore.current_session_item )

async function submitData(){

    await sessionStore.addSession(sessionStore.current_session_item)
    emit('refreshData')
    emit('close')
    
}


</script>
    
<template>
    <div class="side_component">
        
        <a class="btn close_sidebar btn-sm btn-danger " @click="$emit('close')">close</a>
        <h5 class="mt-1">Add new Session</h5> 
        <hr>
        <form class="row mb-2" @submit.prevent="submitData">

                <div class="form_item ">
                    <label class="my-2">session name</label>
                    <input type="text" class="form-control" v-model="session_data.session_name">
                </div>
                <div class="form_item ">
                    <label class="my-2">session code</label>
                    <input type="text" class="form-control" v-model="session_data.session_code">
                </div>
                <div class="form_item ">
                    <label class="my-2">From</label>
                    <input type="date" class="form-control" v-model="session_data.start_date">
                </div>
                <div class="form_item ">
                    <label class="my-2">To</label>
                    <input type="date" class="form-control" v-model="session_data.end_date">
                </div>

                <div class="form_item  check_box_container">
                    <input class="" type="checkbox"  v-model="session_data.active_status" id="flexCheckDefault" > 
                    <label class="form-check-label" for="flexCheckDefault" >
                        Active Status
                    </label>
                </div>

                <div class="form_item">
                    <label class="my-2">Description</label>
                    <textarea v-model="session_data.description" class="form-control"></textarea>
                </div>

                <div class="form_item col-md-10">
                    <button type="submit" class="btn btn-primary my-3">Submit session data</button>
                </div>
                
        </form>
    </div>    
</template>