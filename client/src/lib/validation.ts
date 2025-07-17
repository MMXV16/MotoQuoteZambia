import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  nrcPassport: z.string().min(5, "NRC/Passport number is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
});

export const vehicleInfoSchema = z.object({
  make: z.string().min(1, "Vehicle make is required"),
  model: z.string().min(1, "Vehicle model is required"),
  year: z.string().min(4, "Vehicle year is required"),
  registrationNumber: z.string().min(3, "Registration number is required"),
  engineType: z.enum(["petrol", "diesel"], {
    required_error: "Engine type is required",
  }),
});

export const coverageInfoSchema = z.object({
  type: z.enum(["third-party", "comprehensive"], {
    required_error: "Coverage type is required",
  }),
  duration: z.enum(["1", "3", "6", "12"], {
    required_error: "Duration is required",
  }),
  addOns: z.object({
    roadsideAssistance: z.boolean().default(false),
    theftCover: z.boolean().default(false),
    windscreenCover: z.boolean().default(false),
  }).default({}),
});
