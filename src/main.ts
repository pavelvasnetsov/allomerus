import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import router from './router'
import store from './store'
import GlobalComponents from "@/global/components";

loadFonts();

const app = createApp(App);

GlobalComponents.forEach(component => {
    app.component(component.name, component);
})

app
    .use(store)
    .use(router)
    .use(vuetify)
    .mount('#app')
