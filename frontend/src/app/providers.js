'use client';

import { ContextProvider } from '@/context/context-provider';

export function Providers({ children }) {
	return <ContextProvider>{children}</ContextProvider>;
}
