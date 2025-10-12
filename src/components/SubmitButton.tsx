import type { ButtonProps } from "@mui/material/Button";

import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";

export interface SubmitButtonProps extends Omit<ButtonProps, "type"> {
  disableClean?: boolean;
  label: string;
}

function SubmitButton({ disableClean, label, ...buttonProps }: SubmitButtonProps) {
  const {
    formState: { disabled: formDisabled, isDirty, isSubmitting },
  } = useFormContext();

  return (
    <Button
      color="primary"
      disabled={buttonProps.disabled || (disableClean && !isDirty) || formDisabled}
      loading={isSubmitting}
      type="submit"
      variant="contained"
      {...buttonProps}
    >
      {label}
    </Button>
  );
}

export default SubmitButton;
