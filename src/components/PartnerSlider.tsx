import React, { useRef, useState, useEffect } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SliderContainer = styled(Box)({
  padding: '40px 0',
  backgroundColor: '#fff',
});

const SliderContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
});

const PartnerLogo = styled('img')({
  maxWidth: '150px',
  height: 'auto',
  margin: '0 20px',
  flex: '0 0 auto',
});

const SliderButton = styled(IconButton)({
  backgroundColor: '#fff',
  border: '1px solid #eaeaea',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '&.Mui-disabled': {
    backgroundColor: '#f5f5f5',
    opacity: 0.5,
  },
  zIndex: 1,
});

const SliderTrack = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  transition: 'transform 0.3s ease-in-out',
  margin: '0 -20px', // Compensate for logo margins
});

const SliderWindow = styled(Box)({
  overflow: 'hidden',
  margin: '0 20px',
  flex: 1,
});

interface PartnerSliderProps {
  partners: Array<{
    id: number;
    name: string;
    logo: string;
  }>;
}

export const PartnerSlider: React.FC<PartnerSliderProps> = ({ partners }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const SCROLL_AMOUNT = 300; // Pixels to scroll per click

  useEffect(() => {
    const checkScrollability = () => {
      if (trackRef.current) {
        const { scrollWidth, clientWidth } = trackRef.current;
        setCanScrollLeft(scrollPosition > 0);
        setCanScrollRight(scrollPosition < scrollWidth - clientWidth);
      }
    };

    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [scrollPosition]);

  const handlePrevClick = () => {
    if (trackRef.current) {
      const newPosition = Math.max(scrollPosition - SCROLL_AMOUNT, 0);
      setScrollPosition(newPosition);
    }
  };

  const handleNextClick = () => {
    if (trackRef.current) {
      const { scrollWidth, clientWidth } = trackRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const newPosition = Math.min(scrollPosition + SCROLL_AMOUNT, maxScroll);
      setScrollPosition(newPosition);
    }
  };

  return (
    <SliderContainer>
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', fontWeight: 500 }}>
          Our partners
        </Typography>
        <SliderContent>
          <SliderButton 
            onClick={handlePrevClick} 
            disabled={!canScrollLeft}
            sx={{ ml: -2 }}
          >
            <ChevronLeftIcon />
          </SliderButton>
          
          <SliderWindow>
            <SliderTrack
              ref={trackRef}
              sx={{
                transform: `translateX(-${scrollPosition}px)`,
              }}
            >
              {partners.map((partner) => (
                <PartnerLogo
                  key={partner.id}
                  src={partner.logo}
                  alt={partner.name}
                />
              ))}
            </SliderTrack>
          </SliderWindow>

          <SliderButton 
            onClick={handleNextClick}
            disabled={!canScrollRight}
            sx={{ mr: -2 }}
          >
            <ChevronRightIcon />
          </SliderButton>
        </SliderContent>
      </Container>
    </SliderContainer>
  );
};
