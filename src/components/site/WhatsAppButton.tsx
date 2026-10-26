import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { whatsappUrl, generalEnquiryMessage } from "@/lib/whatsapp";

/** Floating WhatsApp contact button. */
export function WhatsAppButton() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={whatsappUrl(generalEnquiryMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sparsh Furniture World on WhatsApp (opens in a new tab)"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-espresso pl-4 pr-4 text-ivory shadow-soft transition-[padding,background-color] duration-300 hover:bg-walnut hover:pr-5 md:bottom-8 md:right-8"
    >
      <MessageCircle className="size-6 shrink-0" aria-hidden />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium uppercase tracking-[0.18em] transition-[max-width,margin] duration-300 group-hover:ml-3 group-hover:max-w-[10rem] group-focus-visible:ml-3 group-focus-visible:max-w-[10rem]">
        WhatsApp us
      </span>
    </motion.a>
  );
}
