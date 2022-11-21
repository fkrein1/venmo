/* eslint-disable @typescript-eslint/no-floating-promises */
import { useMutation } from '@tanstack/react-query'

import { api } from '../lib/axios'

interface ITransfer {
  creditUsername: string
  transactionValue: number
  jwt: string
}

interface IMessage {
  message: string
}

export async function postTransaction ({
  creditUsername,
  transactionValue,
  jwt
}: ITransfer): Promise<IMessage> {
  const { data } = await api.post(
    '/transaction',
    { creditUsername, transactionValue },
    {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  )
  return data
}

export function useTransfer () {
  return useMutation<IMessage, unknown, ITransfer>({
    mutationFn: (newTransfer) => postTransaction(newTransfer)
  })
}
