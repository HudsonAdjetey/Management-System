import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/Validation";
import { Form } from "../ui/form";
import CustomField from "../CustomFormFields";
const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(managementUserValidation),
    defaultValues: {
      organizationTypes: "",
      organizationName: "",
      organizationEmail: "",
      organizationPhoneNumber: "",
      organizationAddress: "",
      organizationAdminName: "",
      organizationAdminEmail: "",
      organizationAdminPhoneNumber: "",
      organizationEducationLevels: "",

      /*       organizationExperience: "",
      organizationSkills: "",
      organizationProjects: "",
      organizationTeamSize: "",
      organizationTeamMembers: "", */
      userRole: "",
      managementSize: 0,
    },
  });
  return (
    <Form {...form}>
      <form>
        <section className="my-12 space-y-4">
          <h1 className="header ">Welcome... </h1>
          <p className="text-dark-700">
            Please fill out the form below to register as a new management user.
          </p>
        </section>
        <CustomField
          fieldType="select"
          control={form.control}
          register={form.register}
          placeholder="Select Organization Type"
          label="Select Organization Type"
        >
          
        </CustomField>
      </form>
    </Form>
  );
};

export default RegisterForm;
