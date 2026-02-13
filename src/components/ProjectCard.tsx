import { Card, CardContent, CardActions, Typography, Chip, Box, Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export default function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // Card hover handled by theme components override
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 2,
            textAlign: { xs: 'left', md: 'justify' },
          }}
        >
          {description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              // Chip styling handled by theme components override
            />
          ))}
        </Box>
      </CardContent>
      {link && link !== '#' && (
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 600,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Ver proyecto
            <ArrowForwardIcon fontSize="small" />
          </Link>
        </CardActions>
      )}
    </Card>
  );
}
