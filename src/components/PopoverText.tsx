import Typography, { type TypographyProps } from "@mui/material/Typography";

export interface PopoverTextProps extends TypographyProps {
  text: string;
}

function PopoverText({ text, sx, ...typographyProps }: PopoverTextProps) {
  return (
    <>
      {text.split("\n").map((line, index) => {
        return (
          <Typography key={index} sx={{ margin: 1, ...sx }} {...typographyProps}>
            {line}
          </Typography>
        );
      })}
    </>
  );
}

export default PopoverText;
