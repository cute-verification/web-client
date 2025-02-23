<script>
import {on_mounted} from "./utils/theme.js";
import {useDark, useToggle} from "@vueuse/core";
import router, {is_current_path_equals} from "./router/index.js";
import {current_token} from "./utils/storage.js";
import {useRouter} from "vue-router";

export default {
  name: 'app',
  mounted() {
    on_mounted(() => {
      return useDark()
    }, (isDark) => {
      return useToggle(isDark);
    })

    const routes = router.getRoutes()
    const paths = routes.map(route => {
      return route.path
    })

    setTimeout(() => {
      const current_path = router.currentRoute.value.path
      if (paths.includes(current_path)) {
        if (!current_token() && is_current_path_equals("/admin/login")) {
          router.push("/admin/login")
          return
        }
        if (current_token() && is_current_path_equals("/admin/login")) {
          router.push("/admin/index")
        }
      } else {
        if (current_token()) {
          router.push("/admin/index")
          return
        }
        router.push("/admin/login")
      }
    })
  },
}
</script>

<template>
  <router-view class="mdui-theme-auto"></router-view>
</template>

<style scoped>
.mdui-theme-auto {
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  display: none;
}

body {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
