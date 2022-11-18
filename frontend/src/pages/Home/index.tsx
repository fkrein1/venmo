import heroImage from '../../assets/hero.png'
import { HeroImage, HeroText, HomeContainer, HomeGrid } from './styles'

export function Home () {
  return (
    <HomeContainer>
      <HomeGrid>
      <HeroText>
        <h1>Fast, safe, social payments</h1>
        <p>
          Pay. Get paid. Shop. Share. Join tens of millions of people on Venmo.
        </p>
      </HeroText>
      <HeroImage>
        <img src={heroImage} />
      </HeroImage>
      </HomeGrid>
    </HomeContainer>
  )
}
