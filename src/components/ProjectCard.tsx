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
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px -8px rgba(0, 0, 0, 0.15)',
        },
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
          sx={{ color: 'text.secondary', mb: 2 }}
        >
          {description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                backgroundColor: 'rgba(49, 151, 149, 0.1)',
                color: 'secondary.dark',
                fontWeight: 500,
              }}
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
              color: 'secondary.main',
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
