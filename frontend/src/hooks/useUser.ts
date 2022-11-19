import { useQuery } from '@tanstack/react-query'
import { getAuthToken } from '../helpers/authToken'
import { getUser } from '../services/getUser'

export function useUser () {
  const token = getAuthToken() || 'invalidtoken'
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(token)
  })
}
