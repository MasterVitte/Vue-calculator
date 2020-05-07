// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase/app'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {App},
    template: '<App/>',
    created() {
        const firebaseConfig = {
            apiKey: "AIzaSyAyI9NEkt_ep5dFynAzKXYpud4i_FPFKbw",
            authDomain: "potolok-online.firebaseapp.com",
            databaseURL: "https://potolok-online.firebaseio.com",
            projectId: "potolok-online",
            storageBucket: "potolok-online.appspot.com",
            messagingSenderId: "43011000015",
            appId: "1:43011000015:web:b7e193d771c6a1c3ea59ba",
            measurementId: "G-7GL2JTHJ6X"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }
})

