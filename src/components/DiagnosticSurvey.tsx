'use client';

import { useState, useCallback, FormEvent } from 'react';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Fade,
  TextField,
  CircularProgress,
  Alert,
  Collapse,
  Container,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplayIcon from '@mui/icons-material/Replay';
import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { submitLead } from '@/services/leadCapture';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SurveyPhase = 'questions' | 'results';
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// Stricter email regex (matches the one used in the service layer).
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// sessionStorage key used to prevent resubmission within the same session.
const SESSION_DIAG_KEY = 'ldm_diag_submitted';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DiagnosticSurvey() {
  const { diagnostic } = siteContent;
  const totalQuestions = diagnostic.questions.length;

  // Survey state
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<SurveyPhase>('questions');
  const [fadeIn, setFadeIn] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // Honeypot — must stay empty for real users.
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [resultMessage, setResultMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  // Derived
  const currentQuestion = diagnostic.questions[currentStep];
  const selectedValue = currentQuestion ? answers[currentQuestion.id] : undefined;
  const progress = ((currentStep + (phase === 'results' ? 1 : 0)) / totalQuestions) * 100;

  // Score & result
  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const result = diagnostic.results.find(
    (r) => totalScore >= r.minScore && totalScore <= r.maxScore,
  ) ?? diagnostic.results[0];

  // ------ Handlers ------

  const animateTransition = useCallback((callback: () => void) => {
    setFadeIn(false);
    setTimeout(() => {
      callback();
      setFadeIn(true);
    }, 200);
  }, []);

  const handleSelectOption = (value: number) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      animateTransition(() => setCurrentStep((s) => s + 1));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      animateTransition(() => setCurrentStep((s) => s - 1));
    }
  };

  const handleSeeResults = () => {
    animateTransition(() => setPhase('results'));
  };

  const handleRestart = () => {
    animateTransition(() => {
      setCurrentStep(0);
      setAnswers({});
      setPhase('questions');
      setName('');
      setEmail('');
      setHp('');
      setFormStatus('idle');
      setResultMessage('');
      setFieldErrors({});
    });
  };

  // ------ Form logic ------

  const validate = (): boolean => {
    const errors: { name?: string; email?: string } = {};
    if (!name.trim()) errors.name = diagnostic.form.validation.nameRequired;
    else if (name.trim().length < 2) errors.name = diagnostic.form.validation.nameMin;
    if (!email.trim()) errors.email = diagnostic.form.validation.emailRequired;
    else if (!EMAIL_REGEX.test(email.trim())) errors.email = diagnostic.form.validation.emailInvalid;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    // Bot trap — if filled, silently pretend success.
    if (hp.trim().length > 0) {
      setFormStatus('success');
      setResultMessage(diagnostic.form.successMessage);
      return;
    }

    // Anti-duplicate guard for the same session (per email).
    const sessionKey = `${SESSION_DIAG_KEY}:${email.trim().toLowerCase()}`;
    if (typeof window !== 'undefined') {
      try {
        if (window.sessionStorage.getItem(sessionKey)) {
          setFormStatus('success');
          setResultMessage(diagnostic.form.successMessage);
          return;
        }
      } catch {
        // sessionStorage may be unavailable (private mode); fall through.
      }
    }

    setFormStatus('loading');
    setResultMessage('');

    const diagnosticData = {
      answers,
      totalScore,
      resultLevel: result.level,
      resultTitle: result.title,
      resultDescription: result.description,
      resultRecommendation: result.recommendation,
      resultEmoji: result.emoji,
    };

    const res = await submitLead({
      name: name.trim(),
      email: email.trim(),
      hp,
      diagnostic: JSON.stringify(diagnosticData),
    });

    if (res.ok) {
      setFormStatus('success');
      setResultMessage(diagnostic.form.successMessage);
      if (typeof window !== 'undefined') {
        try {
          window.sessionStorage.setItem(sessionKey, '1');
        } catch {
          /* ignore */
        }
      }
    } else {
      setFormStatus('error');
      setResultMessage(res.message);
    }
  };

  // =========================================================================
  // RENDER — Questions phase
  // =========================================================================

  if (phase === 'questions' && currentQuestion) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Progress bar */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              {diagnostic.progress.label} {currentStep + 1} {diagnostic.progress.of}{' '}
              {totalQuestions}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontWeight: 600 }}
            >
              {Math.round(progress)}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: (theme) =>
                alpha(
                  theme.palette.mode === 'light' ? brandColors.black : brandColors.white,
                  0.08,
                ),
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                bgcolor: brandColors.primary,
              },
            }}
          />
        </Box>

        {/* Question + Options */}
        <Fade in={fadeIn} timeout={300}>
          <Box>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: { xs: 3, md: 4 },
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.3,
              }}
            >
              {currentQuestion.question}
            </Typography>

            <Stack spacing={2}>
              {currentQuestion.options.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                  <Box
                    key={option.value}
                    onClick={() => handleSelectOption(option.value)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={option.label}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectOption(option.value);
                      }
                    }}
                    sx={{
                      p: { xs: 2, md: 2.5 },
                      borderRadius: 2,
                      border: 2,
                      borderColor: isSelected
                        ? brandColors.secondary
                        : (theme) =>
                            alpha(
                              theme.palette.mode === 'light'
                                ? brandColors.black
                                : brandColors.white,
                              0.12,
                            ),
                      bgcolor: isSelected
                        ? (theme) =>
                            alpha(
                              brandColors.secondary,
                              theme.palette.mode === 'light' ? 0.08 : 0.12,
                            )
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: alpha(brandColors.secondary, 0.5),
                        bgcolor: (theme) =>
                          alpha(
                            brandColors.secondary,
                            theme.palette.mode === 'light' ? 0.04 : 0.06,
                          ),
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: isSelected ? 600 : 400,
                        color: 'text.primary',
                        fontSize: { xs: '0.9375rem', md: '1rem' },
                        lineHeight: 1.5,
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>

            {/* Navigation buttons */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              sx={{ mt: { xs: 4, md: 5 } }}
            >
              <SecondaryButton
                onClick={handlePrevious}
                disabled={currentStep === 0}
                startIcon={<ArrowBackIcon />}
                sx={{
                  visibility: currentStep === 0 ? 'hidden' : 'visible',
                }}
              >
                {diagnostic.navigation.previous}
              </SecondaryButton>

              {currentStep === totalQuestions - 1 ? (
                <PrimaryButton
                  onClick={handleSeeResults}
                  disabled={selectedValue === undefined}
                >
                  {diagnostic.navigation.seeResults}
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  onClick={handleNext}
                  disabled={selectedValue === undefined}
                  endIcon={<ArrowForwardIcon />}
                >
                  {diagnostic.navigation.next}
                </PrimaryButton>
              )}
            </Stack>
          </Box>
        </Fade>
      </Container>
    );
  }

  // =========================================================================
  // RENDER — Results phase
  // =========================================================================

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Fade in={fadeIn} timeout={400}>
        <Box>
          {/* Score badge */}
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 4, md: 5 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '3rem', md: '4rem' },
                lineHeight: 1,
                mb: 1,
              }}
            >
              {result.emoji}
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' },
                fontWeight: 700,
                color: 'text.primary',
                mb: 1,
              }}
            >
              {result.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? brandColors.primary
                    : brandColors.secondary,
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Puntuación: {totalScore} / {totalQuestions * 4}
            </Typography>
          </Box>

          {/* Result description */}
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: (theme) =>
                alpha(
                  brandColors.primary,
                  theme.palette.mode === 'light' ? 0.04 : 0.12,
                ),
              border: 1,
              borderColor: (theme) =>
                alpha(
                  brandColors.primary,
                  theme.palette.mode === 'light' ? 0.1 : 0.2,
                ),
              mb: { xs: 4, md: 5 },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'text.primary',
                lineHeight: 1.7,
                mb: 2,
                textAlign: 'justify',
              }}
            >
              {result.description}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.7,
                fontStyle: 'italic',
                textAlign: 'justify',
              }}
            >
              💡 {result.recommendation}
            </Typography>
          </Box>

          {/* Lead capture form */}
          {formStatus !== 'success' && (
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.mode === 'light'
                      ? brandColors.black
                      : brandColors.white,
                    theme.palette.mode === 'light' ? 0.02 : 0.05,
                  ),
                border: 1,
                borderColor: (theme) =>
                  alpha(
                    theme.palette.mode === 'light'
                      ? brandColors.black
                      : brandColors.white,
                    0.08,
                  ),
                mb: { xs: 4, md: 5 },
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.375rem' },
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 1,
                }}
              >
                {diagnostic.form.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mb: 3 }}
              >
                {diagnostic.form.description}
              </Typography>

              <Collapse in={formStatus === 'error'}>
                <Alert
                  severity="error"
                  sx={{ mb: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}
                  onClose={() => {
                    setFormStatus('idle');
                    setResultMessage('');
                  }}
                >
                  {resultMessage}
                </Alert>
              </Collapse>

              <Box
                component="form"
                onSubmit={handleFormSubmit}
                noValidate
                aria-label="Formulario de diagnóstico"
              >
                {/* Honeypot field (hidden from users, catches bots).
                    Real users never fill this; if it has a value at submit time we drop the request. */}
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
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    inputProps={{ tabIndex: -1, 'aria-hidden': true }}
                  />
                </Box>

                <Stack spacing={2}>
                  <TextField
                    id="diagnostic-name"
                    name="name"
                    label={diagnostic.form.nameLabel}
                    placeholder={diagnostic.form.namePlaceholder}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name)
                        setFieldErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    error={Boolean(fieldErrors.name)}
                    helperText={fieldErrors.name}
                    disabled={formStatus === 'loading'}
                    fullWidth
                    size="medium"
                    inputProps={{ autoComplete: 'given-name' }}
                  />
                  <TextField
                    id="diagnostic-email"
                    name="email"
                    type="email"
                    label={diagnostic.form.emailLabel}
                    placeholder={diagnostic.form.emailPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email)
                        setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    error={Boolean(fieldErrors.email)}
                    helperText={fieldErrors.email}
                    disabled={formStatus === 'loading'}
                    fullWidth
                    size="medium"
                    inputProps={{ autoComplete: 'email' }}
                  />
                  <PrimaryButton
                    type="submit"
                    disabled={formStatus === 'loading'}
                    fullWidth
                  >
                    {formStatus === 'loading' ? (
                      <CircularProgress size={24} color="inherit" aria-label="Enviando..." />
                    ) : (
                      diagnostic.form.buttonLabel
                    )}
                  </PrimaryButton>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontSize: { xs: '0.75rem', md: '0.8125rem' },
                  }}
                >
                  {diagnostic.form.disclaimer}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Success message */}
          {formStatus === 'success' && (
            <Collapse in>
              <Alert
                severity="success"
                sx={{
                  mb: { xs: 4, md: 5 },
                  fontSize: { xs: '0.875rem', md: '1rem' },
                }}
              >
                {resultMessage}
              </Alert>
            </Collapse>
          )}

          {/* CTA */}
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: brandColors.primary,
              mb: { xs: 3, md: 4 },
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              sx={{
                color: brandColors.white,
                fontSize: { xs: '1.125rem', md: '1.5rem' },
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              {diagnostic.cta.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha(brandColors.white, 0.8),
                mb: 3,
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              {diagnostic.cta.description}
            </Typography>
            <SecondaryButton
              component={Link}
              href={diagnostic.cta.buttonHref}
              sx={{
                borderColor: brandColors.secondary,
                color: brandColors.secondary,
                '&:hover': {
                  borderColor: brandColors.secondary,
                  bgcolor: alpha(brandColors.secondary, 0.15),
                },
              }}
            >
              {diagnostic.cta.buttonLabel}
            </SecondaryButton>
          </Box>

          {/* Restart button */}
          <Box sx={{ textAlign: 'center' }}>
            <SecondaryButton
              onClick={handleRestart}
              startIcon={<ReplayIcon />}
            >
              {diagnostic.navigation.restart}
            </SecondaryButton>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
}
