import { useState } from 'react';

export default function loginToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.login
  };

  const [login, setLogin] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setLogin(userToken.login);
  };

  return {
    setLogin: saveToken,
    login
  }
}