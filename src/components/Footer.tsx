'use client';

import { Box, Container, Typography, Stack, IconButton, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { alpha } from '@mui/material/styles';
import { siteContent } from '@/content/site';
import { brandColors, alphaLevels } from '@/theme/tokens';

export default function Footer() {
  // Footer always uses white text on primary background
  // Compute colors at runtime using alpha()
  const hoverBg = alpha(brandColors.white, alphaLevels.accentBg);
  const linkColor = alpha(brandColors.white, 0.8);
  const borderColor = alpha(brandColors.white, alphaLevels.accentChip);
  const mutedText = alpha(brandColors.white, alphaLevels.textSecondary);

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            {siteContent.navbar.logo}
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              component="a"
              href={siteContent.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{
                color: 'inherit',
                '&:hover': {
                  bgcolor: hoverBg,
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component="a"
              href={siteContent.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{
                color: 'inherit',
                '&:hover': {
                  bgcolor: hoverBg,
                },
              }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component="a"
              href={siteContent.social.email}
              aria-label="Email"
              sx={{
                color: 'inherit',
                '&:hover': {
                  bgcolor: hoverBg,
                },
              }}
            >
              <EmailIcon />
            </IconButton>
          </Stack>

          <Stack 
            direction="row" 
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {siteContent.navbar.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                sx={{
                  color: linkColor,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: 'primary.contrastText',
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>

        <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: borderColor }}>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: mutedText,
            }}
          >
            {siteContent.footer.copyright}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
