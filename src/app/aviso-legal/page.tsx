import { Typography, Box } from '@mui/material';
import { LegalLayout } from '@/components';
import { legalContent } from '@/content/legal';

export default function LegalNoticePage() {
  const { title, lastUpdated, sections } = legalContent.legal;

  return (
    <LegalLayout title={title} lastUpdated={lastUpdated}>
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
