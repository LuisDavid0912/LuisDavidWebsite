import { Typography, Box } from '@mui/material';
import { LegalLayout } from '@/components';
import { legalContent } from '@/content/legal';

export default function CookiesPage() {
  const { title, lastUpdated, intro, sections } = legalContent.cookies;

  return (
    <LegalLayout title={title} lastUpdated={lastUpdated}>
      {intro.map((paragraph, index) => (
        <Typography key={index} component="p" sx={{ mb: 4, fontWeight: 500 }}>
          {paragraph}
        </Typography>
      ))}
      
      {sections.map((section, index) => (
        <Box key={index} component="section" sx={{ mb: 4 }}>
          <Typography variant="h3" component="h2">
            {section.heading}
          </Typography>
          {section.content.map((paragraph, pIndex) => (
            <Typography key={pIndex} component="p">
              {paragraph}
            </Typography>
          ))}
        </Box>
      ))}
    </LegalLayout>
  );
}
