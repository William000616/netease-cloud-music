import { createStore } from 'vuex'
import axios from 'axios'
import api from '@/api/index.js';
export default createStore({
  state: {
    playlist:[{
      name: '关键词(抖音热搜版)', id: 1831418823,
      al:{
        id: 124882190,
        name: "擦肩而过",
        pic: 109951165825222480,
        picUrl: "http://p4.music.126.net/mPHPpP3_F00v7fWYkKziEA==/109951165825222483.jpg",
        pic_str: "109951165825222483"
      }}],
    playCurrentIndex:0,
    lyric:'',
    currentTime:0,
    intervalId:0,
    user:{
      isLogin:false,
      username:"未登录",
      account:{},
      userDetail:{}
    }
  },
  getters: {
    lyricList:function(state){
      let arr = state.lyric.split(/\n/igs).map((item,i,arr)=>{
          let min =parseInt(item.slice(1,3)) ;
          let sec =parseInt(item.slice(4,6))  ;
          let mill =parseInt(item.slice(7,10))  ;
          // if(i-1<0){
          //   let pre = 0
          // }else{
          //   let pre = arr[i-1].item.slice(4,6)
          // }
          
          return {
            min,sec,mill,
            lyric:item.slice(11,item.length),
            content:item,
            time:mill+sec*1000+min*60*1000
          }
      })
      arr.forEach((item,i)=>{
        if(i==0){
          item.pre  = 0
          }else{
            item.pre = arr[i-1].time
          }
        
      })
      return arr
  }
  },
  mutations: {
    setPlaylist:function(state,value){
      state.playlist =value
    },
    pushPlaylist:function(state,value){
      state.playlist.push(value)
    },
    setPlayIndex(state,value){
      state.playCurrentIndex = value
    },
    setLyric(state,value){
      state.lyric = value
    },
    setCurrentTime(state,value){
      state.currentTime = value
    },
    setUser(state,value){
      state.user = value
    }
  },
  actions: {
    async reqLyric(content,payload){
      console.log(payload)
      let res =await api.getLyric(payload.id)
      content.commit('setLyric',res.data.lrc.lyric)
      // console.log(res.data.lrc.lyric)
    },
    async phoneLogin(content,payload){
      let res =await api.phoneLogin(payload.phone,payload.password)
      if(res.data.code==200){
        content.state.user.isLogin=true
        content.state.user.account = res.data.account

        let userDetail =  await api.userDetail(res.data.account.id)
        content.state.user.userDetail = userDetail.data
        localStorage.userData= JSON.stringify(content.state.user)
        console.log(userDetail)
        content.commit('setUser',content.state.user)
      }
      console.log(payload)
      console.log(res)
      return res
      
    }
    
  },
  modules: {
  }
})
