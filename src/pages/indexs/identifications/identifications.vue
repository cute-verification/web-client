<script>
import {identifications, search_identifications} from "../../../api/requests.js";
import CvTable from "../../../components/cv-table.vue";
import '@mdui/icons/info.js';
import router, {is_current_path_equals} from "../../../router/index.js";
import IdentificationInfo from "./identification-info.vue";

export default {
  name: 'identifications',
  components: {IdentificationInfo, Identification_info: IdentificationInfo, CvTable},
  computed: {
    is_info_page_shown() {
      return is_current_path_equals("/admin/index/identifications/info")
    }
  },
  methods: {
    data_source(target, then) {
      identifications(target, false, (response) => {
        if (!response["success"]) {
          return;
        }

        const data = response["data"];
        const page_info = data["page-info"]

        then(page_info)
      })
    },
    search_source(search_content, then) {
      search_identifications(search_content, false, (response) => {
        if (!response["success"]) {
          return;
        }

        const data = response["data"];
        const page_info = data["page-info"];
        then(page_info)
      })
    },
    info_page(id) {
      router.push({
        path: "/admin/index/identifications/info",
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
    <h1 class="title">识别码管理</h1>

    <el-card class="container">
      <cv-table :data_source="data_source" :search_source="search_source">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="code" label="内容"/>
        <el-table-column fixed="right" label="提供记录">
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
    <identification-info/>
  </div>
</template>

<style scoped>
</style>