import styled from 'styled-components'

export const TransactionsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-inline: 40px;
`

export const TransactionsWrapper = styled.div`
  margin-block: 60px;
  max-width: 640px;
  flex: 1;
`

export const AccountSummary = styled.div`
  font-weight: 500;
  font-size: 24px;
`

export const AccountBalance = styled.div`
  margin-top: 20px;
  p {
    color: ${(props) => props.theme.black};
    font-weight: 500;
    font-size: 32px;
  }
`

export const TransactionsFilter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 10px;
  }
`

export const TypeFilter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  select {
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme['base-border']};
    padding: 2px 4px;
  }
`
export const DateFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme['base-border']};
    padding: 2px 4px;
  }
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-top: 24px;

  td {
    padding: 16px 20px;
    background: ${(props) => props.theme.white};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighlightProps {
  variant: 'credit' | 'debit'
}
export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'credit'
      ? props.theme['light-blue']
      : props.theme.warning};
`
