<script setup>
import { reactive, ref,computed } from "@vue/reactivity";
import { useSectionStore } from '../store';
import { onMounted } from "@vue/runtime-core";
import Loader from "../../../../components/shared/loader.vue";

const props = defineProps(['section_id'])
const emit  = defineEmits(['close','refreshData'])

const loading = ref(false)
const sectionStore   = useSectionStore()


async  function fetchData(id){
    
    loading.value = true
    await sectionStore.fetchsection(id)
    loading.value = false
}


async function closeViewSectionSidebar(){
    sectionStore.resetCurrentsectionData()
    emit('close')
}

onMounted(()=>{  
    fetchData(props.section_id)
})
</script>
    
<template>
    <div class="side_component">
        <a class="btn close_sidebar btn-sm btn-danger " @click="closeViewSectionSidebar">close</a>
        <h5 class="mt-1">section details</h5> 
        <hr>
        <loader v-if="loading"/>
        <form class="row mb-2" v-if="loading==false">

               <!-- section name -->
                <div class="form_item ">
                    <label class="my-2">section name</label>
                    
                    <input type="text" disabled
                          class="form-control" 
                          v-model="sectionStore.current_section_item.section_name"
                    >
                </div>

                <!-- session name -->
                <div class="form_item ">
                    <label class="my-2">session</label>
                    <input type="text" disabled
                          class="form-control" 
                          v-model="sectionStore.current_section_item.session_name"
                    >
                </div>
     
                <!-- class name -->
                <div class="form_item " v-if="sectionStore.current_section_item.session_id">
                    <label class="my-2">class</label>
                    <input type="text" disabled
                          class="form-control" 
                          v-model="sectionStore.current_section_item.class_name"
                    >
                </div>

        </form>
    </div>    
</template>