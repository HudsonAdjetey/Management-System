import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { managementUserValidation } from "@/lib/Validation";
import { Form } from "../ui/form";
import CustomField from "../CustomFormFields";
import organizations from "../constants/data.js";
import EducationLevels from "../constants/data.js";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { Label } from "../ui/label";
import listings from "../constants/data.js";

const RegisterForm = () => {
  const [dateSelet, setDateSelect] = useState(new Date());
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
      educationLevel: "",
      churchLevel: "",
      salesAndMarketing: "",
      healthCareLevel: "",
      userRole: "",
      managementSize: 0,
      username: "",
      organizationPrivatePublic: "",
      establishmentDate: new Date(),
      userAddress: "",
      phoneNumber: "",
    },
  });

  const organizationType = useWatch({
    control: form.control,
    name: "organizationTypes",
  });

  const onSubmit = () => {
    console.log("yep");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="my-12 space-y-4">
          <h1 className="header">Welcome... </h1>
          <p className="text-dark-700">
            Please fill out the form below to register as a new management user.
          </p>
        </section>
        {/* BASIC INFORMATION */}
        <div>
          <h1 className="space-y-4 my-7">Basic Information</h1>
          <CustomField
            fieldType="select"
            control={form.control}
            register={form.register}
            placeholder="Select Organization Type"
            label="Select Organization Type"
            name="organizationTypes"
          >
            {listings?.organizations?.map((org) => (
              <SelectItem
                disabled={org.type !== "Education"}
                key={org.id}
                value={org.type}
              >
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
            ))}
          </CustomField>

          {/* Name of organization and organization email */}
          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="organizationName"
              label="Organization Name"
              control={form.control}
              register={form.register}
              placeholder="Horizon Media"
            />
            <CustomField
              fieldType="input"
              name="organizationEmail"
              label="Organization Email Address"
              control={form.control}
              register={form.register}
              placeholder="horizon@org.com"
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
              placeholder="Accra, Spintex"
            />
            <CustomField
              fieldType="phoneInput"
              name="organizationPhoneNumber"
              label="Organization Contact"
              control={form.control}
              register={form.register}
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
            />
            {organizationType === "Education" ? (
              <CustomField
                fieldType="select"
                control={form.control}
                register={form.register}
                placeholder="Select Education Level"
                label="Select Education Level"
                name="educationLevel"
              >
                {listings?.EducationLevels?.map((edu) => (
                  <SelectItem key={edu.id} value={edu.level}>
                    <p>{edu.level}</p>
                  </SelectItem>
                ))}
              </CustomField>
            ) : organizationType === "Church" ? (
              <CustomField
                fieldType="select"
                control={form.control}
                register={form.register}
                placeholder="Select Church Level"
                label="Select Church Level"
                name="churchLevel"
              >
                {listings?.churchLevels?.map((edu) => (
                  <SelectItem key={edu.id} value={edu.level}>
                    <p>{edu.level}</p>
                  </SelectItem>
                ))}
              </CustomField>
            ) : organizationType === "Healthcare" ? (
              <CustomField
                fieldType="select"
                control={form.control}
                register={form.register}
                placeholder="Select Health Care Level"
                label="Select Health Care Level"
                name="healthCareLevel"
              >
                {listings?.hospitalLevels?.map((health) => (
                  <SelectItem key={health.id} value={health.level}>
                    <p>{health.level}</p>
                  </SelectItem>
                ))}
              </CustomField>
            ) : (
              organizationType === "Sales and Marketing" && (
                <CustomField
                  fieldType="select"
                  control={form.control}
                  register={form.register}
                  placeholder="Select Health Care Level"
                  label="Select Health Care Level"
                  name="salesAndMarketing"
                >
                  {listings?.hospitalLevels?.map((health) => (
                    <SelectItem key={health.id} value={health.level}>
                      <p>{health.level}</p>
                    </SelectItem>
                  ))}
                </CustomField>
              )
            )}
          </div>
          {/* Organization size and organization level */}

          {/* Admin Name and User Role */}
          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="username"
              label="Username"
              control={form.control}
              register={form.register}
              placeholder="Hannah Baah"
            />
            <CustomField
              fieldType="select"
              control={form.control}
              register={form.register}
              placeholder="Select user role"
              label="User Role"
              name="userRole"
            >
              <SelectItem value={"Admin"}>Admin</SelectItem>
              <SelectItem value={"Manager"}>Manager</SelectItem>
              <SelectItem value={"Developer"}>Developer</SelectItem>
            </CustomField>
          </div>
          {/* Admin Name and User Role */}

          {/* user Address and User phone */}
          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="userAddress"
              label="Address"
              control={form.control}
              register={form.register}
              placeholder="Main street, King Town"
            />
            <CustomField
              fieldType="phoneInput"
              control={form.control}
              register={form.register}
              placeholder="Select user role"
              label="Contact"
              name="phoneNumber"
            />
          </div>
          {/* Admin Name and User Role */}
        </div>
        {/* BASIC INFORMATION */}

        {/* SPECIFIC INFORMATION */}
        <div>
          <h1 className="space-y-4 my-7">Specific Information</h1>
          <CustomField
            fieldType="select"
            control={form.control}
            register={form.register}
            placeholder="Organization Status type"
            label="
            State Of Organization
            "
            name="organizationPrivatePublic"
          >
            <SelectItem value={"Private"}>Private</SelectItem>
            <SelectItem value={"Public"}>Public</SelectItem>
            <SelectItem value={"NGO"}>NGO</SelectItem>
          </CustomField>

          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="datePicker"
              name="establishmentDate"
              label="Establishment Date"
              control={form.control}
              register={form.register}
              placeholder="john.doe@organization.com"
            />
            <CustomField
              fieldType="phoneInput"
              name="organizationAdminPhoneNumber"
              label="Organization Admin Contact"
              control={form.control}
              register={form.register}
            />
          </div>

          <CustomField
            fieldType="select"
            control={form.control}
            register={form.register}
            placeholder="Select User Role"
            label="Select User Role"
            name="userRole"
          />
        </div>
        {/* SPECIFIC INFORMATION */}
      </form>
    </Form>
  );
};

export default RegisterForm;
