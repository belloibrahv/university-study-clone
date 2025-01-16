import React from 'react';
import { Box, Container, Grid, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { SvgIcon } from '@mui/material';

const FooterContainer = styled(Box)({
  backgroundColor: '#FFF5F2',
  padding: '60px 0 40px',
});

const FooterSection = styled(Box)({
  marginBottom: '40px',
});

const SocialButton = styled(Button)({
  minWidth: '40px',
  width: '40px',
  height: '40px',
  padding: 0,
  borderRadius: '50%',
  backgroundColor: '#fff',
  marginRight: '12px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const NewsletterInput = styled(TextField)({
  backgroundColor: '#fff',
  borderRadius: '4px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#eaeaea',
    },
  },
});

const SubscribeButton = styled(Button)({
  backgroundColor: '#000',
  color: '#fff',
  borderRadius: '4px',
  padding: '8px 24px',
  '&:hover': {
    backgroundColor: '#333',
  },
});
const LogoWrapper = styled(Box)({
  padding: '15px',
  display: 'inline-block',
  maxWidth: '300px',
});

const LogoContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
});

const DiamondLogo = styled('div')({
  width: '40px',
  height: '40px',
  border: '2px solid #000',
  transform: 'rotate(45deg)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '5px',
    left: '5px',
    right: '5px',
    bottom: '5px',
    border: '2px solid #000',
  }
});

const LogoText = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  '& .english': {
    color: '#000',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '1.2',
  },
  '& .french': {
    color: '#3BA9E2',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '1.2',
  }
});

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <FooterSection>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>An initiative of</Typography>
              <LogoWrapper>
                <LogoContent>
                  <DiamondLogo />
                  <LogoText>
                    <span className="english">Universities Canada.</span>
                    <span className="french">Universités Canada.</span>
                  </LogoText>
                </LogoContent>
              </LogoWrapper>
            </FooterSection>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FooterSection>
              <Typography variant="h6" sx={{ mb: 2 }}>University Study</Typography>
              <Box component="nav">
                <Typography component="div" sx={{ mb: 1 }}>Programs</Typography>
                <Typography component="div" sx={{ mb: 1 }}>Schools</Typography>
                <Typography component="div" sx={{ mb: 1 }}>Scholarships</Typography>
                <Typography component="div" sx={{ mb: 1 }}>Resources</Typography>
              </Box>
            </FooterSection>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FooterSection>
              <Typography variant="h6" sx={{ mb: 2 }}>About us</Typography>
              <Box component="nav">
                <Typography component="div" sx={{ mb: 1 }}>Contact</Typography>
                <Typography component="div" sx={{ mb: 1 }}>Advertise with us</Typography>
                <Typography component="div" sx={{ mb: 1 }}>Privacy Notice</Typography>
                <Typography component="div" sx={{ mb: 1 }}>FAQ's regarding studying in Canada</Typography>
              </Box>
            </FooterSection>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FooterSection>
              <Typography variant="h6" sx={{ mb: 2 }}>Newsletter</Typography>
              <Box sx={{ mb: 3 }}>
                <NewsletterInput
                  fullWidth
                  placeholder="Your email address"
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <SubscribeButton variant="contained" fullWidth>
                  Subscribe
                </SubscribeButton>
              </Box>
              <Box>
                <SocialButton>
                  <LinkedInIcon />
                </SocialButton>
                <SocialButton>
                  <InstagramIcon />
                </SocialButton>
                <SocialButton>
                  <FacebookIcon />
                </SocialButton>
                <SocialButton>
                  <SvgIcon>
                    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 013.76 6.1C4.84 4.25 7 3 9.5 3c2.42 0 4.5 1.03 5.7 2.82zM12 16c-3.17 0-5.75-3.03-5.75-6.75C6.25 5.03 8.83 2 12 2s5.75 3.03 5.75 6.75c0 3.72-2.58 6.75-5.75 6.75z" />
                  </SvgIcon>
                </SocialButton>
              </Box>
            </FooterSection>
          </Grid>
        </Grid>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ pt: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}
        >
          © Universities Canada 2025
        </Typography>
      </Container>
    </FooterContainer>
  );
};
