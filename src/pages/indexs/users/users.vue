<script>
import {search_users, users} from "../../../api/requests.js";
import CvTable from "../../../components/cv-table.vue";
import router, {is_current_path_equals} from "../../../router/index.js";
import User_info from "./user-info.vue";
import UserInfo from "./user-info.vue";

export default {
  name: "users",
  components: {UserInfo, User_info, CvTable},
  computed: {
    is_info_page_shown() {
      return is_current_path_equals("/admin/index/users/info")
    }
  },
  methods: {
    data_source(target, then) {
      users(target, (response) => {
        if (!response["success"]) {
          return;
        }

        const data = response["data"];
        const page_info = data["page-info"]

        then(page_info)
      })
    },
    search_source(search_content, then) {
      search_users(search_content, (response) => {
        if (!response["success"]) {
          return;
        }

        const data = response["data"];
        const page_info = data["page-info"];
        then(page_info)
      });
    },
    info_page(id) {
      router.push({
        path: "/admin/index/users/info",
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<template>
  <div class="root-container" v-if="!is_info_page_shown">
    <h1 class="title">用户管理</h1>

    <el-card class="container">
      <cv-table :data_source="data_source" :search_source="search_source">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="username" label="用户名"/>
        <el-table-column property="last_login_time" label="上次登录"/>
        <el-table-column fixed="right" label="信息">
          <template #default="scope">
            <mdui-button-icon @click="info_page(scope.row.id)">
              <mdui-icon-info></mdui-icon-info>
            </mdui-button-icon>
          </template>
        </el-table-column>
      </cv-table>
    </el-card>
  </div>

  <div v-else>
    <user-info/>
  </div>
</template>

<style scoped>

</style>