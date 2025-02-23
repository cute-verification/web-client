<script>
import CvTable from "../../../components/cv-table.vue";
import router from "../../../router/index.js";
import {snackbar} from "mdui";
import {
  user_available_restrictions, user_expired_restrictions,
  user_identification_sources,
  user_info,
} from "../../../api/requests.js";

export default {
  name: 'user-info',
  components: {CvTable},
  data() {
    return {
      username: '',
      identification_sources: [],
      available_restrictions: [],
      expired_restrictions: []
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    this.id = params.get('id');
    if (!this.id) {
      router.push("/admin/index/users")
      return
    }

    user_info(this.id, (user_response) => {
      const success_user = user_response["success"]
      if (!success_user) {
        snackbar({ message: '无法获取用户数据' })
        router.push("/admin/index/users")
        return
      }

      const user_data = user_response["data"]
      const user = user_data["user"]
      this.username = user["username"]

      user_identification_sources(this.id, false, (response) => {
        const success = response["success"]
        if (!success) {
          return
        }
        const data = response["data"]
        this.identification_sources = data["identification-sources"]

        this.$refs.user_identification_sources_table.reload()
      })

      user_available_restrictions(this.id, true, (response) => {
        const success = response["success"]
        if (!success) {
          return
        }
        const data = response["data"]
        this.available_restrictions = data["restrictions"]

        this.$refs.user_available_restrictions_table.reload()
      })

      user_expired_restrictions(this.id, true, (response) => {
        const success = response["success"]
        if (!success) {
          return
        }
        const data = response["data"]
        this.expired_restrictions = data["restrictions"]

        this.$refs.user_expired_restrictions_table.reload()
      })
    })
  },
  methods: {
    data_source_user_identification_sources(target, then) {
      const datas = []

      for (let i = 0; i < this.identification_sources.length; i += 10) {
        datas.push(this.identification_sources.slice(i, i + 10))
      }

      const data = datas[target - 1]

      then({
        total: this.identification_sources.length,
        page_size: 10,
        current_page: target,
        list: data
      })
    },
    data_source_user_available_restrictions(target, then) {
      const datas = []

      for (let i = 0; i < this.available_restrictions.length; i += 10) {
        datas.push(this.available_restrictions.slice(i, i + 10))
      }

      const data = datas[target - 1]

      then({
        total: this.available_restrictions.length,
        page_size: 10,
        current_page: target,
        list: data
      })
    },
    data_source_user_expired_restrictions(target, then) {
      const datas = []

      for (let i = 0; i < this.expired_restrictions.length; i += 10) {
        datas.push(this.expired_restrictions.slice(i, i + 10))
      }

      const data = datas[target - 1]

      then({
        total: this.expired_restrictions.length,
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
    <h1 class="title">用户 {{ username }}</h1>

    <h4 class="subtitle">该用户的识别码提供记录</h4>
    <el-card class="container">
      <cv-table :data_source="data_source_user_identification_sources" :enable_search="false" ref="user_identification_sources_table">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="ip" label="IP"/>
        <el-table-column property="time" label="时间"/>
      </cv-table>
    </el-card>

    <h4 class="subtitle">正在对该用户生效的限制</h4>
    <el-card class="container">
      <cv-table :data_source="data_source_user_available_restrictions" :enable_search="false" ref="user_available_restrictions_table">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="create-at" label="创建时间"/>
        <el-table-column property="start-at" label="开始时间"/>
        <el-table-column property="expire-at" label="过期时间"/>
        <el-table-column property="administrator.username" label="创建者 (管理员)"/>
      </cv-table>
    </el-card>

    <h4 class="subtitle">对该用户已经失效的限制</h4>
    <el-card class="container">
      <cv-table :data_source="data_source_user_expired_restrictions" :enable_search="false" ref="user_expired_restrictions_table">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="create-at" label="创建时间"/>
        <el-table-column property="start-at" label="开始时间"/>
        <el-table-column property="expire-at" label="过期时间"/>
        <el-table-column property="administrator.username" label="创建者 (管理员)"/>
      </cv-table>
    </el-card>
  </div>
</template>

<style scoped>

</style>