import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import Vant from "vant";
import "vant/lib/index.css";
import { store } from "./utils/store";
import { router } from "./utils/router";




let app = createApp(App);
app.use(Vant);
app.use(router);
app.use(store);
app.mount("#app");
