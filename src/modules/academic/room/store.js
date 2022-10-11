
import { defineStore } from 'pinia'
import axios from 'axios' 
import { useNotificationStore } from '../../../stores/notifications'  

export const useRoomStore = defineStore('room', {

    state: () =>
     ({ 
       
        current_page:1,
        total_pages:0,
        rooms:[],
        rooms_list:[],
        selected_rooms:[],

        edit_room_id: null,
        view_room_id: null,
        delete_room_id: null,

        add_room_errors:{
            room_no:'', 
            room_name:'', 
            building_id:'', 
        },

        edit_room_errors:{
            room_no:'', 
            room_name:'', 
            building_id:'', 
        },

        current_room_item:{
            room_no:'', 
            room_name:'', 
            building_id:'', 
        }

       
     }),

    getters: {
        getRooms: state => state.rooms
    },

    actions: {

        async fetchRooms(page){

            return new Promise((resolve,reject)=>{

                axios.get(`/api/rooms?page=${page}`)
                .then((response) => {      
                    this.current_page = page
                    this.rooms = response.data.data
                    this.total_pages = Math.ceil(response.data.total/response.data.per_page) 
                    resolve(response)
                })
                .catch((errors)=>{
                    reject(errors)
                })
            })
                   
        },

        async fetchRoom(id){
            
            return new Promise((resolve,reject)=>{

                axios.get(`/api/rooms/${id}`)
                .then((response) => {   
                    this.current_room_item = response.data
                    resolve(response)
                })
                .catch((errors)=>{
                    reject(errors)
                })

            })
        },

        async  addRoom(data){   

            return new Promise((resolve,reject)=>{

                    axios.post(`/api/rooms`, data)
                    .then((response) => {

                        this.resetCurrentRoomData()

                        const notifcationStore = useNotificationStore()
                        notifcationStore.pushNotification({
                            'message':'new room added successfully',
                            'type'   :'success',
                            'time':4000
                        })

                        resolve(response)

                    })
                    .catch((errors)=>{
                        
                        

                        this.add_room_errors.room_name = 
                        Array.isArray(errors.response.data.errors.room_name)?
                        errors.response.data.errors.room_name.join():
                        errors.response.data.errors.room_name

                        this.add_room_errors.room_no = 
                        Array.isArray(errors.response.data.errors.room_no)? 
                        errors.response.data.errors.room_no.join('  '):
                        errors.response.data.errors.room_no

                        this.add_room_errors.building_id = 
                        Array.isArray(errors.response.data.errors.building_id)? 
                        errors.response.data.errors.building_id.join('  '):
                        errors.response.data.errors.building_id

                        

                        reject(errors)   
                    })

            })
                        
        },
        async  editRoom(data){   
           
            return new Promise((resolve,reject)=>{
                  
                    axios.put(`/api/rooms/${this.edit_room_id}`, data)
                    .then((response) => {
                       
                        this.resetCurrentRoomData()
                        resolve(response)

                    })
                    .catch((errors)=>{
                        
                        this.edit_room_errors.room_name = 
                        Array.isArray(errors.response.data.errors.room_name)?
                        errors.response.data.errors.room_name.join():
                        errors.response.data.errors.room_name

                        this.edit_room_errors.room_no = 
                        Array.isArray(errors.response.data.errors.room_no)? 
                        errors.response.data.errors.room_no.join('  '):
                        errors.response.data.errors.room_no

                        this.edit_room_errors.building_id = 
                        Array.isArray(errors.response.data.errors.building_id)? 
                        errors.response.data.errors.building_id.join('  '):
                        errors.response.data.errors.building_id
                        
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


        
        resetCurrentRoomData(){

            this.current_room_item = {
                room_no:'', 
                room_name:'', 
                building_id:'', 
            }
            this.add_room_errors = []
            this.edit_room_errors = []

        },


    },






})