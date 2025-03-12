import { Heading, Text } from "@ignite-ui/react";
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'
import previewImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Easy scheduling</Heading>
        <Text size="lg">
          Connect your calendar and let people book appointments during your free time.
        </Text>
        <ClaimUsernameForm />
      </Hero>
      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendar symbolizing the application"
        />
      </Preview>
    </Container>
  );
}
