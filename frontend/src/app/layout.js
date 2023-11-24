import '../styles/globals.css';

export const metadata = {
	title: 'DiagnoSync AI',
	description: 'DiagnoSync AI',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="">{children}</body>
		</html>
	);
}
