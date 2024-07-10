import Image from "next/image";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const FORM_TYPES = {
  INPUT: "input",
  TEXTAREA: "textarea",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  FILE: "file",
  DATE: "date",
};

const RenderInput = ({ field, props, register }) => {
  switch (props.fieldType) {
    case FORM_TYPES.INPUT:
      return (
        <div className="flex items-center rounded-md border-dark-500 bg-dark-400">
          {
            // if there is an icon
            props.icon && (
              <Image
                src={props.icon}
                width={20}
                height={20}
                alt={props.iconAlt || "icon"}
                className="ml-2"
              />
            )
          }
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
              {...register}
              required
            />
          </FormControl>
        </div>
      );
  }
};

const CustomField = (props) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
          label={label}
      render={({ field }) => (
        <FormItem className="flex-1 mb-4">
          <FormLabel className="shad-input-label">{label}</FormLabel>

          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomField;
