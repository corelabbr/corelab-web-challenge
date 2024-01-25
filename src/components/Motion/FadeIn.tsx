'use client'
import { AnimatePresence, MotionProps, motion } from 'framer-motion';

export function FadeInDiv(props: MotionProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.02, duration: 0.6 }}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  )
}