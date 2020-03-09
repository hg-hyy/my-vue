<template>
  <el-row type="flex" justify="space-between" style="height:66px" align="middle" :gutter="0">
    <el-col :span="6">
      <el-row type="flex" justify="start" align="middle" :gutter="0">
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-message" circle @click="handleToggle" />
        </el-col>
        <el-col :span="12">
          <h5 style="text-align:center;margin-top:4px">MY VUE APP</h5>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-row type="flex" justify="space-between" align="middle" :gutter="0">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="input" size="medium">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-badge :value="12" class="item">
            <i class="el-icon-message-solid" style="margin-right:8px"></i>
          </el-badge>
          <i class="el-icon-user"></i>
          <el-button type="primary" icon="el-icon-search" @click="logout">Logout</el-button>
        </el-col>
        <el-col :span="4">
          <el-tag
            v-for="item in items"
            :key="item.label"
            :type="item.type"
            effect="dark"
          >{{ item.label }}</el-tag>
        </el-col>
        <el-col :span="4">
          <el-button @click="drawer = true" type="primary" icon="el-icon-menu" />
          <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :direction="direction"
            :with-header="false"
            size="240px"
          >
            <el-image :src="src" :fit="fit" />
            <el-link :underline="false">无下划线</el-link>
            <el-table :data="models">
              <el-table-column property="id" label="id" width="60"></el-table-column>
              <el-table-column property="name" label="name" width="90"></el-table-column>
              <el-table-column property="password" label="password"></el-table-column>
            </el-table>
          </el-drawer>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: "navbar",
  data() {
    return {
      input: "",
      drawer: false,
      direction: "rtl",
      src: require("../../assets/images/unsplash/CL1.jpg"),
      fit: ["cover"],
      models: [
        { id: 1, name: "hyy", password: "123" },
        { id: 2, name: "xujing", password: "456" },
        { id: 3, name: "fangmeng", password: "789" }
      ],
      items: [{ type: "success", label: "Administrator" }]
    };
  },
  props: {
    isCollapse: Boolean,
    handleToggle: Function
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleChange() {
      return false;
    },
    logout() {
      this.logout();
    },
    ...mapActions(['logout']),
  },
  computed: {
    reversedMessage: function() {
      return this.msg
        .split("")
        .reverse()
        .join("");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
  margin-top: 20px;
  margin-right: 40px;
}
</style>
