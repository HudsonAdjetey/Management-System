import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { managementUserValidation } from "@/lib/Validation";
import { Form } from "../ui/form";
import CustomField from "../CustomFormFields";
import organizations from "../constants/data.js";
import EducationLevels from "../constants/data.js";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { Label } from "../ui/label";

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

  const formValues = form.getValues();

  const onSubmit = () => {
    console.log("yep");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="my-12 space-y-4">
          <h1 className="header ">Welcome... </h1>
          <p className="text-dark-700">
            Please fill out the form below to register as a new management user.
          </p>
        </section>
        <div>
          <CustomField
            fieldType="select"
            control={form.control}
            register={form.register}
            placeholder="Select Organization Type"
            label="Select Organization Type"
            name="organizationTypes"
          >
            {organizations?.map((org, i) => {
              return (
                <SelectItem key={org.id} value={org.type}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={org.image}
                      width={32}
                      height={32}
                      alt={org.type}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{org.type}</p>
                  </div>
                </SelectItem>
              );
            })}
          </CustomField>

          {/* Name of organization and organization email */}
          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="organizationName"
              label="Organization Name"
              control={form.control}
              register={form.register}
              placeholder="abc"
              // icon
            />
            <CustomField
              fieldType="input"
              name="organizationEmail"
              label="Organization Email Address"
              control={form.control}
              register={form.register}
              placeholder="org@organization.com"
              // icon
            />
          </div>
          {/* Name of organization and organization email */}
          {/* Organization address and contact */}
          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="organizationAddress"
              label="Organization Address"
              control={form.control}
              register={form.register}
              placeholder="abc"
              // icon
            />
            <CustomField
              fieldType="phoneInput"
              name="organizationPhoneNumber"
              label="Organization Contact"
              control={form.control}
              register={form.register}
              // icon
            />
          </div>
          {/* Organization address and contact */}
          {/* Organization size and organization level */}
          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="managementSize"
              label="Management Size"
              control={form.control}
              register={form.register}
              // icon
            />
            {formValues.organizationTypes === "Education" ? (
              <CustomField
                fieldType="select"
                control={form.control}
                register={form.register}
                placeholder="Select Organization Type"
                label="Select Organization Type"
                name="organizationEducationLevels"
              >
                {EducationLevels?.map((edu, i) => {
                  console.log(edu);
                  return (
                    <SelectItem key={edu.id} value={edu.level}>
                      <p>{edu.level}</p>
                    </SelectItem>
                  );
                })}
              </CustomField>
            ) : (
              "Nothing here"
            )}
          </div>
          {/* Organization size and organization level */}
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
