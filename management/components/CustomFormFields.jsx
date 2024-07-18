import Image from "next/image";
import PhoneInput from "react-phone-number-input";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import "react-phone-number-input/style.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";

const FORM_TYPES = {
  INPUT: "input",
  TEXTAREA: "textarea",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  FILE: "file",
  DATE: "date",
  PHONE_INPUT: "phoneInput",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
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
    case FORM_TYPES.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="GH"
            // placeholder={props.placeholder}
            international
            withCountryCallingCode
            className="input-phone"
            value={field.value}
            onChange={field.onChange}
          />
        </FormControl>
      );
    case FORM_TYPES.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FORM_TYPES.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    default:
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
          <FormLabel className="shad-input-label">
            {props.admin || props.phone ? "" : label}
          </FormLabel>

          <RenderInput field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomField;
