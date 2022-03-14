<template>
  <div>这是一个朴实无华的登录按钮,点它!👉<el-button @click="loginThis">login</el-button></div>
</template>

<script>
  import { auth, login } from "../../network/auth";
  export default {
    methods: {
      loginThis() {
        login({}).then(_res => {
          let token = _res.data.token;
          if(token == null) {
            console.error("无效的用户!");
            return;
          }
          sessionStorage.setItem("token", token);
          auth({token}).then(res2 => {
            if(res2?.data?.user_info) {
              sessionStorage.setItem("role", res2.data.user_info.role);
              sessionStorage.setItem("name", res2.data.user_info.name);
              this.$router.push("/");
            } else {
              console.error("token认证失败!");
            }
          });
        }).catch(err => {
          console.error("获取token失败!",err);
        });
      }
    }
  };
</script>

<style scoped>
</style>
