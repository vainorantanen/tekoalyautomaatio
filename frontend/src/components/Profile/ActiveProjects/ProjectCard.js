import { Box, Typography } from '@mui/material';
import React from 'react';

const ProjectCard = ({ project }) => {
  if (!project) {
    return null;
  }

  const cardStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: 'white',
    padding: '16px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const titleStyles = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: 'black'
  };

  const descriptionStyles = {
    fontSize: '1rem',
    color: '#555',
  };

  return (
    <Box sx={cardStyles}>
      <Typography variant="h6" sx={titleStyles}>
        {project.title}
      </Typography>
      <Typography variant="body1" sx={descriptionStyles}>
        {project.description}
      </Typography>
    </Box>
  );
};

export default ProjectCard;
