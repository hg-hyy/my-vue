<template>
  <el-row type="flex" justify="center">
    <el-col :span="8">
      <el-link :underline="false">
        Copyright©.Your Website {{ new Date().getFullYear() }}.</el-link
      >
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'bottom',
  props: {
    msg: { type: String, default: 'test msg' }
  }
}
</script>
<style></style>
