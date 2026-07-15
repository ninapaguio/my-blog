"use client";

import * as React from "react";
import { TagsCombobox } from "@/components/TagCombobox";

interface TagInputProps {
	name: string;
	existingTags?: string[];
	initialTags?: string[];
	maxTags?: number;
}

export function TagInput({
	name,
	existingTags = [],
	initialTags = [],
	maxTags = 5,
}: TagInputProps) {
	const [tags, setTags] = React.useState<string[]>(initialTags);

	return (
		<div>
			<TagsCombobox
				id={name}
				tags={existingTags}
				value={tags}
				onValueChange={setTags}
				creatable
				maxTags={maxTags}
				placeholder="Search or create a tag..."
			/>
			<p className="mt-1.5 text-xs text-ink/50">
				{tags.length}/{maxTags} tags
			</p>
			{/* Serialized for the Server Action to parse with JSON.parse + zod. */}
			<input type="hidden" name={name} value={JSON.stringify(tags)} />
		</div>
	);
}
