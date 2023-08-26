import Link from 'next/link';

import Container from '@/components/ui/container';
import { APP_NAME, AUTHOR_EMAIL, AUTHOR_NAME } from '@/config/constants';

interface AboutPageProps {}

const AboutPage: React.FC<AboutPageProps> = ({}) => {
  return (
    <Container className="space-y-6 max-w-5xl">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold">About Us</h1>
        <p>
          Welcome to {APP_NAME}, where the love for music meets cutting-edge
          technology. Our mission is to provide you with an unparalleled audio
          experience that resonates with your soul.
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg lg:text-xl font-bold">Who We Are</h2>
        <p>
          We are a passionate team of music enthusiasts and tech innovators
          dedicated to redefining how you experience music. Our journey began
          with a simple idea: to create a space where melodies, rhythms, and
          lyrics come to life in the most extraordinary way possible.
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg lg:text-xl font-bold">What We Believe</h2>
        <p>
          At {APP_NAME}, we believe that music has the power to inspire, uplift,
          and connect people from all walks of life. We&apos;re not just
          building a music player; we&apos;re crafting a sanctuary for your
          musical journey. Our platform is designed to cater to the diverse
          tastes and preferences of our users, ensuring that every note you hear
          resonates with your heart.
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg lg:text-xl font-bold">Our Vision</h2>
        <p>
          Our vision is to create a global community of music lovers who
          appreciate the beauty of sound in its purest form. We aspire to be the
          bridge that connects you to artists, genres, and cultures from around
          the world. Through continuous innovation, we aim to set new standards
          for audio quality, user experience, and music discovery.
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg lg:text-xl font-bold">
          Join Us on This Journey
        </h2>
        <p>
          Thank you for choosing {APP_NAME} as your musical companion. Join us
          on this exciting journey as we harmonize technology and creativity to
          bring you the ultimate sonic adventure. Whether you&apos;re a casual
          listener or a devoted audiophile, there&apos;s a place for you here.
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg lg:text-xl font-bold text-warning underline">
          NOTE
        </h2>
        <p>
          This web application is a clone of Spotify so the information
          generated is not genuine. This application is{' '}
          <span className="font-bold">not intended</span> for commercial use.
          For any inquiries, please contact me at:{' '}
          <Link
            href="mailto:devkarim@hotmail.com"
            className="underline font-semibold"
          >
            {AUTHOR_EMAIL}
          </Link>
        </p>
        <p>
          Made with <span className="text-red-500">❤</span> by{' '}
          <Link
            href="https://github.com/devkarim"
            className="font-semibold underline"
          >
            {AUTHOR_NAME}
          </Link>
          . Source code is available at:{' '}
          <Link
            href="https://github.com/devkarim/spotify-clone"
            className="font-semibold underline"
          >
            this repo
          </Link>
        </p>
      </div>
      <p className="text-sm opacity-60">
        <Link href="/">{APP_NAME}</Link> &copy; {new Date().getFullYear()} All
        rights reserved
      </p>
    </Container>
  );
};

export default AboutPage;
