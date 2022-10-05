
import { defineStore } from 'pinia'
import axios from 'axios'   

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

        async fetchClasses(page){

            return new Promise((resolve,reject)=>{

                axios.get(`/api/classes?page=${page}`)
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

        // async fetchSession(id){
            
        //     return new Promise((resolve,reject)=>{

        //         axios.get(`/api/sessions/${id}`)
        //         .then((response) => {   
        //             this.current_session_item = response.data
        //             resolve(response)
        //         })
        //         .catch((errors)=>{
        //             reject(errors)
        //         })

        //     })
        // },

        async  addClass(data){   

            return new Promise((resolve,reject)=>{

                    axios.post(`/api/classes`, data)
                    .then((response) => {

                        this.resetCurrentClassData()
                        resolve(response)

                    })
                    .catch((errors)=>{
                      
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

        async  updateSession(data){   

            return new Promise((resolve,reject)=>{

                    axios.put(`/api/sessions/${this.edit_session_id}`, data)
                    .then((response) => {

                        this.resetCurrentSessionData()
                        resolve(response)

                    })
                    .catch((errors)=>{
                        this.edit_session_errors.session_name = errors.response.data.errors.session_name
                        this.edit_session_errors.session_code = errors.response.data.errors.session_code
                        this.edit_session_errors.start_date = errors.response.data.errors.start_date
                        this.edit_session_errors.end_date = errors.response.data.errors.end_date
                        reject(errors)   

                    })

            })
                        
        },

        async deleteClass(id){
           
            await axios.delete(`/api/classes/${id}`)
            .then((response) => {
                
                if(this.classes.length==1){
                    this.current_page -=1
                    this.fetchClasses(this.current_page)
                    
                }else{
                    this.fetchClasses(this.current_page)
                }
             })       
          
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