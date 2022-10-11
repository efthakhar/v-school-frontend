<script setup>
import { onBeforeUnmount, onMounted ,ref, watch} from "@vue/runtime-core"
import {useConfirmStore} from '../../stores/confirm'
const props = defineProps(['data'])
const emit = defineEmits(['close'])

const confirmStore = useConfirmStore()


</script>

<template>
    <div class="confirm_box alert" >

       <p>
        Are you sure to delete this item ?
       </p>
       <a class="btn btn-sm btn-danger me-2" @click="confirmStore.confirm_action()">yes</a>
       <a class="btn btn-sm btn-primary"     @click="confirmStore.cancel_action()">cancel</a>
    </div>
</template>

<style>
.confirm_box{
    background-color: white;
    box-shadow: 1px 1px 12px grey;
    position: absolute;
    top:30%;
    left:calc(50% - 150px) ;
    width:300px;
    min-height: 100px;
    overflow: hidden;
    z-index:1000;
}    
   
</style>