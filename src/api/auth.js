import config from '../config';

async function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch(`${config.apiUrl}/api/auth`, requestOptions);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  const user = await response.json();
  return user;
}

export default {
  login,
};
