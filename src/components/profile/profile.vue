<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Profile{{ count }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="getcount"
        >
          About
        </el-button>
      </div>
      <div v-for="o in 1" :key="o" class="text item">
        <el-image :src="src"></el-image>
      </div>

      <el-collapse
        v-model="activeNames"
        @change="handleChange"
        v-for="c in collapse"
        :key="c.name"
      >
        <el-collapse-item :title="c.title" :name="c.name">
          <div>
            {{ c.d1 }}
            <el-progress
              :text-inside="true"
              :stroke-width="24"
              :percentage="52"
              status="success"
            ></el-progress>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'profile',
  data() {
    return {
      //   count: this.$store.state.count,
      msg: '用户资料',
      activeNames: ['1'],
      src: require('../../assets/images/unsplash/anh.jpg'),
      collapse: [{ title: 'Consistency', name: '1', d1: '资料完成' }]
    }
  },
  methods: {
    getcount: function() {
      console.log(this.$store.getters.getcount)
    },
    handleChange(val) {
      console.log(val)
    }
  },
  computed: {
    ...mapState([
      // 映射 this.count 为 store.state.count
      'count'
    ])
  }
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
