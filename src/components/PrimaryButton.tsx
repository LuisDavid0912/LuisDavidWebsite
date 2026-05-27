import { Button, ButtonProps } from '@mui/material';

interface PrimaryButtonProps extends ButtonProps {
  component?: any;
  href?: string;
  target?: string;
  rel?: string;
}

export default function PrimaryButton({ children, variant = 'contained', color = 'primary', ...props }: PrimaryButtonProps) {
  return (
    <Button
      variant={variant}
      color={color}
      size="large"
      {...props}
      sx={[
        {
          textTransform: 'none',
          fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.95rem' },
          px: { xs: 2.5, sm: 3, md: 4 },
          py: { xs: 1, sm: 1.25, md: 1.5 },
          fontWeight: 600,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {children}
    </Button>
  );
}
