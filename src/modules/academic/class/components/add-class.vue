<script setup>
import { reactive, ref,computed } from "@vue/reactivity";
import { useClassStore } from "../store";
import { useSessionStore } from '../../session/store';
import { onMounted } from "@vue/runtime-core";

const emit = defineEmits(['close','refreshData'])

const classStore = useClassStore()
const sessionStore = useSessionStore()

const class_data = computed(()=> classStore.current_class_item )

async function submitData(){

    try{
        await classStore.addClass(classStore.current_class_item)
        emit('refreshData')
        emit('close')
    }catch(error){
        console.log('error occured')
    }
    
}

async function closeAddClassSidebar(){
    classStore.resetCurrentClassData()
    emit('close')
}
onMounted(()=>{
    sessionStore.fetchSessionsList()
})
</script>
    
<template>
    <div class="side_component">
        
        <a class="btn close_sidebar btn-sm btn-danger " @click="closeAddClassSidebar">close</a>
        <h5 class="mt-1"> add new class </h5> 
        <hr>
        <form class="row mb-2" @submit.prevent="submitData">

                <div class="form_item ">
                    <label class="my-2">class name</label>
                    <p class="error_txt" 
                    v-if="classStore.add_class_errors.class_name"
                    >
                        {{classStore.add_class_errors.class_name}}
                    </p>
                    <input type="text" class="form-control" v-model="class_data.class_name">
                </div>

                <div class="form_item ">
                    <label class="my-2">session name</label>
                    <p class="error_txt" 
                    v-if="classStore.add_class_errors.session_name"
                    >
                        {{classStore.add_class_errors.session_name}}
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
                    <button type="submit" class="btn btn-primary my-3">Submit class data</button>
                </div>
                
        </form>
    </div>    
</template>