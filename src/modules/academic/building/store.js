
import { defineStore } from 'pinia'
import axios from 'axios' 
import { useNotificationStore } from '../../../stores/notifications'  

export const useBuildingStore = defineStore('building', {

    state: () =>
     ({ 
       
        current_page:1,
        total_pages:0,
        buildings:[],
        buildings_list:[],
        selected_buildings:[],

        edit_building_id: null,
        view_building_id: null,

        add_building_errors:{
            building_name:'',
            building_location:''
        },

        edit_building_errors:{
            building_name:'',
            building_location:''
        },

        current_building_item:{
            building_name:'',
            building_location:''
        }

       
     }),

    getters: {
        getBuildings: state => state.buildings
    },

    actions: {

        async fetchBuildings(page){

            return new Promise((resolve,reject)=>{

                axios.get(`/api/buildings?page=${page}`)
                .then((response) => {      
                    this.current_page = page
                    this.buildings = response.data.data
                    this.total_pages = Math.ceil(response.data.total/response.data.per_page) 
                    resolve(response)
                })
                .catch((errors)=>{
                    reject(errors)
                })
            })
                   
        },

        async fetchBuilding(id){
            
            return new Promise((resolve,reject)=>{

                axios.get(`/api/buildings/${id}`)
                .then((response) => {   
                    this.current_building_item = response.data
                    resolve(response)
                })
                .catch((errors)=>{
                    reject(errors)
                })

            })
        },

        async  addBuilding(data){   

            return new Promise((resolve,reject)=>{

                    axios.post(`/api/buildings`, data)
                    .then((response) => {

                        this.resetCurrentBuildingData()

                        const notifcationStore = useNotificationStore()
                        notifcationStore.pushNotification({
                            'message':'new building added successfully',
                            'type'   :'success',
                            'time':4000
                        })

                        resolve(response)

                    })
                    .catch((errors)=>{
                        
                        console.log(errors)

                        this.add_building_errors.building_name = 
                        Array.isArray(errors.response.data.errors.building_name)?
                        errors.response.data.errors.building_name.join():
                        errors.response.data.errors.building_name

                        this.add_building_errors.building_location = 
                        Array.isArray(errors.response.data.errors.building_location)? 
                        errors.response.data.errors.building_location.join('  '):
                        errors.response.data.errors.building_location

                        

                        reject(errors)   
                    })

            })
                        
        },


        async  editBuilding(data){   

            return new Promise((resolve,reject)=>{
                  
                    axios.put(`/api/buildings/${this.edit_building_id}`, data)
                    .then((response) => {

                        this.resetCurrentBuildingData()
                        resolve(response)

                    })
                    .catch((errors)=>{
                        
                        this.edit_building_errors.building_name = 
                        Array.isArray(errors.response.data.errors.building_name)?
                        errors.response.data.errors.building_name.join():
                        errors.response.data.errors.building_name

                        this.edit_building_errors.building_location = 
                        Array.isArray(errors.response.data.errors.building_location)? 
                        errors.response.data.errors.building_location.join('  '):
                        errors.response.data.errors.building_location
                        
                        reject(errors)   
                    })

            })
                        
        },


        async deleteBuilding(id){

            if(confirm("Are you sure to delete the building??")){

                await axios.delete(`/api/buildings/${id}`)
                .then((response) => {
                    
                    if(this.buildings.length==1){
                        this.current_page -=1
                        this.fetchBuildings(this.current_page)
                        
                    }else{
                        this.fetchBuildings(this.current_page)
                    }
                })       
            }
        },
        
        resetCurrentBuildingData(){

            this.current_building_item = {
                building_name:'',
                building_location:''
              
            }
            this.add_building_errors  = []
            this.edit_building_errors = []

        },


    },






})