import { createApp } from 'vue'
import App from './App.vue'

import SketchRule from '../component/user-ruler.vue'
const app = createApp(App)
app.use(SketchRule)

app.mount('#app')
