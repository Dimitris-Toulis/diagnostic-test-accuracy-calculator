export function save(
	data: { tp: number; fp: number; fn: number; tn: number }[]
) {
	const blob = new Blob([JSON.stringify({ fileVersion: 1, data })], {
		type: "application/json",
	});
	const blobURL = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = blobURL;
	a.download = "data.json";
	a.style.display = "none";
	document.body.append(a);
	a.click();
	setTimeout(() => {
		URL.revokeObjectURL(blobURL);
		a.remove();
	}, 1000);
}
export async function importData() {
	const file: File | null = await new Promise((resolve) => {
		const input = document.createElement("input");
		input.style.display = "none";
		input.type = "file";
		document.body.append(input);

		input.addEventListener("change", () => {
			input.remove();
			if (!input.files) {
				return null;
			}
			resolve(input.files[0]);
		});
		if ("showPicker" in HTMLInputElement.prototype) {
			input.showPicker();
		} else {
			input.click();
		}
	});
	if (file == null) return null;
	let contents: { fileVersion: number; data: object[] };
	try {
		contents = JSON.parse(await file.text());
	} catch (e) {
		alert("Invalid File");
		return null;
	}
	if (contents.fileVersion != 1) {
		alert("File is from older version of program");
		return null;
	} else return contents.data;
}
