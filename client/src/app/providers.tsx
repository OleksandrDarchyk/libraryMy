import { Provider as JotaiProvider } from "jotai";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import type {ReactNode} from "react";

// Providers is a wrapper component that adds global state support (Jotai)
// and debugging tools (Jotai DevTools) to the app.
export default function Providers({ children }: { children: ReactNode }) {
    return (
        // JotaiProvider makes atoms (global state) available to all child components
        <JotaiProvider>
            {/* Render all nested components passed as children */}
            {children}
            {/* Jotai DevTools panel for debugging state */}
            <DevTools />
        </JotaiProvider>
    );
}
