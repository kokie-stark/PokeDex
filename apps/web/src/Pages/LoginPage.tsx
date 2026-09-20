import { supabase } from '@/Api';
import { useAuth } from '@/Auth';
import { ROUTES } from '@/Consts';
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
    <div>
      <h1>{mode === 'signIn' ? 'ログイン' : '新規登録'}</h1>
      <button type="button" onClick={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}>
        {mode === 'signIn' ? '新規登録はこちら' : 'ログインはこちら'}
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            メールアドレス
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            パスワード
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {mode === 'signIn' ? 'ログイン' : '登録する'}
        </button>
      </form>
    </div>
  );
};

const LoginPage = memo(LoginPageComponent);

export default LoginPage;
