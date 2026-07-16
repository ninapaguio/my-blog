"use client";

import { ChevronDown, Plus } from "lucide-react";
import * as React from "react";
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "@/components/ui/combobox";

interface TagsComboboxProps {
	tags: string[];
	value: string[];
	onValueChange: (value: string[]) => void;
	creatable?: boolean; // suggest to add new tag if true
	maxTags?: number;
	placeholder?: string;
	// Matching the search and tag that includes the creatable logic in create tag.
	onQueryChange?: (query: string) => void;
	id?: string;
}

//
// Show "create new tag" list entry if it doesn't match
const CREATE_PREFIX = "__create__:";

export function TagsCombobox({
	tags,
	value,
	onValueChange,
	creatable = false,
	maxTags = 10,
	placeholder = "Search tags...",
	onQueryChange,
	id,
}: TagsComboboxProps) {
	const [query, setQuery] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const anchorRef = useComboboxAnchor();

	function updateQuery(next: string) {
		setQuery(next);
		onQueryChange?.(next);
	}

	const trimmedQuery = query.trim();
	const normalizedQuery = trimmedQuery.toLowerCase();
	const selectedLower = React.useMemo(
		() => new Set(value.map((tag) => tag.toLowerCase())),
		[value],
	);

	const alreadyExists = tags.some(
		(tag) => tag.toLowerCase() === normalizedQuery,
	);
	const canCreate =
		creatable &&
		trimmedQuery.length > 0 &&
		!alreadyExists &&
		!selectedLower.has(normalizedQuery) &&
		value.length < maxTags;

	const items = React.useMemo(() => {
		const available = tags.filter(
			(tag) => !selectedLower.has(tag.toLowerCase()),
		);

		// narrowing available tags together with keystroke
		const filtered =
			normalizedQuery.length > 0
				? available.filter((tag) => tag.toLowerCase().includes(normalizedQuery))
				: available;

		return canCreate
			? [...filtered, `${CREATE_PREFIX}${trimmedQuery}`]
			: filtered;
	}, [tags, selectedLower, canCreate, trimmedQuery, normalizedQuery]);

	function handleValueChange(next: string[]) {
		const resolved = next.map((item) =>
			item.startsWith(CREATE_PREFIX) ? item.slice(CREATE_PREFIX.length) : item,
		);

		// Guard against re-adding a tag that only differs by case.
		const deduped: string[] = [];
		const seen = new Set<string>();
		for (const tag of resolved) {
			const key = tag.toLowerCase();
			if (!seen.has(key)) {
				seen.add(key);
				deduped.push(tag);
			}
		}

		onValueChange(deduped.slice(0, maxTags));

		// Only clear the search query when a tag was added, not when removed.
		if (deduped.length > value.length) {
			updateQuery("");
		}
	}

	return (
		<Combobox
			items={items}
			multiple
			value={value}
			onValueChange={handleValueChange}
			inputValue={query}
			onInputValueChange={updateQuery}
			open={open}
			onOpenChange={setOpen}
			autoHighlight
		>
			<ComboboxChips
				ref={anchorRef}
				className={`flex-nowrap items-start gap-2 rounded-lg border border-lavender-border bg-white px-4 py-3 has-data-[slot=combobox-chip]:px-4 transition-colors focus-within:border-accent ${
					open ? "rounded-t-lg border-accent" : "rounded-lg"
				}`}
			>
				<div className="flex flex-1 flex-wrap bg-white items-center gap-1.5">
					<ComboboxValue>
						{value.map((tag) => (
							<ComboboxChip
								key={tag}
								className="rounded-full bg-tag px-3 py-1 text-xs font-medium text-white [&_svg]:size-3 [&_svg]:text-white/70 [&_svg:hover]:text-white"
							>
								{tag}
							</ComboboxChip>
						))}
					</ComboboxValue>
					<ComboboxChipsInput
						id={id}
						placeholder={value.length === 0 ? placeholder : ""}
						disabled={value.length >= maxTags}
						className="border-0 bg-transparent text-sm text-ink placeholder:text-ink/40 disabled:cursor-not-allowed"
					/>
				</div>
				<button
					type="button"
					onClick={() => setOpen((prev) => !prev)}
					aria-label={open ? "Close tag list" : "Open tag list"}
					className="mt-0.5 shrink-0 text-ink/60 transition-colors hover:text-ink"
				>
					<ChevronDown
						className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
						aria-hidden
					/>
				</button>
			</ComboboxChips>
			<ComboboxContent
				anchor={anchorRef}
				align="start"
				sideOffset={0}
				className="rounded-b-lg border border-t-0 border-accent bg-white shadow-none ring-0"
			>
				<ComboboxEmpty>
					{creatable ? "Type to create a new tag." : "No tags found."}
				</ComboboxEmpty>
				<ComboboxList>
					{items.map((item) =>
						item.startsWith(CREATE_PREFIX) ? (
							<ComboboxItem
								key={item}
								value={item}
								className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-accent data-highlighted:bg-accent data-highlighted:text-white"
							>
								<Plus className="size-3.5" aria-hidden />
								Create &ldquo;{item.slice(CREATE_PREFIX.length)}&rdquo;
							</ComboboxItem>
						) : (
							<ComboboxItem
								key={item}
								value={item}
								className="rounded-lg px-3 py-2 text-sm text-ink data-highlighted:bg-accent data-highlighted:text-white [&_svg]:text-accent data-highlighted:[&_svg]:text-white"
							>
								{item}
							</ComboboxItem>
						),
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
