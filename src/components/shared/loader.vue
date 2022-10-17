<script>
export default{

}    
</script>


<template>
    <div class="loader_container">
        <div class="lds-hourglass"></div>     
    </div>
</template>


<style>


/* ==================================================== */

.loader_container{ 
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:40px;   
}
.lds-hourglass {
  
  display: inline-block;
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 30px solid #fff;
  border-color: rgba(14, 70, 252, 0.527) transparent #fff transparent;
  animation: lds-hourglass .6s infinite linear;
}

/* @keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
     border-color: rgba(14, 70, 252, 0.178) transparent #fff transparent; 
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
} */

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  
  100% {
    transform: rotate(1080deg);
  }
}

</style>