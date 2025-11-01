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

interface InputShowDateProps {
  name: string;
  data: Locataire;
}
export const InputShowDate = ({ name, data }: InputShowDateProps) => {
  return data ? (
    <Input
      id={name}
      name={name}
      disabled={true}
      autoComplete="off"
      value={data[name] || ""}
    />
  ) : (
    <div>
      <Skeleton className="h-[44px] w-full rounded" />
    </div>
  );
};

export const InputCustomData = (props) => {
  const date = props.field.state.value
    ? new Date(props.field.state.value)
    : undefined;
  const [open, setOpen] = React.useState(false);
  // const [date, setDate] = React.useState<Date | undefined>(undefined);
  return (
    <>
      {props.type == "date" ? (
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
      ) : (
        <Input
          id={props.field.name}
          type={props.type}
          name={props.field.name}
          value={props.field.state.value || ""}
          onBlur={props.field.handleBlur}
          onChange={(e) => props.field.handleChange(e.target.value)}
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
