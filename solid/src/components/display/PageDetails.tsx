const detailBars = (
	<svg
		width="236"
		viewBox="0 0 366 395"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect
			x="262"
			width="104"
			height="452"
			fill="white"
			fill-opacity="0.2"
		/>
		<rect
			x="131"
			y="161"
			width="104"
			height="381"
			fill="white"
			fill-opacity="0.2"
		/>
		<rect
			y="266"
			width="104"
			height="331"
			fill="white"
			fill-opacity="0.2"
		/>
	</svg>
);

const detailSquares = (
	<svg
		width="288"
		viewBox="0 0 368 350"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect
			x="237.5"
			y="74"
			width="115"
			height="115"
			transform="rotate(30 237.5 74)"
			fill="white"
			fill-opacity="0.2"
		/>
		<rect
			x="335.591"
			y="271.488"
			width="56.1286"
			height="56.1286"
			transform="rotate(55.224 335.591 271.488)"
			fill="white"
			fill-opacity="0.2"
		/>
		<rect
			y="-21.7959"
			width="144"
			height="144"
			transform="rotate(-17.0427 0 -21.7959)"
			fill="white"
			fill-opacity="0.2"
		/>
	</svg>
);

export default function PageDetails() {
	return (
		<>
			<div
				class="fixed left-0 pl-4 -bottom-8 animate-bounce"
				style="animation-duration: 6s;"
			>
				{detailBars}
			</div>
			<div
				class="fixed right-5 pr-4 top-0 animate-scale origin-top-left"
				style="animation-duration: 10s;"
			>
				{detailSquares}
			</div>
		</>
	);
}
