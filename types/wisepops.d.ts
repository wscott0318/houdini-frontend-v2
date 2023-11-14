declare global {
	interface Window {
		wisepops: (type: string, event: string) => void;
	}
}

export {};
