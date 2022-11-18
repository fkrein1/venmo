import {
  useQuery
} from '@tanstack/react-query'
import { getUser } from '../services/getUser'

export function useUser () {
  return useQuery(['user'], () => getUser('teste'))
}
