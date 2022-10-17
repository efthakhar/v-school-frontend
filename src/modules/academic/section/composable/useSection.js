import { ref } from 'vue'
import axios from 'axios' 

export function useSection() {

    const sections = ref(null)
    const section_item = ref(null)


    const getSections = async (page='', session_id='', class_id='') => {
      
      return  new   Promise((resolve,reject)=>{
                  
          axios.get(`/api/sections?page=${page}&session_id=${session_id}&class_id=${class_id}`)
          .then((response) => {    
            
            sections.value = response.data
            resolve(sections.value)
              
          })
          .catch((errors)=>{
            reject(errors)
          })
               
      })   
      
    }

    const getSection = async (section_id)=>{
      
      return  new   Promise((resolve,reject)=>{
          
          axios.get(`/api/sections/${section_id}`)
          .then((response) => {   
            section_item.value = response.data
            resolve(section_item.value)
              
          })
          .catch((errors)=>{
            
            reject(errors)
          })
          
          
      })    
    }

    const addSection = async (data)=> {

        return new Promise((resolve,reject)=>{

        axios.post(`/api/sections`, data)
        .then((response) => resolve(response))
        .catch(error=>reject(error))
        
        })
    }


    const editSection = async (data,id)=> {
         
          return new Promise( (resolve,reject) =>{
            
              axios.put(`/api/sections/${id}`, data)
              .then((response) => resolve(response))
              .catch(error=>reject(error))
            
          })
    }

    const deleteSection = async (id) => {

        return new Promise((resolve, reject) => {
                  axios.delete(`/api/sections/${id}`)
                  .then((response) => resolve(response))
                  .catch(error=>reject(error))
        })                    
    }


    return { sections, section_item, getSections,getSection, addSection, deleteSection,editSection}

}