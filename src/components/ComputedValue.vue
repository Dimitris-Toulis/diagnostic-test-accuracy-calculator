<template>
	<p>{{ props.name }}:</p>
	<p v-if="percent" class="break-all">{{ props.val }}</p>
	<p :class="{ 'col-span-2': !percent }">
		{{
			props.to != 0
				? percent
					? +((props.val / props.to + Number.EPSILON) * 100).toFixed(2) + "%"
					: (props.val / props.to + Number.EPSILON).toFixed(2)
				: ""
		}}
	</p>
</template>
<script setup lang="ts">
const props = defineProps<{
	val: number;
	to: number;
	name: string;
	percent?: boolean;
}>();
</script>
