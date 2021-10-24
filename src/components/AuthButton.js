import { useAuth0 } from '@auth0/auth0-react';

const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  console.log(user);
  return (
      <>
    {!isAuthenticated && <button
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
      Войти
    </button>}

    {isAuthenticated && 
    <div>
        <span>{user.name}</span>
   
    <button
    className="btn btn-primary btn-block"
    onClick={() => logout()}
  >
    Выйти
  </button>
  </div>
  }
  
  </>
  );
};

export default AuthButton