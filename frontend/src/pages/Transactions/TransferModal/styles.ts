import * as Dialog from '@radix-ui/react-dialog'
import styled, { css } from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 3;
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1rem;
  right: 1rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['base-text']};
`

export const Content = styled(Dialog.Content)`
  z-index: 4;
  border-radius: 10px;
  padding: 24px 16px;
  background: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme['base-border']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 40px;

`
export const TransferForm = styled.form`
  padding: 30px 20px;
  max-width: 420px;
  width: 90vw;
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
export const Value = styled.div`
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
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme['medium-blue']};
  }

  &:disabled {
    opacity: 0.9;
    cursor: not-allowed
  }
`
