import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
	plugins: [Vue(), UnoCSS()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
