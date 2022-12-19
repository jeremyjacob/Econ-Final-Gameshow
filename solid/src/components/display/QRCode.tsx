import QRCodeLib from 'qrcode';

export default function QRCode() {
	const canvas = (
		<canvas id="canvas" style="image-rendering: crisp-edges;"></canvas>
	);
	const link = location.origin;
	QRCodeLib.toCanvas(canvas, link, { scale: 9.5 }, (error) => {
		if (error) console.error(error);
		console.log(`QR generated with link ${link}`);
	});
	return canvas;
}
