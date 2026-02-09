'use client';

import { Box, Container, Typography, Stack, IconButton, Link, SvgIcon, SvgIconProps } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import { alpha } from '@mui/material/styles';
import { siteContent } from '@/content/site';
import { brandColors, alphaLevels } from '@/theme/tokens';

function TikTokIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </SvgIcon>
  );
}

// ... existing imports

export default function Footer() {
  // Footer always uses white text on primary background
  // Compute colors at runtime using alpha()
  const hoverBg = alpha(brandColors.white, alphaLevels.accentBg);
  const linkColor = alpha(brandColors.white, 0.8);
  const borderColor = alpha(brandColors.white, alphaLevels.accentChip);
  const mutedText = alpha(brandColors.white, alphaLevels.textSecondary);

  const socialLinks = [
    { href: siteContent.social.linkedin, icon: <LinkedInIcon />, label: 'LinkedIn' },
    { href: siteContent.social.github, icon: <GitHubIcon />, label: 'GitHub' },
    { href: siteContent.social.email, icon: <EmailIcon />, label: 'Email' },
    { href: siteContent.social.instagram, icon: <InstagramIcon />, label: 'Instagram' },
    { href: siteContent.social.youtube, icon: <YouTubeIcon />, label: 'YouTube' },
    { href: siteContent.social.tiktok, icon: <TikTokIcon />, label: 'TikTok' },
    { href: siteContent.social.x, icon: <XIcon />, label: 'X (Twitter)' },
  ];

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

          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
            {socialLinks.map((link) => (
              <IconButton
                key={link.label}
                component="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    bgcolor: hoverBg,
                  },
                }}
              >
                {link.icon}
              </IconButton>
            ))}
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
          <Stack 
            direction={{ xs: 'column-reverse', md: 'row' }} 
            justifyContent="space-between" 
            alignItems="center" 
            spacing={2}
          >
            <Typography variant="body2" sx={{ color: mutedText, textAlign: { xs: 'center', md: 'left' } }}>
              {siteContent.footer.copyright}
            </Typography>

            <Stack direction="row" spacing={3}>
              <Link href="/politica-de-privacidad" underline="hover" sx={{ color: mutedText, fontSize: '0.75rem' }}>
                Privacidad
              </Link>
              <Link href="/politica-de-cookies" underline="hover" sx={{ color: mutedText, fontSize: '0.75rem' }}>
                Cookies
              </Link>
              <Link href="/aviso-legal" underline="hover" sx={{ color: mutedText, fontSize: '0.75rem' }}>
                Aviso Legal
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
