import { Link, useNavigate } from 'react-router-dom'
import icon from '../../assets/icon.svg'
import logo from '../../assets/logo.svg'
import { deleteAuthToken } from '../../helpers/authToken'
import { useAuth } from '../../hooks/useAuth'
import {
  HeaderContainer,
  HeaderWrapper,
  Logo,
  LogoutBtn,
  MainNav,
  Navigation
} from './styles'

export function Header () {
  const { loggedIn, setLoggedIn } = useAuth()
  const navigate = useNavigate()

  function handleLogoutBtn () {
    setLoggedIn(false)
    deleteAuthToken()
    navigate('/')
  }

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </Logo>
        {!loggedIn && (
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

        {loggedIn && (
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
