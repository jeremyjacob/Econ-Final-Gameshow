import CTA from './CTA';
import QRCode from './QRCode';

export default function Entry() {
	return (
		<div class="flex flex-row items-center justify-center w-[60%] h-full m-auto pb-[4.3rem]">
			<div class="flex-col items-center justify-center w-full text-[6rem] font-semibold">
				<h1 class="text-black leading-none">Big</h1>
				<h1 class="text-black leading-none">Business</h1>
				<h1 class="text-black leading-none">Buzzer</h1>
			</div>
			<div class="relative">
				<CTA></CTA>
				<QRCode></QRCode>
			</div>
		</div>
	);
}
