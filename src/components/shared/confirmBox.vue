<script setup>
import { onBeforeUnmount, onMounted ,ref, watch} from "@vue/runtime-core"
import {useConfirmStore} from '../../stores/confirm'
const props = defineProps(['data'])
const emit = defineEmits(['close'])

const confirmStore = useConfirmStore()


</script>

<template>
<div>
    <div class="confirm_box_container">
        <div class="confirm_box alert" >

        <p>
        Are you sure to delete this item ?
        </p>
        <a class="btn btn-sm btn-danger me-2" @click="confirmStore.confirm_action()">yes</a>
        <a class="btn btn-sm btn-primary"     @click="confirmStore.cancel_action()">cancel</a>
        </div>
    </div>
</div>
   
</template>

<style>
.confirm_box_container{
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color:rgba(0, 0, 0, 0.315);
    z-index:1000;
}
.confirm_box{
    background-color: white;
    box-shadow: 1px 1px 12px grey;
    position: absolute;
    top:30%;
    left:calc(50% - 150px) ;
    max-width:400px;
    min-height: 100px;
    overflow: hidden;
    z-index:1000;
}    
   
</style>