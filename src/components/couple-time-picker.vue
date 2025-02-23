<script>
import {snackbar} from "mdui";

export default {
  name: 'couple-time-picker',
  props: {
    on_reset: {
      type: Function,
      default: undefined
    },
    on_finish: {
      type: Function,
      default: undefined
    },
    on_date_picker_status_change: {
      type: Function,
      default: undefined,
    }
  },
  data() {
    return {
      expand_date_picker: false,
      expand_time_picker: false,
      date_pick_result: "",
      time_pick_result: "",
      final_pick_result: ""
    }
  },
  methods: {
    reset_pickers(reset_result) {
      this.expand_date_picker = false
      this.expand_time_picker = false

      if (reset_result) {
        this.date_pick_result = ""
        this.time_pick_result = ""
        this.final_pick_result = ""
      }

      if (this.on_reset !== undefined) {
        this.on_reset()
      }
    },
    toggle_date_picker() {
      this.expand_date_picker = true
      this.expand_time_picker = false
    },
    expand_date_picker_() {
      this.expand_date_picker = true
    },
    expand_time_picker_() {
      this.expand_time_picker = true
    },
    shrink_date_picker() {
      this.expand_date_picker = false
    },
    shrink_time_picker() {
      this.expand_time_picker = false
    },
    toggle_time_picker() {
      this.expand_date_picker = false
      this.expand_time_picker = true
    },
    final_pick_result() {
      return this.final_pick_result
    },
    finish_time_picker() {
      if (this.date_pick_result.trim() === "" || this.time_pick_result.trim() === "") {
        snackbar({ message: "无效输入" })
        return
      }

      this.final_pick_result = this.date_pick_result + " " + this.time_pick_result
      this.expand_date_picker = false
      this.expand_time_picker = false

      if (this.on_finish !== undefined) {
        this.on_finish(this.date_pick_result, this.time_pick_result)
      }
    }
  }
}
</script>

<template>
  <var-collapse-transition :expand="expand_date_picker">
    <var-date-picker v-model="date_pick_result" :style="{ marginTop: '10px' }"/>
    <div :style="{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
      <var-button :style="{ margin: '10px' }" @click="reset_pickers(true)">取消</var-button>
      <var-button @click="toggle_time_picker">下一步</var-button>
    </div>
  </var-collapse-transition>

  <var-collapse-transition :expand="expand_time_picker">
    <var-time-picker v-model="time_pick_result" format="24hr" use-seconds :style="{ marginTop: '10px' }"/>
    <div :style="{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
      <var-button :style="{ margin: '10px' }" @click="reset_pickers(true)">取消</var-button>
      <var-button @click="toggle_date_picker">上一步</var-button>
      <var-button @click="finish_time_picker">确定</var-button>
    </div>
  </var-collapse-transition>
</template>

<style scoped>

</style>