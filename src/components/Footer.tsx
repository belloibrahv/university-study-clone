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
            </FooterSection>
          </Grid>
          <Grid item xs={12} md={12}>
            <FooterSection>
              <Box sx={{textAlign: 'left'}}>
                <SocialButton>
                  <LinkedInIcon sx={{color: '#0a0b0b'}}/>
                </SocialButton>
                <SocialButton>
                  <InstagramIcon sx={{color: '#0a0b0b'}}/>
                </SocialButton>
                <SocialButton>
                  <FacebookIcon sx={{color: '#0a0b0b'}}/>
                </SocialButton>
                <SocialButton>
                <svg height="16" viewBox="0 0 16 16" width="16"><path d="m11.1289767 0v.35223166c.0097238.10530342.0237376.21020645.0419841.31442309l.0104916.05724397c.2037495 1.06577524.8490222 1.97476378 1.7385976 2.52958238.6080258.3792868 1.3106015.57988381 2.0272482.57879703v2.73846099c-1.3978549 0-2.6939252-.43608627-3.7593683-1.17957881l-.058896-.04156338v5.58851727c0 2.7676468-2.22230517 5.0165072-4.9806539 5.0612077l-.08374867.0006781c-1.04359638 0-2.01357762-.3153955-2.81934042-.8561552-1.35428122-.908926-2.24529091-2.4533581-2.24529091-4.2057878 0-2.79543121 2.26748414-5.06165758 5.06468853-5.06165758.23245688-.00011378.46462776.01567315.69491108.04713262l-.0001144 2.79966396c-.22164626-.07029762-.45793547-.10844937-.70309054-.10844937-1.2795424 0-2.3166181 1.0367325-2.3166181 2.31541697 0 .9040879.51839485 1.6869711 1.27433729 2.0683171.31353636.1581196.6674437.2470426 1.04228081.2470426 1.27691126 0 2.31221378-1.0324998 2.31661811-2.3074663v-10.938057z" fill="#0a0b0b"></path></svg>
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
