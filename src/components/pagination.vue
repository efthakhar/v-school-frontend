<script>
 export default{
    props:['total_pages','current_page'],
    methods:{
   
    }
 }   
</script>


<template>
<nav aria-label="..." v-if="total_pages>0"> 
    <ul class="pagination">
    
            <!-- prev nav -->
            <li class="page-item"  :class="current_page==1?'disabled':''">
                <button class="page-link " @click="$emit('pageChange',current_page-1)" 
                :disabled="current_page==1"  
                >
                    Prev 
                </button>
            </li>  

            <!-- first page -->
            <li class="page-item" @click="$emit('pageChange',1)" v-if="(current_page)!=1">
                <button class="page-link me-1" >{{1}}</button>
            </li>

            <!-- current page - 1 -->
            <li class="page-item" @click="$emit('pageChange',current_page-1)" 
            v-if="(current_page-1)>=2">
                <button class="page-link" >{{current_page-1}}</button>
            </li>
            <!-- current page -->
            <li class="page-item active"  @click="$emit('pageChange',current_page)">
                <button class="page-link" >{{current_page}}</button>
            </li>
            <!-- current page + 1 -->
            <li class="page-item" @click="$emit('pageChange',current_page+1)"
            v-if="(current_page+1)<=total_pages-1">
                <button class="page-link" >{{current_page+1}}</button>
            </li>

            <!-- last page -->
            <li class="page-item" @click="$emit('pageChange',total_pages)"
            v-if="(current_page)!=total_pages"
            >
                <button class="page-link ms-1" >{{total_pages}}</button>
            </li>

            <!-- next nav -->
            <li class="page-item" :class="current_page==total_pages?'disabled':''">
                <button class="page-link"
                @click="$emit('pageChange',current_page+1)"  
                :disabled="current_page==total_pages" 
                >Next
                </button>
            </li>  

    </ul>
</nav>   
</template>


<style>
li.disabled.page-item{cursor:not-allowed !important;}
</style>
