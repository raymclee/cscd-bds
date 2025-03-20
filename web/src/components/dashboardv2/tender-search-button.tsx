"use client";
import React, { useRef, useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import { ArrowLeft, Search, User } from "lucide-react";

const transition = {
  type: "spring",
  bounce: 0.1,
  duration: 0.2,
};

function Button({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      className="relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export function TenderSearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  return (
    <MotionConfig transition={transition}>
      <div className="" ref={containerRef}>
        <div className="w-full h-8 border rounded-xl border-zinc-950/10">
          <motion.div
            animate={{
              // @todo: here I want to remove the width
              width: isOpen ? "300px" : "48px",
            }}
            initial={false}
          >
            <div className="p-2 overflow-hidden">
              {!isOpen ? (
                <Button
                  onClick={() => setIsOpen(true)}
                  ariaLabel="Search notes"
                >
                  <Search className="w-5 h-5" />
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={() => setIsOpen(false)} ariaLabel="Back">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="relative w-full">
                    <input
                      className="w-full p-2 bg-transparent border rounded-lg focus:outline-hidden h-9 border-zinc-950/10 text-zinc-900 placeholder-zinc-500"
                      autoFocus
                      placeholder="Search notes"
                    />
                    <div className="absolute top-0 flex items-center justify-center h-full right-1"></div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
