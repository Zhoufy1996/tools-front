import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    error: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    error?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    error: true;
  }
}

const theme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {},
  direction: 'ltr',
  mixins: {},
  palette: {},
  //   shadows: [],
  shape: {
    borderRadius: 4,
  },
  transitions: {},
  typography: {
    fontSize: 12,
    error: {
      color: 'red',
    },
  },
  zIndex: {},
});

export default theme;
