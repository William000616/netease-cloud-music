<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div class="text">
          <div class="title">播放全部</div>
          <div class="num">(共{{ playlist.tracks.length }}首)</div>
        </div>
      </div>
      <div class="btn">+ 收藏({{ changeValue(playlist.subscribedCount) }})</div>
    </div>
    <div class="list">
        <div class="playItem" v-for="(item,i) in playlist.tracks" :key="i">
            <div class="left" @click="setPlayIndex(i)">
                <div class="index">{{i+1}}</div>
                <div class="content">
                    <div class="title">{{item.name}}</div>
                    <div class="author">
                        <span class="tag" v-for="(tag,index) in playlist.tags" :key="index">{{tag}}</span>
                        <span>{{item.al.name}}</span>
                        </div>
                </div>
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playSquare"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang"></use>
        </svg>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { mapState, mapMutations } from 'vuex'
export default {
  props: ["playlist"],
  methods:{
        changeValue:function(num){
            let res = num
            if(num>=100000000){
                res = num/100000000
                res = res.toFixed(2) + '亿'                  
            }else if(num>=10000){
                res = num/10000
                res = res.toFixed(2) + '万'
            }
            return res
        },
        ...mapMutations(['setPlayIndex'])
    },
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.playlist {
  width: 7.5rem;
  padding: 0 0.4rem;
  background-color: white;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  margin-top: 0.4rem;
  .playlist-top {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
      .title {
        font-size: 0.34rem;
        font-weight: 900;
      }
      .num {
        font-size: 0.24rem;
        color: #666;
      }
      .text {
        display: flex;
        align-items: center;
        margin-left: 0.2rem;
        
      }
    }
    .btn{
        font-size: 0.24rem;
        color: white;
        background-color: orangered;
        line-height: 0.6rem;
        padding: 0.1rem;
        border-radius: 0.4rem;
    }
  }
  .list{
    // position: fixed;
    // top: 7.7rem;
    // bottom: 1.2rem;
    // overflow: scroll;
      .playItem{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 1rem;
          margin: 0.2rem 0;
          .left{
              display: flex;
              align-items: center;
              color: #666;
              width: 5rem;
              .index{
                  width: 0.4rem;
                  color: black;
                  font-size:0.4rem;
                  
              }
              .content{
                  margin-left: 0.4rem;
                  
              }
              .title{
                  font-size:0.35rem;
                  font-weight: 900;
                  color: black;
                  margin-bottom: 0.1rem;
                  overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
              .tag{
                  font-size:0.2rem;
                  color: orangered;
                  border:1px solid orangered ;
                  margin: 0 0.04rem;
              }
              .author{
                  
                  color: #666;
                  overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
          }
          .right{
            //   width: 1.5rem;
              .icon{
                  margin: 0 0.2rem;

          }
          }
          
      }
  }
}
</style>