
import { defineStore } from 'pinia'
import axios from 'axios'   

export const useSessionStore = defineStore('session', {

    state: () =>
     ({ 
        
        current_page:1,
        total_pages:0,
        sessions:[],

        sessions_list:[],

        edit_session_id: null,
        view_session_id: null,

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

        },
   
      async  addSession(data){   

            return new Promise((resolve,reject)=>{

                    axios.post(`/api/sessions`, data)
                    .then((response) => {

                        this.resetCurrentSessionData()
                        resolve(response)

                    })
                    .catch((errors)=>{
                      
                        reject(errors)   

                    })

            })
                        
        },

    //     async fetchRoom(id){

    //          return new Promise((resolve,reject)=>{

    //             axios.get(`${this.api_url}/api/rooms/${id}`)
    //             .then((response) => {
    //                 this.room_data = response.data
    //             })

    //          })      
              
    //     },

    //     async deleteRoom(id){

    //         await axios.delete(`/api/rooms/${id}`)
    //         .then((response) => {
                
    //             if(this.rooms.length==1){
    //                 this.current_page -=1
    //                 this.fetchRooms(this.current_page)
    //             }else{
    //                 this.fetchRooms(this.current_page)
    //             }
    //          })       
          
    //     },
     
    //    async change_page(page_no){
    //        this.current_page = page_no
    //        await  this.fetchRooms(this.current_page)
    //    },






    },






})
