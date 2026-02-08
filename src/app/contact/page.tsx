import { Box, Typography, Stack, Container } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { Section, PrimaryButton } from '@/components';
import { siteContent } from '@/content/site';

export default function ContactPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Section
        title={siteContent.contact.title}
        subtitle={siteContent.contact.subtitle}
        background="default"
        centered
      >
        <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', mb: 4 }}
          >
            {siteContent.contact.description}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <PrimaryButton
              component="a"
              href={`mailto:${siteContent.contact.email}`}
              startIcon={<EmailIcon />}
            >
              {siteContent.contact.ctaLabel}
            </PrimaryButton>
          </Stack>
        </Box>
      </Section>
    </Container>
  );
}
