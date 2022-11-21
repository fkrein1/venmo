import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { getAuthToken } from '../../../helpers/authToken'
import { useTransactions } from '../../../hooks/useTransactions'
import { useTransfer } from '../../../hooks/useTransfer'
import { useUser } from '../../../hooks/useUser'
import {
  CloseButton,
  Content,
  FormError,
  Overlay,
  SubmitBtn,
  TransferForm,
  Username,
  Value
} from './styles'

const TransferSchema = z.object({
  creditUsername: z.string().min(3),
  transactionValue: z.number().gt(0)
})

type TransferFormData = z.infer<typeof TransferSchema>

interface TransferModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function TransferModal ({ setOpen }: TransferModalProps) {
  const transfer = useTransfer()
  const user = useUser()
  const transactiosn = useTransactions()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TransferFormData>({
    resolver: zodResolver(TransferSchema)
  })

  async function handleSubmitTransfer (data: TransferFormData) {
    const { creditUsername, transactionValue } = data
    const jwt = getAuthToken() as string
    try {
      await transfer.mutateAsync({ creditUsername, transactionValue, jwt })
      user.remove()
      transactiosn.remove()
      setOpen(false)
      reset()
    } catch (err) {
      reset()
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <TransferForm onSubmit={handleSubmit(handleSubmitTransfer)}>
          <Dialog.Title>Transfer money</Dialog.Title>

          <Username>
            <input
              type="text"
              placeholder="Username to transfer"
              {...register('creditUsername')}
            />
          </Username>

          <FormError>
            {errors.creditUsername && 'Username must have at least 3 characters'}
          </FormError>

          <Value>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Value"
              {...register('transactionValue', { valueAsNumber: true })}
            />
          </Value>

          <FormError>{errors.transactionValue && 'Value must be a positive number'}</FormError>

          <SubmitBtn type="submit" disabled={isSubmitting}>
            Send
          </SubmitBtn>
          <FormError>{transfer.isError && 'Invalid username or insufficient balance'}</FormError>

        </TransferForm>
      </Content>
    </Dialog.Portal>
  )
}
