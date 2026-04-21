import "@testing-library/jest-dom";
import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
	localStorage.clear();
	vi.clearAllMocks();
	vi.useRealTimers();
	window.history.replaceState({}, "", "/");
});

afterEach(() => {
	document.documentElement.classList.remove("dark");
});
