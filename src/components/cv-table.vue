<script>
export default {
  name: "cv-table",
  props: {
    data_source: {
      type: Function,
    },
    search_source: {
      type: Function,
    },
    enable_search: {
      type: Boolean,
      default: true
    },
    enable_selection: {
      type: Boolean,
      default: false
    },
    on_selection_change: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      table_data: [],
      current_page: 1,
      total_page: -1,
      page_size: 10,
      search_content: "",
      search_results: [],
    }
  },
  mounted() {
    this.change_page(1)
  },
  methods: {
    reload() {
      this.data_source(1, (page_info) => {
        if (page_info === undefined) {
          return;
        }

        this.total_page = page_info["total"]
        this.page_size = page_info["pageSize"]
        this.current_page = page_info["pageNum"]
        this.table_data = page_info["list"];
      })
    },
    change_page(target) {
      if (this.search_content !== undefined && this.search_content.trim() !== "") {
        if (this.search_results === undefined) {
          return;
        }

        this.current_page = target;

        if (target > 0 && target <= this.search_results.length) {
          this.table_data = this.search_results[target - 1]
        } else {
          this.table_data = undefined;
        }

        return;
      }

      this.data_source(target, (page_info) => {
        if (page_info === undefined) {
          return;
        }

        this.total_page = page_info["total"]
        this.page_size = page_info["pageSize"]
        this.current_page = page_info["pageNum"]
        this.table_data = page_info["list"];
      })
    },
    search() {
      if (this.search_content === undefined || this.search_content.trim() === "") {
        this.search_results = undefined;
        this.table_data = [];
        this.change_page(1)
        return;
      }

      this.search_source(this.search_content, (page_info) => {
        if (page_info === undefined) {
          return;
        }
        this.total_page = page_info["total"];
        this.current_page = 1

        const raw_list = page_info["list"];
        if (raw_list.length <= 0) {
          this.search_results = undefined
          this.table_data = undefined;
          return;
        }

        const datas = [];

        for (let i = 0; i < raw_list.length; i += this.page_size) {
          datas.push(raw_list.slice(i, i + this.page_size));
        }

        this.search_results = datas;
        this.table_data = datas[0];
      })
    }
  }

}
</script>

<template>
  <el-table class="table" @selection-change="on_selection_change" :data="table_data" stripe :header-cell-style="{ backgroundColor: 'rgb(var(--mdui-color-surface-container))' }" :cell-style="{ backgroundColor: 'rgb(var(--mdui-color-surface-container))' }">
    <el-table-column type="selection" v-if="enable_selection"/>
    <slot/>
  </el-table>

  <div :style="{ marginTop: '15px' }">
    <el-input v-if="enable_search" v-model="search_content" placeholder="搜索" @input="search"></el-input>

    <el-pagination :style="{ marginTop: '15px' }"
                   :current-page="current_page"
                   :page-size="page_size"
                   :total="total_page"
                   @current-change="change_page">
    </el-pagination>
  </div>
</template>

<style scoped>
.table {
  background: rgb(var(--mdui-color-surface-container));
}
</style>