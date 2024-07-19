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
    .max(50, "Name must be at most 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!*?&])[A - Za - z\d@$! %*?&]{ 2, }$ /
    ),

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
  // password with special character
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export const managementUserValidation = z.object({
  organizationName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  organizationEmail: z.string().email("Invalid email address"),
  organizationAdminName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  organizationUserEmail: z.string().email("Invalid email address"),
  userRole: z.enum(["Admin", "Manager", "Developer", "User"]),

  organizationPhoneNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  phoneNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  organizationEducationLevels: z.enum(["Junior", "Senior", "University"]),
  organizationTypes: z.enum(["Church", "School", "Sales"]),
  managementSize: z
    .number()
    .min(1, "Management size must be at least 1")
    .max(1000, "Management size must be at most 1000"),
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

  // conditional validation if orgationzation types === Eduction, then can be private or public institution
  organizationPrivatePublic: z.enum(["Private", "Public"]),
  organizationDescription: z.string().optional(),
  organizationSize: z.number().optional(),
  organizationWebsite: z.string().optional(),
  organizationLogo: z.string().optional(),
  organizationAddress: z.string().optional(),
  organizationOccupation: z.string().optional(),
  organizationEmergencyContactName: z.string().optional(),
  organizationEmergencyContactNumber: z.string().optional(),
  // establishment date
  establishmentDate: z.coerce.date().optional(),
  // additional fields for educational institutions
  educationLevel: z.string().optional(),
  educationYear: z.number().optional(),
  educationGPA: z.number().optional(),
  educationMajor: z.string().optional(),
  educationMinor: z.string().optional(),
  // additional fields for churches
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
  // additional fields for schools
  schoolName: z.string().optional(),
  schoolType: z.string().optional(),
  // organization address
  organizationAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  userAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom().optional(),
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
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
