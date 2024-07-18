import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/Validation";
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
      organizationAdminPassword: "",
    },
  });
  return <div>RegisterForm</div>;
};

export default RegisterForm;
