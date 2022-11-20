import { useQuery } from '@tanstack/react-query'
import { getAuthToken } from '../helpers/authToken'

import { api } from '../lib/axios'

interface ITransaction {
  id: string
  type: 'debit' | 'credit'
  value: number
  username: string
  createdAt: string
}

async function getTransactions (jwt: string): Promise<ITransaction[]> {
  const { data } = await api.get('/transaction', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  return data
}

export function useTransactions () {
  const token = getAuthToken() || 'invalidtoken'
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions(token),
    retry: 0
  })
}
