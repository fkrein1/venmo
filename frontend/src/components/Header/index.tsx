import { Link, useNavigate } from 'react-router-dom'
import icon from '../../assets/icon.svg'
import logo from '../../assets/logo.svg'
import { deleteAuthToken } from '../../helpers/authToken'
import { useUser } from '../../hooks/useUser'
import {
  HeaderContainer,
  HeaderWrapper,
  Logo,
  LogoutBtn,
  MainNav,
  Navigation
} from './styles'

export function Header () {
  const navigate = useNavigate()
  const user = useUser()

  function handleLogoutBtn () {
    deleteAuthToken()
    user.remove()
    navigate('/')
  }

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>
          <Link to="/">
            <img src={logo} alt="" />
            <img src={icon} alt="" />
          </Link>
        </Logo>
        {user.isError && (
          <Navigation>
            <Link to="/login">Log In</Link>
            <Link to="/signup">
              <MainNav>
                <img src={icon} />
                <span>Get Venmo</span>
              </MainNav>
            </Link>
          </Navigation>
        )}

        {user.isSuccess && (
          <Navigation>
            <LogoutBtn onClick={handleLogoutBtn}>Log out</LogoutBtn>
            <Link to="/transactions">
              <MainNav>
                <img src={icon} />
                <span>Transactions</span>
              </MainNav>
            </Link>
          </Navigation>
        )}
      </HeaderWrapper>
    </HeaderContainer>
  )
}
