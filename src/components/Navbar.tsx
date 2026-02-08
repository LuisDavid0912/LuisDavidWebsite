'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { siteContent } from '@/content/site';
import Image from 'next/image';
import logo from '@/assets/images/logo2.jpg';

import Link from 'next/link';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 280, height: '100%', backgroundColor: 'background.default' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle} aria-label="Cerrar menú">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {siteContent.navbar.links.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton
              component={Link}
              href={link.href}
              onClick={handleDrawerToggle}
              sx={{ py: 2, px: 3 }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: '1.1rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <Box sx={{ position: 'relative', width: 40, height: 40, borderRadius: '50%', overflow: 'hidden' }}>
                <Image
                  src={logo}
                  alt="Luis David Mag logo"
                  fill
                  sizes="40px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </Box>
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                }}
              >
                {siteContent.navbar.logo}
              </Typography>
            </Box>

            {isMobile ? (
              <IconButton
                color="primary"
                aria-label="Abrir menú de navegación"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {siteContent.navbar.links.map((link) => (
                  <Button
                    key={link.label}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(26, 54, 93, 0.08)',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
