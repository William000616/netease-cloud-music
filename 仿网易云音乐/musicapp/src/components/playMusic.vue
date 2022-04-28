<template>
    <div class="playMusic">
        <div class="bg" :style="{backgroundImage:`url(${playDetail.al.picUrl})`}"></div>
        <div class="playTop">
            <div class="back" @click="$emit('back')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangzuojiantou"></use>
                </svg>
            </div>
            <div class="center">
                <div class="title">
                    <marquee behavior="scroll" direction="left">{{playDetail.name}}（{{playDetail.al.name}}）</marquee></div>
                
            </div>
            <div class="share">
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
        </div>
        <div class="playContent" v-show="!isLyric" @click="isLyric=!isLyric">
            <img class="needle" :class="{active:!paused}" src="@/assets/img/needle-ab.png" alt="">
            <img class="disc" src="@/assets/img/disc-plus.png" alt="">
            <img class="playImg" :src="playDetail.al.picUrl" alt="">
        </div>
        <div class="playLyric" v-show="isLyric" ref="playLyric" @click="isLyric=!isLyric">
        <p :class="{active:(currentTime*1000>=item.pre&&currentTime*1000<item.time )}" v-for="(item,i) in $store.getters.lyricList" :key="i">{{item.lyric}}</p>
            <!-- {{$store.state.lyric}} -->
        </div>
        <div class="progress"></div>
        <div class="playFooter">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xunhuan1"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                        <use xlink:href="#icon-shangyishoushangyige" ></use>
                    </svg>
                    <svg v-if="paused" class="icon play" aria-hidden="true" @click="play">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                    <svg v-else class="icon play" aria-hidden="true" @click="play">
                        <use xlink:href="#icon-zanting"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                        <use xlink:href="#icon-xiayigexiayishou" ></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofangliebiao"></use>
                    </svg>
        </div>
        
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    props:['playDetail','paused','play'],
    data:function(){
        return{
            isLyric:false
        }
        
    },
    computed:{
        ...mapState(['lyric','currentTime','playlist','playCurrentIndex']),
        
    },
    watch:{
        currentTime:function(newValue){
            let  p = document.querySelector('p.active')
            let offsetTop = p.offsetTop
            this.$refs.playLyric.scrollTop = p.offsetTop
            // let h = this.$refs.playLyric.offsetHeight
            // if(offsetTop>h){
            //     this.$refs.playLyric.scrollTop = this.$refs.playLyric.scrollTop+(offsetTop-h/2)
            // }
        }
    },
    methods:{
        goPlay(num){
            let index = this.playCurrentIndex+num
            if(index<0){
                index= this.playlist.length-1;
                
            }else if(index==this.playlist.length){
                index=0
            }
            this.$store.commit('setPlayIndex',index)
        }
    }
}
</script>

<style lang="less" scoped>
.playMusic{
    z-index: 100000;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    .bg{
        // z-index: 10000;
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-size: auto 100%;
        background-position: center;
        filter: blur(50px);
        
    }
    .playTop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 7.5rem;
        height:2rem;
        position: absolute;
        left: 0;
        font-size: 0.5rem;
        top: 0;
        color: white;
        padding: 0 0.4rem;
        .icon{
            fill: white;
            width: 0.8rem;
            height: 0.8rem;

        }
        marquee{
            width: 5rem;
            flex: 1;
        }
    }
    .playContent{
        position: absolute;
        width: 7.5rem;
        height: 7.5rem;
        left: 0;
        top: 1.5rem;
        .needle{
            width: 2rem;
            height: auto;
            position:absolute ;
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(-20deg);
            transition: all 1s;
            z-index: 10;
        }
        .needle.active{
            width: 2.5rem;
            height: auto;
            position:absolute ;
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(5deg);
            transition: all 1s;
            z-index: 10;
        }
        .disc{
            width: 5.5rem;
            height: auto;
            position:absolute ;
            left: calc(50% - 2.75rem);
            top: 2.5rem;
        }
        .playImg{
            width: 3.4rem;
            height: 3.4rem;
            border-radius: 1.7rem;
            position:absolute ;
            left: calc(50% - 1.7rem);
            top: 3.55rem;
        }
    }
    .playFooter{
        width: 7.5rem;
        height: 2.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        .icon{
            fill: white;
            width: 0.8rem;
            height: 0.8rem;

        }
        .play.icon{
            width: 1.2rem;
            height: 1.2rem;
        }
    }
    .playLyric{
        position: absolute;
        width: 7.5rem;
        height: 8rem;
        font-size: 0.4rem;
        left: 0;
        top: calc(50% - 4rem);
        overflow: scroll;
        text-align: center;
        color: white;
        padding: 0.2rem 0;
        .active{
            font-size: 0.6rem;
            color: red;
        }
    }
}
</style>