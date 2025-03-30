import { Link, useSearch } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useMapV2Store } from "~/store";

const MotionButton = motion.create(Button);

export function Navigator() {
  const areas = useMapV2Store.use.areas();
  const { selectedArea, province, city, district } = useSearch({
    from: "/__auth/__dashboard/__amap/",
    structuralSharing: false,
    select(state) {
      const selectedArea = areas?.edges?.find(
        (a) => a?.node?.code === state.a,
      )?.node;
      const province = selectedArea?.tenders?.edges?.find(
        (t) => t?.node?.province?.adcode === state.p,
      )?.node?.province;
      const city = selectedArea?.tenders?.edges?.find(
        (t) => t?.node?.city?.adcode === state.c,
      )?.node?.city;
      const district = selectedArea?.tenders?.edges?.find(
        (t) => t?.node?.district?.adcode === state.d,
      )?.node?.district;
      return {
        selectedArea,
        province,
        city,
        district,
      };
    },
  });

  if (!selectedArea) return null;

  const tabs = [
    {
      id: 0,
      label: selectedArea?.name,
      search: {
        a: selectedArea?.code,
      } as Record<string, string | number | undefined>,
    },
  ];

  if (province) {
    tabs.push({
      id: 1,
      label: province?.name,
      search: {
        a: selectedArea?.code,
        p: province?.adcode,
      },
    });
  }

  if (city) {
    tabs.push({
      id: 2,
      label: city?.name,
      search: {
        a: selectedArea?.code,
        p: province?.adcode,
        c: city?.adcode,
      },
    });
  }

  if (district) {
    tabs.push({
      id: 3,
      label: district?.name,
      search: {
        a: selectedArea?.code,
        p: province?.adcode,
        c: city?.adcode,
        d: district?.adcode,
      },
    });
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      }}
      className="fixed bottom-0 left-1/2 z-40 -translate-x-1/2 transform"
    >
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

      {/* Container */}
      <div className="fixed bottom-6 left-1/2 flex h-10 -translate-x-1/2 items-center justify-center gap-x-1 rounded-full border border-blue-500/30 bg-slate-900/60 px-4 backdrop-blur-md">
        {/* Holographic scan effect */}
        <div className="absolute inset-0 z-10 overflow-hidden rounded-full">
          <div className="holographic-effect absolute inset-0"></div>
        </div>

        {/* Digital circuit lines - left side */}
        <motion.div
          className="pointer-events-none absolute h-px w-10 origin-right bg-cyan-400"
          style={{ right: "100%", top: "35%" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.8, 0.5] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.div
          className="pointer-events-none absolute h-px w-16 origin-right bg-blue-400"
          style={{ right: "100%", top: "65%" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.5, 0.7] }}
          transition={{ duration: 0.7, delay: 0.1 }}
        />

        {/* Digital circuit lines - right side */}
        <motion.div
          className="pointer-events-none absolute h-px w-10 origin-left bg-cyan-400"
          style={{ left: "100%", top: "35%" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.8, 0.5] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.div
          className="pointer-events-none absolute h-px w-16 origin-left bg-blue-400"
          style={{ left: "100%", top: "65%" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.5, 0.7] }}
          transition={{ duration: 0.7, delay: 0.1 }}
        />

        <Link to=".">
          <MotionButton
            className={cn(
              "relative z-20 overflow-hidden border-none font-semibold hover:bg-transparent hover:text-white",
              // activeTab === tab.id
              //   ? "text-white"
              //   : "text-slate-400 hover:text-slate-200",
            )}
            whileHover={{
              scale: 1.15,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            variant={"ghost"}
            size={"sm"}
          >
            全国
          </MotionButton>
        </Link>
        <ChevronRight className="h-4 w-4" />

        {tabs.map((tab, i) => (
          <Fragment key={tab.id}>
            {i > 0 && <ChevronRight className="h-4 w-4" />}
            <Link to="." search={tab.search} disabled={i === tabs.length - 1}>
              <MotionButton
                disabled={i === tabs.length - 1}
                variant={"ghost"}
                size={"sm"}
                // onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative z-20 overflow-hidden border-none hover:bg-transparent hover:text-white",
                  // activeTab === tab.id
                  //   ? "text-white"
                  //   : "text-slate-400 hover:text-slate-200",
                )}
                whileHover={{
                  scale: 1.15,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active tab indicator with data flow animation */}
                {/* {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-lg animate-data-flow -z-10"
                      initial={{ borderRadius: 8 }}
                      animate={{ borderRadius: 8 }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )} */}

                {/* Tab content */}
                <span className="relative z-10 font-semibold">{tab.label}</span>

                {/* Active tab scan line */}
                {/* {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 -z-[5] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
                      animate={{
                        y: ["100%", "-100%"],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />
                  )} */}

                {/* Tech corners for active tab */}
                {/* {activeTab === tab.id && ( */}
                {/* <> */}
                {/* Top left corner */}
                {/* <motion.div
                        className="absolute left-0 top-0 h-[2px] w-[8px] bg-cyan-400"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute left-0 top-0 h-[8px] w-[2px] bg-cyan-400"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      /> */}

                {/* Top right corner */}
                {/* <motion.div
                        className="absolute right-0 top-0 h-[2px] w-[8px] bg-cyan-400"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute right-0 top-0 h-[8px] w-[2px] bg-cyan-400"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      /> */}

                {/* Bottom left corner */}
                {/* <motion.div
                        className="absolute bottom-0 left-0 h-[2px] w-[8px] bg-cyan-400"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-[8px] w-[2px] bg-cyan-400"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      /> */}

                {/* Bottom right corner */}
                {/* <motion.div
                    className="absolute bottom-0 right-0 h-[2px] w-[8px] bg-cyan-400"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 h-[8px] w-[2px] bg-cyan-400"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  /> */}
                {/* </>
                  )} */}
              </MotionButton>
            </Link>
          </Fragment>
        ))}
      </div>
    </motion.div>
  );
}
