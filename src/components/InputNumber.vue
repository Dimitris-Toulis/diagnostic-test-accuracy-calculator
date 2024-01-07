<template>
	<input
		type="number"
		v-model="value"
		@beforeinput="(e)=>numberBeforeInput(e as InputEvent)"
		@input="(e)=>numberInput(e as InputEvent)"
		class="rounded-md py-1 px-2 w-full border-gray-400 border-1 focus:ring-2 ring-blue-300 focus:outline-none hover:border-blue-700 focus:border-blue-700"
	/>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
const model = defineModel<number>();

const value = ref<number | "">("");
watch(value, (val) => (model.value = val || 0));

function numberBeforeInput(e: InputEvent) {
	if (e.data?.length === 1 && /\D/.test(e.data)) {
		e.preventDefault();
	}
}
function numberInput(e: InputEvent) {
	const elem = e.target as HTMLInputElement;
	if (elem.value.startsWith("0")) {
		elem.value = parseInt(elem.value).toString();
	}
}
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
input[type="number"] {
	-moz-appearance: textfield;
	appearance: textfield;
}
</style>
