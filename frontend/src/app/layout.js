import '../styles/globals.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from './providers';

export const metadata = {
	title: 'DiagnoSync AI',
	description: 'DiagnoSync AI',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="">
				<Providers>{children}</Providers>
				<ToastContainer theme="colored" />
			</body>
		</html>
	);
}
