import { z } from "zod";
const mongoDBObjectIdPattern = /^[0-9a-fA-F]{24}$/;

export const UserValidation = z.object({
  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  // email
  email: z.string().email("Invalid email address"),
  //   entry ID or DevID
  devId: z
    .string()
    .refine((devID) => mongoDBObjectIdPattern.test(devID), "Invalid ID"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const managementUserValidation = z.object({
  // organization Type
  organizationTypes: z.enum(["Church", "School", "Sales", "Education"]),
  //   organization name
  organizationName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  // if organization type is education
  organizationEducationLevels: z.enum(["Junior", "Senior", "University"]),

  // organization email address
  organizationEmail: z.string().email("Invalid email address"),
  //   organization Address
  organizationAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  // organization Contact
  organizationPhoneNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  // organization private or public
  organizationPrivatePublic: z.enum(["Private", "Public", "NGO"]),
  //   organization description
  organizationDescription: z
    .string()
    .max(50, "Description should be less than 50 characters"),
  // organization Size
  organizationSize: z
    .string()
    .enum(
      ["Small", "Medium", "Large", "Extra Large"],
      "Invalid organization size"
    ),
  // establishment date
  establishmentDate: z.coerce.date({
    refine: (date) => date instanceof Date,
    message: "Invalid date",
  }),
  //   organization private or public
  organizationPrivatePublic: z.enum(["Private", "Public", "NGO"]),
  //   organization description
  organizationDescription: z
    .string()
    .max(50, "Description should be less than 50 characters"),

  // management size
  managementSize: z.enum(
    ["5 - 20", "50 - 100", "200 - 500", "1000 - 2000"],
    "Invalid management size"
  ),

  // username
  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  // user role
  userRole: z.enum(["Admin", "Manager", "Developer", "User"]),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  // contact
  phoneNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});
