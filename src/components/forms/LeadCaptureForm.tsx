'use client';

import { useState, FormEvent } from 'react';
import {
  Box,
  TextField,
  Stack,
  Typography,
  Alert,
  CircularProgress,
  Collapse,
  Button,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PrimaryButton from '@/components/PrimaryButton';
import { siteContent } from '@/content/site';
import { submitLead } from '@/services/leadCapture';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LeadCaptureFormProps {
  /** 'default' = vertical stacked; 'compact' = inline row on md+; 'contact' = contact page with message field */
  variant?: 'default' | 'compact' | 'contact';
  /** Resource slug — when set, form acts as resource gate */
  resourceSlug?: string;
  /** Download URL shown on success when resourceSlug is set */
  downloadUrl?: string;
  /** Override button label */
  buttonLabel?: string;
  /** Override success message */
  successMessage?: string;
  /** Callback fired when form succeeds (for closing dialogs, etc.) */
  onSuccess?: () => void;
}

export default function LeadCaptureForm({
  variant = 'default',
  resourceSlug,
  downloadUrl,
  buttonLabel,
  successMessage,
  onSuccess,
}: LeadCaptureFormProps) {
  const { newsletter, resources, contact } = siteContent;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [resultMessage, setResultMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const isResource = Boolean(resourceSlug);
  const isContact = variant === 'contact';
  const isCompact = variant === 'compact';

  // Resolve labels based on variant
  const resolvedButtonLabel = buttonLabel
    ?? (isContact ? contact.form.buttonLabel : isResource ? resources.form.buttonLabel : newsletter.buttonLabel);
  const resolvedSuccessMsg = successMessage
    ?? (isContact ? contact.form.successMessage : isResource ? resources.form.successMessage : newsletter.successMessage);

  const nameLabel = isContact ? contact.form.nameLabel : newsletter.nameLabel;
  const namePlaceholder = isContact ? contact.form.namePlaceholder : newsletter.namePlaceholder;
  const emailLabel = isContact ? contact.form.emailLabel : newsletter.emailLabel;
  const emailPlaceholder = isContact ? contact.form.emailPlaceholder : newsletter.emailPlaceholder;
  const disclaimer = isContact ? contact.form.disclaimer : newsletter.disclaimer;

  const validationMessages = isContact ? contact.form.validation : newsletter.validation;

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!name.trim()) {
      errors.name = validationMessages.nameRequired;
    } else if (name.trim().length < 2) {
      errors.name = validationMessages.nameMin;
    }

    if (!email.trim()) {
      errors.email = validationMessages.emailRequired;
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = validationMessages.emailInvalid;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('loading');
    setResultMessage('');

    const result = await submitLead({
      name: name.trim(),
      email: email.trim(),
      ...(resourceSlug ? { resource: resourceSlug } : {}),
      ...(isContact && message.trim() ? { message: message.trim() } : {}),
    });

    if (result.ok) {
      setStatus('success');
      setResultMessage(resolvedSuccessMsg);
      setName('');
      setEmail('');
      setMessage('');
      setFieldErrors({});
      onSuccess?.();
    } else {
      setStatus('error');
      setResultMessage(result.message);
    }
  };

  // If success, show the success message + optional download button
  if (status === 'success') {
    return (
      <Collapse in>
        <Stack
          spacing={2}
          alignItems="center"
          sx={{
            maxWidth: 600,
            mx: isCompact ? undefined : 'auto',
          }}
        >
          <Alert
            severity="success"
            sx={{ width: '100%', fontSize: { xs: '0.875rem', md: '1rem' } }}
          >
            {resultMessage}
          </Alert>

          {isResource && downloadUrl && downloadUrl !== '#' && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<DownloadIcon />}
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              {resources.form.downloadButtonLabel}
            </Button>
          )}
        </Stack>
      </Collapse>
    );
  }

  const ariaLabel = isContact
    ? 'Formulario de contacto'
    : isResource
      ? 'Formulario para descargar recurso'
      : 'Formulario de suscripción a newsletter';

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      aria-label={ariaLabel}
      sx={{
        maxWidth: isCompact ? undefined : 600,
        mx: isCompact ? undefined : 'auto',
        width: '100%',
      }}
    >
      {/* Error alert */}
      <Collapse in={status === 'error'}>
        <Alert
          severity="error"
          sx={{ mb: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}
          onClose={() => {
            setStatus('idle');
            setResultMessage('');
          }}
        >
          {resultMessage}
        </Alert>
      </Collapse>

      {/* Honeypot field (hidden from users, catches bots) */}
      <Box
        sx={{
          position: 'absolute',
          left: '-9999px',
          opacity: 0,
          height: 0,
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <TextField
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </Box>

      {/* Form fields */}
      <Stack
        direction={isCompact ? { xs: 'column', md: 'row' } : 'column'}
        spacing={2}
        alignItems={isCompact ? { md: 'flex-start' } : undefined}
      >
        <TextField
          id={`lead-name${resourceSlug ? `-${resourceSlug}` : ''}${isContact ? '-contact' : ''}`}
          name="name"
          label={nameLabel}
          placeholder={namePlaceholder}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (fieldErrors.name) {
              setFieldErrors((prev) => ({ ...prev, name: undefined }));
            }
          }}
          error={Boolean(fieldErrors.name)}
          helperText={fieldErrors.name}
          disabled={status === 'loading'}
          fullWidth
          size="medium"
          inputProps={{
            'aria-describedby': fieldErrors.name ? `lead-name-error${resourceSlug ? `-${resourceSlug}` : ''}` : undefined,
            autoComplete: 'given-name',
          }}
          sx={{ flex: isCompact ? 1 : undefined }}
        />

        <TextField
          id={`lead-email${resourceSlug ? `-${resourceSlug}` : ''}${isContact ? '-contact' : ''}`}
          name="email"
          type="email"
          label={emailLabel}
          placeholder={emailPlaceholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) {
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          error={Boolean(fieldErrors.email)}
          helperText={fieldErrors.email}
          disabled={status === 'loading'}
          fullWidth
          size="medium"
          inputProps={{
            'aria-describedby': fieldErrors.email ? `lead-email-error${resourceSlug ? `-${resourceSlug}` : ''}` : undefined,
            autoComplete: 'email',
          }}
          sx={{ flex: isCompact ? 1 : undefined }}
        />

        {/* Message field for contact variant */}
        {isContact && (
          <TextField
            id="lead-message-contact"
            name="message"
            label={contact.form.messageLabel}
            placeholder={contact.form.messagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === 'loading'}
            fullWidth
            multiline
            minRows={4}
            maxRows={8}
            size="medium"
            inputProps={{
              autoComplete: 'off',
            }}
          />
        )}

        <PrimaryButton
          type="submit"
          disabled={status === 'loading'}
          fullWidth={!isCompact}
          sx={{
            minWidth: isCompact ? { xs: '100%', md: 200 } : undefined,
            height: { md: isCompact ? 56 : undefined },
          }}
        >
          {status === 'loading' ? (
            <CircularProgress
              size={24}
              color="inherit"
              aria-label="Enviando..."
            />
          ) : (
            resolvedButtonLabel
          )}
        </PrimaryButton>
      </Stack>

      {/* Disclaimer */}
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: 'text.secondary',
          textAlign: isCompact ? { xs: 'center', md: 'left' } : 'center',
          fontSize: { xs: '0.75rem', md: '0.8125rem' },
        }}
      >
        {disclaimer}
      </Typography>
    </Box>
  );
}
