<script>
import axios from 'axios'
import { useAuthInfo } from '../stores/authinfo'
 export default{
    data(){
        return{
            authStore: useAuthInfo(),
            users: [ ]
        }
    },
    methods:{
        async logout(){
            axios.get('http://127.0.0.1:8000/logout')
            this.authStore.logout()
            this.$router.push('login')
       },
        getUsers(){
            axios.get('http://127.0.0.1:8000/api/users')
                .then( (response) => {
                    this.users = response.data
                })
                .catch( (error) => {
                     console.log(error);
                })
                
        }
    },
    mounted(){
        this.getUsers()
    }
 }   
</script>

<template>
<div>
    <a @click="logout" class="btn btn-primary my-3">logout</a>
    <h3 class="my-4">
        Users
    </h3>
    <div class="user" v-for="user in users" :key="user.id">{{user.name}}</div>
</div>    
</template>