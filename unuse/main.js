
import { createApp } from 'vue'
import App from './App.vue'
// import '../lib/style.css'
import SketchRule from "@/unuse/component/user-ruler.vue";
const app = createApp(App)
app.use(SketchRule);

// const MyComponent = app.component('SketchRule')
// console.log(MyComponent, 'MyComponentMyComponent')
app.mount('#app')
