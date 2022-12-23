import {
    useState,
    useEffect,
  } from 'react';
  import useMediaQuery from '@mui/material/useMediaQuery';
  import {
    useTheme,
  } from '@mui/material/styles';
  
  const useScreenSize = () => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.up('xs'));
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));
    const size = isXl ? 'xl' : isLg ? 'lg' : isMd ? 'md' : isSm ? 'sm' : isXs ? 'xs' : 'xs';
    const [ screenSize, setScreenSize ] = useState(size);
    useEffect(() => {
      setScreenSize(size);
    }, [ isXs, isSm, isMd, isLg, isXl, size ] );
  
    return screenSize;
  };
  
  export {
    useScreenSize,
  };
  
  
  