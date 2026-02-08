import { Button, ButtonProps } from '@mui/material';

interface SecondaryButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
  children: React.ReactNode;
}

export default function SecondaryButton({ children, ...props }: SecondaryButtonProps) {
  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      {...props}
    >
      {children}
    </Button>
  );
}
