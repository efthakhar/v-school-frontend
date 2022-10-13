<script>
import SideNavItem from "./side-nav-item.vue"

export default{
     components:{ SideNavItem},
    data(){
        return{
            navlinks:[
                
                {   
                    navlinktext:'dashboard',
                    navlink:'/dashboard/overview',
                    permission:'dashboard'
                },

                {   
                    navlinktext:'academic',
                    // navlink:'/dashboard/academic',
                    subnavlinks:[
                        { 
                           subnavtext:'sessions',
                           subnavlink:'/dashboard/sessions',
                           permission:'session_view'
                        },
                        {
                           subnavtext:'classes',  
                           subnavlink:'/dashboard/classes',
                           permission:'class_view'
                        },
                        {
                           subnavtext:'sections',  
                           subnavlink:'/dashboard/sections',
                           permission:'section_view'
                        },
                        {  subnavtext:'buildings',  
                           subnavlink:'/dashboard/buildings',
                           permission:'building_view'
                        },
                        {  subnavtext:'rooms',  
                           subnavlink:'/dashboard/rooms',
                           permission:'room_view'
                        },
                        
                    ]
                },
                
                
            ]
        }
    }
}

</script>

<template>
<div>
    <div class="sidebar-logo">
        <router-link to="/">V-SchooL</router-link>
    </div>
    <ul class="sidebar-nav-items">  
        <SideNavItem v-for="navlink in navlinks" :key="navlink"
        :navdetails="navlink"
        /> 
    </ul>
</div>

</template>

<style>
.sidebar-logo{
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 10px;
}
.sidebar-logo a{
    display: block;
    font-size: 1.5rem;
    font-weight: 700; 
    color:#2d7bf0; 
    text-transform: uppercase;
}
.sidebar-nav-items{
    display: flex;
    flex-direction: column;
}
.side-nav-item{
   text-transform: uppercase !important;
}
.side-nav-link{
 
 color:#2d7bf0;
 margin:2px 0;
 box-shadow: 1px 1px 16px rgb(221, 221, 221);

}

.side-nav-sublinks{

    display:flex;
    flex-direction: column;
    padding: 10px;
}

.side-nav-sublink{
 background-color: whitesmoke;
 color: grey;
 
}

.side-nav-link,.side-nav-sublink{
 
  display: block;
  padding: 7px 3px 7px 16px;
  font-size: .9rem;
  font-weight: 400;
  
}

.side-nav-link.active-nav-link,.active-nav-link.side-nav-sublink{
    background-color: #2d7bf0ad !important;
    color: white !important;
}

</style>