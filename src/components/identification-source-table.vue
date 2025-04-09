<script>

import {identification_info} from "../api/requests.js";
import {snackbar} from "mdui";
import CvTable from "./cv-table.vue";

export default {
  name: 'identification-source-table',
  components: {CvTable},
  data() {
    return {
      id: '',
      code: '',
      sources: []
    }
  },
  methods: {
    load(id) {
      this.id = id
      identification_info(this.id, (response) => {
        const success = response["success"]
        if (!success) {
          snackbar({ message: '无法获取识别码提供记录' })
          return
        }
        const data = response["data"]
        const identification = data["identification"]
        this.code = identification["code"]

        this.sources = identification["sources"]
        this.$refs.sources_table.reload()
      })
    },
    data_source(target, then) {
      const datas = [];

      for (let i = 0; i < this.sources.length; i += 10) {
        datas.push(this.sources.slice(i, i + 10));
      }

      const data = datas[target - 1]
      then({
        total: this.sources.length,
        page_size: 10,
        current_page: target,
        list: data
      })
    },
  }
}

</script>

<template>
  <div class="root-container">
    <h1 class="title">识别码 {{ code }} 的提供记录</h1>

    <el-card class="container">
      <cv-table ref="sources_table" :data_source="data_source" :enable_search="false">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="user.username" label="提供者"/>
        <el-table-column property="ip" label="IP"/>
        <el-table-column property="platform" label="平台"/>
        <el-table-column property="time" label="时间"/>
      </cv-table>
    </el-card>
  </div>
</template>

<style scoped>

</style>