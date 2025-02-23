<script>
import {current_token} from "../utils/storage.js";
import '@mdui/icons/menu.js';
import '@mdui/icons/more-vert.js';
import '@mdui/icons/person.js';
import '@mdui/icons/near-me.js';
import {info_server} from "../api/requests.js";
import {token_username} from "../utils/token-parse.js";
import router from "../router/index.js";
import ListItem from "../components/list-item.vue";
import '@mdui/icons/access-time.js';
import '@mdui/icons/code.js';
import '@mdui/icons/admin-panel-settings.js';
import '@mdui/icons/logout.js';
import '@mdui/icons/close.js';
import '@mdui/icons/error-outline.js';

export default {
  name: "index",
  components: {List_item: ListItem},
  data() {
    return {
      server_info: {
        info_name: "",
        info_version: "",
        info_time: {
          start: "",
          current: ""
        },
        info_jvm: {
          version: "",
          uptime: "",
          vendor: "",
          arguments: [],
        },
        info_os: {
          name: "",
          version: "",
          architecture: ""
        },
      },
      interval_id: -1,
      username: "",
      drawer_width: 0,
      main_width: 0,
      root_container_width: 0
    }
  },
  mounted() {
    if (!current_token()) {
      this.$router.push("/admin/login");
    } else {
      this.interval_id = setInterval(() => {
        info_server((response) => {
          const success = response["success"]
          if (!success) {
            return
          }

          const data = response["data"]
          const server = data["info"]

          this.server_info.info_name = server["name"]
          this.server_info.info_version = server["version"]

          const time = server["time"]
          this.server_info.info_time.start = time["start"]
          this.server_info.info_time.current = time["current"]

          const jvm = server["jvm"]
          this.server_info.info_jvm.version = jvm["version"]
          this.server_info.info_jvm.uptime = jvm["uptime"]
          this.server_info.info_jvm.vendor = jvm["vendor"]
          this.server_info.info_jvm.arguments = jvm["arguments"]

          const os = server["os"]
          this.server_info.info_os.name = os["name"]
          this.server_info.info_os.version = os["version"]
          this.server_info.info_os.architecture = os["architecture"]
        })
      }, 200)

      this.username = token_username(current_token())

      const current_path = router.currentRoute.value.path
      if (current_path === "/admin/index" || current_path === "/admin/index/") {
        console.log("redirect to /admin/index/current")
        this.switch_page("/current")
      }

      const navigation_drawer = this.$refs["navigation-rawer"]
      this.drawer_width = window.getComputedStyle(navigation_drawer).width.replace("px", "")
      this.main_width = window.innerWidth - this.drawer_width

      const item_collapse = document.querySelector(".item-collapse")
      item_collapse.value = [
        "current-administrator",
        "user-management",
        "identification-management",
        "restriction-management",
        "records"
      ]

      window.addEventListener("resize", () => {
        const navigation_drawer = this.$refs["navigation-rawer"]
        const drawer_width = window.getComputedStyle(navigation_drawer).width.replace("px", "")
        this.main_width = window.innerWidth - drawer_width
      })
    }
  },
  beforeUnmount() {
    if (this.interval_id !== -1) {
      clearInterval(this.interval_id)
    }
  },
  methods: {
    switch_page(name) {
      if (!current_token()) {
        router.push("/admin/login");
        return
      }

      router.push("/admin/index" + name)
    },
    process_argument_texts() {
      const texts = []

      this.server_info.info_jvm.arguments.forEach((text) => {
        texts.push(text)
        texts.push("\n")
      })

      this.server_info.info_jvm.processed_arguments = texts.join("")
    }

  }
}
</script>

<template>
  <mdui-layout>
    <mdui-navigation-drawer
        open
        ref="navigation-rawer"
        class="navigation-drawer">
      <div class="navigation-drawer-inner">
        <mdui-card class="main-name-card">
          <h3 class="main-name">CuteVerification 管理系统</h3>
        </mdui-card>

        <mdui-list>
          <mdui-collapse class="item-collapse">
            <mdui-collapse-item value="current-administrator">
              <mdui-list-item slot="header" icon="account_circle--outlined" @click="switch_page('/current')">{{ username }}</mdui-list-item>
            </mdui-collapse-item>

            <mdui-collapse-item value="user-management">
              <mdui-list-item icon="manage_accounts--outlined" @click="switch_page('/users')">用户管理</mdui-list-item>
            </mdui-collapse-item>

            <mdui-collapse-item value="identification-management">
              <mdui-list-item icon="code--outlined" @click="switch_page('/identifications')">识别码管理</mdui-list-item>
            </mdui-collapse-item>

            <mdui-collapse-item value="restriction-management">
              <mdui-list-item icon="close--outlined" @click="switch_page('/restrictions')">限制管理</mdui-list-item>
            </mdui-collapse-item>

            <mdui-collapse-item value="records">
              <mdui-list-item icon="schedule--outlined" @click="switch_page('/records')">操作记录</mdui-list-item>
            </mdui-collapse-item>
          </mdui-collapse>
        </mdui-list>
      </div>
    </mdui-navigation-drawer>

    <mdui-top-app-bar class="header" :style="{ height: '100px' }">
      <el-tooltip
          effect="dark"
          placement="bottom"
          aria-multiline="true"
      >
        <template #content>
          软件版本: {{ server_info.info_version }}
          <mdui-divider/>
          时间:
          <br/>
          启动时间: {{ server_info.info_time.start }}
          <br/>
          收集时间: {{ server_info.info_time.current }}
          <mdui-divider/>
          Jvm:
          <br/>
          运行时间: {{ (server_info.info_jvm.uptime / 1000) + ' 秒' }}
          <br/>
          厂商: {{ server_info.info_jvm.vendor }}
          <br/>
          版本: {{ server_info.info_jvm.version }}
          <br/>
          <mdui-divider/>
          系统:
          <br/>
          名称: {{ server_info.info_os.name }}
          <br/>
          版本: {{ server_info.info_os.version }}
          <br/>
          架构: {{ server_info.info_os.architecture }}
        </template>
        <h1 :style="{ fontSize: '30px' }">{{ server_info.info_name }}</h1>
      </el-tooltip>
    </mdui-top-app-bar>

    <mdui-layout-main>
      <router-view></router-view>
    </mdui-layout-main>
  </mdui-layout>
</template>

<style>
.navigation-drawer {
  height: 100%;
  background: rgb(var(--mdui-color-surface-container));
  border-radius: var(--mdui-color-surface-container);
}

.navigation-drawer-inner {
  height: 100%;
  background: rgb(var(--mdui-color-surface-container));
}

.main-name-card {
  width: 100%;
  height: 100px;
  background: rgb(var(--mdui-color-surface-container-highest));
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  height: 100px;
  background: rgb(var(--mdui-color-surface-container));
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>