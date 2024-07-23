import { z } from "zod";

const mongoDBObjectIdPattern = /^[0-9a-fA-F]{24}$/;

export const UserFormValidation = z.object({
  adminName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  /*  .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!*?&])[A-Za-z\d@$!%*?&]{2,}$/,
      "Username must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ), */
  email: z.string().email("Invalid email address"),
  devID: z
    .string()
    .refine(
      (devID) => mongoDBObjectIdPattern.test(devID),
      "Invalid Development ID"
    ),
  phoneNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  devName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: z.string().refine((value, context) => {
    return value === context.parent.password;
  }, "Passwords must match"),
});

export const managementUserValidation = z.object({
  organizationName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  organizationEmail: z.string().email("Invalid email address"),

  organizationUserEmail: z.string().email("Invalid email address"),
  userRole: z.enum(["Admin", "Manager", "Developer", "User"]),
  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(/^[a-zA-Z]+$/, "Username must contain only alphabet characters"),

  organizationPhoneNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  phoneNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  organizationEducationLevels: z.enum(["Junior", "Senior", "University"]),
  organizationTypes: z.enum(["Church", "School", "Sales", "Education"]),
  managementSize: z.string(),
  educationLevel: z.string({
    description: "Level of education for the organization",
    message: "select a level",
  }),
  churchLevel: z.string({
    description: "Level of education for the organization",
    message: "select a level",
  }),
  salesAndMarketing: z.string({
    description: "Level of education for the organization",
    message: "select a level",
  }),
  healthCareLevel: z.string({
    description: "Level of education for the organization",
    message: "select a level",
  }),

  organizationPrivatePublic: z.enum(["Private", "Public", "NGO"]),
  organizationDescription: z
    .string()
    .max(50, "Description should be less than 50 characters"),
  organizationSize: z.enum(["5 - 20", "50 - 100", "200 - 500", "1000 - 2000"]),
  organizationWebsite: z.string().optional(),

  organizationAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  userAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  agreementConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
  establishmentDate: z.coerce.date({
    message: "Date required",
  }),

  // Additional fields for educational institutions
  educationYear: z.number().optional(),
  educationGPA: z.number().optional(),
  educationMajor: z.string().optional(),
  educationMinor: z.string().optional(),

  // Additional fields for churches
  churchName: z.string().optional(),
  churchType: z.string().optional(),
  churchLocation: z.string().optional(),
  churchServedSince: z.number().optional(),
  churchWebsite: z.string().optional(),
  churchDescription: z.string().optional(),
  churchLogo: z.string().optional(),
  churchAddress: z.string().optional(),
  churchContactName: z.string().optional(),
  churchContactNumber: z.string().optional(),

  // Additional fields for schools
  schoolName: z.string().optional(),
  schoolType: z.string().optional(),
});
