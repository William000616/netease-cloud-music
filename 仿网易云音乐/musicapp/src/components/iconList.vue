<template>
    <div class="iconList">
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-meirituijian"></use>
        </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-faxian_sirenFM"></use>
        </svg>
            <span>私人FM</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-faxian_gedan1"></use>
        </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-faxian_shuzizhuanji"></use>
        </svg>
            <span>数字专辑</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-paihangbang1"></use>
        </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="less" scoped>
.iconList{
    height: 1.9rem;
    width: 7.5rem;
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
    .iconItem{
        width: 7.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon{
            width: 1.2rem;
            height: 1.2rem;
    }
    span{
        font-size: 0.22rem;
    }

    }
    
}
</style>