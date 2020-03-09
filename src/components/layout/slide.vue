<template slot="title">
  <div id="slide" class="hidden-md-and-down">
    
      <el-row class='avatar'>
        <el-col :span="7" style="height:66px">
          <el-avatar
            shape="circle"
            :size="64"
            :src="url"
            style="margin-top:1px"
          />
        </el-col>
        <el-col :span="12" style="height:66px">
          <h5 style="margin-top:17px">Huang</h5>
        </el-col>
      </el-row>
    
    <el-menu
      default-active="/"
      class="slide"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      style="border-top:2px solid red"
      router
    >
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">Dashboard</span>
        </template>
        <el-menu-item-group title="my vue app">
          <el-divider />
          <el-menu-item index="/" route
            ><i class="el-icon-s-home"></i>
            <span slot="title">Home</span></el-menu-item
          >
          <el-menu-item index="/admin"
            ><i class="el-icon-message"></i>
            <span slot="title">Admin</span></el-menu-item
          >
          <el-menu-item index="/Blog"
            ><i class="el-icon-camera"></i>
            <span slot="title">Blog</span></el-menu-item
          >
          <el-menu-item index="/Profile"
            ><i class="el-icon-user"></i>
            <span slot="title">Profile</span></el-menu-item
          >
          <el-divider />
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/Show">
        <i class="el-icon-menu"></i>
        <span slot="title">Show</span>
      </el-menu-item>

      <el-menu-item index="/signin">
        <i class="el-icon-lock"></i>
        <span slot="title">Sign in</span>
      </el-menu-item>

      <el-menu-item index="/signup">
        <i class="el-icon-setting"></i>
        <span slot="title">Sign up</span>
      </el-menu-item>
      <el-menu-item index="/route" route="route">
        <i class="el-icon-setting"></i>
        <span slot="title">TEST</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'slide',
  props: {
    isCollapse: Boolean,
    handleToggle: Function
  },
  data() {
    return {
      islogin: false,
      fits: ['contain'],
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      route: { path: '/signup', name: 'signup' }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.slide:not(.el-menu--collapse) {
  width: 240px;
  height: 896px;
}
.slide {
  width: 73px;
  height: 896px;
}
.is-active{
  background-color:purple
}
.avatar{
  width: 73px;
}
.bg {
  position: 'absolute';
  z-index: '1';
  height: 'calc(100vh - 66px)';
  width: '100%';
  display: 'block';
  top: '66px';
  left: '0';
  background-size: 'cover';
  background-image: 'url(https://source.unsplash.com/random)';
  background-position: 'center center';
}
.bg:after {
  position: 'absolute';
  z-index: '3';
  width: '100%';
  height: '100%';
  content: '""';
  display: 'block';
  background: '#000';
  opacity: '.5';
}
sidebarWrapper {
  position: 'relative';
  height: 'calc(100vh - 66px)';
  overflow: 'auto';
  width: '240px';
  z-index: '4';
}
drawerOpen {
  width: 240;
}
drawerClose {
  width: 73;
}
</style>
