import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme.white};
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

  img:nth-child(1) {
    width: 160px;
    height: 31px;

    @media (max-width: 640px) {
      width: 90px;
      height: 17px
    }

    @media (max-width: 380px) {
      display: none;
    }
  }

  img:nth-child(2) {
    width: 30px;
    height: 30px;
    display: none;

    @media (max-width: 380px) {
      display: block;
    }
  }
`

export const Navigation = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.black};
    font-weight: 500;
  }
`

export const MainNav = styled.div`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  border: 1.5px solid ${(props) => props.theme.black};
  border-radius: 24px;
  gap: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${(props) => props.theme['base-background']};
  }

  img {
    width: 14px;
    height: 15px;
  }
`
export const LogoutBtn = styled.button`
  text-decoration: none;
  color: ${(props) => props.theme.black};
  font-weight: 500;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
`
