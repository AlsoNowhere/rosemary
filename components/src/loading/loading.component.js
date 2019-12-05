import React from "react";

export const Loading = () => {
	return (
		<svg viewBox="0 0 150 150" className="block width height spin">
			<circle cx="75" cy="75" r="60" style={{fill:"transparent",stroke:"#888",strokeDasharray:300,strokeWidth:"15px",strokeLinecap:"round"}} />
		</svg>
	);
}
