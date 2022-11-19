const TOKEN_KEY = '@venmo-clone:auth-token-1.0.0'

export function setAuthToken (token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function deleteAuthToken () {
  localStorage.removeItem(TOKEN_KEY)
}

export function getAuthToken () {
  return localStorage.getItem(TOKEN_KEY)
}
