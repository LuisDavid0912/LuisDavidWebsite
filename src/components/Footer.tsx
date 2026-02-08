import { Box, Container, Typography, Stack, IconButton, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { siteContent } from '@/content/site';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: 'primary.main',
        color: 'white',
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
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <EmailIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={3}>
            {siteContent.navbar.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            {siteContent.footer.copyright}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
