import { ref } from 'vue'
import axios from 'axios' 

export function useClass() {

    const classes = ref(null)
    const class_item = ref(null)


    const getClasses = async (page='',session_id='')=>{
      
      return  new   Promise((resolve,reject)=>{
                  
          axios.get(`/api/classes?page=${page}&session_id=${session_id}`)
          .then((response) => {    
            
            classes.value = response.data
            resolve(classes.value)
              
          })
          .catch((errors)=>{
            reject(errors)
          })
          
          
      })    
    }

    const getClass = async (class_id)=>{
      
      return  new   Promise((resolve,reject)=>{
                  
          axios.get(`/api/classes/${class_id}`)
          .then((response) => {    
            
            class_item.value = response.data
            resolve(class_item.value)
              
          })
          .catch((errors)=>{
            reject(errors)
          })
          
          
      })    
    }

    const addClass = async (data)=> {

          return new Promise((resolve,reject)=>{

              axios.post(`/api/classes`, data)
            .then((response) => {
              resolve(response)
            })
            .catch(error=>reject(error))
            
          })
    }


    const editClass = async (data,id)=> {

          return new Promise((resolve,reject)=>{
              axios.put(`/api/classes/${id}`, data)
            .then((response) => {
              resolve(response)
            })
            .catch(error=>reject(error))
            
          })
    }

    const deleteClass = async (id) => {

        return new Promise((resolve, reject) => {
                  axios.delete(`/api/classes/${id}`)
                  .then((response) => {  
                    resolve(response)
                  })
                  .catch(error=>{
                    reject(error)
                  })
        })
                        
    }


    return { classes,class_item, getClasses, getClass, addClass, editClass, deleteClass}

}