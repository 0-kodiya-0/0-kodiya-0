"use client";

import { FileIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../layout/ThemeProvider";

interface CodeDisplayProps {
    code: string;
    language: string;
    filename: string;
    lightTheme: string;
    darkTheme: string;
}

export function CodeDisplay({
    code,
    language,
    filename,
    lightTheme,
    darkTheme,
}: CodeDisplayProps) {
    const { theme } = useTheme();
    const [highlightedCode, setHighlightedCode] = useState("");

    useEffect(() => {
        const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

        async function highlightCode() {
            try {
                const { codeToHtml } = await import("shiki");
                const highlighted = await codeToHtml(code, {
                    lang: language,
                    theme: selectedTheme,
                });
                setHighlightedCode(highlighted);
            } catch (error) {
                console.error("Error highlighting code:", error);
                setHighlightedCode(`<pre>${code}</pre>`);
            }
        }
        highlightCode();
    }, [theme, code, language, lightTheme, darkTheme]);

    const renderCode = () => {
        if (highlightedCode) {
            return (
                <div
                    className="h-full w-full overflow-auto bg-background font-mono text-xs sm:text-sm [&>pre]:h-full [&>pre]:!bg-transparent [&>pre]:p-3 sm:[&>pre]:p-4 [&_code]:break-words sm:[&_code]:break-all"
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
            );
        } else {
            return (
                <pre className="h-full w-full overflow-auto break-words sm:break-all bg-background p-3 sm:p-4 font-mono text-xs sm:text-sm text-foreground">
                    {code}
                </pre>
            );
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="relative w-full overflow-hidden rounded-md border border-border">
                <div className="flex items-center bg-accent p-2 text-xs sm:text-sm text-foreground">
                    <FileIcon className="mr-2 h-4 w-4" />
                    {filename}
                </div>
                {renderCode()}
            </div>
        </div>
    );
}