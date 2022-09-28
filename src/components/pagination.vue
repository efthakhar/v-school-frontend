<script>
 export default{
    props:['total_pages','current_page'],
    methods:{
   
    }
 }   
</script>


<template>
<nav aria-label="...">
<ul class="pagination">
  
    <!-- prev nav -->
    <li class="page-item" @click="$emit('pageChange',current_page-1)" v-if="current_page!=1">
        <button class="page-link" >Prev </button>
    </li>  

     <!-- first page   -->
     <li class="page-item" @click="$emit('pageChange',1)" v-if="current_page!=1" >
        <button class="page-link me-2" >{{1}}</button>
     </li> 
    
    <!-- current page - 1  -->
    <li class="page-item" @click="$emit('pageChange',current_page-1)" 
    v-if="current_page!=1 && (current_page-1)!=1" >
        <button class="page-link ms-2" >{{current_page-1}}</button>
    </li> 
    <!-- current page -->
    <li class="page-item active" >
        <button class="page-link" >{{current_page}}</button>
    </li> 
    <!-- current page + 1  -->
    <li class="page-item" @click="$emit('pageChange',current_page+1)" v-if="current_page!=total_pages" >
        <button class="page-link" >{{current_page+1}}</button>
    </li>  

    <!-- last page  -->
    <li class="page-item" @click="$emit('pageChange',total_pages)" 
    v-if="current_page!=total_pages&&(current_page+1)!=total_pages" >
        <button class="page-link ms-2" >{{total_pages}}</button>
     </li> 
    <!-- next nav -->
    <li class="page-item" @click="$emit('pageChange',current_page+1)" v-if="current_page!=total_pages" >
        <button class="page-link" >Next </button>
    </li>  

<!-- <li class="page-item" :class="current_page==page?'active':''"
    v-for="page in total_pages" :key="page" @click="$emit('pageChange',page)">
        <button class="page-link" >
                {{page}}
        </button>
    </li> -->

</ul>
</nav>   
</template>


