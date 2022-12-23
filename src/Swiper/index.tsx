import React, {
    useEffect,
  } from 'react';
  import {
    Swiper, SwiperSlide,
  } from 'swiper/react';
  // import Swiper core and required modules
  import {
    isMobile,
  } from 'react-device-detect';
  
  import SwiperCore, {
    Navigation,
  } from 'swiper';
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import './styles.css';
  import { useScreenSize } from '../hooks';
  
  import {
    Box,
    Grid,
  } from '@mui/material';
  
  import {
      IMedia,
  } from '../types';
  
  // install Swiper modules
  SwiperCore.use([ Navigation ]);

  const MAX_THUMBNAILS_PER_ROW = 40;
  const THUMBNAILS_FOR_BREAKPOINTS : any = Object.freeze({
    'xs': 2,
    'sm': 3,
    'md': 4,
    'lg': 5,
    'xl': 5,
  });
  
  const Card= ({
      video,
    }: {
      video: IMedia,
    }): (JSX.Element | null ) => {
  
      return(
        <Box
        style={{
          width: '100%',
          height: '100%',
          textDecoration: 'none',
        }}
      > 

      <img
          style={{
            display: 'block',
          }}
          src={video.thumbnail_image}
          alt={video.title}
        />
      
      </Box>
        
      )
  };
  
  const SwiperComponent = ({
    videos,
  }: {
    videos: IMedia[],
  }): (JSX.Element | null ) => {

    const [ swiper, setSwiper ] = React.useState<any>(null);
    const [ isInitialRowrender, setIsInitialRowrender ] = React.useState(true);
    const screenSize : string = useScreenSize();
  
    const swipeRight = () => {
        if(swiper){
      const moveCount = swiper.activeIndex + (Math.floor(swiper.params.slidesPerView) - 1);
      const buffer = 0;
      const nextSlideNumber = moveCount + buffer;
  
      swiper.slideTo(nextSlideNumber, 500, true);
      setIsInitialRowrender(false);
        }
    };
  
    const swipeLeft = () => {
      swiper.slideTo(swiper.activeIndex - (Math.floor(swiper.params.slidesPerView) - 1), 500, true);
      setIsInitialRowrender(false);
    };
  
  
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    const isSwiperLoopable = videos.length > THUMBNAILS_FOR_BREAKPOINTS[screenSize];
    const rowVideos = isSwiperLoopable
      ? Array.from({
        length: videos.length < MAX_THUMBNAILS_PER_ROW ? (MAX_THUMBNAILS_PER_ROW / videos.length) + 1 : 1,
      }, () => videos)
        .flat()
      : videos;
    const videoItems = rowVideos.slice(0, MAX_THUMBNAILS_PER_ROW)
      .map((video, index) => {
  
        return (
          <SwiperSlide 
            key={index}
            id={index+''}
            style={{
              visibility: index == MAX_THUMBNAILS_PER_ROW - 1 && isInitialRowrender ? 'hidden' : 'visible',
            }}
          >
  
                 <Card
                    video={video}
                  />
          </SwiperSlide>
        );
      });

    return (
      <Grid
        item
      >
  
        <Grid
          item
          className='thumbTiles'
        >
  
          <Swiper
            style={{
              marginLeft: '4%',
              marginRight: '4%',
              width: '92%',
            }}
            centeredSlides={false}
            initialSlide={0}
            spaceBetween={10}
            loopAdditionalSlides={0}
            loop={isSwiperLoopable}
            loopPreventsSlide={false}
            allowTouchMove={true}
            onTouchMoveOpposite={(_swiperRef, _event) => {
              swipeLeft();
            }}
            onTouchMove={(_swiperRef, _event) => {
              swipeRight();
            }}
            onSwiper={(sw) => {
              // Delay execution for the refs to be defined
              setSwiper(sw);
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2.001,
              },
              // when window width is >= 600px
              720: {
                slidesPerView: 3.001,
              },
              905: {
                slidesPerView: 4.001,
              },
              1240: {
                slidesPerView: 5.001,
              },
              1440: {
                slidesPerView: 5.001,
              },
            }}
          >
  
            {videoItems}
  
            <div ref={navigationPrevRef}
              className="swiper-button-prev"
              onClick={swipeLeft}
              style={{
                display: isInitialRowrender || isMobile ? 'none' : '',
                marginLeft: '-6%',
              }}></div>
  
            <div ref={navigationNextRef}
              className="swiper-button-next"
              onClick={swipeRight}
              style={{
                marginRight: '-6%',
                display: isMobile ? 'none' : '',
              }}></div>
  
          </Swiper>
        </Grid>
  
      </Grid>
    );
  };
  
  export default SwiperComponent;
  
  