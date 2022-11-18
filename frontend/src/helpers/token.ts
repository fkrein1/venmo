const TOKEN_KEY = '@venmo-clone:auth-token-1.0.0'

export function setToken (token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function deleteToken () {
  localStorage.removeItem(TOKEN_KEY)
}

export function getToken () {
  return localStorage.getItem(TOKEN_KEY)
}
