<template>
  <el-row :gutter="24" type="flex">
    <el-col :xs="8" :sm="6" :md="4" :lg="20" :xl="18">
      <el-image :src="src" :fit="fit" style="height:780px" />
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
          <h3>Sign up</h3>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" style="margin-top:16px">
        <el-col :span="24">
          <form>
            <el-col :span="12" style="padding-right:8px">
              <el-input placeholder="First name *" suffix-icon="el-icon-email" v-model="firstname" />
            </el-col>
            <el-col :span="12" style="padding-left:8px">
              <el-input placeholder="Last name *" suffix-icon="el-icon-email" v-model="lastname" />
            </el-col>
            <el-input placeholder="Email Address *" suffix-icon="el-icon-email" v-model="email" />

            <el-input placeholder="Password *" suffix-icon="el-icon-password" v-model="password" />

            <el-checkbox
              v-model="checked"
            >I want to receive inspiration,promotions,updates via email.</el-checkbox>
            <el-button type="primary" style="margin-top:16px;width:100%" @click="handlesubmit">注册</el-button>
          </form>
        </el-col>
      </el-row>

      <el-row type="flex" justify="end">
        <el-col :span="14">
          <el-link href="#">Already have an account? Sign in</el-link>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "signup",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      checked: "",
      src: require("../../assets/images/unsplash/shifaaz.jpg"),
      fit: "cover",
      url: "http://127.0.0.1:8000/blog/regist/"
    };
  },
  methods: {
    handlesubmit: function() {
      if (this.username === "" || this.password === "") {
        this.msg = "用户名和密码不能为空！";
        return;
      }
      let newUser = {
        Username: this.fullname,
        Email: this.username,
        Password: this.password
      };
      this.signup({ url: this.url, newUser: newUser });
    },
    ...mapActions(["signup"])
  },
  computed: {
    fullname: function() {
      return this.firstname + this.lastname;
    },
    ...mapState(["msg", "isAuthenticated"])
  },
  watch: {
    isAuthenticated: function() {
      if (this.isAuthenticated) {
        this.$router.push("/");
      }
    }
  }
};
</script>
<style scoped>
.el-input {
  margin-bottom: 20px;
}
</style>
