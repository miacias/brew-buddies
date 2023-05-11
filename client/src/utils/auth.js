// decodes a token and get the user information
import decode from 'jwt-decode';

// creates a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // checks if user's logged in
  loggedIn() {
    // checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // checks if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // clears user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // reloads page and resets state of application
    window.location.assign('/');
  }
}

export default new AuthService();