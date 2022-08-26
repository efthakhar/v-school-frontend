<script>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from '../components/sidebar.vue';

export default{
    components:{ Sidebar }
}

</script>

<template>

<div class="dashboard">

    <div class="dashboard-sidebar">
        <Sidebar/>
    </div>

    <div class="dashboard-content">
        <div class="dashboard-header">
            <h2>Hi this is dihab</h2>
        </div>
        <RouterView />
    </div>

</div>

</template>

<style>
.dashboard{
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
}

.dashboard-sidebar{
    border-right: 2px solid #5797F8;
    width: 200px;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.959);
    z-index: 10;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.37);
    height: 100vh;
    overflow: auto;
}
.dashboard-content{
    flex: 1 1 auto;
    background-color: whitesmoke;

    padding: 10px;
}

@media (max-width:750px){
    .dashboard-sidebar{
        position: absolute;
        left:-100%;
    }
}


/* dashboard header */
.dashboard-header{
    margin: 10px;
    box-shadow: 1px 1px 12px grey;
}
</style>