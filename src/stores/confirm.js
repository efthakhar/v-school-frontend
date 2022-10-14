import { defineStore } from 'pinia'



export const useConfirmStore = defineStore('confirm', {

    state: () =>
     ({ 
        do_action: false,
        show_confirm_box:false,
        resolve:null,
        delayTime: 0,
        timer:'',
        wait:''
     }),

    getters: {
        getActionState: state => state.do_action
    },

    actions: 
    {
     
        async confirm_action(){
            this.do_action = true
            this.hide_box()
        },

        async cancel_action(){
            this.do_action = false
            this.hide_box()
        },

        hide_box(){
            this.show_confirm_box = false
        },
    
        show_box(){
                
                this.show_confirm_box = true 
                this.do_action = false
                
                return new Promise((resolve, reject) => {

                        this.timer = setInterval(()=>{

                            if(this.do_action==true){
                                clearInterval(this.timer)
                               resolve('true')
                            }
                            
                        },1000)                
                })     
        }

    },

})