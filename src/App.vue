<template>
  <div id="app">
    <el-container>
      <slide
        :isCollapse="isCollapse"
        :handleToggle="handleToggle"
        :openNotification="openNotification"
      />
      <el-container>
        <el-header height="66px">
          <navbar :isCollapse="isCollapse" :handleToggle="handleToggle" />
        </el-header>

        <el-main>
          <transition name="slide-fade">
          <router-view/>
          </transition>
        </el-main>

        <el-footer>
          <bottom />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import slide from './components/layout/slide.vue'
import navbar from './components/layout/navbar.vue'
import bottom from './components/layout/bottom.vue'
export default {
  name: 'app',
  components: {
    slide,
    navbar,
    bottom
  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleToggle() {
      this.isCollapse ? (this.isCollapse = false) : (this.isCollapse = true)
      this.openNotification()
    },
    openNotification() {
      this.$notification.open({
        message: '请注意！',
        description:
          !this.isCollapse?'菜单栏打开':'菜单栏关闭',
        onClick: () => {
          console.log('别点我，我痒')
        }
      })
    }
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all .1s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  transform-origin: 0 0;
  opacity: 0;
}
*:focus {
  outline: 0;
}

button:focus {
  outline: 0 !important;
}
a:focus,
a:active,
button:active,
button:focus,
button:hover,
button::-moz-focus-inner,
input[type='reset']::-moz-focus-inner,
input[type='button']::-moz-focus-inner,
input[type='submit']::-moz-focus-inner,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container {
  height: 100vh;

  overflow: auto;
}
body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  overflow: hidden;
}
</style>
