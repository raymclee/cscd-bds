import { useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AmountSummaryCard } from "~/components/dashboardv2/amount-summary-card";
import { RankingCard } from "~/components/dashboardv2/ranking-card";
import { TenderAddedCard } from "~/components/dashboardv2/tender-added-card";
import { TenderTypeCard } from "~/components/dashboardv2/tender-type-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";

export function Cards() {
  const show = useSearch({
    from: "/__auth/__dashboard/__amap",
    select(state) {
      return Boolean(state.d || state.t);
    },
  });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const visible = Boolean(!isCollapsed && !show);

  return (
    <>
      <div
        className={cn(
          "sticky mb-6 w-full flex-1 self-start md:top-[4.5rem] lg:col-span-2 xl:col-span-3",
          show ? "z-auto" : "z-[11]",
        )}
      >
        <AnimatePresence mode="wait">
          {!show && (
            <motion.div
              variants={{
                initial: { y: "-100%", opacity: 0 },
                visible: { y: "0", opacity: 1 },
                exit: { y: "-100%", opacity: 0 },
              }}
              initial="initial"
              animate={"visible"}
              exit="exit"
              // className="fixed z-40 transform -translate-x-1/2 bottom-6 left-1/2"
            >
              <Carousel
                plugins={[]}
                opts={{ loop: true }}
                className="px-8 2xl:px-0"
              >
                <CarouselContent>
                  {[
                    <AmountSummaryCard key="amount" />,
                    <RankingCard key="ranking" />,
                    <TenderAddedCard key="tender" />,
                    <TenderTypeCard key="type" />,
                  ].map((card, index) => (
                    <CarouselItem
                      key={index}
                      className="lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                      // initial={{ opacity: 0, y: 20 }}
                      // animate={{
                      //   opacity: 1,
                      //   y: 0,
                      //   filter: visible
                      //     ? [
                      //         "brightness(100%)",
                      //         "brightness(120%)",
                      //         "brightness(100%)",
                      //       ]
                      //     : "brightness(100%)",
                      // }}
                      // transition={{
                      //   delay: index * 0.02,
                      //   duration: 0.15,
                      //   filter: {
                      //     duration: 0.1,
                      //     repeat: 0,
                      //   },
                      // }}
                    >
                      {card}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-0 h-full w-6 rounded border-none bg-slate-950/30 hover:bg-slate-950/50 hover:text-white 2xl:hidden" />
                <CarouselNext className="-right-0 h-full w-6 rounded border-none bg-slate-950/30 hover:bg-slate-950/50 hover:text-white 2xl:hidden" />
              </Carousel>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech button container with positioning */}
        {/* <div className="flex justify-end mt-2">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative"> */}
        {/* Tech circle decoration around button */}
        {/* <motion.div
                      className="pointer-events-none absolute -inset-1.5 rounded-full opacity-60"
                      animate={{
                        boxShadow: [
                          "0 0 0 rgba(0,150,255,0.5)",
                          "0 0 8px rgba(0,150,255,0.7)",
                          "0 0 0 rgba(0,150,255,0.5)",
                        ],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    /> */}

        {/* Digital circuit lines */}
        {/* <motion.div
                      className="absolute w-6 h-px origin-right bg-blue-400 pointer-events-none opacity-70"
                      style={{ right: "100%", top: "40%" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1, opacity: [0, 0.7, 0.4] }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                    <motion.div
                      className="absolute w-6 h-px origin-right pointer-events-none bg-cyan-400 opacity-70"
                      style={{ right: "100%", top: "60%" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1, opacity: [0, 0.5, 0.7] }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    />
  
                    <MotionButton
                      size="icon"
                      variant="outline"
                      className="relative border-none rounded-full bg-slate-950/60 hover:bg-slate-950/50 hover:text-white"
                      onClick={toggleCollapse}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{
                        boxShadow: "0 0 15px 2px rgba(0,180,255,0.5)",
                        backgroundColor: "rgba(10, 20, 30, 0.8)",
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: visible ? 180 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                      >
                        {<ChevronDown />}
                      </motion.div>
                    </MotionButton>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="dark">
                  <p>{visible ? "收起" : "展开"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div> */}
      </div>
    </>
  );
}
