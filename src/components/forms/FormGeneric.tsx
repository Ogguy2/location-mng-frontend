"use client";
import { useForm } from "@tanstack/react-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import z from "zod";
import {
  InputCustomData,
  InputShowDate,
} from "@/components/layouts/form-layout";
import React from "react";
import { EntityConfig, FieldConfig } from "@/app/config/entities.config";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface FormGenericProps {
  entityConfig: EntityConfig;
  initialData?: Record<string, any> | null;
  onSubmit?: (value: any) => Promise<void>;
  onFormReady?: (form: any) => void;
  mode: "create" | "edit" | "view";
}

// Fonction pour générer dynamiquement le schéma Zod
const generateZodSchema = (fields: FieldConfig[]) => {
  const schema: Record<string, any> = {};

  fields.forEach((field) => {
    let validator: any;

    switch (field.type) {
      case "number":
        validator = z.number();
        if (field.validation?.min !== undefined) {
          validator = validator.min(
            field.validation.min,
            `Le ${field.label.toLowerCase()} doit être supérieur à ${
              field.validation.min
            }`
          );
        }
        if (field.validation?.max !== undefined) {
          validator = validator.max(
            field.validation.max,
            `Le ${field.label.toLowerCase()} doit être inférieur à ${
              field.validation.max
            }`
          );
        }
        break;

      case "email":
        validator = z.string().email(`${field.label} invalide`);
        break;

      case "boolean":
        validator = z.boolean();
        break;

      case "date":
        validator = z.string().nullable();
        break;

      default: // text, textarea, tel
        validator = z.string();
        if (field.validation?.min) {
          validator = validator.min(
            field.validation.min,
            `${field.label} doit comporter au moins ${field.validation.min} caractères`
          );
        }
        if (field.validation?.max) {
          validator = validator.max(
            field.validation.max,
            `${field.label} doit comporter au maximum ${field.validation.max} caractères`
          );
        }
        break;
    }

    if (!field.validation?.required && field.type !== "boolean") {
      validator = validator.optional();
    }

    schema[field.name] = validator;
  });

  return z.object(schema);
};

// Composant pour rendre différents types de champs
const renderField = (
  field: FieldConfig,
  formField: any,
  mode: "create" | "edit" | "view",
  initialData?: Record<string, any> | null
) => {
  const isInvalid =
    formField.state.meta.isTouched && !formField.state.meta.isValid;

  if (mode === "view") {
    // En mode view, on affiche simplement la valeur
    const value = initialData?.[field.name];
    return (
      <Input
        id={field.name}
        name={field.name}
        disabled={true}
        value={value || ""}
        readOnly
      />
    );
  }

  switch (field.type) {
    case "boolean":
      return (
        <Switch
          checked={formField.state.value || false}
          onCheckedChange={(checked) => formField.handleChange(checked)}
        />
      );

    case "textarea":
      return (
        <Textarea
          id={field.name}
          name={field.name}
          placeholder={field.placeholder}
          value={formField.state.value || ""}
          onChange={(e) => formField.handleChange(e.target.value)}
          data-invalid={isInvalid}
        />
      );

    case "number":
      return (
        <Input
          id={field.name}
          name={field.name}
          type="number"
          placeholder={field.placeholder}
          value={formField.state.value || ""}
          onChange={(e) => formField.handleChange(Number(e.target.value))}
          data-invalid={isInvalid}
        />
      );

    default:
      return (
        <InputCustomData
          type={field.type}
          isInvalid={isInvalid}
          field={formField}
        />
      );
  }
};

export default function FormGeneric({
  entityConfig,
  initialData,
  onSubmit,
  onFormReady,
  mode,
}: FormGenericProps) {
  const [errorSubmit, setErrorSubmit] = React.useState<Record<string, string>>(
    {}
  );

  // Générer les valeurs par défaut
  const defaultValues =
    mode === "create"
      ? entityConfig.fields.reduce((acc, field) => {
          acc[field.name] =
            field.defaultValue !== undefined
              ? field.defaultValue
              : field.type === "number"
              ? 0
              : field.type === "boolean"
              ? false
              : field.type === "date"
              ? null
              : "";
          return acc;
        }, {} as Record<string, any>)
      : initialData || null;

  // Générer le schéma de validation dynamiquement
  const formSchema = generateZodSchema(entityConfig.fields);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (onSubmit) {
        await onSubmit(value);
      }
    },
  });

  // Exposer le formulaire au composant parent
  React.useEffect(() => {
    if (onFormReady && mode !== "view") {
      onFormReady(form);
    }
  }, [form, onFormReady, mode]);

  return (
    <div className="w-full">
      <form
        id={`${entityConfig.name}-form`}
        onSubmit={(e) => {
          e.preventDefault();
          if (mode !== "view") {
            form.handleSubmit();
          }
        }}
      >
        <FieldGroup className="grid grid-cols-3">
          {entityConfig.fields.map((fieldConfig, index) => (
            <React.Fragment key={index}>
              <form.Field
                name={fieldConfig.name}
                validators={{
                  onSubmit: () => {
                    if (mode === "edit") {
                      const error = errorSubmit[fieldConfig.name];
                      return error;
                    }
                    return undefined;
                  },
                }}
                children={(field) => (
                  <Field
                    data-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  >
                    <FieldLabel className="font-semibold" htmlFor={field.name}>
                      {fieldConfig.label}
                    </FieldLabel>
                    {renderField(fieldConfig, field, mode, initialData)}
                  </Field>
                )}
              />
            </React.Fragment>
          ))}
        </FieldGroup>
      </form>
    </div>
  );
}
