<template>
  <el-row :gutter="24" type="flex">
    <el-col :xs="8" :sm="6" :md="4" :lg="20" :xl="18">
      <el-image :src="src" :fit="fit" style="height:790px" />
    </el-col>

    <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="6">
      <el-row type="flex" justify="center" style="margin-top:50px">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="3">
          <el-avatar src>
            <i class="el-icon-lock"></i>
          </el-avatar>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="6">
          <h3>Sign in</h3>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" style="margin-top:16px">
        <el-col :span="24">
          <form>
            <el-input placeholder="Email Address *" suffix-icon="el-icon-email" v-model="username"></el-input>
            <el-input placeholder="Password *" suffix-icon="el-icon-password" v-model="password"></el-input>
            <el-checkbox v-model="checked">Remember me</el-checkbox>
            <p style="color:red" v-if="msg">{{ msg }}</p>
            <el-button type="primary" style="margin-top:16px;width:100%" @click="handlesubmit">登录</el-button>
          </form>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-between">
        <el-col :span="8">
          <el-link href="#">Forgot password?</el-link>
        </el-col>
        <el-col :span="16">
          <el-link href="#">Don't have an account? Sign Up</el-link>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: "signin",
  data() {
    return {
      username: "",
      password: "",
      checked: "",
      src: require("../../assets/images/unsplash/luo.jpg"),
      fit: "cover",
      // msg: '',
      url: "http://127.0.0.1:8000/blog/postman/"
    };
  },
  methods: {
    handlesubmit: function() {
      if (this.username === "" || this.password === "") {
        this.msg = "用户名和密码不能为空！";
        return;
      }
      let newUser = {
        email: this.username,
        password: this.password
      };
      // this.$store.dispatch("login", { url: this.url, newUser: newUser });
      this.login({ url: this.url, newUser: newUser })
    },
    ...mapActions(['login'])
  },
  computed: {
    ...mapState([
      "count", // 映射 this.count 为 store.state.count
      "msg",
      "isAuthenticated"
    ])
  },
  watch: {
    isAuthenticated: function() {
      if (this.isAuthenticated) {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    console.log(this.count);
    console.log(this.isAuthenticated);
    console.log(this.msg);
  }
};
</script>
<style scoped>
.el-input {
  margin-bottom: 20px;
}
</style>
