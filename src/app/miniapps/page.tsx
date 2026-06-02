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
import { useTheme } from '@mui/material/styles';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import BoltIcon from '@mui/icons-material/Bolt';
import PrintIcon from '@mui/icons-material/Print';

import { Section, AppSelect, PrimaryButton, SecondaryButton } from '@/components';
import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';
import { generateOpenAICompletion, generateGeminiCompletion, generateOpenAIImages, generateOpenAIImageEdit, generateGeminiStructuredAudit } from '@/services/aiService';
import type { SeoAuditResult } from '@/services/aiService';

type ActiveTab = 'apps' | 'config';

export default function MiniAppsPage() {
  const theme = useTheme();
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
  const [thumbTextPosition, setThumbTextPosition] = useState('bottom-left');
  const [thumbTextStyle, setThumbTextStyle] = useState('dark-semi');
  const [thumbTextColor, setThumbTextColor] = useState('#ffffff');
  const [thumbTextFont, setThumbTextFont] = useState('sans-serif');
  const [thumbBadgeType, setThumbBadgeType] = useState('none');
  const [thumbPromptUsed, setThumbPromptUsed] = useState('');
  const [thumbModel, setThumbModel] = useState('gpt-image-2');
  const [thumbQuantity, setThumbQuantity] = useState('1');
  const [thumbRefImage, setThumbRefImage] = useState<File | null>(null);
  const [thumbRefPreview, setThumbRefPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // App 2: Auditor SEO Express Inputs
  const [auditInput, setAuditInput] = useState('');
  const [auditInputType, setAuditInputType] = useState<'url' | 'html'>('url');
  const [auditModel, setAuditModel] = useState('gemini-2.5-flash');
  const [auditResult, setAuditResult] = useState<SeoAuditResult | null>(null);

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

  // Helper to resolve overlay text box style
  const getOverlayBoxStyles = (style: string, position: string, textColor: string) => {
    const positionStyles: Record<string, any> = {
      'bottom-left': {
        bottom: 12,
        left: 12,
        top: 'auto',
        right: 'auto',
      },
      'top-left': {
        top: 12,
        left: 12,
        bottom: 'auto',
        right: 'auto',
      },
      'bottom-right': {
        bottom: 12,
        right: 12,
        top: 'auto',
        left: 'auto',
      },
      'top-right': {
        top: 12,
        right: 12,
        bottom: 'auto',
        left: 'auto',
      },
    };

    const activePosition = positionStyles[position] || positionStyles['bottom-left'];
    const activeColor = textColor || brandColors.secondary;

    if (style === 'neon-cyan') {
      return {
        position: 'absolute',
        ...activePosition,
        maxWidth: '85%',
        backgroundColor: alpha(brandColors.black, 0.9),
        border: `2px solid ${activeColor}`,
        boxShadow: `0 0 12px ${alpha(activeColor, 0.4)}`,
        p: 1.5,
        borderRadius: 1,
        zIndex: 2,
      };
    } else if (style === 'impact-shadow') {
      return {
        position: 'absolute',
        ...activePosition,
        maxWidth: '85%',
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        p: 0.5,
        zIndex: 2,
      };
    }

    return {
      position: 'absolute',
      ...activePosition,
      maxWidth: '85%',
      backgroundColor: alpha(brandColors.black, 0.85),
      borderLeft: `4px solid ${activeColor}`,
      p: 1.5,
      borderRadius: 1,
      zIndex: 2,
    };
  };

  // Helper to resolve overlay text typography style
  const getOverlayTextStyles = (style: string, textColor: string, textFont: string) => {
    // Resolve color (use user's chosen custom hex or default to white)
    const colorValue = textColor || brandColors.white;

    // Resolve font family
    const fontFamilies: Record<string, string> = {
      'sans-serif': "system-ui, -apple-system, sans-serif",
      'serif': "'Georgia', 'Times New Roman', serif",
      'impact': "'Impact', 'Arial Black', sans-serif",
      'outfit': "'Outfit', 'Inter', sans-serif",
    };

    // Default font family for impact style is impact, otherwise whatever user chose
    const resolvedFont = (style === 'impact-shadow' && textFont === 'sans-serif')
      ? fontFamilies['impact']
      : (fontFamilies[textFont] || fontFamilies['sans-serif']);

    if (style === 'impact-shadow') {
      return {
        fontWeight: 900,
        fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2rem' },
        color: colorValue,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        textTransform: 'uppercase',
        fontFamily: resolvedFont,
        textShadow: `2px 2px 0 ${brandColors.black}, -2px -2px 0 ${brandColors.black}, 2px -2px 0 ${brandColors.black}, -2px 2px 0 ${brandColors.black}, 0 4px 8px ${alpha(brandColors.black, 0.8)}`,
      };
    }

    return {
      fontWeight: 800,
      fontSize: { xs: '0.9rem', sm: '1.15rem' },
      color: colorValue,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
      textTransform: resolvedFont === fontFamilies['impact'] ? 'uppercase' : 'none',
      fontFamily: resolvedFont,
    };
  };

  // Helper to generate prompt automatically based on options
  const getAutoGeneratedPrompt = useCallback(() => {
    if (!thumbIdea.trim()) return '';

    const colorAccentPrompt = (thumbTextColor && thumbTextColor.toLowerCase() !== '#ffffff')
      ? ` The visual composition must have background highlights, glowing details, or overall color accents matching the hex color '${thumbTextColor}'.`
      : '';

    const basePrompt = `A high quality, professional, eye-catching visual banner/thumbnail designed for ${thumbPlatform.split(' ')[0]}.
Style: ${thumbStyle}.
Concept: ${thumbIdea.trim()}.${colorAccentPrompt}
This is a thumbnail background for content creators. Highly detailed, colorful, clean composition, optimized for clickthrough rate. DO NOT write any text, letters, or words in the image itself. Keep the canvas clean of typos.`;

    return thumbRefImage
      ? `${basePrompt}\n\nIMPORTANT: Use the provided reference photo of a person and integrate them naturally into the thumbnail composition. Place the person prominently in the scene. The person should look like a professional content creator presenting this topic.`
      : basePrompt;
  }, [thumbIdea, thumbStyle, thumbPlatform, thumbTextColor, thumbRefImage]);

  // Reset outputs when returning to catalog or changing apps
  const handleBackToCatalog = () => {
    setSelectedAppId(null);
    setOutput('');
    setImageUrls([]);
    setSelectedImageIdx(0);
    setError('');
    setLoading(false);
    handleClearRefImage();
    setThumbPromptUsed('');
    setAuditInput('');
    setAuditResult(null);
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
  // Helper to download base64 images as files with text overlay and badges baked in
  const handleDownloadImage = useCallback(() => {
    const currentImage = imageUrls[selectedImageIdx];
    if (!currentImage) return;

    const hasHeadline = Boolean(thumbHeadline.trim());
    const hasBadge = thumbBadgeType !== 'none';

    // If no custom text and no badges, download raw image immediately
    if (!hasHeadline && !hasBadge) {
      const link = document.createElement('a');
      link.href = currentImage;
      link.download = `miniatura-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Otherwise, bake layout elements into canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentImage;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Draw base image
      ctx.drawImage(img, 0, 0);

      const baseMockupWidth = thumbPlatform.includes('16:9') ? 540 : 400;
      const scale = canvas.width / baseMockupWidth;

      // Helper to wrap text
      const wrapText = (context: CanvasRenderingContext2D, textStr: string, maxW: number) => {
        const words = textStr.split(' ');
        const linesArray: string[] = [];
        let currentLine = '';

        for (let n = 0; n < words.length; n++) {
          const testLine = currentLine + (currentLine ? ' ' : '') + words[n];
          const metrics = context.measureText(testLine);
          if (metrics.width > maxW && n > 0) {
            linesArray.push(currentLine);
            currentLine = words[n];
          } else {
            currentLine = testLine;
          }
        }
        linesArray.push(currentLine);
        return linesArray;
      };

      // 2. Draw Text Overlay
      if (hasHeadline) {
        // Resolve font family
        const fontFamilies: Record<string, string> = {
          'sans-serif': "system-ui, -apple-system, sans-serif",
          'serif': "'Georgia', 'Times New Roman', serif",
          'impact': "'Impact', 'Arial Black', sans-serif",
          'outfit': "'Outfit', 'Inter', sans-serif",
        };

        const resolvedFont = (thumbTextStyle === 'impact-shadow' && thumbTextFont === 'sans-serif')
          ? fontFamilies['impact']
          : (fontFamilies[thumbTextFont] || fontFamilies['sans-serif']);

        const baseFontSize = thumbTextStyle === 'impact-shadow' ? 28 : 20;
        const fontSize = baseFontSize * scale;
        const fontWeight = thumbTextStyle === 'impact-shadow' ? '900' : '800';
        ctx.font = `${fontWeight} ${fontSize}px ${resolvedFont}`;

        const isImpact = thumbTextStyle === 'impact-shadow';
        const colorValue = thumbTextColor || brandColors.white;

        // Set dimensions & wrap text
        const padding = (isImpact ? 4 : 12) * scale;
        const maxWidth = canvas.width * 0.85 - padding * 2;
        const rawText = thumbHeadline.trim();
        const textToDraw = (isImpact || resolvedFont === fontFamilies['impact']) ? rawText.toUpperCase() : rawText;

        const lines = wrapText(ctx, textToDraw, maxWidth);
        const lineHeight = fontSize * (isImpact ? 1.1 : 1.25);
        const textHeight = lines.length * lineHeight;

        let maxLineWidth = 0;
        lines.forEach(l => {
          const m = ctx.measureText(l);
          if (m.width > maxLineWidth) maxLineWidth = m.width;
        });

        const boxWidth = maxLineWidth + padding * 2;
        const boxHeight = textHeight + padding * 2;

        // Positions
        const margin = 12 * scale;
        let boxX = margin;
        let boxY = margin;

        const positionStyles: Record<string, () => void> = {
          'bottom-left': () => {
            boxX = margin;
            boxY = canvas.height - margin - boxHeight;
          },
          'top-left': () => {
            boxX = margin;
            boxY = margin;
          },
          'bottom-right': () => {
            boxX = canvas.width - margin - boxWidth;
            boxY = canvas.height - margin - boxHeight;
          },
          'top-right': () => {
            boxX = canvas.width - margin - boxWidth;
            boxY = margin;
          },
        };

        (positionStyles[thumbTextPosition] || positionStyles['bottom-left'])();

        // Draw Box Background
        if (thumbTextStyle === 'dark-semi') {
          ctx.fillStyle = alpha(brandColors.black, 0.85);
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 4 * scale);
          } else {
            ctx.rect(boxX, boxY, boxWidth, boxHeight);
          }
          ctx.fill();

          // Left border
          ctx.strokeStyle = colorValue;
          ctx.lineWidth = 4 * scale;
          ctx.beginPath();
          ctx.moveTo(boxX, boxY);
          ctx.lineTo(boxX, boxY + boxHeight);
          ctx.stroke();
        } else if (thumbTextStyle === 'neon-cyan') {
          ctx.fillStyle = alpha(brandColors.black, 0.9);
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 4 * scale);
          } else {
            ctx.rect(boxX, boxY, boxWidth, boxHeight);
          }
          ctx.fill();

          // Neon outline
          ctx.save();
          ctx.strokeStyle = colorValue;
          ctx.lineWidth = 2 * scale;
          ctx.shadowColor = alpha(colorValue, 0.4);
          ctx.shadowBlur = 12 * scale;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 4 * scale);
          } else {
            ctx.rect(boxX, boxY, boxWidth, boxHeight);
          }
          ctx.stroke();
          ctx.restore();
        }

        // Draw text lines
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        lines.forEach((line, index) => {
          const lineX = boxX + padding;
          const lineY = boxY + padding + index * lineHeight;

          if (isImpact) {
            // Draw thick stroke first
            ctx.strokeStyle = brandColors.black;
            ctx.lineWidth = 6 * scale;
            ctx.lineJoin = 'round';
            ctx.miterLimit = 2;
            ctx.strokeText(line, lineX, lineY);

            // Draw fill
            ctx.fillStyle = colorValue;
            ctx.fillText(line, lineX, lineY);
          } else {
            ctx.fillStyle = colorValue;
            ctx.fillText(line, lineX, lineY);
          }
        });
      }

      // 3. Draw Badges
      if (thumbBadgeType === 'duration') {
        ctx.font = `bold ${12 * scale}px system-ui, -apple-system, sans-serif`;
        const textWidth = ctx.measureText('12:45').width;
        const badgeWidth = textWidth + 12 * scale;
        const badgeHeight = 20 * scale;

        const margin = 12 * scale;
        let badgeX = canvas.width - margin - badgeWidth;
        let badgeY = canvas.height - margin - badgeHeight;

        // Mitigate overlap
        if (hasHeadline && thumbTextPosition === 'bottom-right') {
          badgeX = margin; // Shift to bottom-left
        }

        ctx.fillStyle = alpha(brandColors.black, 0.85);
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 4 * scale);
        } else {
          ctx.rect(badgeX, badgeY, badgeWidth, badgeHeight);
        }
        ctx.fill();

        ctx.fillStyle = brandColors.white;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('12:45', badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);
      } else if (thumbBadgeType === 'live') {
        ctx.font = `900 ${11 * scale}px system-ui, -apple-system, sans-serif`;
        const textWidth = ctx.measureText('🔴 EN VIVO').width;
        const badgeWidth = textWidth + 12 * scale;
        const badgeHeight = 24 * scale;

        const margin = 12 * scale;
        let badgeX = margin;
        let badgeY = margin;

        // Mitigate overlap
        if (hasHeadline && thumbTextPosition === 'top-left') {
          badgeX = canvas.width - margin - badgeWidth; // Shift to top-right
        }

        ctx.fillStyle = '#d32f2f'; // standard red or error palette
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 4 * scale);
        } else {
          ctx.rect(badgeX, badgeY, badgeWidth, badgeHeight);
        }
        ctx.fill();

        ctx.fillStyle = brandColors.white;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔴 EN VIVO', badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);
      }

      // 4. Download processed image
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `miniatura-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }, [imageUrls, selectedImageIdx, thumbHeadline, thumbTextPosition, thumbTextStyle, thumbTextColor, thumbTextFont, thumbBadgeType, thumbPlatform]);

  // Currently selected image for the mockup preview
  const activeImageUrl = imageUrls[selectedImageIdx] || '';

  const getScoreColor = (score: number, theme: any) => {
    if (score >= 90) return brandColors.secondary;
    if (score >= 70) return theme.palette.success.main;
    if (score >= 40) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleGenerate = async () => {
    setError('');
    setOutput('');
    setImageUrls([]);
    setSelectedImageIdx(0);
    setLoading(true);

    const activeKey = provider === 'openai' ? openaiKey : geminiKey;
    
    if (selectedAppId === 'youtube-thumbnail-pro') {
      setThumbPromptUsed('');
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
      
      const imagePrompt = getAutoGeneratedPrompt();
      if (!imagePrompt) {
        setError('Por favor, describe una idea para generar el prompt de la miniatura.');
        setLoading(false);
        return;
      }

      try {
        const result = thumbRefImage
          ? await generateOpenAIImageEdit(activeKey, imagePrompt, thumbRefImage, size, n, thumbModel)
          : await generateOpenAIImages(activeKey, imagePrompt, size, n, thumbModel);

        if (result.ok && result.images.length > 0) {
          setImageUrls(result.images);
          setSelectedImageIdx(0);
          setThumbPromptUsed(imagePrompt);
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

    } else if (selectedAppId === 'seo-audit') {
      setAuditResult(null);
      if (!geminiKey.trim()) {
        setError('Para realizar la auditoría necesitas configurar una clave de Google Gemini en la pestaña de configuración.');
        setLoading(false);
        return;
      }
      if (!auditInput.trim()) {
        setError('Por favor, ingresa una URL o pega el código HTML de tu sitio.');
        setLoading(false);
        return;
      }

      let contentToAnalyze = auditInput;

      if (auditInputType === 'url') {
        setLoadingStep('Obteniendo HTML del sitio web a través de un proxy...');
        let targetUrl = auditInput.trim();
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
          targetUrl = 'https://' + targetUrl;
        }

        try {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
          
          const response = await fetch(proxyUrl, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error(`Error de conexión (HTTP ${response.status})`);
          }

          contentToAnalyze = await response.text();

          if (!contentToAnalyze || contentToAnalyze.trim().length < 100) {
            throw new Error('El contenido del sitio web es demasiado corto o no se pudo extraer.');
          }
        } catch (err: any) {
          const isAbort = err.name === 'AbortError';
          setError(isAbort 
            ? 'La descarga del sitio tardó demasiado. Por favor, intenta copiando y pegando el HTML crudo directamente.' 
            : `No se pudo descargar la URL: ${err.message}. Te recomendamos copiar y pegar el HTML crudo directamente.`);
          setLoading(false);
          return;
        }
      }

      setLoadingStep('Analizando conversión, SEO técnico, UX y copywriting con Gemini...');
      try {
        const auditResponse = await generateGeminiStructuredAudit(geminiKey, contentToAnalyze, auditModel);
        if (auditResponse.ok && auditResponse.result) {
          setAuditResult(auditResponse.result);
        } else {
          setError(auditResponse.message || 'Ocurrió un error al realizar la auditoría.');
        }
      } catch (err: any) {
        setError(`Error durante la auditoría: ${err.message || err}`);
      } finally {
        setLoading(false);
        setLoadingStep('');
      }
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
              {selectedAppId === 'seo-audit' && !geminiKey.trim() && (
                <Alert severity="warning" sx={{ mb: 4 }}>
                  Para utilizar esta aplicación necesitas configurar tu API Key de Google Gemini. Dirígete a la pestaña{' '}
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
                          <Alert severity="info" sx={{ fontSize: '0.8125rem', py: 0.5, px: 1.5 }} icon={<InfoIcon fontSize="small" />}>
                            Esta aplicación requiere la API de <strong>Google Gemini</strong> para realizar auditorías estructuradas.
                          </Alert>
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

                          <Collapse in={Boolean(thumbHeadline.trim())}>
                            <Stack spacing={3} sx={{ mt: 0.5, mb: 0.5 }}>
                              <AppSelect
                                id="thumb-text-position-select"
                                label="Posición del Texto"
                                value={thumbTextPosition}
                                options={[
                                  { value: 'top-left', label: 'Arriba a la izquierda' },
                                  { value: 'bottom-left', label: 'Abajo a la izquierda' },
                                  { value: 'top-right', label: 'Arriba a la derecha' },
                                  { value: 'bottom-right', label: 'Abajo a la derecha' },
                                ]}
                                onChange={setThumbTextPosition}
                              />
                              <AppSelect
                                id="thumb-text-style-select"
                                label="Estilo de la Caja / Fondo"
                                value={thumbTextStyle}
                                options={[
                                  { value: 'dark-semi', label: 'Caja oscura semitransparente' },
                                  { value: 'neon-cyan', label: 'Borde neón cian' },
                                  { value: 'impact-shadow', label: 'Sin caja (Sombra de impacto)' },
                                ]}
                                onChange={setThumbTextStyle}
                              />
                              <TextField
                                label="Color de la Letra (Hex)"
                                value={thumbTextColor}
                                onChange={(e) => setThumbTextColor(e.target.value)}
                                fullWidth
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Box
                                        component="input"
                                        type="color"
                                        value={thumbTextColor.startsWith('#') ? thumbTextColor : '#ffffff'}
                                        onChange={(e) => setThumbTextColor(e.target.value)}
                                        sx={{
                                          width: 28,
                                          height: 28,
                                          border: 'none',
                                          padding: 0,
                                          cursor: 'pointer',
                                          backgroundColor: 'transparent',
                                          '&::-webkit-color-swatch-wrapper': { padding: 0 },
                                          '&::-webkit-color-swatch': { 
                                            border: `1px solid ${alpha(brandColors.white, 0.2)}`, 
                                            borderRadius: '4px' 
                                          },
                                        }}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                                helperText="Selecciona un color personalizado. Este color también influirá en los tonos de la imagen generada por IA."
                              />
                              <AppSelect
                                id="thumb-text-font-select"
                                label="Tipografía del Texto"
                                value={thumbTextFont}
                                options={[
                                  { value: 'sans-serif', label: 'Sans-serif (Moderna / Limpia)' },
                                  { value: 'serif', label: 'Serif (Editorial / Clásica)' },
                                  { value: 'impact', label: 'Impact (Estilo YouTube clásico)' },
                                  { value: 'outfit', label: 'Outfit (Estilo de la Marca)' },
                                ]}
                                onChange={setThumbTextFont}
                              />
                            </Stack>
                          </Collapse>

                          <AppSelect
                            id="thumb-badge-type-select"
                            label="Simulación de Badge de Reproductor"
                            value={thumbBadgeType}
                            options={[
                              { value: 'none', label: 'Ninguno' },
                              { value: 'duration', label: 'Duración de Video (12:45)' },
                              { value: 'live', label: '🔴 EN VIVO (Transmisión)' },
                            ]}
                            onChange={setThumbBadgeType}
                            helperText="Muestra un indicador típico de duración o en vivo sobre la miniatura."
                          />
                        </Stack>
                      )}

                      {/* APP 2: Auditor SEO Express Forms */}
                      {selectedAppId === 'seo-audit' && (
                        <Stack spacing={3}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
                            <Tabs
                              value={auditInputType}
                              onChange={(_, val: 'url' | 'html') => setAuditInputType(val)}
                              textColor="primary"
                              indicatorColor="primary"
                              variant="fullWidth"
                              aria-label="Tipo de entrada para auditoría"
                            >
                              <Tab label="URL de Sitio" value="url" sx={{ fontWeight: 600 }} />
                              <Tab label="Código HTML" value="html" sx={{ fontWeight: 600 }} />
                            </Tabs>
                          </Box>

                          {auditInputType === 'url' ? (
                            <TextField
                              label="URL del Sitio Web"
                              placeholder="Ej. https://misitio.com o misitio.com"
                              value={auditInput}
                              onChange={(e) => setAuditInput(e.target.value)}
                              fullWidth
                              helperText="Se utilizará un proxy CORS para descargar y analizar el código HTML público del sitio."
                            />
                          ) : (
                            <TextField
                              label="Código HTML Crudo o Texto del Sitio"
                              placeholder="Pega el código fuente de tu landing page o el texto completo aquí..."
                              value={auditInput}
                              onChange={(e) => setAuditInput(e.target.value)}
                              multiline
                              minRows={8}
                              maxRows={15}
                              fullWidth
                              helperText="Pega el código HTML directamente. Útil para páginas detrás de un login o firewall."
                            />
                          )}

                          <AppSelect
                            id="audit-model-select"
                            label="Modelo Gemini"
                            value={auditModel}
                            options={[
                              { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Recomendado - Rápido)' },
                              { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Análisis profundo)' },
                            ]}
                            onChange={setAuditModel}
                            helperText="Gemini 2.5 Flash ofrece respuestas rápidas y excelente soporte para esquemas JSON estructurados."
                          />
                        </Stack>
                      )}

                      <PrimaryButton
                        onClick={handleGenerate}
                        disabled={loading || (selectedAppId === 'youtube-thumbnail-pro' ? !openaiKey.trim() : !geminiKey.trim())}
                        fullWidth
                        sx={{ mt: 4 }}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                      >
                        {loading ? 'Procesando...' : (selectedAppId === 'seo-audit' ? 'Iniciar Auditoría' : 'Ejecutar Aplicación')}
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
                        {!loading && !output && imageUrls.length === 0 && !auditResult && !error && (
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
                              {selectedAppId === 'seo-audit' ? 'Listo para Auditar' : 'Listo para Generar'}
                            </Typography>
                            <Typography variant="body2" sx={{ maxWidth: 420 }}>
                              Configura los parámetros de la izquierda y haz clic en <strong>{selectedAppId === 'seo-audit' ? 'Iniciar Auditoría' : 'Ejecutar Aplicación'}</strong> para desplegar la respuesta de la IA aquí.
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

                        {/* Real SEO Audit Results (App 2) */}
                        {!loading && auditResult && selectedAppId === 'seo-audit' && (
                          <Box id="seo-audit-report-dashboard" sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <style dangerouslySetInnerHTML={{ __html: `
                              @media print {
                                header, footer, nav, button, .no-print, .MuiTabs-root, .MuiAlert-root, .MuiButton-root, .no-print-custom {
                                  display: none !important;
                                }
                                body {
                                  background-color: white !important;
                                  color: black !important;
                                }
                                #seo-audit-report-dashboard {
                                  width: 100% !important;
                                  max-width: 100% !important;
                                  margin: 0 !important;
                                  padding: 0 !important;
                                }
                                .print-full-width {
                                  width: 100% !important;
                                  max-width: 100% !important;
                                  flex-basis: 100% !important;
                                }
                              }
                            `}} />
                            <Box
                              className="no-print-custom"
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                pb: 1.5,
                                mb: 3,
                              }}
                            >
                              <Typography variant="overline" color="text.secondary">
                                Reporte de Auditoría Generado
                              </Typography>
                              <Button
                                size="small"
                                startIcon={<PrintIcon />}
                                onClick={handlePrintReport}
                                variant="outlined"
                                color="primary"
                              >
                                Exportar PDF
                              </Button>
                            </Box>

                            {/* Circular Gauge Score */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, textAlign: 'center' }}>
                              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                <CircularProgress
                                  variant="determinate"
                                  value={auditResult.overallScore}
                                  size={100}
                                  thickness={6}
                                  sx={{
                                    color: getScoreColor(auditResult.overallScore, theme),
                                    backgroundColor: 'action.hover',
                                  }}
                                />
                                <Box
                                  sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Typography variant="h4" component="div" sx={{ fontWeight: 800 }}>
                                    {auditResult.overallScore}
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: 700 }}>
                                Calificación de Rendimiento General
                              </Typography>
                            </Box>

                            {/* Executive Summary */}
                            <Card variant="outlined" sx={{ mb: 4, bgcolor: 'action.hover' }}>
                              <CardContent sx={{ p: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                                  Resumen Ejecutivo
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                  {auditResult.summary}
                                </Typography>
                              </CardContent>
                            </Card>

                            {/* Category scores progress bars */}
                            <Stack spacing={2.5} sx={{ mb: 4 }}>
                              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                Desglose de Calificaciones
                              </Typography>
                              {auditResult.categories.map((cat: any) => {
                                const catColor = getScoreColor(cat.score, theme);
                                return (
                                  <Box key={cat.name}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{cat.name}</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 700, color: catColor }}>{cat.score}/100</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', height: 8, bgcolor: 'action.hover', borderRadius: 4, overflow: 'hidden' }}>
                                      <Box sx={{ width: `${cat.score}%`, height: '100%', bgcolor: catColor, borderRadius: 4 }} />
                                    </Box>
                                  </Box>
                                );
                              })}
                            </Stack>

                            {/* Strengths & Quick Wins */}
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                              <Grid item xs={12} sm={6} className="print-full-width">
                                <Card variant="outlined" sx={{ height: '100%', borderColor: alpha(theme.palette.success.main, 0.3) }}>
                                  <CardContent sx={{ p: 2.5 }}>
                                    <Typography variant="h6" sx={{ color: theme.palette.success.main, fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <CheckCircleIcon fontSize="small" /> Fortalezas Clave
                                    </Typography>
                                    <Stack spacing={1.5}>
                                      {auditResult.strengths.map((str: string, idx: number) => (
                                        <Typography key={idx} variant="body2" sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                                          <span style={{ color: theme.palette.success.main }}>✓</span> {str}
                                        </Typography>
                                      ))}
                                    </Stack>
                                  </CardContent>
                                </Card>
                              </Grid>
                              <Grid item xs={12} sm={6} className="print-full-width">
                                <Card variant="outlined" sx={{ height: '100%', borderColor: alpha(brandColors.primary, 0.3) }}>
                                  <CardContent sx={{ p: 2.5 }}>
                                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <BoltIcon fontSize="small" /> Oportunidades Rápidas (Quick Wins)
                                    </Typography>
                                    <Stack spacing={1.5}>
                                      {auditResult.quickWins.map((win: string, idx: number) => (
                                        <Typography key={idx} variant="body2" sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                                          <span style={{ color: brandColors.primary }}>⚡</span> {win}
                                        </Typography>
                                      ))}
                                    </Stack>
                                  </CardContent>
                                </Card>
                              </Grid>
                            </Grid>

                            {/* Findings and Recommendations */}
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2.5 }}>
                              Hallazgos y Recomendaciones Priorizadas
                            </Typography>
                            <Stack spacing={2.5}>
                              {auditResult.categories.flatMap((cat: any) => cat.findings.map((finding: any, idx: number) => {
                                const severityColor =
                                  finding.severity === 'critical'
                                    ? theme.palette.error.main
                                    : finding.severity === 'warning'
                                    ? theme.palette.warning.main
                                    : theme.palette.info.main;

                                const severityLabel =
                                  finding.severity === 'critical'
                                    ? '🔴 Crítico'
                                    : finding.severity === 'warning'
                                    ? '🟡 Advertencia'
                                    : '🔵 Sugerencia';

                                return (
                                  <Card key={idx} variant="outlined" sx={{ borderLeft: `4px solid ${severityColor}`, breakInside: 'avoid' }}>
                                    <CardContent sx={{ p: 2.5 }}>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                                        <Chip label={severityLabel} size="small" sx={{ bgcolor: alpha(severityColor, 0.1), color: severityColor, fontWeight: 700, border: 'none' }} />
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                          Categoría: {cat.name}
                                        </Typography>
                                      </Box>
                                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        {finding.title}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                                        {finding.description}
                                      </Typography>
                                      <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1.5 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                                          <BoltIcon fontSize="small" /> ACCIÓN DE MEJORA RECOMENDADA:
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.primary', lineHeight: 1.5 }}>
                                          {finding.recommendation}
                                        </Typography>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                );
                              }))}
                            </Stack>
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
                                        sx={getOverlayBoxStyles(thumbTextStyle, thumbTextPosition, thumbTextColor)}
                                      >
                                        <Typography 
                                          variant="h5" 
                                          sx={getOverlayTextStyles(thumbTextStyle, thumbTextColor, thumbTextFont)}
                                        >
                                          {thumbHeadline.trim()}
                                        </Typography>
                                      </Box>
                                    )}

                                    {/* Simulated Duration Badge */}
                                    {thumbBadgeType === 'duration' && (
                                      <Box
                                        sx={{
                                          position: 'absolute',
                                          bottom: 12,
                                          ...(thumbHeadline.trim() && thumbTextPosition === 'bottom-right'
                                            ? { left: 12 }
                                            : { right: 12 }),
                                          backgroundColor: alpha(brandColors.black, 0.85),
                                          color: brandColors.white,
                                          px: 0.75,
                                          py: 0.25,
                                          borderRadius: '4px',
                                          fontSize: '0.75rem',
                                          fontWeight: 700,
                                          zIndex: 3,
                                        }}
                                      >
                                        12:45
                                      </Box>
                                    )}

                                    {/* Simulated Live Badge */}
                                    {thumbBadgeType === 'live' && (
                                      <Box
                                        sx={{
                                          position: 'absolute',
                                          top: 12,
                                          ...(thumbHeadline.trim() && thumbTextPosition === 'top-left'
                                            ? { right: 12 }
                                            : { left: 12 }),
                                          backgroundColor: 'error.main',
                                          color: brandColors.white,
                                          px: 1,
                                          py: 0.5,
                                          borderRadius: '4px',
                                          fontSize: '0.70rem',
                                          fontWeight: 800,
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 0.5,
                                          zIndex: 3,
                                          boxShadow: `0 2px 8px ${alpha(brandColors.black, 0.3)}`,
                                        }}
                                      >
                                        🔴 EN VIVO
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
                                        backgroundColor: alpha(brandColors.black, 0.1),
                                        '&:hover': { backgroundColor: alpha(brandColors.black, 0.3) }
                                      }}
                                    >
                                      <PlayCircleOutlineIcon sx={{ fontSize: 64, color: alpha(brandColors.white, 0.9) }} />
                                    </Box>

                                    {/* YouTube bar */}
                                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: alpha(brandColors.white, 0.2) }}>
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
                                        sx={getOverlayBoxStyles(thumbTextStyle, thumbTextPosition, thumbTextColor)}
                                      >
                                        <Typography 
                                          variant="h6" 
                                          sx={getOverlayTextStyles(thumbTextStyle, thumbTextColor, thumbTextFont)}
                                        >
                                          {thumbHeadline.trim()}
                                        </Typography>
                                      </Box>
                                    )}

                                    {/* Simulated Duration Badge */}
                                    {thumbBadgeType === 'duration' && (
                                      <Box
                                        sx={{
                                          position: 'absolute',
                                          bottom: 12,
                                          ...(thumbHeadline.trim() && thumbTextPosition === 'bottom-right'
                                            ? { left: 12 }
                                            : { right: 12 }),
                                          backgroundColor: alpha(brandColors.black, 0.85),
                                          color: brandColors.white,
                                          px: 0.75,
                                          py: 0.25,
                                          borderRadius: '4px',
                                          fontSize: '0.75rem',
                                          fontWeight: 700,
                                          zIndex: 3,
                                        }}
                                      >
                                        12:45
                                      </Box>
                                    )}

                                    {/* Simulated Live Badge */}
                                    {thumbBadgeType === 'live' && (
                                      <Box
                                        sx={{
                                          position: 'absolute',
                                          top: 12,
                                          ...(thumbHeadline.trim() && thumbTextPosition === 'top-left'
                                            ? { right: 12 }
                                            : { left: 12 }),
                                          backgroundColor: 'error.main',
                                          color: brandColors.white,
                                          px: 1,
                                          py: 0.5,
                                          borderRadius: '4px',
                                          fontSize: '0.70rem',
                                          fontWeight: 800,
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 0.5,
                                          zIndex: 3,
                                          boxShadow: `0 2px 8px ${alpha(brandColors.black, 0.3)}`,
                                        }}
                                      >
                                        🔴 EN VIVO
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

                            {/* Read-only Prompt Display Box */}
                            {thumbPromptUsed && (
                              <Box
                                sx={{
                                  mt: 4,
                                  p: 2.5,
                                  borderRadius: 3,
                                  border: '1px solid',
                                  borderColor: alpha(brandColors.primary, 0.2),
                                  background: `linear-gradient(135deg, ${alpha(brandColors.black, 0.4)} 0%, ${alpha(brandColors.primary, 0.05)} 100%)`,
                                  backdropFilter: 'blur(10px)',
                                }}
                              >
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <AutoAwesomeIcon sx={{ color: brandColors.secondary, fontSize: 18 }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                      Prompt utilizado para la generación
                                    </Typography>
                                  </Stack>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                                    onClick={() => {
                                      navigator.clipboard.writeText(thumbPromptUsed);
                                      setCopied(true);
                                      setTimeout(() => setCopied(false), 2000);
                                    }}
                                    sx={{
                                      fontSize: '0.75rem',
                                      py: 0.5,
                                      px: 1.5,
                                      borderRadius: 2,
                                      borderColor: alpha(brandColors.primary, 0.3),
                                      color: 'text.secondary',
                                      '&:hover': {
                                        borderColor: brandColors.primary,
                                        backgroundColor: alpha(brandColors.primary, 0.05),
                                      },
                                    }}
                                  >
                                    {copied ? 'Copiado' : 'Copiar'}
                                  </Button>
                                </Stack>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.85rem',
                                    color: 'text.secondary',
                                    lineHeight: 1.6,
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    p: 2,
                                    borderRadius: 2,
                                    backgroundColor: alpha(brandColors.black, 0.5),
                                    border: '1px solid',
                                    borderColor: alpha(brandColors.white, 0.05),
                                  }}
                                >
                                  {thumbPromptUsed}
                                </Typography>
                              </Box>
                            )}
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
