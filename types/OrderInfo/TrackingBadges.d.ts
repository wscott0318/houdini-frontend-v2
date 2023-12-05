interface TrackingBadges {
	status: number;
	isAnonym?: boolean;
}

interface TrackingNameProps {
	text: string;
}

interface TrackingBadgeProps {
	className: string;
	image: string;
	title: string;
	animate: boolean;
}

interface TrackingSeparatorProps {
	active?: boolean;
}
