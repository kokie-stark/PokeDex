import { AuthProvider } from '@/Auth';
import { SplashScreen } from '@/Components';
import { router } from '@/Routes/routes';
import { theme } from '@pokedex/ui';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SplashScreen>
          <RouterProvider router={router} />
        </SplashScreen>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
