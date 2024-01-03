import "virtual:uno.css";
import "@unocss/reset/sanitize/sanitize.css";
import "@unocss/reset/sanitize/forms.css";
import "@unocss/reset/sanitize/typography.css";
import "@/assets/base.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
	unstyled: true,
});

app.mount("#app");
