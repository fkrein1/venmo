import { useQuery } from '@tanstack/react-query'
import { getToken } from '../helpers/token'
import { getUser } from '../services/getUser'

export function useUser () {
  const token = getToken() ?? 'invalidtoken'
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(token),
    retry: 1
  })
}
