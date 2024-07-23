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
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "./ui/textarea";

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
  DATE_PICKER: "datePicker",
  SKELETON: "skeleton",
};

const RenderInput = ({ field, props }) => {
  switch (props.fieldType) {
    case FORM_TYPES.INPUT:
      return (
        <div className="flex items-center rounded-md border-dark-500 bg-dark-400">
          {props.icon && (
            <Image
              src={props.icon}
              width={20}
              height={20}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-none outline-none"
              required
              type={props.type}
              min={3}
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
    case FORM_TYPES.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            width={24}
            height={24}
            alt="date"
            className="ml-2"
          />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FORM_TYPES.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea xl:h-[200px]  h-[150px] "
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FORM_TYPES.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    case FORM_TYPES.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4"></div>
          <Checkbox
            id={props.name}
            checked={field.value}
            onChange={field.onChange}
          />
        </FormControl>
      );
    default:
      throw new Error(`Invalid form field type: ${props.fieldType}`);
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
