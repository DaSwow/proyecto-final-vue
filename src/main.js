import axios from 'axios'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import App from './App.vue'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
  })
  

const app = createApp(App)
app.use(VueAxios, axios)
app.use(vuetify)



axios.defaults.baseURL = "http://localhost:3000/"

app.mount('#app')
