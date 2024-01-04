<template>
	<main class="flex flex-col p-3">
		<div class="grid gap-5 dataInputs justify-center groups">
			<section v-for="(group, i) in groups">
				<GroupData
					:name="group[0]"
					v-model="data[i]"
					:total="total.size"
					:isTotal="false"
				></GroupData>
			</section>
		</div>
		<div class="flex flex-row my-4 children:h-5 h-5">
			<div
				v-for="(group, i) in groups"
				class="flex place-items-center justify-center text-white"
				:class="{ '!hidden': sizes[i] == 0 }"
				:style="{
					flex: (sizes[i] / total.size) * 100,
					backgroundColor: group[1],
				}"
			>
				<span>{{ group[0] }}</span>
			</div>
		</div>
		<section>
			<GroupData
				:name="'Total'"
				v-model="total"
				:total="total.size"
				:isTotal="true"
			></GroupData>
		</section>
	</main>
</template>
<script setup lang="ts">
import GroupData from "@/components/GroupData.vue";
import { reactive, computed } from "vue";
const groups = [
	["A", "#dc2626"],
	["B", "#2563eb"],
	["C", "#16a34a"],
];
const data = [
	reactive({ tp: 0, fp: 0, fn: 0, tn: 0 }),
	reactive({ tp: 0, fp: 0, fn: 0, tn: 0 }),
	reactive({ tp: 0, fp: 0, fn: 0, tn: 0 }),
];
const sizes = computed(() => data.map((d) => d.tp + d.fp + d.fn + d.tn));
const total = computed(() => ({
	...data.reduce(
		(acc, cur) => ({
			tp: acc.tp + cur.tp,
			fp: acc.fp + cur.fp,
			fn: acc.fn + cur.fn,
			tn: acc.tn + cur.tn,
		}),
		{ tp: 0, fp: 0, fn: 0, tn: 0 }
	),
	size: sizes.value.reduce((acc, cur) => acc + cur, 0),
}));
</script>
<style scoped>
.groups {
	grid-template-columns: repeat(
		auto-fit,
		minmax(min(400px, 90vw), max-content)
	);
}
</style>
