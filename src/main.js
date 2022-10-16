import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/permission'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createPinia} from "pinia/dist/pinia";
import { library } from "@fortawesome/fontawesome-svg-core"
import { faHatWizard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const app = createApp(App)
for(const [key,value] of Object.entries(ElementPlusIconsVue)){
    app.component(key,value)
}
const pinia = createPinia()
library.add(faHatWizard)
app.use(router)
    .use(ElementPlus)
    .use(pinia)
    .use(mavonEditor)
    .component('font-awesome-icon',FontAwesomeIcon)
    .mount('#app')
