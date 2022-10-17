<script setup>
import { reactive, ref,computed } from "@vue/reactivity";
import {useClass} from '../../class/composable/useClass'
import { useSessionStore } from '../../session/store';
import { useSectionStore } from '../store';
import { onMounted } from "@vue/runtime-core";
import Loader from "../../../../components/shared/loader.vue";

const props = defineProps(['section_id'])
const emit  = defineEmits(['close','refreshData'])

const loading = ref(false)
const {classes, getClasses}   = useClass()
const sessionStore   = useSessionStore()
const sectionStore   = useSectionStore()

async  function fetchData(id){
    
    loading.value = true
    await sectionStore.fetchsection(id)
    await sessionStore.fetchSessionsList()
    await getClasses('', sectionStore.current_section_item.session_id)
    loading.value = false
}

async function submitData(){

    try{
        
        await sectionStore.editSection(sectionStore.current_section_item)
        emit('refreshData')
        emit('close')
    }catch(error){
        console.log('error occered')
    }
    
}


async function closeEditSectionSidebar(){
    sectionStore.resetCurrentsectionData()
    emit('close')
}
function onSessionChange(){
    sectionStore.current_section_item.class_id = ''
    getClasses('',sectionStore.current_section_item.session_id)
}
onMounted(()=>{
    
    fetchData(props.section_id)
    
})
</script>
    
<template>
    <div class="side_component">
        <a class="btn close_sidebar btn-sm btn-danger " @click="closeEditSectionSidebar">close</a>
        <h5 class="mt-1"> edit section </h5> 
        <hr>
        <loader v-if="loading"/>
        <form class="row mb-2" @submit.prevent="submitData" v-if="loading==false">

               <!-- section name -->
                <div class="form_item ">
                    <label class="my-2">section name</label>
                    <p class="error_txt" 
                    v-if="sectionStore.edit_section_errors.section_name"
                    >
                        {{sectionStore.edit_section_errors.section_name}}
                    </p>
                    <input type="text"
                          class="form-control" 
                          v-model="sectionStore.current_section_item.section_name"
                    >
                </div>

                <!-- session name -->
                <div class="form_item ">
                    <label class="my-2">session</label>
                    <p class="error_txt" 
                    v-if="sectionStore.edit_section_errors.session_id"
                    >
                        {{sectionStore.edit_section_errors.session_id}}
                    </p>
                    <select  class="form-control"
                             v-model="sectionStore.current_section_item.session_id"
                             v-on:change="onSessionChange"
                    >
                        <option value="">select session</option>
                        <option :value="session.id"
                                 v-for="session in sessionStore.sessions_list"
                                 :key="session.id"
                        >
                        {{session.session_name}}
                        </option>
                    </select>
                    
                </div>

                
                <!-- class name -->
                <div class="form_item " v-if="sectionStore.current_section_item.session_id">
                    <label class="my-2">class</label>
                    <p class="error_txt" 
                    v-if="sectionStore.edit_section_errors.class_id"
                    >
                        {{sectionStore.edit_section_errors.class_id}}
                    </p>
                    
                    <select  class="form-control"
                     v-model="sectionStore.current_section_item.class_id">
                        <option value="">select class</option>
                        <option :value="c.id"
                                 v-for="c in classes"
                                 :key="c.id"
                        >
                        {{c.class_name}}
                        </option>
                    </select>
                    
                </div>



                <div class="form_item col-md-10">
                    <button type="submit" class="btn btn-primary my-3">
                        update section
                    </button>
                </div>
                
        </form>
    </div>    
</template>