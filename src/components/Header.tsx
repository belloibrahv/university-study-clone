import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UniversityImg from '../assets/images/university.svg';
import FoundationImg from '../assets/images/foundation.svg';


const TopBar = styled(Box)({
  backgroundColor: '#f8f8f8',
  padding: '4px 24px',
  borderBottom: '1px solid #eaeaea',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '14px',
});

const MainHeader = styled(AppBar)({
  backgroundColor: 'white',
  color: '#333',
  boxShadow: 'none',
  borderBottom: '1px solid #eaeaea',
});

const Logo = styled('img')({
  height: '40px',
  marginRight: '16px',
});

const NavButton = styled(Button)({
  color: '#333',
  textTransform: 'none',
  fontSize: '16px',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#0066cc',
  },
  '&.active': {
    borderBottom: '2px solid #0066cc',
    color: '#0066cc',
  },
});

export const Header: React.FC = () => {
  return (
    <>
      <TopBar>
        <div>An initiative of Universities Canada</div>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <a href="#" style={{ color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Univcan.ca <ArrowForwardIcon sx={{ fontSize: 14 }} />
          </a>
        </Box>
      </TopBar>
      <MainHeader position="static">
        <Toolbar sx={{ justifyContent: 'space-between', padding: '16px 24px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo src={UniversityImg} alt="UniversityStudy.ca" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NavButton className="active">Programs</NavButton>
            <Button
              sx={{
                minWidth: '40px',
                padding: '4px 8px',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '20px',
                marginRight: '8px',
              }}
            >
              FR
            </Button>
            <IconButton
              sx={{
                width: '40px',
                height: '40px',
                backgroundColor: '#f8f8f8',
                '&:hover': { backgroundColor: '#eaeaea' }
              }}
            >
              <PersonOutlineIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </MainHeader>
    </>
  );
};
