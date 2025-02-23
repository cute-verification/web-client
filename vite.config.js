import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VarletImportResolver} from "@varlet/import-resolver";
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: (tag) => tag.startsWith('mdui-')
            }
        }),
        components({
            resolvers: [VarletImportResolver()]
        }),
        autoImport({
            resolvers: [VarletImportResolver({ autoImport: true })]
        })
    ],
})
