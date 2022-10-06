<script setup>
import { onBeforeUnmount, onMounted ,ref, watch} from "@vue/runtime-core"

const props = defineProps(['data'])
const emit = defineEmits(['close'])


let bar_width = ref(100) 

let timer = ''

onMounted(()=>{
    
   setTimeout(()=>emit('close'), props.data.time)

   timer = setInterval(()=> {
        bar_width.value -= 1
    },(props.data.time/100))

})

onBeforeUnmount(()=>{
    clearInterval(timer)
})

</script>

<template>
    <div class="alert notification_item" 
     :class="{
        'alert-success': data.type=='success',
        'alert-danger': data.type==='error',
        'alert-warning': data.type==='warning',
        'alert-info': data.type==='info',
        }"
    >
       <div class="bar"  :style="{backgroundColor: 'blue', height: `4px`, width: `${bar_width}%` }">

       </div>
       <span class="close_notification_btn" @click="$emit('close')">
         &#10060;
       </span>
       <p>
        {{data.message}}
       </p>
    </div>
</template>

<style>
.bar{
    position: absolute;
    bottom:0px;
    left:0px;
    
}    
.notification_item{
    width:300px;
    overflow: hidden;
}    
.close_notification_btn{
    position: absolute;
    top:2px;
    right: 2px;
    font-size: 12px;
    cursor: pointer;
    transition: all .3s;
}
.close_notification_btn:hover{
    font-size: 15px;
}

</style>