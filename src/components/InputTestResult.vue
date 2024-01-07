<template>
	<label :for="props.name"> {{ props.fullName }}:</label>
	<InputNumber v-model="model" :id="props.name" :min="0" />
	<p class="break-all">
		{{
			total != 0
				? +((model / total + Number.EPSILON) * 100).toFixed(2) + "%"
				: ""
		}}
	</p>
</template>
<script setup lang="ts">
import InputNumber from "./InputNumber.vue";
const props = defineProps<{ total: number; name: string; fullName: string }>();
const model = defineModel<number>({ default: 0 });
</script>
