import { Typography, Grid, Card, CardContent, Container } from '@mui/material';
import { Section } from '@/components';
import { siteContent } from '@/content/site';

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Section
        title={siteContent.about.title}
        subtitle={siteContent.about.subtitle}
        background="default"
      >
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 5, maxWidth: 720 }}
        >
          {siteContent.about.description}
        </Typography>
        <Grid container spacing={3}>
          {siteContent.about.highlights.map((item) => (
            <Grid item xs={12} sm={6} key={item.title}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
                elevation={0}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{ color: 'primary.main', mb: 1 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Container>
  );
}
