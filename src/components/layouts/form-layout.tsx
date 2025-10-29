import { Locataire } from "@/types/app";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { FieldError } from "../ui/field";
import clsx from "clsx";

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
  return (
    <>
      <Input
        id={props.field.name}
        name={props.field.name}
        value={props.field.state.value || ""}
        onBlur={props.field.handleBlur}
        onChange={(e) => props.field.handleChange(e.target.value)}
        aria-invalid={props.isInvalid}
        autoComplete="off"
      />
      {
        <FieldError
          className={clsx(props.isInvalid ? "block" : "hidden")}
          errors={props.field.state.meta.errors}
        />
      }
    </>
  );
};
