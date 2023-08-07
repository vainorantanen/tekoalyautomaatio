import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-scroll';

const Sidebar = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '1rem',
        borderRadius: '0 10px 10px 0',
      }}
    >
      <List component="nav">
        <ListItem component={Link} to="why" spy={true} smooth={true} duration={500}>
          <ListItemText primary="Miksi hyödyntää tekoälyä?" />
        </ListItem>
        {/* Add more items here for other sections */}
      </List>
    </Box>
  );
};

export default Sidebar;
