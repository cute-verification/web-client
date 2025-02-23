<script>
import CoupleTimePicker from "../../../components/couple-time-picker.vue";
import CvTable from "../../../components/cv-table.vue";
import {create_restriction, identifications, search_identifications} from "../../../api/requests.js";
import {snackbar} from "mdui";

export default {
  name: 'create-restriction',
  components: {CvTable, CoupleTimePicker},
  props: {
    onCreationFinished: {
      type: Function,
      default: undefined
    },
  },
  data() {
    return {
      choose_start_time_message: "选择时间",
      final_start_time: 'now',
      choose_expire_time_message: "选择时间",
      final_expire_time: '',
      identification_selection: [],
    }
  },
  mounted() {
    const start_time_choose_button_group = document.querySelector(".start-time-choose-button-group")
    start_time_choose_button_group.addEventListener("change", () => {
      const couple_time_picker = this.$refs["couple-start-time-picker"]
      const value = start_time_choose_button_group.value

      if (value === "start-time-picker") {
        couple_time_picker.expand_date_picker_()
      }
      if (value === "" || value === "now") {
        couple_time_picker.reset_pickers(true)
        this.choose_start_time_message = "选择时间"
        this.final_start_time = "now"
      }
    })
  },
  methods: {
    reset_start_time_pick() {
      this.final_start_time = "now"

      this.choose_start_time_message = "选择时间"
      const start_time_choose_button_group = this.$refs["start-time-choose-button-group"]
      start_time_choose_button_group.value = "now"
    },
    finish_start_time_pick(date_pick_result, time_pick_result) {
      this.choose_start_time_message = date_pick_result + " " + time_pick_result
      this.final_start_time = date_pick_result + " " + time_pick_result
    },
    toggle_expire_time_picker() {
      const couple_time_picker = this.$refs["couple-expire-time-picker"]
      const expire_time_choose_button = this.$refs["expire-time-choose-button"]
      const selected = expire_time_choose_button.selected

      if (!selected) {
        couple_time_picker.expand_date_picker_()
      } else {
        couple_time_picker.reset_pickers(true)
      }

      expire_time_choose_button.selected = !selected
    },
    reset_expire_time_pick() {
      this.choose_expire_time_message = "选择时间"
      this.final_expire_time = ""

      const expire_time_choose_button = this.$refs["expire-time-choose-button"]
      expire_time_choose_button.selected = false
    },
    finish_expire_time_pick(date_pick_result, time_pick_result) {
      this.choose_expire_time_message = date_pick_result + " " + time_pick_result
      this.final_expire_time = date_pick_result + " " + time_pick_result
    },
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
    identification_selection_change(list) {
      this.identification_selection = list
    },
    submit() {
      let final_start_time = this.final_start_time
      let final_expire_time = this.final_expire_time
      const identification_selection = this.identification_selection

      if (final_start_time.trim() === "" || final_expire_time.trim() === "" || identification_selection.length <= 0) {
        snackbar({ message: "无效输入" })
        return
      }
      if (final_start_time === "now") {
        final_start_time = new Date().getTime()
      } else {
        final_start_time = new Date(final_start_time).getTime()
      }
      final_expire_time = new Date(final_expire_time).getTime()

      const identification_ids = []
      identification_selection.forEach((column) => {
        identification_ids.push(column.id)
      })

      console.log(final_start_time)
      console.log(final_expire_time)

      create_restriction(final_start_time, final_expire_time, identification_ids, (response) => {
        const success = response["success"]
        if (!success) {
          snackbar({ message: "创建失败" })
          return
        }
        snackbar({ message: "创建成功" })

        if (this.onCreationFinished !== undefined) {
          this.onCreationFinished()
        }
      })
    }
  }
}
</script>

<template>
  <div :style="{ display: 'flex', flexDirection: 'column' }">
    <span>开始时间</span>
    <mdui-segmented-button-group class="start-time-choose-button-group"
                                 ref="start-time-choose-button-group"
                                 selects="single"
                                 value="now"
                                 full-width
                                 :style="{ marginTop: '10px', overflow: 'hidden' }">
      <mdui-segmented-button value="now">现在</mdui-segmented-button>
      <mdui-segmented-button value="start-time-picker">{{ choose_start_time_message }}</mdui-segmented-button>
    </mdui-segmented-button-group>
    <couple-time-picker :on_reset="reset_start_time_pick" :on_finish="finish_start_time_pick" ref="couple-start-time-picker"/>

    <span :style="{ marginTop: '10px' }">过期时间</span>
    <mdui-chip @click="toggle_expire_time_picker" ref="expire-time-choose-button" :style="{ marginTop: '5px' }">{{ choose_expire_time_message }}</mdui-chip>
    <couple-time-picker :on_reset="reset_expire_time_pick" :on_finish="finish_expire_time_pick" ref="couple-expire-time-picker"/>

    <span :style="{ marginTop: '10px' }">选择识别码</span>
    <el-card class="container-secondary">
      <cv-table :data_source="data_source" :search_source="search_source" :enable_selection="true" :on_selection_change="identification_selection_change">
        <el-table-column property="id" label="ID"/>
        <el-table-column property="code" label="内容"/>
      </cv-table>
    </el-card>
  </div>
</template>

<style scoped>

</style>