<template>
    <TopBar/>
    <router-view></router-view>
</template>
  
<script>
import TopBar from "./renderer/components/TopBar.vue";
export default{
    components:{
        TopBar
    },
    created(){
        window.GoidaZvonAPI.sendEvent('loadScreenApplication')
    }
}
</script>

<style>
  @font-face {
    font-family: TT Norms;
    src: url('./renderer/assets/fonts/nice.woff2');
}

</style>
