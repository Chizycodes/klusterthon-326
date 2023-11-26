import { DiagnosisIcon, HistoryIcon, SettingIcon } from '@/assets/svgIcons';

export const menu = [
	{
		icon: <DiagnosisIcon />,
		text: 'Get Diagnosis',
		link: '/',
	},
	{
		icon: <HistoryIcon />,
		text: 'Sessions',
		link: '/sessions',
	},
];
