import { Motion, Presence } from '@motionone/solid';
import { spring } from 'motion';
import { Accessor, Show } from 'solid-js';

export default function Buzzing({
	player,
}: {
	player: Accessor<Player | undefined>;
}) {
	return (
		<Presence>
			<Show when={player()}>
				<Motion.div
					initial={{
						scale: 0,
						y: 10,
					}}
					exit={{
						scale: 0,
						opacity: 0,
					}}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{
						duration: 0.4,
						easing: spring({ damping: 13, stiffness: 100 }),
					}}
					class="z-30 absolute top-0 right-0 left-0 bottom-0 pb-12 justify-center h-screen bg-[#7D1313] text-white"
				>
					<Motion.div
						initial={{
							scale: 0.4,
							y: 10,
							opacity: 0,
						}}
						exit={{
							scale: 0.4,
							y: 10,
							opacity: 0,
						}}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{
							duration: 0.4,
							easing: spring({ damping: 20 }),
						}}
						class="flex flex-col justify-center items-center relative z-10 h-full w-full"
					>
						<h1 class="text-2xl font-semibold text-opacity-90 mb-4">
							NOW BUZZING
						</h1>
						<h2 class="font-semibold text-6xl mb-4">
							{player()?.name}
						</h2>
						<h2 class="font-semibold text-6xl opacity-40 mb-4">
							{player()?.score}
						</h2>
					</Motion.div>
					<div class="absolute top-0 right-0 left-0 bottom-0 flex gap-6 px-6">
						<div class="triangle-background h-full w-full"></div>
						<div class="triangle-background h-full w-full rotate-180"></div>
						{/* <div class="triangle-background h-full w-full"></div> */}
						<div class="h-full w-full"></div>
						{/* <div class="h-full w-full"></div> */}
						<div class="h-full w-full"></div>
						{/* <div class="triangle-background h-full w-full"></div> */}
						<div class="triangle-background h-full w-full rotate-180"></div>
						<div class="triangle-background h-full w-full"></div>
					</div>
				</Motion.div>
			</Show>
		</Presence>
	);
}
