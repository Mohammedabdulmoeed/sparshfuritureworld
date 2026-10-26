
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { enquirySchema } from "./enquiry-schema";

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return value.replace(/[&<>"']/g, (character: string) => entities[character]!);
}

/**
 * Validates an enquiry, saves it to Supabase,
 * and sends an email notification through Resend.
 */
export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    // ------------------------------------------
    // 1. Read server environment variables
    // ------------------------------------------
    const supabaseUrl = process.env["SUPABASE_URL"];
    const supabaseKey = process.env["SUPABASE_PUBLISHABLE_KEY"];

    const resendApiKey = process.env["RESEND_API_KEY"];
    const enquiryToEmail = process.env["ENQUIRY_TO_EMAIL"];
    const enquiryFromEmail = process.env["ENQUIRY_FROM_EMAIL"];

    if (!supabaseUrl || !supabaseKey) {
      console.error("Enquiry backend is not configured.");
      return { ok: false as const };
    }

    if (!resendApiKey || !enquiryToEmail || !enquiryFromEmail) {
      console.error("Enquiry email configuration is incomplete.", {
        resendApiKeyConfigured: Boolean(resendApiKey),
        recipientConfigured: Boolean(enquiryToEmail),
        senderConfigured: Boolean(enquiryFromEmail),
      });

      return { ok: false as const };
    }

    try {
      // ------------------------------------------
      // 2. Create Supabase client
      // ------------------------------------------
      const client = createClient<Database>(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          storage: undefined,
        },
        global: {
          fetch: (input, init) => {
            const headers = new Headers(init?.headers);

            if (
              supabaseKey.startsWith("sb_") &&
              headers.get("Authorization") === `Bearer ${supabaseKey}`
            ) {
              headers.delete("Authorization");
            }

            headers.set("apikey", supabaseKey);

            return fetch(input, {
              ...init,
              headers,
            });
          },
        },
      });

      // ------------------------------------------
      // 3. Save enquiry in Supabase
      // ------------------------------------------
      const { error: insertError } = await client
        .from("enquiries")
        .insert({
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          enquiry_type: data.enquiryType,
          product: data.product || null,
          message: data.message,
        });

      if (insertError) {
        console.error("Enquiry insert failed:", insertError.message);

        return { ok: false as const };
      }

      // ------------------------------------------
      // 4. Prepare strongly typed email rows
      // ------------------------------------------
      const enquiryRows: Array<[string, string]> = [
        ["Customer name", data.name],
        ["Mobile number", data.phone],
        ["Email", data.email || "Not provided"],
        ["Enquiry type", data.enquiryType],
        ["Product or room", data.product || "Not specified"],
        ["Message", data.message],
      ];

      const htmlRows = enquiryRows
        .map(([label, value]: [string, string]) => {
          return `
            <tr>
              <td style="padding:12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">
                ${escapeHtml(label)}
              </td>
              <td style="padding:12px;border:1px solid #e5e7eb;white-space:pre-wrap;overflow-wrap:anywhere;">
                ${escapeHtml(value)}
              </td>
            </tr>
          `;
        })
        .join("");

      // ------------------------------------------
      // 5. Build email
      // ------------------------------------------
      const emailPayload = {
        from: enquiryFromEmail,
        to: [enquiryToEmail],
        ...(data.email ? { reply_to: data.email } : {}),
        subject: `New Furniture Enquiry - ${data.name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <body style="margin:0;padding:24px;background:#f5f5f5;">
              <div style="font-family:Arial,sans-serif;color:#2f241d;max-width:680px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">

                <div style="background:#4a3025;color:#ffffff;padding:24px;">
                  <h1 style="margin:0;font-size:24px;">
                    Sparsh Furniture World
                  </h1>
                  <p style="margin:8px 0 0;">
                    New customer enquiry received
                  </p>
                </div>

                <div style="padding:24px;">
                  <p>
                    A customer has submitted an enquiry through your website.
                  </p>

                  <table style="width:100%;border-collapse:collapse;font-size:14px;">
                    ${htmlRows}
                  </table>

                  <p style="margin-top:24px;color:#6b7280;font-size:12px;">
                    This notification was generated by the Sparsh Furniture World website.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      };

      // ------------------------------------------
      // 6. Send email through Resend
      // ------------------------------------------
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
        signal: AbortSignal.timeout(15000),
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Enquiry email delivery failed:", {
          status: response.status,
          response: errorText,
        });

        // The database insert has already succeeded.
        // Report failure so the frontend can distinguish
        // successful delivery from a complete success.
        return { ok: false as const };
      }

      console.info("Enquiry saved and email notification sent.");

      return { ok: true as const };
    } catch (error) {
      console.error(
        "Enquiry submission failed:",
        error instanceof Error ? error.message : "Unknown server error",
      );

      return { ok: false as const };
    }
  });