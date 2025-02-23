<script>
import {login} from "../api/requests.js";
import {snackbar} from "mdui";
import {localize} from "../api/result_handler.js";
import {save_token, current_token} from "../utils/storage.js";
import router from "../router/index.js";
import {server_url} from "../api/services.js";

export default {
  name: "login",
  data() {
    return {
      processing: false,
      user_input: {
        username: '',
        password: '',
      },
      v_info_name: ""
    }
  },
  mounted() {
    this.v_info_name = server_url;
  },
  methods: {
    submit() {
      if (current_token()) {
        router.push("/admin/index")
        return
      }

      this.processing = true;
      let username = this.user_input.username;
      let password = this.user_input.password;

      if (!username) {
        this.processing = false;
        return;
      }
      if (!password) {
        this.processing = false;
        return;
      }

      login(username, password, (response) => {
        this.processing = false;

        let code = response["code"]
        let success = response["success"]

        if (success) {
          let data = response["data"]
          let token = data["token"]
          save_token(token)

          snackbar({message: "登录成功"})

          router.push("/admin/index")
        } else {
          snackbar({message: "登录失败: " + localize(code)})
        }
      })
    }
  }
}

</script>

<template>
  <div class="login-container">
    <div class="mdui-prose">
      <el-form :model="user_input"
               status-icon
               label-position="left"
               label-width="0px"
               class="login-page">
        <h3 class="_title">CuteVerification</h3>
        <h4 class="_subtitle">系统登录</h4>
        <el-form-item prop="username">
          <mdui-text-field type="text"
                           :value="user_input.username"
                           @input="user_input.username = $event.target.value"
                           placeholder="用户名"/>
        </el-form-item>
        <el-form-item prop="password">
          <mdui-text-field type="password"
                           :value="user_input.password"
                           @input="user_input.password = $event.target.value"
                           placeholder="密码"
                           toggle-password
          ></mdui-text-field>
        </el-form-item>
        <el-form-item style="width:100%;">
          <mdui-button type="button" style="width:100%;" @click="submit" :loading="processing">登录</mdui-button>
        </el-form-item>
        <p class="info">{{ v_info_name }}</p>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}

.info {
  color: grey;
}

.login-page {
  -webkit-border-radius: 5px;
  border-radius: 85px;
  width: 350px;
  padding: 50px 50px 30px;
  background: rgb(var(--mdui-color-surface-container-high));
  border: 1px solid rgb(var(--mdui-color-surface-container-high));
  box-shadow: 0 0 25px rgb(var(--mdui-color-surface-container-high));
  margin: 0;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

._title {
  text-align: center;
}

._subtitle {
  text-align: center;

}
</style>
