import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import InputTestResult from "../InputTestResult.vue";

describe("InputTestResult", () => {
	it("renders properly", () => {
		const wrapper = mount(InputTestResult, {
			props: {
				fullName: "True positives",
				name: "tp1",
				total: 100,
				modelValue: 10,
			},
		});
		expect(wrapper.text()).toContain("True positives:");
		expect(wrapper.text()).toContain("10");
		expect(wrapper.find("#tp1").element).toBeInstanceOf(HTMLInputElement);
	});
	it("computes correctly 1", () => {
		const wrapper = mount(InputTestResult, {
			props: {
				name: "tp1",
				fullName: "True positives",
				total: 50,
				modelValue: 20,
			},
		});
		expect(wrapper.text()).toContain("40%");
	});
	it("computes correctly 2", () => {
		const wrapper = mount(InputTestResult, {
			props: {
				name: "tp1",
				fullName: "True positives",
				total: 3,
				modelValue: 1,
			},
		});
		expect(wrapper.text()).toContain("33.33%");
	});
	it("computes correctly 3", () => {
		const wrapper = mount(InputTestResult, {
			props: {
				name: "tp1",
				fullName: "True positives",
				total: 6,
				modelValue: 1,
			},
		});
		expect(wrapper.text()).toContain("16.67%");
	});
});
