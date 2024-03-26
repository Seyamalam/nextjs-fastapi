import Image from "next/image";

import { supported_diseases } from "@/CONSTANTS";

import Dropzone from "@/components/Dropzone";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Page() {
	return (
		<main className="h-screen p-10">
			<Image
				src="/bg.jpeg"
				alt="background"
				fetchPriority="high"
				fill
				className="absolute top-0 left-0 w-full h-full object-cover blur-md -z-10"
			/>

			<h1 className="text-xl font-semibold text-center text-white bg-gray-800/50 p-5 rounded-lg m-10">
				Disclaimer: DeepLeaf, the plant leaf disease diagnosis app, does not
				trace or save any images or data uploaded by users. We prioritize user
				privacy and data security, and as such, all uploaded images are
				processed solely for the purpose of disease diagnosis and are not stored
				or used for any other purposes. We adhere to strict data protection
				standards and do not collect any personally identifiable information
				from users during the app's usage. Users can confidently use DeepLeaf
				knowing that their privacy and confidentiality are fully respected and
				protected.
			</h1>

			<Dropzone />

			<HoverCard>
				<HoverCardTrigger className="fixed bottom-0 left-0 m-3 bg-background w-6 h-6 text-sm font-semibold grid place-content-center rounded-full cursor-pointer">
					i
				</HoverCardTrigger>
				<HoverCardContent className="w-80 max-h-96 overflow-auto">
					<h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
						Supported Diseases
					</h2>
					<ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
						{supported_diseases.map((disease) => (
							<li
								key={disease}
								className="text-sm"
							>
								{disease}
							</li>
						))}
					</ul>

					<p className="mt-4 text-sm text-gray-600 dark:text-gray-500">
						More diseases will be added in the future.
					</p>
				</HoverCardContent>
			</HoverCard>
		</main>
	);
}
