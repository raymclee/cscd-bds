import { ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const MotionButton = motion.create(Button);

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="fixed bottom-8 right-8 z-40">
            <div className="relative">
              {/* Backdrop glow */}
              <motion.div
                className="absolute -inset-1 rounded-full opacity-60"
                animate={{
                  boxShadow: [
                    "0 0 10px 2px rgba(0,150,255,0.4)",
                    "0 0 15px 4px rgba(0,150,255,0.6)",
                    "0 0 10px 2px rgba(0,150,255,0.4)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Digital circuit lines */}
              <motion.div
                className="pointer-events-none absolute h-px w-6 origin-right bg-blue-400 opacity-70"
                style={{ right: "100%", top: "40%" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, opacity: [0, 0.7, 0.4] }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              <motion.div
                className="pointer-events-none absolute h-px w-6 origin-right bg-cyan-400 opacity-70"
                style={{ right: "100%", top: "60%" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, opacity: [0, 0.5, 0.7] }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />

              <MotionButton
                variant="outline"
                size="icon"
                className="relative rounded-full border-none bg-slate-950/60 hover:bg-slate-950/50 hover:text-white"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                whileHover={{
                  boxShadow: "0 0 15px 2px rgba(0,180,255,0.5)",
                  backgroundColor: "rgba(10, 20, 30, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Holographic scan effect */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full">
                  <div className="holographic-effect absolute inset-0"></div>
                </div>

                <ChevronUp size={44} className="relative z-10" />
              </MotionButton>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="dark">
          <p>回到顶部</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
