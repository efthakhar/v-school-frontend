
import { defineStore } from 'pinia'
import axios from 'axios' 
import { useNotificationStore } from '../../../stores/notifications'  

export const useClassStore = defineStore('class', {

    state: () =>
     ({ 
       
        current_page:1,
        total_pages:0,
        classes:[],
        classes_list:[],
        selected_classes:[],

        edit_class_id: null,
        view_class_id: null,

        add_class_errors:{
            class_name:'',
            session_id:'',
        },

        edit_class_errors:{
            class_name:'',
            session_id:'',
        },

        current_class_item:{
            class_name:'',
            session_id:'',
            session_name:''
        }

       
     }),

    getters: {
        getClasses: state => state.classes
    },

    actions: {
        async fetchClassesList(session_id=''){

            return new Promise((resolve,reject)=>{

                axios.get(`/api/classes?session_id=${session_id}`)
                .then((response) => { 
                    console.log(response.data)
                    this.classes_list = response.data 
                    resolve(response)
                })
                .catch((errors)=>{
                    reject(errors)
                })
            })
                   
        },

        async fetchClasses(page,session_id=''){

            return new Promise((resolve,reject)=>{

                axios.get(`/api/classes?page=${page}&session_id=${session_id}`)
                .then((response) => {      
                    this.current_page = page
                    this.classes = response.data.data
                    this.total_pages = Math.ceil(response.data.total/response.data.per_page) 
                    resolve(response)
                })
                .catch((errors)=>{
                    reject(errors)
                })
            })
                   
        },

        async fetchClass(id){
            
            return new Promise((resolve,reject)=>{

                axios.get(`/api/classes/${id}`)
                .then((response) => {   
                    this.current_class_item = response.data
                    resolve(response)
                })
                .catch((errors)=>{
                    reject(errors)
                })

            })
        },

        async  addClass(data){   

            return new Promise((resolve,reject)=>{

                    axios.post(`/api/classes`, data)
                    .then((response) => {

                        this.resetCurrentClassData()

                        const notifcationStore = useNotificationStore()
                        notifcationStore.pushNotification({
                            'message':'new class added successfully',
                            'type'   :'success',
                            'time':4000
                        })

                        resolve(response)

                    })
                    .catch((errors)=>{
                        
                        console.log(errors)

                        this.add_class_errors.class_name = 
                        Array.isArray(errors.response.data.errors.class_name)?
                        errors.response.data.errors.class_name.join():
                        errors.response.data.errors.class_name

                        this.add_class_errors.session_name = 
                        Array.isArray(errors.response.data.errors.session_id)? 
                        errors.response.data.errors.session_id.join('  '):
                        errors.response.data.errors.session_id

                        

                        reject(errors)   
                    })

            })
                        
        },
        async  editClass(data){   

            return new Promise((resolve,reject)=>{
                  
                    axios.put(`/api/classes/${this.edit_class_id}`, data)
                    .then((response) => {

                        this.resetCurrentClassData()
                        resolve(response)

                    })
                    .catch((errors)=>{
                        
                        this.edit_class_errors.class_name = 
                        Array.isArray(errors.response.data.errors.class_name)?
                        errors.response.data.errors.class_name.join():
                        errors.response.data.errors.class_name

                        this.edit_class_errors.session_name = 
                        Array.isArray(errors.response.data.errors.session_id)? 
                        errors.response.data.errors.session_id.join('  '):
                        errors.response.data.errors.session_id
                        
                        reject(errors)   
                    })

            })
                        
        },

      
        async deleteClass(id){

            if(confirm("Are you sure to delete the class??")){

                await axios.delete(`/api/classes/${id}`)
                .then((response) => {
                    
                    if(this.classes.length==1){
                        this.current_page -=1
                        this.fetchClasses(this.current_page)
                        
                    }else{
                        this.fetchClasses(this.current_page)
                    }
                })       
            }
        },
        
        resetCurrentClassData(){

            this.current_class_item = {
                class_name:'',
                session_id:'',
                session_name:''
            }
            this.add_class_errors = []
            this.edit_class_errors = []

        },


    },






})