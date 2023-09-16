<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot />
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
    name: "BuBetterScroll",
    data() {
        return {
            scroll: null,
            timer: null
        };
    },
    mounted() {
        setTimeout(() => {
            this.init();
        }, 0);
    },
    methods: {
        init() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                 tap:true,
                mouseWheel: true,
                preventDefault: false
            });
        },
        //重新获取高度
        newRfresh(){
            if(this.timer){
                window.clearTimeout(this.timer)
            }
             this.timer = window.setTimeout(()=>{
            this.scroll && this.scroll.refresh()
             },200)
        }
    },
};
</script>
<style lang="scss" scoped>
.wrapper {
    height: 100vh;
}
</style>