import { useNavigate } from 'react-router-dom'
import { deleteAuthToken, getAuthToken } from '../../helpers/authToken'
import { dateFormatter, priceFormatter } from '../../helpers/formatter'
import { useTransactions } from '../../hooks/useTransactions'
import { useUser } from '../../hooks/useUser'
import {
  AccountSummary,
  TransactionsContainer,
  TransactionsFilter, TransactionsTable
} from './styles'

export function Transactions () {
  const user = useUser()
  const transactions = useTransactions()
  const navigate = useNavigate()

  const token = getAuthToken()
  if (!token && user.isError) {
    deleteAuthToken()
    navigate('/')
  }

  return (
    <TransactionsContainer>
      <AccountSummary>
        {user.data?.username}
        {user.isSuccess && priceFormatter.format(user.data.account.balance)}
      </AccountSummary>
      <TransactionsFilter></TransactionsFilter>
      <TransactionsTable>
        <tbody>
          {transactions.data?.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.username}</td>
              <td>{priceFormatter.format(transaction.value)}</td>
              <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
            </tr>
          ))}
        </tbody>
      </TransactionsTable>
    </TransactionsContainer>
  )
}
