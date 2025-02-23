<script>
import {token_username} from "../../utils/token-parse.js";
import {current_token, delete_token} from "../../utils/storage.js";
import router from "../../router/index.js";
import {change_password, logout} from "../../api/requests.js";
import {snackbar} from "mdui";

export default {
  name: 'current-administrator',
  data() {
    return {
      username: '',
      change_password_input: {
        old_password: '',
        new_password: '',
        new_password_confirm: '',
      }
    }
  },
  mounted() {
    this.username = token_username()
  },
  methods: {
    change_password() {
      const old_password = this.change_password_input.old_password
      const new_password = this.change_password_input.new_password
      const new_password_confirm = this.change_password_input.new_password_confirm

      if (!old_password || !new_password || !new_password_confirm) {
        snackbar({ message: '请输入完整' })
        return
      }
      if (new_password !== new_password_confirm) {
        snackbar({ message: "重复的新密码不相同" })
        return
      }

      change_password(old_password, new_password, (response) => {
        if (response.success) {
          delete_token()
          router.push('/admin/login');
          snackbar({ message: '修改成功，请重新登录' })
          return
        }

        snackbar({ message: "修改失败" })
      });
    },
    popup_change_password_dialog() {
      const dialog = document.querySelector(".change-password-dialog")
      dialog.open = !dialog.open;
    },
    logout() {
      if (!current_token()) {
        router.push("/admin/login");
        return
      }

      logout(() => {
        delete_token()
        router.push("/admin/login")
      })
    },
  }
}
</script>

<template>
  <div class="root-container">
    <h1 class="title">{{ username }}</h1>

    <el-card class="container">
      <mdui-button class="container-item" @click="popup_change_password_dialog">修改密码</mdui-button>
      <mdui-button class="container-item" @click="logout">退出登录</mdui-button>
    </el-card>
  </div>

  <mdui-dialog class="change-password-dialog"
               close-on-esc
               close-on-overlay-click
               headline="修改密码">

    <mdui-text-field type="password"
                     :value="change_password_input.old_password"
                     @input="change_password_input.old_password = $event.target.value"
                     placeholder="旧密码"
                     toggle-password
                     :style="{ marginBottom: '15px' }"/>

    <mdui-text-field type="password"
                     :value="change_password_input.new_password"
                     @input="change_password_input.new_password = $event.target.value"
                     placeholder="新密码"
                     toggle-password
                     :style="{ marginBottom: '15px' }"/>

    <mdui-text-field type="password"
                     :value="change_password_input.new_password_confirm"
                     @input="change_password_input.new_password_confirm = $event.target.value"
                     placeholder="重复新密码"
                     toggle-password/>

    <mdui-button slot="action" variant="text" @click="popup_change_password_dialog">取消</mdui-button>
    <mdui-button slot="action" variant="tonal" @click="change_password">提交</mdui-button>
  </mdui-dialog>
</template>

<style scoped>
.container-item {
  margin-right: 15px;
}
</style>