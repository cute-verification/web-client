<script>
import router from "../../../router/index.js";
import {
  identification_info,
  identification_available_restrictions,
  identification_expired_restrictions
} from "../../../api/requests.js";
import CvTable from "../../../components/cv-table.vue";
import {snackbar} from "mdui";
import IdentificationSourceTable from "../../../components/identification-source-table.vue";

export default {
  name: 'identification-info',
  components: {IdentificationSourceTable, CvTable},
  data() {
    return {
      id: '',
      code: '',
      available_restrictions: [],
      expired_restrictions: [],
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    this.id = params.get('id');
    if (!this.id) {
      router.push("/admin/index/identifications")
      return
    }

    identification_available_restrictions(this.id, true, (response) => {
      const success = response["success"]
      if (!success) {
        return
      }

      const data = response["data"]
      this.available_restrictions = data["restrictions"]
      this.$refs.available_restrictions_table.reload()
    })

    identification_expired_restrictions(this.id, true, (response) => {
      const success = response["success"]
      if (!success) {
        return
      }

      const data = response["data"]
      this.expired_restrictions = data["restrictions"]
      this.$refs.expired_restrictions_table.reload()
    })
  },
  methods: {
    data_source_identification_sources(target, then) {
      const datas = [];

      for (let i = 0; i < this.identification_sources.length; i += 10) {
        datas.push(this.identification_sources.slice(i, i + 10));
      }

      const data = datas[target - 1]
      then({
        total: this.identification_sources.length,
        page_size: 10,
        current_page: target,
        list: data
      })
    },
    data_source_identification_available_restrictions(target, then) {
      const datas = [];

      for (let i = 0; i < this.available_restrictions.length; i += 10) {
        datas.push(this.available_restrictions.slice(i, i + 10));
      }

      const data = datas[target - 1]
      then({
        total: this.available_restrictions.length,
        page_size: 10,
        current_page: target,
        list: data
      })
    },
    data_source_identification_expired_restrictions(target, then) {
      const datas = [];

      for (let i = 0; i < this.expired_restrictions.length; i += 10) {
        datas.push(this.expired_restrictions.slice(i, i + 10));
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
    <h1 class="title">识别码 {{ code }} 的提供记录</h1>

    <identification-source-table id="{{ id }}" code="{{ code }}" />

    <h4 class="subtitle">正在对该识别码生效的限制</h4>
    <el-card class="container">
      <cv-table ref="available_restrictions_table" :data_source="data_source_identification_available_restrictions" :enable_search="false">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="create-at" label="创建时间"/>
        <el-table-column property="start-at" label="开始时间"/>
        <el-table-column property="expire-at" label="过期时间"/>
        <el-table-column property="administrator.username" label="创建者 (管理员)"/>
      </cv-table>
    </el-card>

    <h4 class="subtitle">对该识别码已经失效的限制</h4>
    <el-card class="container">
      <cv-table ref="expired_restrictions_table" :data_source="data_source_identification_expired_restrictions" :enable_search="false">
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