<template>
  <div class="searchTop">
    <div class="searchTopNav">
      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangzuojiantou"></use>
        </svg>
      </div>
      <div class="right">
        <input
          type="text"
          v-model="searchKeyword"
          :placeholder="placeholder"
          @keydown.enter="saveKeyWord"
        />
      </div>
    </div>
    <div class="history" v-show="searchSongs.length==0">
      <div class="historyLeft">历史</div>
      <div class="historyRight">
        <div @click="historySearch(item)" class="keywordItem" v-for="(item, i) in keywordList" :key="i">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="searchSongs" v-show="searchSongs.length!=0">
      <div class="searchSongs-top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div class="text">
          <div class="title">播放全部</div>
          <div class="num">(共{{ searchSongs.length }}首)</div>
        </div>
      </div>
      
      </div>
      <div class="list">
        <div class="playItem" v-for="(item, i) in searchSongs" :key="i">
          <div class="left" @click="setPlay(item,i)">
            <div class="index">{{ i + 1 }}</div>
            <div class="content">
              <div class="title">{{ item.name }}</div>
              <div class="author">
                <span
                  class="tag"
                  v-for="(tag, index) in searchSongs.tags"
                  :key="index"
                  >{{ tag }}</span
                >
                <span>{{ item.album.name }}</span>
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
  </div>
</template>

<script>
import { searchMusic } from "@/api/index.js";

export default {
  data: function () {
    return {
      placeholder: "陈奕迅",
      keywordList: [],
      searchKeyword: "",
      searchSongs: [],
    };
  },
  beforeMount() {
    this.keywordList = localStorage.keywordList
      ? JSON.parse(localStorage.keywordList)
      : [];
  },
  methods: {
    saveKeyWord: async function () {
      this.keywordList.push(this.searchKeyword);
      this.keywordList =Array.from(new Set(this.keywordList)) 
      if(this.keywordList.length>5){
        this.keywordList = this.keywordList.slice(this.keywordList.length-5,this.keywordList.length)
      }
      localStorage.keywordList = JSON.stringify(this.keywordList);
      // this.keywordList=[]
      // 
      let res = await searchMusic(this.searchKeyword);
      this.searchSongs = res.data.result.songs;
      
      // this.keywordList=[]
      console.log(res)
    },
    historySearch(keyword){
      this.searchKeyword = keyword
      this.saveKeyWord()
    },
    setPlay(item,i){
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      this.$store.commit('pushPlaylist',item)
      this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1)
    }
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  width: 7.5rem;
  padding: 0 0.4rem;

  .searchTopNav {
    display: flex;

    height: 1.2rem;
    width: 100%;
    align-items: center;

    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: black;
    }
    .right {
      padding: 0 0 0 0.4rem;
      flex: 1;
      input {
        border: none;
        outline: none;
        border-bottom: 1px solid #666;
        width: 100%;
        height: 0.5rem;
      }
    }
  }

  .history {
    display: flex;
    // justify-content: space-between;
    // padding: 0.6rem 0;

    .historyLeft {
      width: 1rem;
      height: 0.6rem;
      font-weight: 900;
      margin: 0.2rem 0;
      line-height: 0.6rem;
    }
    .historyRight {
      color: #666;
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .keywordItem {
        background-color: #eee;
        height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
        line-height: 0.6rem;
        margin: 0.2rem 0.1rem;
      }
    }
  }
  .searchSongs {
    position: fixed;
    top: 1.2rem;
    bottom: 1.2rem;
    overflow: scroll;
    width: 7.5rem;
    padding: 0 0.4rem;
    background-color: white;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    margin-top: 0.4rem;
    .searchSongs-top {
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
      .btn {
        font-size: 0.24rem;
        color: white;
        background-color: orangered;
        line-height: 0.6rem;
        padding: 0.1rem;
        border-radius: 0.4rem;
      }
    }
    .list {
      .playItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        margin: 0.2rem 0;
        .left {
          display: flex;
          align-items: center;
          color: #666;
          width: 5rem;
          .index {
            width: 0.4rem;
            color: black;
            font-size: 0.4rem;
          }
          .content {
            margin-left: 0.4rem;
          }
          .title {
            font-size: 0.35rem;
            font-weight: 900;
            color: black;
            margin-bottom: 0.1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .tag {
            font-size: 0.2rem;
            color: orangered;
            border: 1px solid orangered;
            margin: 0 0.04rem;
          }
          .author {
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
        .right {
          //   width: 1.5rem;
          .icon {
            margin: 0 0.2rem;
          }
        }
      }
    }
  }
}
</style>