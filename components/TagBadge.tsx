interface TagBadgeProps {
	label: string;
}

export function TagBadge({ label }: TagBadgeProps) {
	return (
		<span className="rounded-full bg-tag px-3 py-1 text-xs font-medium text-white">
			{label}
		</span>
	);
}
