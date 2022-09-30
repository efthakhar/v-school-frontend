<script>
import axios from 'axios'
import { useAuthInfo } from '../stores/authinfo'
export default{

    data(){
        return {
           authStore : useAuthInfo(),
           name:'',  
           email: '',
           password: ''
        }
    },

    methods:{

        async register(){

            await axios.get(`${this.api_url}/sanctum/csrf-cookie`)

            await  axios.post(`${this.api_url}/register`, {

                        name: this.name,
                        email: this.email,
                        password: this.password

                    })
                    .then((response) => { 

                        // console.log(response)   
                        this.authStore.login(response.data.user)
                        this.$router.push({name:"dashboard"})

                    }, (error) => {

                        console.log(error)   
                        this.authStore.logout()

                    });
                    
               // this.$router.push({name:"login"})
           
        },
        async logout(){
            axios.get(`${this.api_url}/logout`)
            this.authStore.logout()
            this.$router.push('login')
        },
    }
}  
</script>
<template>
<div class="sign_up page">
    
<form action="" class="my-4 p-2">
    <h3>Register</h3>

    <label for="" class="my-2">name:</label>
    <input type="text" v-model="name" class="form-control ">

    <label for="" class="my-2">email:</label>
    <input type="email" v-model="email" class="form-control ">

    <label for="" class="my-2">password:</label>
    <input type="password" v-model="password" class="form-control ">
    

    <a @click="register" class="btn btn-primary my-3">register</a>
    <p>Already have an account? 
        <router-link to="/login">log in</router-link>
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