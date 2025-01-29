/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 * 
 * 
 * 
 * 
 *  });
 * ```
 */



import { createApp } from 'vue';
import App from './App.vue';
import router from './renderer/router';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VRadio, VRadioGroup } from 'vuetify/components';
const vuetify = createVuetify({
    components: {
        VRadio,
        VRadioGroup
      },
    theme: {
        defaultTheme: 'light',
        //
      },
  })
  
createApp(App)
.use(router)
.use(vuetify)
.mount('#app');

import './index.css';

console.log('👋 This message is being logged by "renderer.js", included via Vite');
