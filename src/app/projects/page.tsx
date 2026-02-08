import { Grid, Container } from '@mui/material';
import { Section, ProjectCard } from '@/components';
import { siteContent } from '@/content/site';

export default function ProjectsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Section
        title={siteContent.projects.title}
        subtitle={siteContent.projects.subtitle}
        background="default"
      >
        <Grid container spacing={3}>
          {siteContent.projects.items.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.title}>
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
              />
            </Grid>
          ))}
        </Grid>
      </Section>
    </Container>
  );
}
