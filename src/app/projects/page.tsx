'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Tooltip,
  Collapse,
  Stack,
  Tab,
  Tabs,
  Chip,
  alpha,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShieldIcon from '@mui/icons-material/Shield';
import DownloadIcon from '@mui/icons-material/Download';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

import { Section, AppSelect, PrimaryButton, SecondaryButton } from '@/components';
import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';
import { generateOpenAICompletion, generateGeminiCompletion, generateOpenAIImages, generateOpenAIImageEdit } from '@/services/aiService';

type ActiveTab = 'apps' | 'config';

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('apps');
  
  // Selected App ID (null means showing the visual grid catalog)
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  // API Keys state
  const [openaiKey, setOpenaiKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [configSuccess, setConfigSuccess] = useState(false);

  // App Providers & Models
  const [provider, setProvider] = useState<'openai' | 'gemini'>('openai');

  // App 1: Miniaturas de tu Contenido Inputs
  const [thumbPlatform, setThumbPlatform] = useState('YouTube (16:9)');
  const [thumbStyle, setThumbStyle] = useState('3D Render / Moderno');
  const [thumbIdea, setThumbIdea] = useState('');
  const [thumbHeadline, setThumbHeadline] = useState('');
  const [thumbModel, setThumbModel] = useState('gpt-image-2');
  const [thumbQuantity, setThumbQuantity] = useState('1');
  const [thumbRefImage, setThumbRefImage] = useState<File | null>(null);
  const [thumbRefPreview, setThumbRefPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // App 2: Image Studio Inputs
  const [studioIdea, setStudioIdea] = useState('');
  const [studioRatio, setStudioRatio] = useState('1:1');
  const [studioStyle, setStudioStyle] = useState('Fotográfico');

  // App 3: Digital Clones Inputs
  const [cloneGender, setCloneGender] = useState('Avatar Masculino');
  const [cloneVoice, setCloneVoice] = useState('Español Neutro');
  const [clonePrompt, setClonePrompt] = useState('');

  // App 4: Form Assistant Inputs
  const [formText, setFormText] = useState('');
  const [formTarget, setFormTarget] = useState('Contacto de Negocio');

  // App 5: Encuestas IA Inputs
  const [surveyTopic, setSurveyTopic] = useState('');
  const [surveyLength, setSurveyLength] = useState('5 preguntas');

  // App 6: EduSlide Inputs
  const [eduSubject, setEduSubject] = useState('');
  const [eduTone, setEduTone] = useState('Didáctico');

  // Execution states
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [output, setOutput] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [rememberKeys, setRememberKeys] = useState(true);

  // Load keys from localStorage/sessionStorage on mount
  useEffect(() => {
    setMounted(true);
    
    let savedOpenai = '';
    let savedGemini = '';
    let isSession = false;
    
    try {
      savedOpenai = sessionStorage.getItem('ldm_openai_key') || '';
      savedGemini = sessionStorage.getItem('ldm_gemini_key') || '';
      if (savedOpenai || savedGemini) {
        isSession = true;
      }
    } catch (e) {}
    
    if (!savedOpenai && !savedGemini) {
      try {
        savedOpenai = localStorage.getItem('ldm_openai_key') || '';
        savedGemini = localStorage.getItem('ldm_gemini_key') || '';
      } catch (e) {}
    }
    
    setOpenaiKey(savedOpenai);
    setGeminiKey(savedGemini);
    
    let savedRemember = 'true';
    try {
      savedRemember = localStorage.getItem('ldm_remember_keys') ?? (isSession ? 'false' : 'true');
    } catch (e) {}
    setRememberKeys(savedRemember === 'true');

    // If no keys are configured, encourage user to go to settings tab
    if (!savedOpenai && !savedGemini) {
      setActiveTab('config');
    }
  }, []);

  const handleSaveKeys = () => {
    try {
      if (rememberKeys) {
        localStorage.setItem('ldm_openai_key', openaiKey.trim());
        localStorage.setItem('ldm_gemini_key', geminiKey.trim());
        localStorage.setItem('ldm_remember_keys', 'true');
        sessionStorage.removeItem('ldm_openai_key');
        sessionStorage.removeItem('ldm_gemini_key');
      } else {
        sessionStorage.setItem('ldm_openai_key', openaiKey.trim());
        sessionStorage.setItem('ldm_gemini_key', geminiKey.trim());
        localStorage.setItem('ldm_remember_keys', 'false');
        localStorage.removeItem('ldm_openai_key');
        localStorage.removeItem('ldm_gemini_key');
      }
    } catch (e) {
      setError('No se pudo guardar la configuración. Los privilegios de almacenamiento local podrían estar restringidos.');
      return;
    }
    setConfigSuccess(true);
    setTimeout(() => setConfigSuccess(false), 3000);
  };

  const handleClearKeys = () => {
    setOpenaiKey('');
    setGeminiKey('');
    try {
      localStorage.removeItem('ldm_openai_key');
      localStorage.removeItem('ldm_gemini_key');
      localStorage.removeItem('ldm_remember_keys');
      sessionStorage.removeItem('ldm_openai_key');
      sessionStorage.removeItem('ldm_gemini_key');
    } catch (e) {}
  };

  const handleCopyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset outputs when returning to catalog or changing apps
  const handleBackToCatalog = () => {
    setSelectedAppId(null);
    setOutput('');
    setImageUrls([]);
    setSelectedImageIdx(0);
    setError('');
    setLoading(false);
    handleClearRefImage();
  };

  // Reference image handlers
  const handleRefImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Solo se permiten imágenes PNG, JPG o WebP.');
      return;
    }
    // Validate file size (< 50MB as per OpenAI)
    if (file.size > 50 * 1024 * 1024) {
      setError('La imagen no puede superar los 50 MB.');
      return;
    }
    setThumbRefImage(file);
    const url = URL.createObjectURL(file);
    setThumbRefPreview(url);
    setError('');
  }, []);

  const handleClearRefImage = useCallback(() => {
    setThumbRefImage(null);
    if (thumbRefPreview) URL.revokeObjectURL(thumbRefPreview);
    setThumbRefPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [thumbRefPreview]);

  // Helper to download base64 images as files
  const handleDownloadImage = useCallback(() => {
    const currentImage = imageUrls[selectedImageIdx];
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `miniatura-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrls, selectedImageIdx]);

  // Currently selected image for the mockup preview
  const activeImageUrl = imageUrls[selectedImageIdx] || '';

  const handleGenerate = async () => {
    setError('');
    setOutput('');
    setImageUrls([]);
    setSelectedImageIdx(0);
    setLoading(true);

    const activeKey = provider === 'openai' ? openaiKey : geminiKey;
    
    if (selectedAppId === 'youtube-thumbnail-pro') {
      if (!activeKey.trim()) {
        setError('Para generar imágenes necesitas configurar una clave de OpenAI en la pestaña de configuración.');
        setLoading(false);
        return;
      }
      if (!thumbIdea.trim()) {
        setError('Por favor, describe la idea de la miniatura.');
        setLoading(false);
        return;
      }

      const n = parseInt(thumbQuantity, 10);
      setLoadingStep(`Generando ${n} miniatura${n > 1 ? 's' : ''} con ${thumbModel}...`);
      
      const size = thumbPlatform.includes('16:9') ? '1536x1024' as const : '1024x1024' as const;
      
      // Build the prompt — adapt if a reference image is provided
      const basePrompt = `A high quality, professional, eye-catching visual banner/thumbnail designed for ${thumbPlatform.split(' ')[0]}.
Style: ${thumbStyle}.
Concept: ${thumbIdea.trim()}.
This is a thumbnail background for content creators. Highly detailed, colorful, clean composition, optimized for clickthrough rate. DO NOT write any text, letters, or words in the image itself. Keep the canvas clean of typos.`;

      const imagePrompt = thumbRefImage
        ? `${basePrompt}\n\nIMPORTANT: Use the provided reference photo of a person and integrate them naturally into the thumbnail composition. Place the person prominently in the scene. The person should look like a professional content creator presenting this topic.`
        : basePrompt;

      try {
        const result = thumbRefImage
          ? await generateOpenAIImageEdit(activeKey, imagePrompt, thumbRefImage, size, n, thumbModel)
          : await generateOpenAIImages(activeKey, imagePrompt, size, n, thumbModel);

        if (result.ok && result.images.length > 0) {
          setImageUrls(result.images);
          setSelectedImageIdx(0);
        } else {
          let displayError = result.message;
          if (result.message.toLowerCase().includes('safety system') || result.message.toLowerCase().includes('safety_policy_violation')) {
            displayError = 'La solicitud fue rechazada por el sistema de seguridad de OpenAI. Esto suele ocurrir al incluir nombres de figuras públicas (como Messi), rostros de celebridades o marcas registradas. Por favor, intenta describir la escena usando términos generales (ej. "un futbolista famoso celebrando con un aficionado") sin usar nombres de personas reales.';
          }
          setError(displayError);
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        let displayError = `Ocurrió un error al generar la imagen: ${errMsg}`;
        if (errMsg.toLowerCase().includes('safety system') || errMsg.toLowerCase().includes('safety_policy_violation')) {
          displayError = 'La solicitud fue rechazada por el sistema de seguridad de OpenAI. Esto suele ocurrir al incluir nombres de figuras públicas (como Messi), rostros de celebridades o marcas registradas. Por favor, intenta describir la escena usando términos generales (ej. "un futbolista famoso celebrando con un aficionado") sin usar nombres de personas reales.';
        }
        setError(displayError);
      } finally {
        setLoading(false);
        setLoadingStep('');
      }

    } else {
      // FRONT-END ONLY MOCK EXPERIENCES FOR THE OTHER 5 APES
      setLoadingStep('Analizando parámetros y simulando procesamiento...');
      
      setTimeout(() => {
        setLoading(false);
        setLoadingStep('');
        
        if (selectedAppId === 'image-studio') {
          setOutput(`[MOCK GENERATION: Image Studio]
Esta aplicación es parte del demostrador frontend de este portfolio.
Parámetros recibidos:
- Idea: "${studioIdea || 'Sin descripción'}"
- Proporción: ${studioRatio}
- Estilo: ${studioStyle}

Para conectar esta herramienta con tu API Key personal en producción, por favor solicita la versión completa.`);
        } else if (selectedAppId === 'digital-clones') {
          setOutput(`[MOCK GENERATION: Digital Clones]
Clon de voz y avatar generado en simulación.
Parámetros recibidos:
- Tipo: ${cloneGender}
- Voz seleccionada: ${cloneVoice}
- Texto narración: "${clonePrompt || 'Sin texto'}"

Vídeo renderizado: Exitoso (Entorno de pruebas).`);
        } else if (selectedAppId === 'form-assistant') {
          setOutput(`[MOCK GENERATION: Form Assistant]
Asistente listo. Formulario estructurado para "${formTarget}".
Texto extraído procesado: "${formText || 'Ninguno'}"

Sugerencia de la IA:
Completa el campo de contacto utilizando los datos extraídos para acelerar la conversión.`);
        } else if (selectedAppId === 'encuestas-ia') {
          setOutput(`[MOCK GENERATION: Encuestas IA]
Estructura de cuestionario creada para: "${surveyTopic || 'Satisfacción de Clientes'}".
Longitud: ${surveyLength}

Preguntas generadas:
1. ¿Cómo calificaría la rapidez de nuestro servicio? (Escala 1-5)
2. ¿Qué aspecto de nuestra atención considera que requiere mayor optimización?
3. ¿Recomendaría nuestras soluciones tecnológicas a otros colegas de su sector?`);
        } else if (selectedAppId === 'eduslide') {
          setOutput(`[MOCK GENERATION: EduSlide]
Presentación estructurada exitosamente.
- Tema: "${eduSubject || 'Fundamentos de IA en el retail'}"
- Tono: ${eduTone}

Diapositiva 1: Introducción y conceptos fundamentales.
Diapositiva 2: Casos prácticos de automatización en negocios físicos.
Diapositiva 3: Conclusiones y siguientes pasos.`);
        }
      }, 2000);
    }
  };

  if (!mounted) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  const { security, items } = siteContent.projects;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Section
        title={siteContent.projects.title}
        subtitle={siteContent.projects.subtitle}
        background="default"
      >
        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(_, val: ActiveTab) => setActiveTab(val)}
            textColor="primary"
            indicatorColor="primary"
            aria-label="Navegación principal de apps"
          >
            <Tab
              label="Mini Apps de IA"
              value="apps"
              icon={<AutoAwesomeIcon />}
              iconPosition="start"
              sx={{ fontWeight: 600, minHeight: 48 }}
            />
            <Tab
              label="Configurar APIs"
              value="config"
              icon={<SettingsIcon />}
              iconPosition="start"
              sx={{ fontWeight: 600, minHeight: 48 }}
            />
          </Tabs>
        </Box>

        {/* =============================================
            TAB: CONFIGURATION & SECURITY
            ============================================= */}
        <Collapse in={activeTab === 'config'}>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {/* API Config Inputs */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h3" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <KeyIcon color="primary" /> Configurar Credenciales
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Las llamadas a las inteligencias artificiales se realizarán de manera directa desde tu navegador hacia las APIs oficiales de OpenAI y Google.
                  </Typography>

                  <Stack spacing={3}>
                    {/* Gemini Input */}
                    <TextField
                      label="Google Gemini API Key"
                      type={showGeminiKey ? 'text' : 'password'}
                      placeholder="AIzaSy..."
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      fullWidth
                      helperText={
                        <span>
                          Consigue tu API Key gratis en{' '}
                          <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: brandColors.primary, fontWeight: 600 }}>
                            Google AI Studio
                          </a>.
                        </span>
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Ver clave de Gemini"
                              onClick={() => setShowGeminiKey(!showGeminiKey)}
                              edge="end"
                            >
                              {showGeminiKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* OpenAI Input */}
                    <TextField
                      label="OpenAI API Key"
                      type={showOpenaiKey ? 'text' : 'password'}
                      placeholder="sk-proj-..."
                      value={openaiKey}
                      onChange={(e) => setOpenaiKey(e.target.value)}
                      fullWidth
                      helperText={
                        <span>
                          Obtén tu clave de OpenAI en{' '}
                          <a href="https://platform.openai.com/" target="_blank" rel="noopener noreferrer" style={{ color: brandColors.primary, fontWeight: 600 }}>
                            OpenAI Platform
                          </a>.
                        </span>
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Ver clave de OpenAI"
                              onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                              edge="end"
                            >
                              {showOpenaiKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberKeys}
                          onChange={(e) => setRememberKeys(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            Recordar claves en este dispositivo
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25, lineHeight: 1.3 }}>
                            Guarda las claves localmente (localStorage). Si lo desactivas, se guardarán en sessionStorage y se eliminarán al cerrar la pestaña para mayor privacidad en computadoras compartidas.
                          </Typography>
                        </Box>
                      }
                      sx={{ alignItems: 'flex-start', mt: 1, mb: 1, '& .MuiCheckbox-root': { pt: 0.25 } }}
                    />

                    {configSuccess && (
                      <Alert severity="success" variant="outlined">
                        Configuración guardada en tu navegador de forma segura.
                      </Alert>
                    )}

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                      <PrimaryButton
                        onClick={handleSaveKeys}
                        disabled={!openaiKey.trim() && !geminiKey.trim()}
                        fullWidth
                      >
                        Guardar Claves
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={handleClearKeys}
                        disabled={!openaiKey && !geminiKey}
                        fullWidth
                        sx={{ color: 'text.primary', borderColor: 'divider' }}
                      >
                        Borrar Claves
                      </SecondaryButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Safety Guarantee */}
            <Grid item xs={12} md={6}>
              <Card 
                variant="outlined" 
                sx={{ 
                  height: '100%', 
                  borderColor: 'primary.main',
                  borderWidth: 1.5,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h3" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <ShieldIcon color="primary" /> {security.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
                    {security.description}
                  </Typography>

                  <Stack spacing={2.5}>
                    {security.points.map((point) => (
                      <Box key={point.title}>
                        <Typography variant="h5" component="h4" sx={{ fontWeight: 600, fontSize: '0.9375rem', color: 'primary.main', mb: 0.5 }}>
                          ✓ {point.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ pl: 2, lineHeight: 1.5 }}>
                          {point.text}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Collapse>

        {/* =============================================
            TAB: MINI APPS WORKPLACE / CATALOG
            ============================================= */}
        <Collapse in={activeTab === 'apps'}>
          
          {/* A: MAIN CATALOG GRID VIEW (When selectedAppId is null) */}
          {selectedAppId === null ? (
            <Box>
              <Typography variant="h2" component="h3" sx={{ color: 'text.primary', mb: 1, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                Catálogo de Aplicaciones
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
                Elige una de las herramientas inteligentes para comenzar a generar tus propios contenidos profesionales.
              </Typography>

              {/* API warning banner on top of catalog */}
              {!openaiKey.trim() && !geminiKey.trim() && (
                <Alert severity="warning" sx={{ mb: 4, '& strong': { textDecoration: 'underline', cursor: 'pointer' } }}>
                  Recuerda que para usar estas aplicaciones debes configurar al menos una clave API en la pestaña{' '}
                  <strong onClick={() => setActiveTab('config')}>Configurar APIs</strong>.
                </Alert>
              )}

              {/* Safety notice highlight banner */}
              <Card variant="outlined" sx={{ mb: 5, borderColor: 'primary.main', backgroundColor: 'action.hover' }}>
                <CardContent sx={{ py: 2, px: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <ShieldIcon color="primary" sx={{ fontSize: 28 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" component="span" sx={{ fontWeight: 700, mr: 1, color: 'primary.main' }}>
                      Garantía de Privacidad Total:
                    </Typography>
                    <Typography variant="body2" component="span" color="text.secondary">
                      Tus API Keys se guardan localmente en tu propio navegador. Las peticiones de Inteligencia Artificial van directo desde tu computadora a los servidores oficiales sin servidores intermediarios.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Visual Card Grid - Matches reference screenshot exactly */}
              <Grid container spacing={3}>
                {items.map((app) => (
                  <Grid item xs={12} sm={6} md={4} key={app.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(1, 47, 214, 0.12)',
                          borderColor: 'primary.main',
                        }
                      }}
                    >
                      {/* App Header Image */}
                      <CardMedia
                        component="img"
                        image={app.image}
                        alt={app.title}
                        sx={{
                          height: 180,
                          objectFit: 'cover',
                          backgroundColor: 'rgba(0,0,0,0.2)'
                        }}
                      />
                      
                      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Category Badge */}
                        <Box sx={{ mb: 1.5 }}>
                          <Chip 
                            label={app.category} 
                            color={app.category === 'Diseño' || app.category === 'Video' ? 'primary' : 'secondary'}
                            size="small" 
                            sx={{ height: 22, fontSize: '0.75rem', fontWeight: 600 }}
                          />
                        </Box>

                        {/* Title & Description */}
                        <Typography variant="h4" component="h4" sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>
                          {app.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1, lineHeight: 1.5 }}>
                          {app.description}
                        </Typography>

                        {/* Button Link */}
                        <Button
                          variant="text"
                          color="primary"
                          endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
                          onClick={() => {
                            setSelectedAppId(app.id);
                            if (app.id === 'youtube-thumbnail-pro') {
                              setProvider('openai');
                            }
                          }}
                          sx={{ 
                            p: 0, 
                            justifyContent: 'flex-start', 
                            textTransform: 'none', 
                            fontWeight: 600,
                            '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                          }}
                        >
                          Abrir aplicación
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            
            /* B: SPECIFIC APP WORKBENCH VIEW (Transitioned) */
            <Box>
              {/* Go Back Header */}
              <Box sx={{ mb: 4 }}>
                <SecondaryButton
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBackToCatalog}
                  sx={{ color: 'text.primary', borderColor: 'divider', mb: 2 }}
                >
                  Volver al Catálogo
                </SecondaryButton>

                {/* Selected App Title Info */}
                <Typography variant="h2" component="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, mt: 1 }}>
                  {items.find(a => a.id === selectedAppId)?.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, maxWidth: 800 }}>
                  {items.find(a => a.id === selectedAppId)?.description}
                </Typography>
              </Box>

              {/* API warning banner in workbench */}
              {selectedAppId === 'youtube-thumbnail-pro' && !openaiKey.trim() && (
                <Alert severity="warning" sx={{ mb: 4 }}>
                  Para utilizar esta aplicación necesitas configurar tu API Key de OpenAI. Dirígete a la pestaña{' '}
                  <strong style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setActiveTab('config')}>Configurar APIs</strong>.
                </Alert>
              )}

              {/* The Grid layout for selected app workbench - LARGE SCALE */}
              <Grid container spacing={4}>
                
                {/* WORKBENCH LEFT COLUMN: Parameters form */}
                <Grid item xs={12} md={5}>
                  <Card variant="outlined">
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Typography variant="h4" component="h4" sx={{ mb: 3, fontWeight: 700 }}>
                        Configuración de Parámetros
                      </Typography>

                      {/* Provider info display */}
                      {selectedAppId === 'youtube-thumbnail-pro' ? (
                        <Box sx={{ mb: 3 }}>
                          <Alert severity="info" sx={{ fontSize: '0.8125rem', py: 0.5, px: 1.5 }} icon={<InfoIcon fontSize="small" />}>
                            Esta aplicación requiere la API de <strong>OpenAI</strong> para generar imágenes de alta resolución.
                          </Alert>
                        </Box>
                      ) : (
                        <Box sx={{ mb: 3 }}>
                          <AppSelect
                            id="wb-provider-select"
                            label="Proveedor de IA"
                            value={provider}
                            options={[
                              { value: 'openai', label: `OpenAI${!openaiKey.trim() ? ' (Sin configurar)' : ''}`, disabled: !openaiKey.trim() },
                              { value: 'gemini', label: `Google Gemini${!geminiKey.trim() ? ' (Sin configurar)' : ''}`, disabled: !geminiKey.trim() },
                            ]}
                            onChange={(val) => setProvider(val as 'openai' | 'gemini')}
                          />
                        </Box>
                      )}

                      {/* APP 1: Miniaturas de tu Contenido Forms (Interactive) */}
                      {selectedAppId === 'youtube-thumbnail-pro' && (
                        <Stack spacing={3}>
                          <AppSelect
                            id="thumb-model-select"
                            label="Modelo de Imagen"
                            value={thumbModel}
                            options={[
                              { value: 'gpt-image-2', label: 'GPT Image 2 (Nuevo 2026)' },
                              { value: 'gpt-image-1.5', label: 'GPT Image 1.5' },
                            ]}
                            onChange={setThumbModel}
                            helperText="Si el modelo no está disponible en tu cuenta de OpenAI, por favor asegúrate de estar verificado."
                          />

                          <AppSelect
                            id="wb-thumb-platform-select"
                            label="Formato"
                            value={thumbPlatform}
                            options={[
                              { value: 'YouTube (16:9)', label: 'YouTube / Widescreen (16:9)' },
                              { value: 'Instagram (1:1)', label: 'Instagram / LinkedIn Card (1:1)' },
                            ]}
                            onChange={setThumbPlatform}
                          />

                          <AppSelect
                            id="wb-thumb-style-select"
                            label="Estilo Artístico"
                            value={thumbStyle}
                            options={[
                              { value: '3D Render / Moderno', label: '3D Render de Alto Detalle' },
                              { value: 'Cyberpunk / Neon', label: 'Futurista Cyberpunk (Neón)' },
                              { value: 'Minimalista / Limpio', label: 'Minimalista / Vectorial Limpio' },
                              { value: 'Ilustración Artística', label: 'Ilustración / Cómic Artístico' },
                              { value: 'Realista / Fotografía', label: 'Fotografía Realista Premium' },
                            ]}
                            onChange={setThumbStyle}
                          />

                          <AppSelect
                            id="wb-thumb-quantity-select"
                            label="Cantidad de Miniaturas"
                            value={thumbQuantity}
                            options={[
                              { value: '1', label: '1 miniatura' },
                              { value: '2', label: '2 miniaturas (elige la mejor)' },
                              { value: '3', label: '3 miniaturas' },
                              { value: '4', label: '4 miniaturas (máximo)' },
                            ]}
                            onChange={setThumbQuantity}
                            helperText="Genera varias opciones a la vez y escoge tu favorita. Cada imagen consume créditos de tu API."
                          />

                          <TextField
                            label="Idea Visual (Obligatorio)"
                            placeholder="Ej. Un cerebro de cristal iluminado con fibras ópticas conectándose a un celular"
                            value={thumbIdea}
                            onChange={(e) => setThumbIdea(e.target.value)}
                            multiline
                            minRows={3}
                            fullWidth
                            required
                            helperText="Describe el fondo y los personajes de la escena. Evita pedir letras/textos."
                          />

                          {/* Optional reference photo upload */}
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                              Foto de Referencia (Opcional)
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                              Sube una foto tuya o de alguien para que la IA la integre en la miniatura. Formatos: PNG, JPG, WebP (máx. 50 MB).
                            </Typography>

                            {/* Hidden file input */}
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              onChange={handleRefImageChange}
                              style={{ display: 'none' }}
                              id="thumb-ref-image-input"
                            />

                            {thumbRefPreview ? (
                              /* Preview of selected image */
                              <Box
                                sx={{
                                  position: 'relative',
                                  display: 'inline-block',
                                  borderRadius: 2,
                                  overflow: 'hidden',
                                  border: '2px solid',
                                  borderColor: 'primary.main',
                                  maxWidth: { xs: '100%', sm: 200 },
                                }}
                              >
                                <Box
                                  component="img"
                                  src={thumbRefPreview}
                                  alt="Foto de referencia"
                                  sx={{
                                    display: 'block',
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: 180,
                                    objectFit: 'cover',
                                  }}
                                />
                                <IconButton
                                  aria-label="Eliminar foto de referencia"
                                  onClick={handleClearRefImage}
                                  size="small"
                                  sx={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 4,
                                    backgroundColor: 'rgba(0,0,0,0.65)',
                                    color: 'white',
                                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.85)' },
                                  }}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                                <Box
                                  sx={{
                                    px: 1.5,
                                    py: 0.75,
                                    backgroundColor: 'action.hover',
                                  }}
                                >
                                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem' }}>
                                    {thumbRefImage?.name}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : (
                              <SecondaryButton
                                startIcon={<AddPhotoAlternateIcon />}
                                onClick={() => fileInputRef.current?.click()}
                                sx={{
                                  borderStyle: 'dashed',
                                  width: '100%',
                                }}
                              >
                                Subir Foto de Referencia
                              </SecondaryButton>
                            )}
                          </Box>

                          <TextField
                            label="Texto Superpuesto (Opcional)"
                            placeholder="Ej. AUTOMATIZA TU NEGOCIO"
                            value={thumbHeadline}
                            onChange={(e) => setThumbHeadline(e.target.value)}
                            fullWidth
                            helperText="Texto que se renderizará flotante por encima del mockup de previsualización."
                          />
                        </Stack>
                      )}

                      {/* APP 2: Image Studio Form (Mock) */}
                      {selectedAppId === 'image-studio' && (
                        <Stack spacing={3}>
                          <TextField
                            label="Describe la Imagen"
                            placeholder="Ej. Un café moderno en el centro..."
                            value={studioIdea}
                            onChange={(e) => setStudioIdea(e.target.value)}
                            multiline
                            minRows={3}
                            fullWidth
                          />
                          <AppSelect
                            id="ratio-select"
                            label="Proporción"
                            value={studioRatio}
                            options={[
                              { value: '1:1', label: 'Cuadrado (1:1)' },
                              { value: '16:9', label: 'Widescreen (16:9)' },
                              { value: '9:16', label: 'Vertical / Stories (9:16)' },
                            ]}
                            onChange={setStudioRatio}
                          />
                          <AppSelect
                            id="style-select"
                            label="Estilo"
                            value={studioStyle}
                            options={[
                              { value: 'Fotográfico', label: 'Fotográfico Realista' },
                              { value: 'Arte Digital', label: 'Arte Digital Ilustrado' },
                              { value: 'Bosquejo', label: 'Bosquejo Técnico' },
                            ]}
                            onChange={setStudioStyle}
                          />
                        </Stack>
                      )}

                      {/* APP 3: Digital Clones Form (Mock) */}
                      {selectedAppId === 'digital-clones' && (
                        <Stack spacing={3}>
                          <AppSelect
                            id="avatar-select"
                            label="Avatar"
                            value={cloneGender}
                            options={[
                              { value: 'Avatar Masculino', label: 'Avatar Corporativo Masculino' },
                              { value: 'Avatar Femenino', label: 'Avatar Corporativo Femenino' },
                              { value: 'Humanoide 3D', label: 'Robot Humanoide 3D' },
                            ]}
                            onChange={setCloneGender}
                          />
                          <AppSelect
                            id="voice-select"
                            label="Voz de Narración"
                            value={cloneVoice}
                            options={[
                              { value: 'Español Neutro', label: 'Español Latino Neutro (Hombre)' },
                              { value: 'Español España', label: 'Español España (Mujer)' },
                              { value: 'Inglés Profundo', label: 'Inglés Profesional (Hombre)' },
                            ]}
                            onChange={setCloneVoice}
                          />
                          <TextField
                            label="Guión de Voz (Script)"
                            placeholder="Escribe el mensaje que el clon de voz pronunciará..."
                            value={clonePrompt}
                            onChange={(e) => setClonePrompt(e.target.value)}
                            multiline
                            minRows={3}
                            fullWidth
                          />
                        </Stack>
                      )}

                      {/* APP 4: Form Assistant Form (Mock) */}
                      {selectedAppId === 'form-assistant' && (
                        <Stack spacing={3}>
                          <AppSelect
                            id="form-target-select"
                            label="Objetivo del Formulario"
                            value={formTarget}
                            options={[
                              { value: 'Contacto de Negocio', label: 'Contacto de Negocio' },
                              { value: 'Registro de Evento', label: 'Registro de Evento/Webinar' },
                              { value: 'Encuesta de Feedback', label: 'Encuesta de Feedback Rápido' },
                            ]}
                            onChange={setFormTarget}
                          />
                          <TextField
                            label="Texto o Datos en sucio"
                            placeholder="Pega correos, apuntes, transcripciones para procesar..."
                            value={formText}
                            onChange={(e) => setFormText(e.target.value)}
                            multiline
                            minRows={4}
                            fullWidth
                          />
                        </Stack>
                      )}

                      {/* APP 5: Encuestas IA Form (Mock) */}
                      {selectedAppId === 'encuestas-ia' && (
                        <Stack spacing={3}>
                          <TextField
                            label="Tema de la Encuesta"
                            placeholder="Ej. Satisfacción con el nuevo producto de software"
                            value={surveyTopic}
                            onChange={(e) => setSurveyTopic(e.target.value)}
                            fullWidth
                          />
                          <AppSelect
                            id="survey-len-select"
                            label="Longitud"
                            value={surveyLength}
                            options={[
                              { value: '3 preguntas', label: 'Cuestionario Corto (3 preguntas)' },
                              { value: '5 preguntas', label: 'Cuestionario Medio (5 preguntas)' },
                              { value: '10 preguntas', label: 'Cuestionario Extendido (10 preguntas)' },
                            ]}
                            onChange={setSurveyLength}
                          />
                        </Stack>
                      )}

                      {/* APP 6: EduSlide Form (Mock) */}
                      {selectedAppId === 'eduslide' && (
                        <Stack spacing={3}>
                          <TextField
                            label="Tema de la Presentación"
                            placeholder="Ej. Fundamentos prácticos de ingeniería de datos..."
                            value={eduSubject}
                            onChange={(e) => setEduSubject(e.target.value)}
                            fullWidth
                          />
                          <AppSelect
                            id="edu-tone-select"
                            label="Tono de Presentación"
                            value={eduTone}
                            options={[
                              { value: 'Didáctico', label: 'Didáctico y Claro' },
                              { value: 'Corporativo', label: 'Formal y Corporativo' },
                              { value: 'Inspiracional', label: 'Inspiracional y Enérgico' },
                            ]}
                            onChange={setEduTone}
                          />
                        </Stack>
                      )}

                      <PrimaryButton
                        onClick={handleGenerate}
                        disabled={loading || (selectedAppId === 'youtube-thumbnail-pro' ? !openaiKey.trim() : (!openaiKey.trim() && !geminiKey.trim()))}
                        fullWidth
                        sx={{ mt: 4 }}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                      >
                        {loading ? 'Procesando...' : 'Ejecutar Aplicación'}
                      </PrimaryButton>
                    </CardContent>
                  </Card>
                </Grid>

                {/* WORKBENCH RIGHT COLUMN: Output display and Interactive mockups */}
                <Grid item xs={12} md={7}>
                  <Stack spacing={3} sx={{ height: '100%' }}>
                    <Typography variant="h4" component="h4" sx={{ color: 'text.primary', fontWeight: 700 }}>
                      Resultado del Cómputo
                    </Typography>

                    <Card
                      variant="outlined"
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: { xs: 380, md: 580 },
                        borderColor: error ? 'error.main' : 'divider',
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {error && (
                          <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                          </Alert>
                        )}

                        {/* Idle */}
                        {!loading && !output && imageUrls.length === 0 && !error && (
                          <Box
                            sx={{
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              color: 'text.muted',
                            }}
                          >
                            <AutoAwesomeIcon sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
                            <Typography variant="h5" component="p" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                              Listo para Generar
                            </Typography>
                            <Typography variant="body2" sx={{ maxWidth: 420 }}>
                              Configura los parámetros de la izquierda y haz clic en <strong>Ejecutar Aplicación</strong> para desplegar la respuesta de la IA aquí.
                            </Typography>
                          </Box>
                        )}

                        {/* Loading spinner */}
                        {loading && (
                          <Box
                            sx={{
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <CircularProgress size={56} sx={{ mb: 3 }} />
                            <Typography variant="h5" component="p" sx={{ mb: 1, fontWeight: 700 }}>
                              Generando Contenido
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {loadingStep}
                            </Typography>
                          </Box>
                        )}

                        {/* Mock Text result (App 2 to 6) */}
                        {!loading && output && selectedAppId !== 'youtube-thumbnail-pro' && (
                          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                pb: 1.5,
                                mb: 2.5,
                              }}
                            >
                              <Typography variant="overline" color="text.secondary">
                                Demo Frontend: Simulación Exitosa
                              </Typography>
                              <Tooltip title={copied ? '¡Copiado!' : 'Copiar al portapapeles'}>
                                <IconButton
                                  onClick={handleCopyOutput}
                                  color={copied ? 'success' : 'primary'}
                                  aria-label="Copiar salida"
                                >
                                  {copied ? <CheckIcon /> : <ContentCopyIcon />}
                                </IconButton>
                              </Tooltip>
                            </Box>
                            <Box
                              sx={{
                                flex: 1,
                                whiteSpace: 'pre-wrap',
                                fontFamily: 'monospace',
                                fontSize: '0.9375rem',
                                lineHeight: 1.6,
                                overflowY: 'auto',
                                maxHeight: 450,
                              }}
                            >
                              {output}
                            </Box>
                            <Alert severity="info" sx={{ mt: 3, fontSize: '0.8125rem' }}>
                              Nota: Esta es la vista previa de estructura. La API está simulada por frontend.
                            </Alert>
                          </Box>
                        )}

                        {/* Premium Image result (App 1) + Interactive Mockups */}
                        {!loading && imageUrls.length > 0 && selectedAppId === 'youtube-thumbnail-pro' && (
                          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: { sm: 'space-between' },
                                alignItems: { xs: 'stretch', sm: 'center' },
                                gap: { xs: 1.5, sm: 0 },
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                pb: 1.5,
                                mb: 2,
                              }}
                            >
                              <Typography variant="overline" color="text.secondary">
                                {imageUrls.length > 1 ? `${imageUrls.length} Miniaturas Generadas` : `Renderizado de Imagen (${thumbModel})`}
                              </Typography>
                              <PrimaryButton
                                startIcon={<DownloadIcon />}
                                onClick={handleDownloadImage}
                                sx={{ width: { xs: '100%', sm: 'auto' } }}
                              >
                                Descargar{imageUrls.length > 1 ? ' Seleccionada' : ' Original'}
                              </PrimaryButton>
                            </Box>

                            {/* IMAGE SELECTION GRID (only shown when multiple images) */}
                            {imageUrls.length > 1 && (
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.primary' }}>
                                  Haz clic en la miniatura que más te guste:
                                </Typography>
                                <Grid container spacing={1.5}>
                                  {imageUrls.map((img, idx) => (
                                    <Grid item xs={6} sm={imageUrls.length <= 2 ? 6 : imageUrls.length === 3 ? 4 : 3} key={idx}>
                                      <Box
                                        onClick={() => setSelectedImageIdx(idx)}
                                        sx={{
                                          position: 'relative',
                                          borderRadius: 2,
                                          overflow: 'hidden',
                                          cursor: 'pointer',
                                          border: '3px solid',
                                          borderColor: selectedImageIdx === idx ? 'primary.main' : 'transparent',
                                          boxShadow: selectedImageIdx === idx ? `0 0 0 1px ${brandColors.primary}` : 'none',
                                          transition: 'all 0.2s ease',
                                          '&:hover': {
                                            borderColor: selectedImageIdx === idx ? 'primary.main' : 'action.hover',
                                            transform: 'scale(1.02)',
                                          },
                                        }}
                                      >
                                        <Box
                                          component="img"
                                          src={img}
                                          alt={`Miniatura opción ${idx + 1}`}
                                          sx={{
                                            width: '100%',
                                            aspectRatio: thumbPlatform.includes('16:9') ? '16/9' : '1/1',
                                            objectFit: 'cover',
                                            display: 'block',
                                          }}
                                        />
                                        {/* Selection indicator */}
                                        <Box
                                          sx={{
                                            position: 'absolute',
                                            top: 6,
                                            right: 6,
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: selectedImageIdx === idx ? brandColors.primary : 'rgba(0,0,0,0.5)',
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                          }}
                                        >
                                          {selectedImageIdx === idx ? <CheckIcon sx={{ fontSize: 16 }} /> : idx + 1}
                                        </Box>
                                      </Box>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Box>
                            )}

                            {/* PREMIUM PREVIEW MOCKUP for selected image */}
                            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              
                              {/* YouTube Mockup (16:9) */}
                              {thumbPlatform.includes('16:9') && (
                                <Box 
                                  sx={{ 
                                    width: '100%', 
                                    maxWidth: 540,
                                    borderRadius: 3, 
                                    overflow: 'hidden', 
                                    border: '1px solid',
                                    borderColor: alpha(brandColors.white, 0.15),
                                    boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                                    backgroundColor: alpha(brandColors.black, 0.95),
                                    color: brandColors.white,
                                  }}
                                >
                                  {/* Video Frame */}
                                  <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                                    <Box
                                      component="img"
                                      src={activeImageUrl}
                                      alt="Miniatura YouTube"
                                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />

                                    {/* Subtitle text overlay (Simulated CTA) */}
                                    {thumbHeadline.trim() && (
                                      <Box 
                                        sx={{ 
                                          position: 'absolute', 
                                          bottom: 12, 
                                          left: 12, 
                                          right: 12, 
                                          backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                          borderLeft: `4px solid ${brandColors.secondary}`,
                                          p: 1.5,
                                          borderRadius: 1,
                                        }}
                                      >
                                        <Typography 
                                          variant="h5" 
                                          sx={{ 
                                            fontWeight: 800, 
                                            fontSize: { xs: '0.9rem', sm: '1.15rem' },
                                            color: brandColors.white,
                                            lineHeight: 1.25,
                                            letterSpacing: '-0.01em',
                                            textTransform: 'uppercase',
                                          }}
                                        >
                                          {thumbHeadline.trim()}
                                        </Typography>
                                      </Box>
                                    )}

                                    {/* Play button hover effect */}
                                    <Box 
                                      sx={{ 
                                        position: 'absolute', 
                                        top: 0, 
                                        left: 0, 
                                        width: '100%', 
                                        height: '100%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        background: 'rgba(0,0,0,0.1)',
                                        '&:hover': { background: 'rgba(0,0,0,0.3)' }
                                      }}
                                    >
                                      <PlayCircleOutlineIcon sx={{ fontSize: 64, color: 'rgba(255, 255, 255, 0.9)' }} />
                                    </Box>

                                    {/* YouTube bar */}
                                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                                      <Box sx={{ width: '30%', height: '100%', backgroundColor: 'error.main' }} />
                                    </Box>
                                  </Box>

                                  {/* Info Area */}
                                  <Box sx={{ p: 2.5, display: 'flex', gap: 1.5 }}>
                                    <Box 
                                      sx={{ 
                                        width: 36, 
                                        height: 36, 
                                        borderRadius: '50%', 
                                        backgroundColor: brandColors.primary, 
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: '0.875rem'
                                      }}
                                    >
                                      LD
                                    </Box>
                                    <Box>
                                      <Typography variant="body2" sx={{ fontWeight: 600, color: brandColors.white, fontSize: '0.875rem', lineHeight: 1.4, mb: 0.5 }}>
                                        {thumbHeadline.trim() ? thumbHeadline.trim() : 'Cómo automatizar tus contenidos de negocio usando IA'}
                                      </Typography>
                                      <Typography variant="caption" sx={{ color: alpha(brandColors.white, 0.6), display: 'block', fontSize: '0.75rem' }}>
                                        Luis David Mag · 15.2K vistas · hace 1 hora
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              )}

                              {/* Instagram Mockup (1:1) */}
                              {thumbPlatform.includes('1:1') && (
                                <Box 
                                  sx={{ 
                                    width: '100%', 
                                    maxWidth: 400,
                                    borderRadius: 3, 
                                    overflow: 'hidden', 
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                                    backgroundColor: 'background.default',
                                    color: 'text.primary',
                                  }}
                                >
                                  {/* IG Header */}
                                  <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box 
                                      sx={{ 
                                        width: 32, 
                                        height: 32, 
                                        borderRadius: '50%', 
                                        backgroundColor: brandColors.primary, 
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: '0.75rem'
                                      }}
                                    >
                                      LD
                                    </Box>
                                    <Box>
                                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>
                                        luisdavid.mag
                                      </Typography>
                                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.6875rem', mt: -0.3 }}>
                                        Patrocinado
                                      </Typography>
                                    </Box>
                                  </Box>

                                  {/* Square Image Box */}
                                  <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
                                    <Box
                                      component="img"
                                      src={activeImageUrl}
                                      alt="Miniatura Instagram"
                                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />

                                    {/* Text Overlay */}
                                    {thumbHeadline.trim() && (
                                      <Box 
                                        sx={{ 
                                          position: 'absolute', 
                                          top: 12, 
                                          left: 12, 
                                          right: 12, 
                                          backgroundColor: alpha(brandColors.white, 0.95),
                                          color: brandColors.black,
                                          p: 1.25,
                                          borderRadius: 1,
                                          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                                          textAlign: 'center'
                                        }}
                                      >
                                        <Typography 
                                          variant="h6" 
                                          sx={{ 
                                            fontWeight: 800, 
                                            fontSize: '0.875rem',
                                            lineHeight: 1.2,
                                            textTransform: 'uppercase',
                                          }}
                                        >
                                          {thumbHeadline.trim()}
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>

                                  {/* Interaction Bar */}
                                  <Box sx={{ p: 1.5 }}>
                                    <Stack direction="row" spacing={1.5} sx={{ mb: 1 }}>
                                      <FavoriteIcon color="error" fontSize="small" />
                                      <ChatBubbleOutlineIcon fontSize="small" />
                                      <SendIcon fontSize="small" />
                                    </Stack>
                                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', mb: 0.5 }}>
                                      1,249 Me gusta
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: '0.8125rem', lineHeight: 1.4 }}>
                                      <strong>luisdavid.mag</strong> {thumbHeadline.trim() ? thumbHeadline.trim() : 'Automatiza y escala tus contenidos de negocio con Inteligencia Artificial.'}... <span style={{ color: brandColors.primary, cursor: 'pointer' }}>más</span>
                                    </Typography>
                                  </Box>
                                </Box>
                              )}

                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          )}
        </Collapse>
      </Section>
    </Container>
  );
}
