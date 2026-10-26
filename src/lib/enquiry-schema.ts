import { z } from "zod";
import { enquiryTypes } from "@/data/services";

/** Shared client + server validation for the contact enquiry form. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s()-]/g, ""))
    .pipe(z.string().regex(/^(\+?91)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")),
  email: z
    .string()
    .trim()
    .max(255, "Email is too long")
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  enquiryType: z.enum(enquiryTypes, { errorMap: () => ({ message: "Choose an enquiry type" }) }),
  product: z.string().trim().max(120).optional().or(z.literal("").transform(() => undefined)),
  message: z.string().trim().min(10, "Please write a little more (at least 10 characters)").max(1500, "Message is too long"),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
