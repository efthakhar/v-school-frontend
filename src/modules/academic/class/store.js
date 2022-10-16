
import { defineStore } from 'pinia'
import axios from 'axios' 
import { useClass } from './composable/useClass'
import { useNotificationStore } from '../../../stores/notifications'  

export const useClassStore = defineStore('class', {

    state: () =>
     ({ 
    
        current_page:1,
        total_pages:0,
        per_page:'',
        classes:[],
        classes_list:[],
        selected_classes:[],

        edit_class_id: null,
        view_class_id: null,

        filter_session_id: '',

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
        //getClasses: state => state.classes
    },

    actions: {


        async fetchClasses(page='',session_id=''){
               
           await useClass().getClasses(page,session_id)
           .then((response)=>{
              
               this.classes = page ? response.data : response
               this.per_page = page ? response.per_page : ''
               this.current_page = page ? response.current_page : 1
               this.total_pages = page? response.last_page : 0
            })
           
    
        },

        async fetchClass(id){

            await useClass().getClass(id)
            .then((response)=>{
                this.current_class_item = response
             })
            
        },

        async  addClass(data){  

            return new Promise((resolve,reject)=>{

                    useClass().addClass(data)
                    .then((response)=>{

                        this.resetCurrentClassData()
                        const notifcationStore = useNotificationStore()
                        notifcationStore.pushNotification({
                            'message':'new class added successfully',
                            'type'   :'success',
                            'time':4000
                        })
                        
                        resolve()
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

            return new Promise((resolve,reject)=>{
                useClass().deleteClass(id)
                .then(response=>{
                    if(this.classes.length==1){
                        this.current_page -=1
                        this.fetchClasses(this.current_page,this.filter_session_id)
                                    
                    }else{
                        this.fetchClasses(this.current_page,this.filter_session_id)
                    }
                    resolve(response)
                })
                .catch(error=>{
                    console.log(error)
                    reject(error)
                })
            })

            // if(confirm("Are you sure to delete the class??")){

            //     await axios.delete(`/api/classes/${id}`)
            //     .then((response) => {
                    
            //         if(this.classes.length==1){
            //             this.current_page -=1
            //             this.fetchClasses(this.current_page,this.filter_session_id)
                        
            //         }else{
            //             this.fetchClasses(this.current_page,this.filter_session_id)
            //         }
            //     })       
            // }
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