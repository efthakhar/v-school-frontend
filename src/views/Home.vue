<script setup>
import {useAuthInfo} from '../stores/authinfo.js'

let authInfo = useAuthInfo()
let user = JSON.parse(localStorage.getItem('user'))

</script>

<template>
   
    <div class="home_page">
        <div class="home_page_title">
            <h2 class="">welcome to <br> <strong>V-School</strong>  <br> school management system</h2>
        </div>
        <div class="home_page_buttons">
            <router-link to="/dashboard" class="btn btn-primary m-1" >try demo</router-link>
            <router-link to="/login" class="btn btn-primary m-1" v-if="!user" >login</router-link>
            <router-link to="/register" class="btn btn-primary m-1" v-if="!user" >register</router-link>
        </div>
    </div>
</template>
<style>
.home_page{
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
}
.home_page_title{
    margin-top: 60px;
    text-align: center;
    color: blue;
}
.home_page_buttons{
    margin: 20px auto;
    display: flex;
    justify-content: center;
}
</style>