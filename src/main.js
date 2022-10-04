import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

const CustomerAxios = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

const app = createApp(App);
app.use(VueSweetalert2);
app.use(VueAxios, CustomerAxios);
app.mount('#app');
