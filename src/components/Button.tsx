import { Button } from "@mui/material";
import { btnColor, btnSize, btnVariant } from "../utils/enum";

type Props = {
  text: string;
  color: btnColor;
  size: btnSize;
  variant: btnVariant;
  disabled: boolean;
  action: () => void;
};

export const ButtonElement = ({
  text,
  color,
  size,
  variant,
  disabled,
  action,
}: Props) => {
  return (
    <Button
      onClick={action}
      color={color}
      size={size}
      variant={variant}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};
