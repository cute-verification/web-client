<script>
import {delete_restriction, restore_restriction, restrictions} from "../../../api/requests.js";
import router, {is_current_path_equals} from "../../../router/index.js";
import CvTable from "../../../components/cv-table.vue";
import UserInfo from "../users/user-info.vue";
import RestrictionInfo from "./restriction-info.vue";
import '@mdui/icons/add.js';
import SmoothTransition from "../../../components/smooth-transition.vue";
import {snackbar} from "mdui";
import CoupleTimePicker from "../../../components/couple-time-picker.vue";
import CreateRestriction from "./create-restriction.vue";

export default {
  name: 'restrictions',
  components: {CreateRestriction, CoupleTimePicker, SmoothTransition, RestrictionInfo, UserInfo, CvTable},
  computed: {
    is_info_page_shown() {
      return is_current_path_equals("/admin/index/restrictions/info")
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    data_source(target, then) {
      restrictions(target, true, (response) => {
        if (!response["success"]) {
          return;
        }

        const data = response["data"];
        const page_info = data["page-info"]

        const now = new Date().getTime()
        const list = []

        const available_function = ((startAt, expireAt) => {
          if (now >= startAt && now <= expireAt) {
            return "是"
          }
          if (now >= startAt && now >= expireAt) {
            return "否"
          }
          return "否"
        })
        const deleted_function = ((deleted) => {
          if (deleted) {
            return "是"
          }
          return "否"
        })

        page_info["list"].forEach((restriction) => {
          const startAt = restriction["start-at"]
          const expireAt = restriction["expire-at"]
          const start_at = new Date(startAt).getTime()
          const expire_at = new Date(expireAt).getTime()

          list.push({
            id: restriction["id"],
            "create-at": restriction["create-at"],
            "start-at": startAt,
            "expire-at": expireAt,
            "available": available_function(start_at, expire_at),
            "deleted": deleted_function(restriction["deleted"]),
            username: restriction["administrator"]["username"]
          })
        })

        then({
          total: page_info["total"],
          pageSize: page_info["pageSize"],
          pageNum: page_info["pageNum"],
          list: list
        })
      })
    },
    info_page(id) {
      router.push({
        path: "/admin/index/restrictions/info",
        query: {
          id: id
        }
      })
    },
    popup_create_restriction_dialog() {
      const dialog = document.querySelector(".create-restriction-dialog")
      dialog.open = !dialog.open
    },
    submit_creation() {
      this.$refs.creation.submit()
    },
    create_restriction_finished() {
      this.popup_create_restriction_dialog()
      this.$refs["restriction-table"].reload()
    },
    delete_restriction(id) {
      delete_restriction(id, (response) => {
        const success = response["success"]
        if (!success) {
          snackbar({ message: "删除失败" })
          return
        }

        this.$refs["restriction-table"].reload()
        snackbar({ message: "删除成功" })
      })
    },
    restore_restriction(id) {
      restore_restriction(id, (response) => {
        const success = response["success"]
        if (!success) {
          snackbar({ message: "恢复失败" })
          return
        }

        this.$refs["restriction-table"].reload()
        snackbar({ message: "恢复成功" })
      })
    }
  }
}
</script>

<template>
  <div class="root-container" v-if="!is_info_page_shown">
    <h1 class="title" :style="{ display: 'flex', alignItems: 'center' }">
      限制管理
      <mdui-fab variant="secondary"
                icon="add"
                :style="{ marginLeft: '20px' }"
                @click="popup_create_restriction_dialog"/>
    </h1>

    <el-card class="container">
      <cv-table :data_source="data_source" :enable_search="false" ref="restriction-table">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="create-at" label="创建时间"/>
        <el-table-column property="start-at" label="开始时间"/>
        <el-table-column property="expire-at" label="过期时间"/>
        <el-table-column property="available" label="生效中"/>
        <el-table-column property="deleted" label="已删除"/>
        <el-table-column property="username" label="创建者 (管理员)"/>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <mdui-button-icon @click="info_page(scope.row.id)">
              <mdui-icon-info></mdui-icon-info>
            </mdui-button-icon>

            <mdui-button variant="tonal" v-if="scope.row.deleted === '否'" @click="delete_restriction(scope.row.id)">删除</mdui-button>
            <mdui-button variant="tonal" v-if="scope.row.deleted === '是'" @click="restore_restriction(scope.row.id)">恢复</mdui-button>
          </template>
        </el-table-column>
      </cv-table>
    </el-card>
  </div>

  <div v-else>
    <restriction-info/>
  </div>

  <mdui-dialog class="create-restriction-dialog"
               close-on-esc
               close-on-overlay-click
               headline="创建限制">
    <create-restriction :on-creation-finished="create_restriction_finished" ref="creation"/>
    <mdui-button slot="action" variant="text" @click="popup_create_restriction_dialog">取消</mdui-button>
    <mdui-button slot="action" variant="tonal" @click="submit_creation">确定</mdui-button>
  </mdui-dialog>


</template>

<style scoped>

</style>