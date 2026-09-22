import { supabase } from '@/Api';
import { useAuth } from '@/Auth';
import { ROUTES } from '@/Consts';
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from '@pokedex/ui';
import { memo, useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router';

type Mode = 'signIn' | 'signUp';

const LoginPageComponent = () => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && session) {
    return <Navigate to={ROUTES.HOME} />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const { data, error } =
      mode === 'signIn'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (!data.session) {
      setErrorMessage('確認メールを送信しました。メール内のリンクから確認を完了してください。');
      return;
    }

    navigate(ROUTES.HOME);
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 16,
      }}
    >
      <Card style={{ width: '100%', maxWidth: 360 }}>
        <CardContent style={{ padding: 24 }}>
          <Typography variant="h5" style={{ marginBottom: 16, textAlign: 'center' }}>
            {mode === 'signIn' ? 'ログイン' : '新規登録'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                type="email"
                label="メールアドレス"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                type="password"
                label="パスワード"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                fullWidth
              />
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              <Button type="submit" variant="contained" disabled={isSubmitting} fullWidth>
                {mode === 'signIn' ? 'ログイン' : '登録する'}
              </Button>
              <Button
                type="button"
                variant="text"
                onClick={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
                fullWidth
              >
                {mode === 'signIn' ? '新規登録はこちら' : 'ログインはこちら'}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

const LoginPage = memo(LoginPageComponent);

export default LoginPage;
