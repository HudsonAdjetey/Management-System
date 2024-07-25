const { Schema, model } = require("mongoose");

const organizationTypeSchema = new Schema(
  {
    organizationTypes: {
      type: String,
      enum: ["Education", "Healthcare", "Church", "Sales and Marketing"],
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
      unique: [true, "Choose another organization Name"],
    },
    // if organization type is education
    educationlevel: {
      type: String,
      enum: ["Primary", "Secondary", "High School", "College"],
    },
    organizationEmail: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    organizationPhoneNumber: {
      type: String,
      required: true,
      match: /^\+\d{1,14}$/,
    },
    organizationAddress: {
      type: String,
      required: true,
    },

    organizationDescription: String,
    organizationLevel: {
      type: String,
      enum: ["Local", "State", "National", "International"],
      required: true,
      default: "Local",
    },
    organizationSize: {
      type: String,
      enum: ["Small", "Medium", "Large", "Extra Large"],
      required: true,
    },
    organizationPrivatePublic: {
      type: String,
      enum: ["Private", "Public", "NGO"],
      required: true,
      default: "Private",
    },
    organizationLogo: {
      type: String,
      default:
        "https://fashionweek.gt/wp-content/uploads/2022/07/dummy-logo.png",
    },
    organizationAddress: String,
    organizationPhone: String,
    organizationWebsite: String,
    organizationSocialMedia: String,
    organizationContactName: String,
    organizationContactEmail: String,
    organizationContactPhone: String,
    organizationStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    managementSize: {
      type: String,
      enum: ["5 - 20", "50 - 100", "200 - 500", "1000 - 2000"],
      required: true,
    },
    organizationAdmin: Schema.Types.ObjectId,
    organizationUsers: [Schema.Types.ObjectId],
    organizationTeams: [Schema.Types.ObjectId],
    organizationEvents: [Schema.Types.ObjectId],
    organizationServices: [Schema.Types.ObjectId],
    organizationFeedback: [Schema.Types.ObjectId],
    organizationDocuments: [Schema.Types.ObjectId],
    organizationCases: [Schema.Types.ObjectId],
    organizationRequests: [Schema.Types.ObjectId],
    organizationCases: [Schema.Types.ObjectId],
    organizationCases: [Schema.Types.ObjectId],
    organizationBelongs: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const OrganizationModel = model("Organization", organizationTypeSchema);
module.exports = OrganizationModel;
