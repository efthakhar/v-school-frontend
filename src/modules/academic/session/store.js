
import { defineStore } from 'pinia'
import axios from 'axios'   
import { useNotificationStore } from '../../../stores/notifications'
export const useSessionStore = defineStore('session', {

    state: () =>
     ({ 
        
        current_page:1,
        total_pages:0,
        sessions:[],
        sessions_list:[],
        selected_sessions:[],

        edit_session_id: null,
        view_session_id: null,

        add_session_errors:{
            session_name:'',
            session_code:'',
            start_date:'',
            end_date: ''
        },

        edit_session_errors:{
            session_name:'',
            session_code:'',
            start_date:'',
            end_date: ''
        },

        current_session_item:{
            session_name:'',
            session_code:'',
            start_date:'',
            end_date: '',
            session_description:'',
            active_status: false,
            session_description: ''
        }

       
     }),

    getters: {
        getSessions: state => state.sessions
    },

    actions: {

        async fetchSession(id){
            
            return new Promise((resolve,reject)=>{

                axios.get(`/api/sessions/${id}`)
                .then((response) => {   
                    this.current_session_item = response.data
                    resolve(response)
                })
                .catch((errors)=>{
                    reject(errors)
                })

            })
        },

        async fetchSessions(page){

            return new Promise((resolve,reject)=>{

                axios.get(`/api/sessions?page=${page}`)
                .then((response) => {
                    
                    this.current_page = page
                    this.sessions = response.data.data
                    this.total_pages = Math.ceil(response.data.total/response.data.per_page)   
                    resolve(response)
                })
                .catch((errors)=>{

                    reject(errors)

                })
            })
                   
        },

        async fetchSessionsList(){

            return new Promise((resolve,reject)=>{

                axios.get(`/api/sessions/list`)
                .then((response) => {
                    this.sessions_list = response.data
                    resolve(response)
                })
                .catch((errors)=>{
                    reject(errors)
                })
            })
                   
        },


        async  addSession(data){   

            return new Promise((resolve,reject)=>{

                    axios.post(`/api/sessions`, data)
                    .then((response) => {

                        this.resetCurrentSessionData()
                        const notifcationStore = useNotificationStore()
                        notifcationStore.pushNotification({
                            'message':'new class added successfully',
                            'type'   :'success',
                            'time':2000
                        })
                        resolve(response)

                    })
                    .catch((errors)=>{
                      
                        this.add_session_errors.session_name = errors.response.data.errors.session_name
                        this.add_session_errors.session_code = errors.response.data.errors.session_code
                        this.add_session_errors.start_date = errors.response.data.errors.start_date
                        this.add_session_errors.end_date = errors.response.data.errors.end_date
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

        async deleteSession(id){

            await axios.delete(`/api/sessions/${id}`)
            .then((response) => {
                
                if(this.sessions.length==1){
                    this.current_page -=1
                    this.fetchSessions(this.current_page)
                }else{
                    this.fetchSessions(this.current_page)
                }
             })       
          
        },
        
        resetCurrentSessionData(){

            this.current_session_item = {
                session_name:'',
                session_code:'',
                start_date:'',
                end_date: '',
                session_description:'',
                active_status: false,
                session_description: ''
            }
            this.add_session_errors = []
            this.edit_session_errors = []

        },


    },






})
