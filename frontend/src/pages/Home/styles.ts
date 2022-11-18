import styled from "styled-components";

export const HomeContainer = styled.section`
  display: flex;
  justify-content: center;
  padding-inline: 40px;
`

export const HomeGrid = styled.div`
  margin-top: 60px;
  max-width: 1024px;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  align-items: center;
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    }
`

export const HeroText = styled.div`
display: flex;
flex-direction: column;
gap: 30px;
  h1 {
    font-weight: 500;
    font-size: 74px;
    line-height: 100%;
  }

  p {
    font-size: 20px;
  }

  @media (max-width: 640px) {
    text-align: center;
    h1 {
      font-size: 42px;

    }
    }
`
export const HeroImage = styled.div`
  img {
    width: 100%;
  }
`