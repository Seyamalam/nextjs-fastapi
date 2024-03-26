"use client";

import { DragEvent, useRef, useState } from "react";
import { LoaderCircleIcon, Upload } from "lucide-react";

const DRAG_OVER_CLASS = ["bg-zinc-400"];

export default function Dropzone() {
	const dropZone = useRef<HTMLDivElement>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [result, setResult] = useState<string>("");

	const sendImageToAPI = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("/api/predict", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("An error occured!");
			}

			const data = await response.json();
			setResult(JSON.stringify(data));
		} catch (error) {
			setResult((error as Error).message);
		}
	};

	const handleDrop = async (e: DragEvent<HTMLElement>) => {
		e.preventDefault();
		dropZone.current?.classList.remove(...DRAG_OVER_CLASS);

		// get file
		const files = e.dataTransfer?.files;
		if (!files?.length) return;

		const file = files[0];
		if (!file) return;

		setLoading(true);
		await sendImageToAPI(file);
		setLoading(false);

		// clear data
		e.dataTransfer.clearData();
	};

	const handleImageChange = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (!target?.files?.length) return;

		const file = target.files[0];
		if (!file) return;

		setLoading(true);
		await sendImageToAPI(file);
		setLoading(false);

		// clear the input
		target.value = "";
	};

	const handleClick = () => {
		// create a file input element
		const input = document.createElement("input");

		// set the attributes
		input.type = "file";
		input.accept = "image/*";
		input.multiple = true;

		// add event listener
		input.onchange = handleImageChange;

		// click the input
		input.click();

		// remove the input
		input.remove();
	};

	const dragDropEvents = {
		onClick: handleClick,
		onDrop: handleDrop,
		onDragStart: (e: DragEvent<HTMLElement>) => {
			e.preventDefault();
			e.stopPropagation();
			e.dataTransfer.clearData();
		},
		onDragOver: (e: DragEvent<HTMLElement>) => {
			e.preventDefault();
		},
		onDragEnter: (e: DragEvent<HTMLElement>) => {
			e.preventDefault();
			dropZone.current?.classList.add(...DRAG_OVER_CLASS);
		},
		onDragLeave: (e: DragEvent<HTMLElement>) => {
			e.preventDefault();
			dropZone.current?.classList.remove(...DRAG_OVER_CLASS);
		},
	};

	return (
		<div
			id="dropzone"
			role="button"
			ref={dropZone}
			className={`grid h-96 place-content-center rounded-lg transition-colors bg-gray-400/50 border-2 border-gray-800 border-dashed p-3 ${
				loading ? "pointer-events-none bg-gray-200 animate-pulse" : ""
			}`}
			{...dragDropEvents}
		>
			{!loading ? (
				<div className="pointer-events-none flex flex-col select-none items-center gap-1.5 rounded-lg p-5 px-6 bg-background/50">
					<Upload className="h-16 w-16" />
					<span className="text-xl font-semibold">
						Click or drag and drop to select a picture
					</span>
				</div>
			) : (
				<LoaderCircleIcon className="h-16 w-16 animate-spin" />
			)}
		</div>
	);
}
