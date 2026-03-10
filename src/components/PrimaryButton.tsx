import { Button, ButtonProps } from '@mui/material';

interface PrimaryButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
  children: React.ReactNode;
  component?: any;
  href?: string;
  target?: string;
  rel?: string;
}

export default function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      {...props}
      sx={[
        {
          fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.95rem' },
          px: { xs: 2.5, sm: 3, md: 4 },
          py: { xs: 1, sm: 1.25, md: 1.5 },
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {children}
    </Button>
  );
}
