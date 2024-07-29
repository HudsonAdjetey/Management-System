import { z } from "zod";

const mongoDBObjectIdPattern = /^[0-9a-fA-F]{24}$/;
const validateFile = (file) => {
  const validExtensions = ["jpg", "jpeg", "png"];
  const maxSizeInMb = 2;

  if (!file) {
    return false;
  }

  const extension = file.name.split(".").pop().toLowerCase();
  const sizeInMb = file.size / 1024 / 1024;

  return validExtensions.includes(extension) && sizeInMb <= maxSizeInMb;
};
export const UserValidation = z.object({
  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: z.string().email("Invalid email address"),

  devID: z
    .string()
    .refine(
      (devID) => mongoDBObjectIdPattern.test(devID),
      "Invalid Development ID"
    ),
  userID: z
    .string()
    .refine((userID) => mongoDBObjectIdPattern.test(userID), "Invalid ID"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const managementUserValidation = z.object({
  organizationTypes: z.enum(["Church", "School", "Sales", "Education"]),

  organizationName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  // organizationEducationLevels: z.enum(["Junior", "Senior", "University"]),

  organizationEmail: z.string().email("Invalid email address"),

  organizationAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),

  organizationPhoneNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),

  organizationPrivatePublic: z.enum(["Private", "Public", "NGO"]),

  organizationDescription: z
    .string()
    .max(300, "Description should be less than 300 characters")
    .min(200, "Description should be at least 200 characters"),

  organizationSize: z.enum(["Small", "Medium", "Large", "Extra Large"]),
  // organization logo type  -> string
  // organization logo size  -> string

  establishmentDate: z.coerce.date({
    message: "Invalid date",
  }),

  managementSize: z.enum(["5 - 20", "50 - 100", "200 - 500", "1000 - 2000"]),

  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(/^[a-zA-Z]+$/, "Username must contain only alphabet characters"),

  userRole: z.enum(["Admin", "Manager", "Developer", "User"]),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  phoneNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),

  // for education
  educationLevel: z.enum(["Primary", "Secondary", "High School", "College"]),
});
