<template>
    <div class="listView">
        <listview-top :playlist="state.playlist"></listview-top>
        <play-list :playlist="state.playlist"></play-list>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs} from 'vue'
import {getplayList} from '@/api/index.js'
import listviewTop from '@/components/listviewTop.vue'
import playList from '@/components/playList.vue'
import {useRoute} from 'vue-router'
import store from '@/store/index.js';
export default {
    setup () {
        const route = useRoute()
        const state = reactive({
            list:[],
            playlist:{
                creator:{},
                tracks:{}
            }
        })
        onMounted(async()=>{
            let id = route.query.id;
            let result = await getplayList(id);
            state.playlist = result.data.playlist
            store.commit('setPlaylist',state.playlist.tracks)
            console.log(result)
            console.log(route)
        })
        return {
            state
            
        }
    },
    components:{
        listviewTop,
        playList
    }
}
</script>

<style lang="scss" scoped>

</style>