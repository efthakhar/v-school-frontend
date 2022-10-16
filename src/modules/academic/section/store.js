
import { defineStore } from 'pinia'
import axios from 'axios' 
import { useNotificationStore } from '../../../stores/notifications'  


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

        async fetchSections(page,session_id='',class_id=''){


            return new Promise((resolve,reject)=>{

                axios.get(`/api/sections?page=${page}&session_id=${session_id}&class_id=${class_id}`)
                .then((response) => {  
                        
                    this.current_page = page
                    this.sections = response.data.data ? response.data.data : []
                    this.total_pages = Math.ceil(response.data.total/response.data.per_page) 
                    resolve(response)
                })
                .catch((errors)=>{
                    
                    reject(errors)
                })
            })
                   
        },

        // async fetchsection(id){
            
        //     return new Promise((resolve,reject)=>{

        //         axios.get(`/api/sections/${id}`)
        //         .then((response) => {   
        //             this.current_section_item = response.data
        //             resolve(response)
        //         })
        //         .catch((errors)=>{
        //             reject(errors)
        //         })

        //     })
        // },

        async  addsection(data){   

            return new Promise((resolve,reject)=>{

                    axios.post(`/api/sections`, data)
                    .then((response) => {

                        this.resetCurrentsectionData()

                        const notifcationStore = useNotificationStore()
                        notifcationStore.pushNotification({
                            'message':'new section added successfully',
                            'type'   :'success',
                            'time':4000
                        })

                        resolve(response)

                    })
                    .catch((errors)=>{
                        
                        console.log(errors)

                        this.add_section_errors.section_name = 
                        Array.isArray(errors.response.data.errors.section_name)?
                        errors.response.data.errors.section_name.join():
                        errors.response.data.errors.section_name

                        this.add_section_errors.session_name = 
                        Array.isArray(errors.response.data.errors.session_id)? 
                        errors.response.data.errors.session_id.join('  '):
                        errors.response.data.errors.session_id

                        

                        reject(errors)   
                    })

            })
                        
        },
        
        // async  editsection(data){   

        //     return new Promise((resolve,reject)=>{
                  
        //             axios.put(`/api/sections/${this.edit_section_id}`, data)
        //             .then((response) => {

        //                 this.resetCurrentsectionData()
        //                 resolve(response)

        //             })
        //             .catch((errors)=>{
                        
        //                 this.edit_section_errors.section_name = 
        //                 Array.isArray(errors.response.data.errors.section_name)?
        //                 errors.response.data.errors.section_name.join():
        //                 errors.response.data.errors.section_name

        //                 this.edit_section_errors.session_name = 
        //                 Array.isArray(errors.response.data.errors.session_id)? 
        //                 errors.response.data.errors.session_id.join('  '):
        //                 errors.response.data.errors.session_id
                        
        //                 reject(errors)   
        //             })

        //     })
                        
        // },

      
        async deleteSection(id){


                await axios.delete(`/api/sections/${id}`)
                .then((response) => {
                    if(this.sections.length==1){
                       
                        this.current_page-=1
                        this.fetchSections(this.current_page,this.filterSessionId,this.filterClassId)
                      
                    }
                    else{
                        
                        this.fetchSections(this.current_page,this.filterSessionId,this.filterClassId)
                    }
                })
                .catch((errors)=>{
                    console.log(errors)
                })       
            
        },
        
        // resetCurrentsectionData(){

        //     this.current_section_item = {
        //         section_name:'',
        //         session_id:'',
        //         session_name:''
        //     }
        //     this.add_section_errors = []
        //     this.edit_section_errors = []

        // },


    },






})