<script setup>
import { reactive, ref,computed } from "@vue/reactivity";
import {useClass} from '../../class/composable/useClass'
import { useClassStore } from "../../class/store";
import { useSessionStore } from '../../session/store';
import { useSectionStore } from '../store';

import { useBuildingStore } from '../../building/store';
import { useRoomStore } from '../../room/store';



import { onMounted } from "@vue/runtime-core";

const emit = defineEmits(['close','refreshData'])

const {classes, getClasses}   = useClass()

const sessionStore   = useSessionStore()
const sectionStore   = useSectionStore()
const buildingStore  = useBuildingStore()
const roomStore      = useRoomStore()

const section_data = computed(()=> sectionStore.current_section_item )

async function submitData(){

    try{
        await sectionStore.addSection(sectionStore.current_section_item)
        emit('refreshData')
        emit('close')
    }catch(error){
        console.log('error occured')
    }
    
}


async function closeAddSectionSidebar(){
    sectionStore.resetCurrentsectionData()
    emit('close')
}

onMounted(()=>{
    
    // sessionStore.fetchSessionsList()
    //buildingStore.fetchBuildingList()
})
</script>
    
<template>
    <div class="side_component">
        <a class="btn close_sidebar btn-sm btn-danger " @click="closeAddSectionSidebar">close</a>
        <h5 class="mt-1"> add new section </h5> 
        <hr>
        <form class="row mb-2" @submit.prevent="submitData">

               <!-- section name -->
                <div class="form_item ">
                    <label class="my-2">section name</label>
                    <p class="error_txt" 
                    v-if="sectionStore.add_section_errors.section_name"
                    >
                        {{sectionStore.add_section_errors.section_name}}
                    </p>
                    <input type="text" class="form-control" v-model="section_data.section_name">
                </div>
                <!-- session name -->
                <div class="form_item ">
                    <label class="my-2">session</label>
                    <p class="error_txt" 
                    v-if="sectionStore.add_section_errors.session_id"
                    >
                        {{sectionStore.add_section_errors.session_id}}
                    </p>
                    <select  class="form-control" v-model="section_data.session_id"
                             v-on:change="getClasses('',section_data.session_id)"
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
                <div class="form_item " v-if="section_data.session_id">
                    <label class="my-2">class</label>
                    <p class="error_txt" 
                    v-if="sectionStore.add_section_errors.class_id"
                    >
                        {{sectionStore.add_section_errors.class_id}}
                    </p>
                    <select  class="form-control" v-model="section_data.class_id">
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
                        Submit section data
                    </button>
                </div>
                
        </form>
    </div>    
</template>