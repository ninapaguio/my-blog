"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type Theme = "default" | "warm" | "dark";

const ThemeContext = createContext<{
	theme: Theme;
	setTheme: (theme: Theme) => void;
} | null>(null);

export function ReadingThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>("default");

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<div
				data-theme={theme}
				className="bg-canvas transition-colors duration-200"
			>
				{children}
			</div>
		</ThemeContext.Provider>
	);
}

const options: { value: Theme; label: string }[] = [
	{ value: "default", label: "Original" },
	{ value: "warm", label: "Warm" },
	{ value: "dark", label: "Dark" },
];

export function ReadingThemeToggle() {
	const ctx = useContext(ThemeContext);
	if (!ctx) return null;
	const { theme, setTheme } = ctx;

	return (
		<div className="flex items-center gap-1 rounded-full border border-lavender-border bg-lavender p-1">
			{options.map((opt) => (
				<button
					key={opt.value}
					type="button"
					onClick={() => setTheme(opt.value)}
					className={`rounded-full px-3 py-1 text-xs transition-colors ${
						theme === opt.value
							? "bg-accent text-white"
							: "text-ink/70 hover:text-ink"
					}`}
				>
					{opt.label}
				</button>
			))}
		</div>
	);
}
