import { api } from '../lib/axios'

interface ITransaction {
  id: string
  type: 'debit' | 'credit'
  value: number
  username: string
  createdAt: string
}

export async function getTransactions (jwt: string): Promise<ITransaction[]> {
  const { data } = await api.get('/transaction', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  return data
}
