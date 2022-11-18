import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${props => props.theme.white};
  padding-inline: 40px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 6%);
  @media (max-width: 640px) {
    padding-inline: 20px;

    }
`

export const HeaderWrapper = styled.div`
  max-width: 1024px;
  margin: auto;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`
export const Logo = styled.div`
  display: flex;
  img {
    width: 160px;
    height: 31px;

    @media (max-width: 640px) {
      width: 90px;
    }

    @media (max-width: 320px) {
      display: none;
    }
  }
`

export const Navigation = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;

  a {
    text-decoration: none;
    color: ${props => props.theme.black};
    font-weight: 500;

  }
`

export const MainNav = styled.div`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  border: 1.5px solid ${props => props.theme.black};
  border-radius: 24px;
  gap: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme['base-background']};
  }

  img {
    width: 14px;
    height: 15px;
  }

`
