<script>
import {records, search_records} from "../../api/requests.js";
import CvTable from "../../components/cv-table.vue";

export default {
  name: "records",
  components: {CvTable},
  methods: {
    data_source(target, then) {
      records(target, (response) => {
        if (!response["success"]) {
          return;
        }

        const data = response["data"];
        const page_info = data["page-info"]

        then(page_info)
      })
    },
    search_source(search_content, then) {
      search_records(search_content, (response) => {
        if (!response["success"]) {
          return;
        }

        const data = response["data"];
        const page_info = data["page-info"];
        then(page_info)
      });
    },
  }
}
</script>

<template>
  <div class="root-container">
    <h1 class="title">操作记录</h1>

    <el-card class="container">
      <cv-table :data_source="data_source" :search_source="search_source">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="invoker" label="操作者"/>
        <el-table-column property="time" label="时间"/>
        <el-table-column property="ip" label="IP"/>
        <el-table-column property="message" label="信息"/>
      </cv-table>
    </el-card>
  </div>
</template>

<style scoped>
</style>