import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const SignupForm = styled.form`
  border: 1px solid ${(props) => props.theme['base-border']};
  background: ${(props) => props.theme.white};
  border-radius: 10px;
  padding: 40px;
  max-width: 420px;
  width: 90vw;
  margin-block: 80px;
`

export const Icon = styled.div`
  display: flex;
  justify-content: center;
`

const InputCSS = css`
  width: 100%;
  padding: 12px 10px;
  border: 1px solid ${(props) => props.theme['base-border']};
  border-radius: 6px;
  font-size: 16px;
`
export const Username = styled.div`
  margin-top: 32px;
  input {
    ${InputCSS}
  }
`
export const Password = styled.div`
  margin-top: 18px;
  input {
    ${InputCSS}
  }
`

export const FormError = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.warning};
  margin-top: 6px;
`

const Submit = css`
  margin-top: 18px;
  display: block;
  width: 100%;
  border-radius: 24px;
  border: none;
  font-size: 18px;
  padding: 12px 10px;
  font-weight: 500;
`
export const SubmitBtn = styled.button`
  ${Submit}
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme['light-blue']};
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme['medium-blue']};
  }

  &:disabled {
    opacity: 0.9;
  }
`
export const LoginLink = styled(Link)`
  ${Submit}
  color: ${(props) => props.theme['light-blue']};
  border: 1px solid ${(props) => props.theme['light-blue']};
  text-decoration: none;
  text-align: center;
  transition: border 0.2s ease;
  transition: color 0.2s ease;

  &:hover {
    border: 1px solid ${(props) => props.theme['medium-blue']};
    color: ${(props) => props.theme['medium-blue']};
  }
`
