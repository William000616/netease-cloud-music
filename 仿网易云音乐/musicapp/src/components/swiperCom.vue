<template>
<div id="swiperCom">
  <swiper :modules="modules" :pagination="{ clickable: true }">
    <swiper-slide v-for="(item,i) in imgs" :key="i"><img :src="item.pic"></swiper-slide>
  </swiper>
</div>
  
</template>

<script>
  import SwiperClass, { Pagination } from 'swiper'
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import axios, { Axios } from 'axios';
  import {getBanner} from '@/api/index'
  import 'swiper/css'
  import 'swiper/css/pagination'

  
  export default {
    data:function(){
      return{
        imgs:[
          {
            pic:require('../assets/img/lunbo1.webp')
          },
          {
            pic:require('../assets/img/lunbo2.webp')
          },
          {
            pic:require('../assets/img/lunbo3.webp')
          }
        ]
      }
      
    },
    components: {
      Swiper,
      SwiperSlide
    },
    setup() {
        
        return {
          modules: [Pagination]
      }
    },
    async mounted(){
      let res =await getBanner(1)
      this.imgs = res.data.banners
    }
    
    
  }
</script>
<style lang="less" scoped>
#swiperCom{
  width: 7.5rem;
}
.swiper-slide {
    width: 100%;
    height: 3rem;
}
.swiper-slide img{
    width: 100%;
    height: 100%;
    border-radius: 0.1rem;
    }
</style>