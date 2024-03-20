"use client";

import { FormEvent } from "react";

import { API_LABEL_STRUCTURE, API_PATHS } from "@/CONSTANTS";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function Page() {
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const api = form.api.value;
		const picture = form.picture.files[0];

		if (!api || !picture) {
			alert("Please fill all the fields");
		}

		if (!API_PATHS.includes(api)) {
			alert("Invalid API");
		}

		try {
			const formData = new FormData();
			formData.append("picture", picture);

			const response = await fetch(api, {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
			console.log(data);
		} catch (error) {
			alert("An error occurred");
		}
	};

	return (
		<div className="container my-10">
			<form onSubmit={handleSubmit}>
				<div className="w-full max-w-sm space-y-4">
					<div className="grid items-center gap-1.5">
						<Label htmlFor="api">Choose what u wanna predict</Label>
						<Select name="api">
							<SelectTrigger>
								<SelectValue placeholder="Predict" />
							</SelectTrigger>

							<SelectContent>
								{API_LABEL_STRUCTURE.map((item, index) => (
									<SelectItem
										key={index}
										value={item.api}
									>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="grid items-center gap-1.5">
						<Label htmlFor="picture">Picture</Label>
						<Input
							id="picture"
							name="picture"
							type="file"
							accept="image/*"
						/>
					</div>

					<Button type="submit">Submit</Button>
				</div>
			</form>
		</div>
	);
}
