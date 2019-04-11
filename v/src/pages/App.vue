<template>
<div>
   <h2 class="title">优酷电影大全</h2>
   <ul class="movie">
      <li class="movie-item" v-for="item in data" v-key="item.id" @click="toDetail(item.link)">
          <img class="item-img" :src="item.img" alt="">
          <div class="item-text">
            <h2 class="text-title">{{item.title}}</h2>
            <p class="text-desc" v-for="(desc,index) in item.desc.split(';')" v-key="index">{{desc}}</p>
          </div>
      </li>
    </ul>
    <div class="load-more" @click="loadMore">
      加载更多
    </div>
</div>

</template>

<style lang="less" scoped>
.title {
  position: fixed;
  top: 0;
  width: 100%;
  line-height: 0.8rem;
  text-align: center;
  background: #ffffff;
  border: 1px solid #c3c3c3;
  font-size: 20px;
}
.movie {
  padding-top: 0.8rem;
  list-style: none;
  font-size: 12px;
  .movie-item {
    display: flex;
    height: 2rem;
    padding: 0.25rem;
    .item-img {
      height: 100%;
    }
    .item-text {
      padding-left: 0.2rem;
      padding-right: 0.2rem;
    }
    .text-desc {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
}
.load-more {
  font-size: 14px;
  line-height: 0.8rem;
  text-align: center;
  background-color: #f2f2f2;
}
</style>

<script>
import Axios from "axios";
export default {
  data: function() {
    return {
      data: [],
      pageIndex: 1
    };
  },
  methods: {
    toDetail(link) {
      window.open(link);
    },
    loadMore() {
      this.pageIndex += 1;
      this.getData();
    },
    getData() {
      Axios.get(`/youku-free-movie/${this.pageIndex}`).then(res => {
        let data = this.data;
        data = data.concat(res.data);
        this.data = data;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
