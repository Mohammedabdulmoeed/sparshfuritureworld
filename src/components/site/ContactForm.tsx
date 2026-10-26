import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2, MessageCircle } from "lucide-react";
import { enquirySchema, type EnquiryInput, type Enquiry } from "@/lib/enquiry-schema";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { enquiryTypes } from "@/data/services";
import { whatsappUrl, generalEnquiryMessage, productEnquiryMessage } from "@/lib/whatsapp";
import { ctaVariants } from "./cta";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-lg text-espresso placeholder:text-muted-foreground/60 transition-colors focus:border-walnut focus:outline-none focus:ring-0 aria-[invalid=true]:border-destructive";

function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string | undefined; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow flex items-center justify-between text-muted-foreground">
        <span>{label}</span>
        {optional && <span className="normal-case tracking-normal opacity-70">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

type Status = "idle" | "success" | "error";

export function ContactForm({ defaultProduct, defaultType }: { defaultProduct?: string | undefined; defaultType?: string | undefined }) {
  const send = useServerFn(submitEnquiry);
  const whatsappMessage = defaultProduct ? productEnquiryMessage(defaultProduct) : generalEnquiryMessage;
  const [status, setStatus] = useState<Status>("idle");
  const initialType = (enquiryTypes as readonly string[]).includes(defaultType ?? "")
    ? (defaultType as Enquiry["enquiryType"])
    : defaultProduct
      ? "Product price & availability"
      : "General enquiry";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput, unknown, Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", phone: "", email: "", enquiryType: initialType, product: defaultProduct ?? "", message: "" },
  });

  const onSubmit = async (values: Enquiry) => {
    setStatus("idle");
    try {
      const res = await send({ data: values });
      if (res.ok) {
        setStatus("success");
        reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="border border-border bg-paper p-10"
          >
            <span className="mb-6 flex size-12 items-center justify-center rounded-full bg-walnut text-ivory">
              <Check className="size-5" />
            </span>
            <h3 className="display-md">Thank you — we've received your enquiry.</h3>
            <p className="lede mt-4 text-muted-foreground">
              We'll get back to you on the phone number you shared. For anything urgent, message us on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => setStatus("idle")} className={ctaVariants({ variant: "outline" })}>
                Send another enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-9"
            aria-describedby={status === "error" ? "form-error" : undefined}
          >
            <div className="grid gap-9 sm:grid-cols-2">
              <Field id="name" label="Your name" error={errors.name?.message}>
                <input id="name" autoComplete="name" className={fieldBase} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
              </Field>
              <Field id="phone" label="Mobile number" error={errors.phone?.message}>
                <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className={fieldBase} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
              </Field>
            </div>
            <div className="grid gap-9 sm:grid-cols-2">
              <Field id="email" label="Email" optional error={errors.email?.message}>
                <input id="email" type="email" autoComplete="email" className={fieldBase} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
              </Field>
              <Field id="enquiryType" label="Enquiry type" error={errors.enquiryType?.message}>
                <select id="enquiryType" className={cn(fieldBase, "cursor-pointer appearance-none")} aria-invalid={!!errors.enquiryType} {...register("enquiryType")}>
                  {enquiryTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="product" label="Product or room" optional error={errors.product?.message}>
              <input id="product" placeholder="e.g. Three-seater sofa, bedroom set" className={fieldBase} {...register("product")} />
            </Field>
            <Field id="message" label="Message" error={errors.message?.message}>
              <textarea id="message" rows={4} placeholder="Tell us what you're looking for, sizes, timing…" className={cn(fieldBase, "resize-none")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
            </Field>

            {status === "error" && (
              <div id="form-error" role="alert" className="border-l-2 border-destructive bg-paper p-5 text-sm">
                <p className="font-medium text-destructive">Your enquiry couldn't be sent.</p>
                <p className="mt-1 text-muted-foreground">
                  Please try again in a moment, or{" "}
                  <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    message us on WhatsApp
                  </a>
                  .
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-5">
              <button type="submit" disabled={isSubmitting} className={ctaVariants({ variant: "primary" })}>
                {isSubmitting ? (
                  <>
                    Sending <Loader2 className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send enquiry <ArrowRight />
                  </>
                )}
              </button>
              <a href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-walnut">
                <MessageCircle className="size-4" /> Prefer WhatsApp?
              </a>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
