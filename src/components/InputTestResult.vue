<template>
	<label :for="props.name"> {{ props.fullName }}:</label>
	<InputNumber
		@input="(e) => (model = (e.value as number | null ?? 0))"
		:inputId="props.name"
		:min="0"
		inputClass="rounded-md py-1 px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:border-blue-600 w-full"
	/>
	<p>
		{{
			total != 0
				? +((model / total + Number.EPSILON) * 100).toFixed(2) + "%"
				: ""
		}}
	</p>
</template>
<script setup lang="ts">
import InputNumber from "primevue/inputnumber";

const props = defineProps<{ total: number; name: string; fullName: string }>();
const model = defineModel<number>({ default: 0 });
</script>
