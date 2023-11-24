import DashboardLayout from '@/components/dashboard/DashboardLayout';


export default function RootLayout({ children }) {
	return (
		<div>
			<DashboardLayout>{children}</DashboardLayout>
		</div>
	);
}
