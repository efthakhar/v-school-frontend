
import { defineStore } from 'pinia'
import axios from 'axios' 
import { useNotificationStore } from '../../../stores/notifications'  
import { useSection } from './composable/useSection'


export const useSectionStore = defineStore('section', {

    state: () =>
     ({ 
       
        current_page:1,
        total_pages:0,
        sections:[],
        sections_list:[],
        selected_sections:[],

        editMode: false,
        addMode: false,

        edit_section_id: null,
        view_section_id: null,

        filterSessionId: '',
        filterClassId:'',

        add_section_errors:{
            section_name:'',
            class_id:'',
            session_id:'',
            building_id: '',
            room_id:''
        },

        edit_section_errors:{
            section_name:'',
            class_id:'',
            session_id:'',
            building_id: '',
            room_id:''
        },

        current_section_item:{
            section_name:'',
            class_id:'',
            session_id:'',
            building_id: '',
            room_id:''
        }

       
     }),

    getters: {
        getsections: state => state.sections
    },

    actions: {

        async  addSection(data){  

            return new Promise((resolve,reject)=>{

                    useSection().addSection(data)
                    .then((response)=>{

                        this.resetCurrentsectionData()
                        const notifcationStore = useNotificationStore()
                        notifcationStore.pushNotification({
                            'message':'new section added successfully',
                            'type'   :'success',
                            'time':4000
                        })
                        
                        resolve()
                    })
                    .catch((errors)=>{

                        this.add_section_errors.section_name = 
                            Array.isArray(errors.response.data.errors.section_name)?
                            errors.response.data.errors.section_name.join():
                            errors.response.data.errors.section_name

                        this.add_section_errors.session_id = 
                            Array.isArray(errors.response.data.errors.session_id)? 
                            errors.response.data.errors.session_id.join('  '):
                            errors.response.data.errors.session_id

                        this.add_section_errors.class_id = 
                            Array.isArray(errors.response.data.errors.class_id)? 
                            errors.response.data.errors.class_id.join('  '):
                            errors.response.data.errors.class_id

                        reject(errors)
                    })
                    
   
            })  
                        
        },
        async  editSection(data){  
            
            return new Promise((resolve,reject)=>{

                    useSection().editSection(data,this.edit_section_id)
                    .then((response)=>{
                       
                        this.resetCurrentsectionData()
                        const notifcationStore = useNotificationStore()
                        notifcationStore.pushNotification({
                            'message':'section updated successfully',
                            'type'   :'success',
                            'time':4000
                        })
                        
                        resolve()
                    })
                    .catch((errors)=>{
                       
                        this.edit_section_errors.section_name = 
                            Array.isArray(errors.response.data.errors.section_name)?
                            errors.response.data.errors.section_name.join():
                            errors.response.data.errors.section_name

                        this.edit_section_errors.session_id = 
                            Array.isArray(errors.response.data.errors.session_id)? 
                            errors.response.data.errors.session_id.join('  '):
                            errors.response.data.errors.session_id

                        this.edit_section_errors.class_id = 
                            Array.isArray(errors.response.data.errors.class_id)? 
                            errors.response.data.errors.class_id.join('  '):
                            errors.response.data.errors.class_id

                        reject(errors)
                    })
                    
   
            })  
                        
        },


        async fetchSections(page ='',session_id='',class_id=''){


            return new Promise((resolve,reject)=>{

                useSection().getSections(page,session_id,class_id)
                .then((response) => { 
                    
                    this.per_page = page ? response.per_page : ''
                    this.current_page = page ? response.current_page : 1
                    this.total_pages = page? response.last_page : 0
                    this.sections = page ? response.data : response   
                    resolve(response)
                })
                .catch((errors)=>{
                    
                    reject(errors)
                })
            })
                   
        },

        async fetchsection(id){
            
            return new Promise((resolve,reject)=>{
                
                useSection().getSection(id)
                .then((response) => {   
                    this.current_section_item = response
                    resolve(response)
                })
                .catch((errors)=>reject(errors))
            })
        },
      
        async deleteSection(id){

            return new Promise((resolve,reject)=>{
                useSection().deleteSection(id)
                .then((response) => {
                    if(this.sections.length==1){           
                        this.current_page-=1
                        this.fetchSections(this.current_page,this.filterSessionId,this.filterClassId)                  
                    }
                    else{     
                        this.fetchSections(this.current_page,this.filterSessionId,this.filterClassId)
                    }
                    resolve(response)
                })
                .catch((errors)=>reject(errors))       
            })
        },
        
        resetCurrentsectionData(){

            this.current_section_item = {
                section_name:'',
                class_id:'',
                session_id:'',
                building_id: '',
                room_id:''
            }
            this.add_section_errors = []
            this.edit_section_errors = []

        },


    },






})