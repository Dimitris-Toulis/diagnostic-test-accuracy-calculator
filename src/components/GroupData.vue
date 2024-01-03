<template>
	<div class="flex flex-col place-items-center gap-4">
		<h2>
			{{ !props.isTotal ? "Group " + props.name : props.name }}
		</h2>
		<div class="grid flex-1 grid-cols-3 gap-2 place-items-center">
			<template v-if="!props.isTotal">
				<InputTestResult
					v-for="classification in [
						['tp', 'True positives'],
						['fp', 'Falses positives'],
						['fn', 'False negatives'],
						['tn', 'True negatives'],
					]"
					:total="size"
					:name="classification[0] + props.name"
					:fullName="classification[1]"
					v-model="data[classification[0] as 'tp'|'fp'|'fn'|'tn']"
				></InputTestResult>
			</template>
			<template v-else>
				<ComputedValue
					v-for="classification in [
						['tp', 'True positives'],
						['fp', 'Falses positives'],
						['fn', 'False negatives'],
						['tn', 'True negatives'],
					]"
					:to="size"
					:name="classification[1]"
					:val="data[classification[0] as 'tp'|'fp'|'fn'|'tn']"
					percent
				></ComputedValue>
			</template>

			<ComputedValue
				name="Group Size"
				:to="props.total"
				:val="size"
				percent
			></ComputedValue>
			<ComputedValue
				name="With target condition"
				:to="size"
				:val="data.tp + data.fn"
				percent
			></ComputedValue>
			<ComputedValue
				name="Without target condition"
				:to="size"
				:val="data.fp + data.tn"
				percent
			></ComputedValue>
			<ComputedValue
				name="Sensitivity"
				:to="data.tp + data.fn"
				:val="data.tp"
			></ComputedValue>
			<ComputedValue
				name="Specificity"
				:to="data.tn + data.fp"
				:val="data.tn"
			></ComputedValue>
			<ComputedValue
				name="Positive predictive value"
				:to="data.tp + data.fp"
				:val="data.tp"
			></ComputedValue>
			<ComputedValue
				name="Negative predictive value"
				:to="data.tn + data.fn"
				:val="data.tn"
			></ComputedValue>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import InputTestResult from "./InputTestResult.vue";
import ComputedValue from "./ComputedValue.vue";
const props = defineProps<{ name: string; total: number; isTotal: boolean }>();
const data = defineModel({
	default: { tp: 0, fp: 0, fn: 0, tn: 0 },
});
const size = computed(
	() => data.value.tp + data.value.fp + data.value.fn + data.value.tn
);
</script>
