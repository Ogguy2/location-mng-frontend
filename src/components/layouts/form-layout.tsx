import { Locataire } from "@/types/app";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { FieldError } from "../ui/field";
import clsx from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import React from "react";
import { Switch } from "../ui/switch";

interface InputShowDateProps {
  name: string;
  data: Locataire;
  type: string;
}
export const InputShowDate = ({ name, data, type }: InputShowDateProps) => {
  return (
    <>
      {data && type === "checkbox" && (
        <div className=" h-11 flex items-center gap-2">
          <Switch checked={data[name] || false} disabled={true} />
        </div>
      )}

      {data && type !== "checkbox" && (
        <Input
          id={name}
          name={name}
          type={type}
          disabled={true}
          autoComplete="off"
          value={data[name] || name}
        />
      )}

      {!data && (
        <div>
          <Skeleton className="h-[44px] w-full rounded" />
        </div>
      )}
    </>
  );
};

export const InputCustomData = (props) => {
  // Manage date type
  const date = props.field.state.value
    ? new Date(props.field.state.value)
    : undefined;
  const [open, setOpen] = React.useState(false);

  // Manage checkbox type
  const value = props.field.state;

  return (
    <>
      {props.type == "checkbox" && (
        <div className=" h-11 flex items-center gap-2">
          <Switch
            checked={props.field.state.value || ""}
            onCheckedChange={(checked) => {
              props.field.handleChange(checked);
            }}
            aria-invalid={props.isInvalid}
          />
        </div>
      )}
      {props.type == "date" && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              {date?.toLocaleDateString()}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setOpen(false);
                props.field.handleChange(date?.toLocaleDateString());
              }}
            />
          </PopoverContent>
        </Popover>
      )}
      {(props.type == "text" || props.type == "number") && (
        <Input
          id={props.field.name}
          type={props.type}
          name={props.field.name}
          value={props.field.state.value || ""}
          onBlur={props.field.handleBlur}
          onChange={(e) => {
            if (props.type == "number") {
              props.field.handleChange(e.target.valueAsNumber);
            } else {
              props.field.handleChange(e.target.value);
            }
          }}
          aria-invalid={props.isInvalid}
          autoComplete="on"
        />
      )}
      {
        <FieldError
          className={clsx(props.isInvalid ? "block" : "hidden")}
          errors={props.field.state.meta.errors}
        />
      }
      {/* {props.field.state.meta.errorMap.onSubmit && (
        <div className="submit-error">
          {JSON.stringify(props.field.state.meta.errorMap.onSubmit[props.field.name])}
        </div>
      )} */}
    </>
  );
};
