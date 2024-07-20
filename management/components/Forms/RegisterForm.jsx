import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { managementUserValidation } from "@/lib/Validation";
import { Form, FormControl } from "../ui/form";
import CustomField from "../CustomFormFields";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import listings from "../constants/data.js";
import UploadFile from "@/components/RegisterForm/UploadFIle";
import SubmitBtn from "../SubmitBtn";
import { registerFormKeys } from "@/components/constants/index";

const RegisterForm = () => {
  const [dateSelet, setDateSelect] = useState(new Date());
  const form = useForm({
    resolver: zodResolver(managementUserValidation),
    defaultValues: {
      ...registerFormKeys,
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
      <form onSubmit={onSubmit}>
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

          {/* management size and organization level */}
          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="managementSize"
              label="Management Size"
              control={form.control}
              register={form.register}
              type="number"
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

          {/* user Address and User phone */}
          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="password"
              label="Password"
              control={form.control}
              register={form.register}
              placeholder="Enter Password"
              type="password"
            />
            <CustomField
              fieldType="input"
              name="confirmPassword"
              label="Confirm password"
              control={form.control}
              register={form.register}
              placeholder="Confirm Password"
              type="password"
            />
          </div>
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
              fieldType="select"
              name="organizationSize"
              label="Organization Size"
              control={form.control}
              register={form.register}
            >
              <SelectItem value="5 - 20">5 - 20</SelectItem>
              <SelectItem value="50 - 100">50 - 100</SelectItem>
              <SelectItem value="200 - 500">200 - 500</SelectItem>
              <SelectItem value="1000 - 2000">1000 - 2000</SelectItem>
            </CustomField>
          </div>

          <CustomField
            fieldType="textarea"
            control={form.control}
            register={form.register}
            label="Describe your organization/institution"
            name="organizationDescription"
            type="number"
          />
        </div>
        {/* SPECIFIC INFORMATION */}
        <CustomField
          fieldType="skeleton"
          name="organizationLogo"
          label="Organization Logo"
          control={form.control}
          renderSkeleton={(field) => {
            return (
              <FormControl>
                <UploadFile files={field.value} onChange={field.onChange} />
              </FormControl>
            );
          }}
        />
        <SubmitBtn>Submit</SubmitBtn>
      </form>
    </Form>
  );
};

export default RegisterForm;
