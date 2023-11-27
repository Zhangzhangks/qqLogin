import { createApp } from 'vue'

import App from './App.vue'
import roruter from './components/router/route'
const app = createApp(App)

app.use(roruter)
app.mount('#app')
