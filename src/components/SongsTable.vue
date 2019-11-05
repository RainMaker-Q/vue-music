<template>
<div el-container direction="vertical" >
  <!-- <div el-header>Music</div> -->
  <div class="swiper-container">

      <div class="swiper-wrapper" >
          <div class="swiper-slide"><img src="../assets/music1.jpg" alt="my_music" class="pic-music"></div>
          <div class="swiper-slide"><img src="../assets/music2.jpg" alt="my_music" class="pic-music"></div>
          <div class="swiper-slide"><img src="../assets/music3.jpg" alt="my_music" class="pic-music"></div>
      </div>

      <div class="swiper-pagination"></div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- <div class="swiper-scrollbar"></div> -->
  </div>

    
    <el-row id="search" type="flex" justify="center">
      <el-col :span=6><el-input v-model.trim="searchContent" @keyup.enter.native="searchSongs" placeholder="请输入你要搜索的歌曲"></el-input></el-col>
      <el-button @click="searchSongs" type="primary" icon="el-icon-search" class="btn-search">搜索</el-button>
    </el-row>
  

    <div el-container style="">
      <!-- <div el-aside width="200px">Aside</div>   -->
      <div el-main>
        <el-row :gutter="20">
          <el-col :span="10" :offset="8">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%; margin-top:30px;">
                
                <el-table-column
                prop="song"
                label="歌曲"
                width="180">
                </el-table-column>

                <el-table-column
                prop="author"
                label="作者"
                width="180">
                </el-table-column>

                <el-table-column
                prop="album"
                label="专辑名"
                width="180">
                
                </el-table-column>

                <el-table-column
                prop="musicUrl"
                label="试听"
                width="180">
                <template slot-scope="scope">
                  <el-button @click="getSong(scope.$index)" type="primary">点击试听</el-button>
                </template>
                </el-table-column>
            </el-table>
          </el-col>

          <el-col :span="6" :offset="0">    
            <aplayer 
              style="position: fixed;"
              v-if="isShow"
              ref="player"
              :autoplay="true"
              :float="true"
              :show-lrc="true"
              :music="curMusic"
              :list="playList"
            />
          </el-col>
          
        </el-row>
          
        
      </div>
    </div>
</div>
</template>



<script>
import axios from 'axios'
import Aplayer from 'vue-aplayer'
import Swiper from 'swiper'
// import VueParticles from 'vue-particles'
import 'swiper/css/swiper.min.css'


const baseUrl = 'http://39.100.6.159:3000';

  export default {
    components: {
      Aplayer: Aplayer,
      // VueParticles: VueParticles
    },
    data() {
      return {
        isShow: false,
        searchContent: '',
        tableData: [],
        lyric: '',
        curMusic: {
          title: '测试',
          artist: '测试专用',
          src: 'http://m7.music.126.net/20191011114003/a89eb54eee4e54c549993e02fd8e48b1/ymusic/d940/afd5/420d/ed5b8c930036f688e5273245495895ec.mp3',
        },
        playList: []
        
      }
    },
    mounted() {

      console.log('挂在成功')
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true,

        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        //   draggable: true,
        // },
        autoplay: { 
          delay: 3500,
          disableOnInteraction: false,
        },
      })
    },
    methods: {
      // cellClick(row, column, cell, event) {
      //   console.log(row.id);
      // },

      searchSongs() { //搜索所有的歌曲
        let _this = this;
        let url = baseUrl + '/search?keywords=' + this.searchContent;   //得到URL
        axios.get(url)
          .then(function(response) {
            let songs = response.data.result.songs;   //获取所有的歌曲
            _this.tableData = [];   //清空数据
            console.log( songs );
            for (let index = 0; index < songs.length; index++) {
              let { id, name, album, artists} = songs[index]; //ES6的解构
              album = album.name;                         //获取专辑名
              artists = artists[0].name;                  //获取作者名
              _this.tableData.push( {id: id, song: name, album: album, author: artists} )
            }
          })
          .catch(function(error) {
              console.log( error )
          })
      },
      getSong(row) { //获取歌曲的URL
        let _this = this; 
        let songId = this.tableData[row].id;
        let url = baseUrl + '/song/url?id=' + songId;
        this.isShow = false;   //显示播放器

        this.getLyric(songId);  //获取音乐的歌词

        axios.get(url)
          .then(function(response) {
            let musicUrl = response.data.data[0].url;   //获取当前音乐的URL
            let obj = {};
            obj.title = _this.tableData[row].song;     //歌名
            obj.artist = _this.tableData[row].author   //作者
            obj.src = musicUrl;                        //音乐的URL
            obj.lrc =_this.lyric;                      //音乐的歌词
            obj.pic = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2031484106,1715533673&fm=26&gp=0.jpg';
            _this.playList.push( obj );
            _this.curMusic = obj;
            console.log(_this.$refs.player)
            // _this.$refs.player.onAudioPlay();
            _this.$nextTick(function() {      //在下一个tick重新渲染，就会重新刷新播放列表
              _this.isShow = true;   //显示播放器

            })
          })
          .catch(function(error) {
            console.log(error);
          })

      },
      getLyric(id) {  //获取歌词
        let _this = this;
        let url = baseUrl + '/lyric?id=' + id;
        axios.get(url)
          .then(function(response) {
            _this.lyric = response.data.lrc.lyric;  //获取歌词
          })
          .catch(function(error) {
            console.log(error);
          })
      }
    },
    props:{
      // inputContent: String
    }

  }
</script>


<style  scoped>
.pic-music {
  width: 500px;
  height: 300px;
  margin-bottom: 50px;
}

.btn-search {
  margin-left: 10px;
}

.swiper-container {
    width: 500px;
    height: 300px;
    margin-bottom: 50px;
    border-radius: 10%;
}
</style>
