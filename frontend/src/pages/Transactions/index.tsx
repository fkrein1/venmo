import * as Dialog from '@radix-ui/react-dialog'
import { isSameDay } from 'date-fns'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteAuthToken } from '../../helpers/authToken'
import { dateFormatter, priceFormatter } from '../../helpers/formatter'
import { ITransaction, useTransactions } from '../../hooks/useTransactions'
import { useUser } from '../../hooks/useUser'
import { TransferModal } from './TransferModal'

import {
  AccountBalance,
  AccountBalanceWrapper,
  AccountSummary,
  DateFilter,
  PriceHighlight,
  SendMoneyBtn,
  TransactionsContainer,
  TransactionsFilter,
  TransactionsTable,
  TransactionsWrapper,
  TypeFilter
} from './styles'

export function Transactions () {
  const [open, setOpen] = useState(false)
  const [transactionType, setTransactionType] = useState('all')
  const [transactionDate, setTransactionDate] = useState('')
  const navigate = useNavigate()
  const user = useUser()
  const transactions = useTransactions()

  if (user.isError) {
    deleteAuthToken()
    navigate('/')
  }

  function filterTransactionsByType (transactions: ITransaction[]) {
    if (transactionType === 'all') return transactions
    return transactions.filter(
      (transaction) => transaction.type === transactionType
    )
  }

  function filterTransactionsByDate (transactions: ITransaction[]) {
    if (transactionDate === '') return transactions
    return transactions.filter((transaction) =>
      isSameDay(
        new Date(transaction.createdAt),
        new Date(`${transactionDate}T12:00`)
      )
    )
  }

  function filterTransactions (transactions: ITransaction[]) {
    const transactionsFilteredByType = filterTransactionsByType(transactions)
    const transactionsFilteredByDate = filterTransactionsByDate(
      transactionsFilteredByType
    )
    return transactionsFilteredByDate
  }

  return (
    <TransactionsContainer>
      <TransactionsWrapper>
        <AccountSummary>
          <p>Welcome back,</p>
          <p>{user.data?.username}</p>
        </AccountSummary>
        <AccountBalanceWrapper>
          <AccountBalance>
            <span>Balance</span>
            <p>
              {user.isSuccess &&
                priceFormatter.format(user.data?.account.balance)}
            </p>
          </AccountBalance>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild={true}>
              <SendMoneyBtn type="button">Send Money</SendMoneyBtn>
            </Dialog.Trigger>
            <TransferModal setOpen={setOpen}/>
          </Dialog.Root>
        </AccountBalanceWrapper>
        <TransactionsFilter>
          <TypeFilter>
            <label htmlFor="transactionType">Transaction type</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              name="transactionType"
            >
              <option value="all">all</option>
              <option value="credit">credit</option>
              <option value="debit">debit</option>
            </select>
          </TypeFilter>
          <DateFilter>
            <label htmlFor="date">Transaction date</label>
            <input
              type="date"
              name="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </DateFilter>
        </TransactionsFilter>
        <TransactionsTable>
          <tbody>
            {transactions.isSuccess &&
              filterTransactions(transactions.data).map((transaction) => (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.username}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {priceFormatter.format(transaction.value)}
                    </PriceHighlight>
                  </td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              ))}
          </tbody>
        </TransactionsTable>
      </TransactionsWrapper>
    </TransactionsContainer>
  )
}
