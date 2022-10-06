<script setup>

import { reactive, ref,computed } from "@vue/reactivity";
import { useClassStore } from "../store";
import { useSessionStore } from '../../session/store';
import { onMounted } from "@vue/runtime-core";
import Loader from "../../../../components/shared/loader.vue";

const props = defineProps(['class_id'])
const emit = defineEmits(['close','refreshData'])

const loading = ref(false)
const classStore = useClassStore()
const sessionStore = useSessionStore()

const class_data = computed(()=> classStore.current_class_item )

async function submitData(){

    try{
        await classStore.editClass(classStore.current_class_item)
        emit('refreshData')
        emit('close')
    }catch(error){
        console.log('validation error occured')
    }
    
}

async  function fetchData(id){
    loading.value = true
    await classStore.fetchClass(id)
    loading.value = false
}

async function closeAddClassSidebar(){
    classStore.resetCurrentClassData()
    emit('close')
}

onMounted(()=>{
    sessionStore.fetchSessionsList()
    fetchData(props.class_id)
})
</script>
    
<template>
    <div class="side_component">
        
        <a class="btn close_sidebar btn-sm btn-danger " @click="closeAddClassSidebar">close</a>
        <h5 class="mt-1"> edit class </h5> 
        <hr>
        <Loader v-if="loading==true" />
        <form class="row mb-2" @submit.prevent="submitData" v-if="loading==false">

                <div class="form_item ">
                    <label class="my-2">class name</label>
                    <p class="error_txt" 
                    v-if="classStore.edit_class_errors.class_name"
                    >
                        {{classStore.edit_class_errors.class_name}}
                    </p>
                    <input type="text" class="form-control" v-model="class_data.class_name">
                </div>

                <div class="form_item ">
                    <label class="my-2">session name</label>
                    <p class="error_txt" 
                    v-if="classStore.edit_class_errors.session_name"
                    >
                        {{classStore.edit_class_errors.session_name}}
                    </p>
                    <select  class="form-control" v-model="class_data.session_id">
                        <option value="">select a session</option>
                        <option :value="session.id"
                                 v-for="session in sessionStore.sessions_list"
                                 :key="session.id"
                        >
                        {{session.session_name}}
                        </option>
                    </select>
                    
                </div>

                <div class="form_item col-md-10">
                    <button type="submit" class="btn btn-primary my-3">update class data</button>
                </div>
                
        </form>
    </div>    
</template>