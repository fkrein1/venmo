import { Link } from 'react-router-dom'
import icon from '../../assets/icon.svg'
import logo from '../../assets/logo.svg'
import {
  HeaderContainer,
  HeaderWrapper,
  Logo,
  MainNav,
  Navigation
} from './styles'

export function Header () {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </Logo>
        <Navigation>
          <Link to="/">Log In</Link>
          <Link to="/">
            <MainNav>
              <img src={icon} />
              <span>Get Venmo</span>
            </MainNav>
          </Link>
        </Navigation>
      </HeaderWrapper>
    </HeaderContainer>
  )
}
