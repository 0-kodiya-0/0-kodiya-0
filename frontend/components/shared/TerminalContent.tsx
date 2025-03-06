"use client";

import React, { useState, useEffect } from "react";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/magicui/terminal";

export function TerminalContent() {
  const [step, setStep] = useState(0);

  // Advance to next step after appropriate delay
  useEffect(() => {
    if (step < 6) {
      const timeout = setTimeout(() => {
        setStep(step + 1);
      }, 1200); // Consistent delay between steps

      return () => clearTimeout(timeout);
    }
  }, [step]);

  return (
    <Terminal className="w-full min-h-[250px] sm:min-h-[300px]">
      {step >= 0 && (
        <TypingAnimation className="font-mono text-xs sm:text-sm">
          Welcome to DevProfile v1.0.3
        </TypingAnimation>
      )}

      {step >= 1 && (
        <TypingAnimation className="font-mono text-xs sm:text-sm">
          &gt; show methodology
        </TypingAnimation>
      )}

      {step >= 2 && (
        <AnimatedSpan>
          <span className="text-green-500 font-mono text-xs sm:text-sm">
            ✓ Building scalable systems
          </span>
        </AnimatedSpan>
      )}

      {step >= 3 && (
        <AnimatedSpan>
          <span className="text-green-500 font-mono text-xs sm:text-sm">
            ✓ Writing clean, maintainable code
          </span>
        </AnimatedSpan>
      )}

      {step >= 4 && (
        <AnimatedSpan>
          <span className="text-green-500 font-mono text-xs sm:text-sm">
            ✓ Optimizing performance
          </span>
        </AnimatedSpan>
      )}

      {step >= 5 && (
        <AnimatedSpan>
          <span className="text-green-500 font-mono text-xs sm:text-sm">
            ✓ Continuous learning
          </span>
        </AnimatedSpan>
      )}

      {step >= 6 && (
        <TypingAnimation className="font-mono text-xs sm:text-sm">
          &gt; _
        </TypingAnimation>
      )}
    </Terminal>
  );
}