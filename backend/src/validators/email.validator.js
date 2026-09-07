import { z } from "zod";

export const emailSchema = z.object({

    html: z
        .string()
        .min(1, "Email HTML is required"),

    jurisdictions: z
        .array(
            z.enum(["CAN-SPAM", "GDPR", "CASL"])
        )
        .min(1, "Select at least one compliance jurisdiction."),

    senderEmail: z
        .string()
        .email("Please provide a valid sender email."),

    consent: z
        .boolean()
        .optional()

});