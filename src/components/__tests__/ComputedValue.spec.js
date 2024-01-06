import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ComputedValue from "../ComputedValue.vue";

describe("ComputedValue", () => {
	it("renders properly", () => {
		const wrapper = mount(ComputedValue, {
			props: { name: "Value1", to: 100, val: 20, percent: true },
		});
		expect(wrapper.text()).toContain("Value1");
		expect(wrapper.text()).toContain("20");
	});
	it("computes correctly in percentage mode 1", () => {
		const wrapper = mount(ComputedValue, {
			props: { name: "Value1", to: 50, val: 20, percent: true },
		});
		expect(wrapper.text()).toContain("40%");
	});
	it("computes correctly in percentage mode 2", () => {
		const wrapper = mount(ComputedValue, {
			props: { name: "Value1", to: 3, val: 1, percent: true },
		});
		expect(wrapper.text()).toContain("33.33%");
	});
	it("computes correctly in percentage mode 3", () => {
		const wrapper = mount(ComputedValue, {
			props: { name: "Value1", to: 6, val: 1, percent: true },
		});
		expect(wrapper.text()).toContain("16.67%");
	});

	it("computes correctly in value mode 1", () => {
		const wrapper = mount(ComputedValue, {
			props: { name: "Value1", to: 10, val: 1, percent: false },
		});
		expect(wrapper.text()).not.toContain("10%");
		expect(wrapper.text()).toContain("0.10");
	});
	it("computes correctly in value mode 2", () => {
		const wrapper = mount(ComputedValue, {
			props: { name: "Value1", to: 3, val: 1, percent: false },
		});
		expect(wrapper.text()).not.toContain("33.33%");
		expect(wrapper.text()).toContain("0.33");
	});
	it("computes correctly in value mode 3", () => {
		const wrapper = mount(ComputedValue, {
			props: { name: "Value1", to: 6, val: 1, percent: false },
		});
		expect(wrapper.text()).not.toContain("16.67%");
		expect(wrapper.text()).not.toContain("16.66%");
		expect(wrapper.text()).not.toContain("0.2");
		expect(wrapper.text()).not.toContain("0.16");
		expect(wrapper.text()).toContain("0.17");
	});
	it("computes correctly in value mode 4", () => {
		const wrapper = mount(ComputedValue, {
			props: { name: "Value1", to: 1000, val: 4, percent: false },
		});
		expect(wrapper.text()).not.toContain("0.01");
		expect(wrapper.text()).toContain("0.00");
	});
	it("computes correctly in value mode 5", () => {
		const wrapper = mount(ComputedValue, {
			props: { name: "Value1", to: 1000, val: 5, percent: false },
		});
		expect(wrapper.text()).toContain("0.01");
		expect(wrapper.text()).not.toContain("0.00");
	});
});
