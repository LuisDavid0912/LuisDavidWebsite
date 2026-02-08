import { Button, ButtonProps } from '@mui/material';

interface PrimaryButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
  children: React.ReactNode;
}

export default function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      {...props}
    >
      {children}
    </Button>
  );
}
