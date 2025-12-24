"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Props = {
  amount: number;
  className?: string;
};

export const AmountBadge = ({ amount, className }: Props) => {
  return (
    <AnimatePresence>
      {amount > 0 ? (
        <motion.div
          key={amount}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className={cn(
            "absolute -right-1 -top-1 flex size-4 transform items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground",
            className,
          )}
        >
          {amount}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
