<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot/>
</div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
name:"BuBetterScroll",
data(){
    return {
        scroll: null
    }
},
mounted(){
  setTimeout(()=>{
    this.init()
  },0)
},
methods:{
    init(){
  this.scroll = new BScroll(this.$refs.wrapper)  
}
}
}
</script>
<style lang="scss" scoped>
.wrapper{
    height: 100%;
}
</style>