import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  // message passed from login/signup
  const message = (location.state as any)?.message as string | undefined;

  return (
    <div className="p-8 text-center">
      {message && <div className="auth-success" style={{marginBottom:12}}>{message}</div>}
      <h1 className="text-2xl font-bold mb-2">Bạn đã đăng nhập thành công</h1>
      <p>Chào mừng bạn đến với trang Home.</p>
    </div>
  );
}