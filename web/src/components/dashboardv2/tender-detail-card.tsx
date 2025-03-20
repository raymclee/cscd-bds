import { motion } from "motion/react";
import { useEffect } from "react";
import { cn } from "~/lib/utils";
import { useMapV2Store } from "~/store";

export function TenderDetailCard() {
  const tender = useMapV2Store.use.selectedTender();

  useEffect(() => {
    // if (tender) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "auto";
    // }
  }, [tender]);

  if (!tender) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur"
        onClick={() => {
          useMapV2Store.setState({ selectedTender: null });
        }}
      />
      <motion.div className="fixed left-1/2 top-10 z-50 flex h-[90vh] w-44 -translate-x-1/2 transform flex-col items-stretch justify-center rounded border border-transparent bg-black bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur">
        {JSON.stringify(tender, null, 2)}
        <button
          onClick={() => {
            useMapV2Store.setState({ selectedTender: null });
          }}
        >
          close
        </button>
      </motion.div>
    </>
  );
}
