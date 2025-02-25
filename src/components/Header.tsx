import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box, Button, IconButton } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import UniversityImg from '../assets/images/university.svg';
import FoundationImg from '../assets/images/RBC-Foundation-Logo.png';
import Ads from './Ads';

const NewsletterBar = styled(Box)({
  width: '100%',
  backgroundColor: 'rgb(255, 220, 97)',
  padding: '12px 24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

const SubscribeLink = styled('a')({
  color: '#000',
  textDecoration: 'underline',
  marginLeft: '8px',
  fontWeight: 500,
  '&:hover': {
    color: '#0066cc',
  },
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: '16px',
  padding: '4px',
  color: '#666',
});

const TopBar = styled(Box)({
  backgroundColor: 'transparent',
  padding: '10px 40px',
  borderBottom: '1px solid #d6dadc',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '13px',
  fontWeight: 500,
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
  fontWeight: 600,
  padding: '8px 16px 4px',
  borderRadius: 0,
  borderBottom: '1px solid transparent',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#0066cc',
  },
  '&.active': {
    borderBottom: '1px solid #000',
    color: '#000',
  },
});

const TopBarLink = styled('a')({
  color: '#666',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  '&:hover': {
    color: '#0066cc',
  },
});

export const Header: React.FC = () => {
  const [showNewsletter, setShowNewsletter] = React.useState(true);

  return (
    <>
      <Ads position='340px' />

      {showNewsletter && (
        <NewsletterBar>
          <span>Sign up for our newsletter!</span>
          <SubscribeLink href="#">Subscribe</SubscribeLink>
          <CloseButton 
            onClick={() => setShowNewsletter(false)}
            size="small"
            sx={{  marginRight: '25px',}}
          >
            <CloseIcon fontSize="small" sx={{ fontSize: '15px', fontWeight: 'bold',}}/>
          </CloseButton>
        </NewsletterBar>
      )}

      <TopBar>
        <div>An initiative of Universities Canada</div>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <TopBarLink href="#">
            Univcan.ca <ArrowForwardIcon sx={{ fontSize: 14 }} />
          </TopBarLink>
          <TopBarLink href="#">
            UniversityAffairs.ca <ArrowForwardIcon sx={{ fontSize: 14 }} />
          </TopBarLink>
        </Box>
      </TopBar>

      <MainHeader position="static">
        <Toolbar sx={{ justifyContent: 'space-between', padding: '16px 24px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', borderRight: '1px solid #eaeaea', pr: 2 }}>
              <Logo src={UniversityImg} alt="UniversityStudy.ca" sx={{ height: '60px' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo src={FoundationImg} alt="Foundation Fondation" sx={{ height: '60px' }} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', mr: 2 }}>
              <NavButton className="active">Programs</NavButton>
              <NavButton>Schools</NavButton>
              <NavButton>Scholarships</NavButton>
              <NavButton>Resources</NavButton>
            </Box>
            <Button
              sx={{
                minWidth: '40px',
                padding: '4px 8px',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '20px',
                marginRight: '8px',
                '&:hover': {
                  backgroundColor: '#f8f8f8',
                },
              }}
            >
              FR
            </Button>
            <IconButton
              sx={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgb(253, 228, 217)',
                '&:hover': { backgroundColor: '#eaeaea' },
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
