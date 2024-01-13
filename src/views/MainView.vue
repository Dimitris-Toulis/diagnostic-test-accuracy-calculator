<template>
	<main class="flex flex-col p-3 gap-4">
		<h1 class="text-center">Diagnostic Test Accuracy Calculator</h1>
		<div class="flex gap-2 justify-center flex-wrap">
			<Button @click="saveButtonClick">Save Data</Button>
			<Button @click="importButtonClick">Import Data</Button>
			<Button @click="reset">Reset</Button>
			<Button @click="fillSample">Use sample data</Button>
		</div>
		<div class="grid gap-5 dataInputs justify-center groups">
			<section v-for="([name, _], i) in groups">
				<GroupData
					:name="name"
					v-model="data[i]"
					:total="total.size"
					:isTotal="false"
				></GroupData>
			</section>
		</div>
		<div class="flex flex-row children:h-5 h-5">
			<div
				v-for="([name, color], i) in groups"
				class="flex place-items-center justify-center text-white"
				:class="{ '!hidden': sizes[i] == 0 }"
				:style="{
					flex: (sizes[i] / total.size) * 100,
					backgroundColor: color,
				}"
			>
				<span>{{ name }}</span>
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
import Button from "@/components/Button.vue";
import GroupData from "@/components/GroupData.vue";
import { reactive, computed } from "vue";
import { save, importData } from "@/lib/dataSaveImport";

const groups = [
	["A", "#dc2626"],
	["B", "#2563eb"],
	["C", "#16a34a"],
];
const defaultGroup = () => ({
	tp: 0,
	fp: 0,
	fn: 0,
	tn: 0,
});
const data = [
	reactive(defaultGroup()),
	reactive(defaultGroup()),
	reactive(defaultGroup()),
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
		defaultGroup()
	),
	size: sizes.value.reduce((acc, cur) => acc + cur, 0),
}));

function reset() {
	data.forEach((group) => {
		group.tp = 0;
		group.fp = 0;
		group.fn = 0;
		group.tn = 0;
	});
}
function saveButtonClick() {
	save(data);
}
async function importButtonClick() {
	const newData = await importData();
	if (newData == null) return;
	console.log(newData);

	// 3 groups only
	Object.assign(data[0], newData[0]);
	Object.assign(data[1], newData[1] || defaultGroup());
	Object.assign(data[2], newData[2] || defaultGroup());
}

const sample = [
	{ tp: 250, fp: 100, fn: 150, tn: 1100 },
	{ tp: 500, fp: 230, fn: 103, tn: 300 },
	{ tp: 96, fp: 6, fn: 12, tn: 127 },
];
function fillSample() {
	if (data.some((group) => Object.values(group).some((val) => val != 0))) {
		if (!confirm("Are you sure?")) return;
	}
	Object.assign(data[0], sample[0]);
	Object.assign(data[1], sample[1]);
	Object.assign(data[2], sample[2]);
}
</script>
<style scoped>
.groups {
	grid-template-columns: repeat(
		auto-fit,
		minmax(min(400px, 90vw), max-content)
	);
}
</style>
