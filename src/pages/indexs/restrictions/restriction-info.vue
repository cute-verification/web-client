<script>
import router from "../../../router/index.js";
import {
  restriction_affected_identifications,
  restriction_affected_users,
  restriction_info
} from "../../../api/requests.js";
import CvTable from "../../../components/cv-table.vue";
import {snackbar} from "mdui";

export default {
  name: 'restriction-info',
  components: {CvTable},
  data() {
    return {
      id: '',
      affected_identifications: [],
      affected_users: [],
      deleted: false
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    this.id = params.get('id');
    if (!this.id) {
      router.push("/admin/index/restrictions")
      return
    }

    restriction_info(this.id, (response) => {
      const success = response["success"]
      if (!success) {
        return
      }

      const data = response["data"]
      const restriction = data["restriction"]
      this.deleted = restriction["deleted"]
    })

    restriction_affected_identifications(this.id, false, (response) => {
      const success = response["success"]
      if (!success) {
        return
      }

      const data = response["data"]
      this.affected_identifications = data["identifications"]
      this.$refs.affected_identifications_table.reload()
    })

    restriction_affected_users(this.id, (response) => {
      const success = response["success"]
      if (!success) {
        return
      }

      const data = response["data"]
      this.affected_users = data["users"]
      this.$refs.affected_users_table.reload()
    })
  },
  methods: {
    data_source_affected_identifications(target, then) {
      const datas = []

      for (let i = 0; i < this.affected_identifications.length; i += 10) {
        datas.push(this.affected_identifications.slice(i, i + 10))
      }

      const data = datas[target - 1]

      then({
        total: this.affected_identifications.length,
        page_size: 10,
        current_page: target,
        list: data
      })
    },
    data_source_affected_users(target, then) {
      const datas = []

      for (let i = 0; i < this.affected_users.length; i += 10) {
        datas.push(this.affected_users.slice(i, i + 10))
      }

      const data = datas[target - 1]

      then({
        total: this.affected_users.length,
        page_size: 10,
        current_page: target,
        list: data
      })
    }
  }

}
</script>

<template>
  <div class="root-container">
    <h1 class="title" :style="{ display: 'flex', alignItems: 'center' }">
      限制 id {{ id }} 能影响到的识别码
      <mdui-chip v-if="deleted" :style="{ marginLeft: '5px' }">已删除</mdui-chip>
    </h1>

    <el-card class="container">
      <cv-table ref="affected_identifications_table" :data_source="data_source_affected_identifications" :enable_search="false">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="code" label="内容"/>
      </cv-table>
    </el-card>

    <h4 class="subtitle">该限制能影响到的用户</h4>
    <el-card class="container">
      <cv-table ref="affected_users_table" :data_source="data_source_affected_users" :enable_search="false">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="username" label="用户名"/>
        <el-table-column property="last_login_time" label="上次登录"/>
      </cv-table>
    </el-card>
  </div>
</template>

<style scoped>

</style>