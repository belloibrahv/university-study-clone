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

const ExternalLink = styled('a')({
  color: '#666',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  '&:hover': {
    textDecoration: 'underline',
  },
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

const LanguageButton = styled(Button)({
  minWidth: '40px',
  padding: '4px 8px',
  color: '#666',
  border: '1px solid #ddd',
  borderRadius: '20px',
  marginRight: '8px',
});

export const Header: React.FC = () => {
  return (
    <>
      <TopBar>
        <div>An initiative of Universities Canada</div>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <ExternalLink href="#">
            Univcan.ca <ArrowForwardIcon sx={{ fontSize: 14 }} />
          </ExternalLink>
          <ExternalLink href="#">
            UniversityAffairs.ca <ArrowForwardIcon sx={{ fontSize: 14 }} />
          </ExternalLink>
        </Box>
      </TopBar>
      
      <MainHeader position="static">
        <Toolbar sx={{ justifyContent: 'space-between', padding: '16px 24px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/">
              <Logo src={UniversityImg} alt="UniversityStudy.ca" />
            </Link>
            <Logo src={FoundationImg} alt="RBC Foundation" />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', mr: 4 }}>
              <NavButton component={Link} to="/programs" className="active">
                Programs
              </NavButton>
              <NavButton component={Link} to="/">
                Schools
              </NavButton>
              <NavButton component={Link} to="/">
                Scholarships
              </NavButton>
              <NavButton component={Link} to="/">
                Resources
              </NavButton>
            </Box>
            
            <LanguageButton>
              FR
            </LanguageButton>
            
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

export default Header;
