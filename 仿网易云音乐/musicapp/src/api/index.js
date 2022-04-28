import axios, { Axios } from 'axios';

//获取轮播api
export function getBanner(type=1){
    return axios.get(`http://localhost:3000/banner?type=${type}`)
    
}
//获取推荐歌单
export function getMusicList(limit){
    return axios.get(`http://localhost:3000/personalized?limit=${limit}`)
}

//获取歌单详情
export function getplayList(id){
    return axios.get(`http://localhost:3000/playlist/detail?id=${id}`)
}
//获取歌词
export function getLyric(id){
    return axios.get(`http://localhost:3000/lyric?id=${id}`)
}
//搜索歌曲
export function searchMusic(keyword){
    return axios.get(`http://localhost:3000/search?keywords=${keyword}`)
}
//手机登录
export function phoneLogin(phone,password){
    return axios.get(`http://localhost:3000/login/cellphone?phone=${phone}&password=${password}`)
}
//获取用户详情
export function userDetail(uid){
    return axios.get(`http://localhost:3000/user/detail?uid=${uid}`)
}

export default{
    getBanner,getMusicList,getplayList,getLyric,searchMusic,phoneLogin,userDetail
}