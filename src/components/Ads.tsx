import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdsImg from '../assets/images/ads.jpg';

interface AddBorder {
  addBorder?: boolean;
}

const AdContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'addBorder'
})<AddBorder>(({ addBorder }) => ({
  position: 'relative',
  width: '100%',
  backgroundColor: '#fff',
  padding: addBorder ? '12px 0 32px' : '12px 0',
  borderBottom: addBorder ? '1px solid #e0e0e0' : 'none',
  marginTop: '20px',
  marginBottom: '20px',
  borderTop: addBorder ? 'solid 1px #e0e0e0' : 'none', 
}));

interface AdLabelProps {
  ps?: string;
}

const AdLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'ps'
})<AdLabelProps>(({ ps = '12px' }) => ({
  position: 'absolute',
  top: 0,
  left: ps,
  color: '#666',
  fontSize: '12px',
  padding: '4px 8px',
  fontWeight: 'bold',
}));

const AdBanner = styled('div')({
  maxWidth: '1200px',
  margin: '14px auto 0',
  padding: '0 24px',
  position: 'relative',
  '& a': {
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
});

interface AdsProps {
  text?: string;
  position?: string;
  addBorder?: boolean;
}

const Ads: React.FC<AdsProps> = ({ text = 'Ad', position = '12px', addBorder }) => (
  <AdContainer addBorder={addBorder}>
    <AdLabel ps={position} variant="body2">
      {text}
    </AdLabel>
    <AdBanner>
      <a href="#" rel="noopener noreferrer">
        <img 
          src={AdsImg}
          alt="UVIC - Reach Farther. Push the boundaries of possibility" 
        />
      </a>
    </AdBanner>
  </AdContainer>
);

export default Ads;
