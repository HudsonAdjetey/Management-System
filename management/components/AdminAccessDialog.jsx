import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import Image from "next/image";
import { Icons } from "./constants/icons";
import { Form } from "./ui/form";
import CustomField from "./CustomFormFields";
import { Button } from "./ui/button";

const AdminAccessDialog = ({ form, setOpen, open, closeModal, onSubmit }) => {
  return (
    <AlertDialog open={open} onOpenChange={closeModal}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogTitle className="flex items-start justify-between">
          New Administrator's Access Verification
          <Image
            alt="close"
            width={20}
            height={20}
            onClick={closeModal}
            src={Icons.Close}
          />
        </AlertDialogTitle>
        <AlertDialogDescription>
          Enter the administrator's ID to continue.
        </AlertDialogDescription>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <CustomField
              fieldType="input"
              control={form.control}
              name="devName"
              label="Administrator Name"
              placeholder="Hannah Kane"
              register={form.register}
              icon={Icons.IconUser}
            />
            <CustomField
              fieldType="input"
              control={form.control}
              name="devID"
              label="Development ID"
              placeholder="433_034C9A334"
              register={form.register}
              icon={Icons.IconDataBase}
              admin={false}
            />
            <CustomField
              fieldType="phoneInput"
              control={form.control}
              name="phoneNumber"
              label="Phone Number"
              placeholder="+233"
              register={form.register}
            />
            <Button type="submit" className="bg-blue-300 mt-8 flex ml-auto">
              Confirm Credentials
            </Button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdminAccessDialog;
