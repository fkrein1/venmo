import { useQuery } from '@tanstack/react-query'
import { getAuthToken } from '../helpers/authToken'
import { getTransactions } from '../services/getTransactions'

export function useTransactions () {
  const token = getAuthToken() || 'invalidtoken'
  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions(token),
    retry: 0
  })
}
