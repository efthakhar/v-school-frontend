import { defineStore } from 'pinia'
import axios from 'axios'   

export const useRoomStore = defineStore('room', {

    state: () =>
     ({ 
        
        current_page:1,
        total_pages:0,

        rooms:[],
        edit_room_id: null,
        view_room_id: null,

        add_room_errors: [],
       

        
       
     }),

    getters: {
        getRooms: state => state.rooms 
    },

    actions: {

        async fetchRooms(page){

            this.current_page = page

            await  axios.get(`/api/rooms?page=${page}`)
            .then((response) => {

                this.rooms = response.data.data
                this.total_pages = Math.ceil(response.data.total/response.data.per_page)   

            })

        },

        
        addRoom(data){   

            return new Promise((resolve,reject)=>{

                axios.post(`/api/rooms`, data)
                    .then((response) => {

                        this.fetchRooms(1) 
                        resolve(response)

                    })
                    .catch((errors)=>{

                        reject(errors)   

                    })
            })
                        
        },

        async fetchRoom(id){

            return new Promise( (resolve,reject) => {

                axios.get(`${this.api_url}/api/rooms/${id}`)
                .then((response) => {

                    this.room_data = response.data
                    resolve(response)

                })
                .catch((errors)=>{

                    reject(errors)

                })
                

            })      
              
        },

        async deleteRoom(id){

            await axios.delete(`/api/rooms/${id}`)
            .then((response) => {
                
                if(this.rooms.length==1){
                    this.current_page -=1
                    this.fetchRooms(this.current_page)
                }else{
                    this.fetchRooms(this.current_page)
                }
             })       
          
        },



            
       async change_page(page_no){
           this.current_page = page_no
           await  this.fetchRooms(this.current_page)
       },






    },






})
