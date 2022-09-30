<script>
import axios from 'axios'
import { useAuthInfo } from '../stores/authinfo'

export default{

    data(){
        return {
           authStore : useAuthInfo(), 
           email: 'dihab@gmail.com',
           password: 'dihab'
        }
    },

    methods:{



       async login(){

              await axios.get(`${this.api_url}/sanctum/csrf-cookie`)

             await axios.post(`${this.api_url}/login`, {
                    email:this.email,
                    password:this.password
                })
                .then((response) => {
                   
                    this.authStore.login(response.data.user)
                    this.$router.push('dashboard')

                }, (error) => {
                    
                    this.authStore.logout()
                    
                });
                    
                this.$router.push({name:"dashboard"})
           
        }

    }
}  
</script>
<template>
<div class="sign_up page">
    
<form action="" class="my-4 p-2">
    <h3>Login</h3>


    <label for="" class="my-2">email:</label>
    <input type="email" v-model="email" class="form-control ">

    <label for="" class="my-2">password:</label>
    <input type="password" v-model="password" class="form-control ">
    

    <a @click="login" class="btn btn-primary my-3">login</a>
    <p>Don't have an account? 
        <router-link to="/register">create new</router-link>
    </p>
</form>
</div>    
</template>

<style>
.page{ width: 100vw;}
form{
    max-width: 400px;
    margin:auto;
}
</style>