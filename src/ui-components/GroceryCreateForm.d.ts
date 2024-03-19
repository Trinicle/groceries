/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GroceryCreateFormInputValues = {
    Nam?: string;
    Checked?: boolean;
};
export declare type GroceryCreateFormValidationValues = {
    Nam?: ValidationFunction<string>;
    Checked?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GroceryCreateFormOverridesProps = {
    GroceryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Nam?: PrimitiveOverrideProps<TextFieldProps>;
    Checked?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type GroceryCreateFormProps = React.PropsWithChildren<{
    overrides?: GroceryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GroceryCreateFormInputValues) => GroceryCreateFormInputValues;
    onSuccess?: (fields: GroceryCreateFormInputValues) => void;
    onError?: (fields: GroceryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GroceryCreateFormInputValues) => GroceryCreateFormInputValues;
    onValidate?: GroceryCreateFormValidationValues;
} & React.CSSProperties>;
export default function GroceryCreateForm(props: GroceryCreateFormProps): React.ReactElement;