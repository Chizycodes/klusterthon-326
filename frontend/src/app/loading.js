export default function Loading() {
	return (
		<div className="w-screen h-screen flex items-center justify-center gap-3">
			<h1 className="text-xl">DiagnoSync AI</h1>
			<span className="loading loading-bars loading-lg"></span>
		</div>
	);
}
