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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface InputShowDateProps {
  name: string;
  data: any;
  type: string;
}
export const InputShowDate = ({ name, data, type }: InputShowDateProps) => {
  const date = type == "date" ? new Date(data) : undefined;
  return (
    <>
      {/*  */}
      {data !== undefined && data !== null && type === "checkbox" && (
        <div className=" h-11 flex items-center gap-2">
          <Switch checked={data} disabled={true} />
        </div>
      )}
      {data !== undefined &&
        data !== null &&
        ["text", "email", "tel"].includes(type) && (
          <>
            <Input
              id={name}
              name={name}
              type={type}
              disabled={true}
              autoComplete="off"
              value={data}
            />
          </>
        )}
      {data !== undefined && data !== null && type == "date" && (
        <>
          <Button
            disabled={true}
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date?.toLocaleDateString()}
          </Button>
        </>
      )}
      {data == undefined && (
        <div>
          <Skeleton className="h-[44px] w-full rounded" />
        </div>
      )}
    </>
  );
};

export const InputCustomData = (props) => {
  // Manage date type

  const [date, setDate] = React.useState<Date | null>(null);
  const [open, setOpen] = React.useState(false);
  console.log("Field Action:", props.field.state.value);
  React.useEffect(() => {
    if (props.type == "date" && props.field.state.value) {
      const parsedDate = props.field.state.value;
      setDate(parsedDate);
    }
  }, [props.field.state.value]);

  const [selectOptions, setSelectOptions] = React.useState<any[] | null>(null);
  React.useEffect(() => {
    const fetchOptions = async () => {
      if (props.type === "select") {
        if (typeof props.fieldAction.options === "function" && !selectOptions) {
          const options = await props.fieldAction.options();
          setSelectOptions(options);
        }
      }
    };
    fetchOptions();
  }, []);

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
              {/* {props.field.state.value.toLocaleDateString()} */}
              {date?.toLocaleDateString("fr-FR")}
              {/* {date} */}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={props.field.state.value}
              captionLayout="dropdown"
              onSelect={(date) => {
                setOpen(false);
                props.field.handleChange(date);
              }}
            />
          </PopoverContent>
        </Popover>
      )}
      {(props.type == "text" ||
        props.type == "number" ||
        props.type == "email" ||
        props.type == "tel") && (
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
      {props.type == "select" && (
        <>
          {/* {props.field.state.value} */}
          <Select
            value={props.field.state.value}
            onValueChange={(e) => props.field.handleChange(e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {selectOptions &&
                  selectOptions.map((option: any, index: number) => (
                    <SelectItem
                      key={index}
                      value={option[props.fieldAction.optionKey]}
                    >
                      {option[props.fieldAction.optionLabel]}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
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
