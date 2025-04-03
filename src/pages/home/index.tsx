import { Heading, Text } from "@ignite-ui/react";
import { NextSeo } from "next-seo";
import Image from 'next/image';
import previewImage from '../../assets/app-preview.png';
import { ClaimUsernameForm } from './components/ClaimUsernameForm';
import { Container, Hero, Preview } from './styles';

export default function Home() {
  return (
    <>
      <NextSeo
        title="Simplify your schedule | Schedulynx"
        description="Connect your calendar and let people book appointments during your free time."
      />
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
    </>
  );
}
