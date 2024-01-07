import "virtual:uno.css";
import "@unocss/reset/sanitize/sanitize.css";
import "@unocss/reset/sanitize/forms.css";
import "@unocss/reset/sanitize/typography.css";
import "@/assets/base.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
