<template>
  <div>

    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/show' }">
          show
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/show/album' }">
          album
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/show/price' }">
          price
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/show/checkout' }">
          checkout
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/show/table' }">
          table
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
export default {
  name: 'show',
  components: {}
}
</script>
