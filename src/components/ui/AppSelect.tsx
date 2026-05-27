'use client';

import { ReactNode } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  type SelectChangeEvent,
  alpha,
} from '@mui/material';
import { brandColors } from '@/theme/tokens';

interface AppSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AppSelectProps {
  id: string;
  label: string;
  value: string;
  options: AppSelectOption[];
  onChange: (value: string) => void;
  helperText?: string | ReactNode;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  disabled?: boolean;
  'aria-label'?: string;
}

/**
 * AppSelect — Reusable dropdown select component
 * 
 * Wraps MUI's Select/FormControl with consistent styling, proper label alignment,
 * accessible labeling, and responsive behavior.
 * 
 * Usage:
 * ```tsx
 * <AppSelect
 *   id="platform"
 *   label="Formato"
 *   value={platform}
 *   options={[
 *     { value: 'youtube', label: 'YouTube (16:9)' },
 *     { value: 'instagram', label: 'Instagram (1:1)' },
 *   ]}
 *   onChange={setPlatform}
 * />
 * ```
 */
export default function AppSelect({
  id,
  label,
  value,
  options,
  onChange,
  helperText,
  fullWidth = true,
  size = 'medium',
  disabled = false,
  'aria-label': ariaLabel,
}: AppSelectProps) {
  const labelId = `${id}-label`;

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      size={size}
      disabled={disabled}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        aria-label={ariaLabel || label}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 0.5,
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              maxHeight: 320,
              backgroundColor: (theme) => theme.palette.mode === 'light'
                ? brandColors.white
                : brandColors.black,
              border: '1px solid',
              borderColor: (theme) => theme.palette.mode === 'light'
                ? alpha(brandColors.black, 0.1)
                : alpha(brandColors.white, 0.15),
              backgroundImage: 'none',
              '& .MuiMenuItem-root': {
                py: 1.25,
                px: 2,
                fontSize: '0.9375rem',
                borderRadius: 1,
                mx: 0.5,
                mb: 0.25,
                transition: 'background-color 0.15s ease',
              },
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText sx={{ mt: 1 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
