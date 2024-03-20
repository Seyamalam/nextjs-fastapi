export const API_LABEL_STRUCTURE = [
	{ api: "/api/predict_tomato", label: "Predict Tomato" },
	{ api: "/api/predict_potato", label: "Predict Potato" },
	{ api: "/api/predict_jute", label: "Predict Jute" },
	{ api: "/api/predict_lime", label: "Predict Lime" },
	{ api: "/api/predict_orange", label: "Predict Orange" },
	{ api: "/api/predict_apple", label: "Predict Apple" },
	{ api: "/api/predict_paddy", label: "Predict Paddy" },
	{ api: "/api/predict_strawberry", label: "Predict Strawberry" },
	{ api: "/api/predict_pepper", label: "Predict Pepper" },
	{ api: "/api/predict_mango", label: "Predict Mango" },
];

export const API_PATHS = API_LABEL_STRUCTURE.map((item) => item.api);
export const API_LABELS = API_LABEL_STRUCTURE.map((item) => item.label);
