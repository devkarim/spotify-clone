# Spotify Clone

## Overview

A web music player where you can listen & add your favorite songs to your customized playlists. This web application is a clone of Spotify so the information generated is not genuine. This application is **not intended** for commercial use.

Visit the website from [here](https://spotify-clone.karimwael.com).

This project is inspired by this [video](https://www.youtube.com/watch?v=2aeMRB8LL4o) ❤️

To test payment, use stripe's [test cards](https://stripe.com/docs/testing#cards) or credit card `4242424242424242` for short.

## Features

- Authentication using either GitHub or email & password using [NextAuth.js](https://next-auth.js.org)
- Sidebar & navbar navigation
- Create, edit, and delete playlists
- Upload images to your playlists using [Cloudinary](https://cloudinary.com)
- Upload songs to your playlists using [Cloudinary](https://cloudinary.com)
- Edit songs information (title, artist, album, and image)
- Delete songs from your playlists
- Search for songs, artists, and albums
- View your recently played songs & playlists
- Play songs, pause, skip, and go back via a global web music player using [useAudioPlayer](https://github.com/E-Kuerschner/useAudioPlayer)
- Premium monthly subscription using [Stripe](https://stripe.com)
- Saving music player state using [Zustand](https://github.com/pmndrs/zustand)
- Server-side & client-side validation using [Zod](https://zod.dev) & [react-hook-form](https://react-hook-form.com)

## Technologies

- [React.js](https://react.dev)
- [Next.js 13](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Zod](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Cloudinary](https://cloudinary.com)
- [Stripe](https://stripe.com)
- [Prisma](https://www.prisma.io)
- [CockroachDB](https://www.cockroachlabs.com)
- [NextAuth.js](https://next-auth.js.org)
- [useAudioPlayer](https://github.com/E-Kuerschner/useAudioPlayer)
- [Zustand](https://github.com/pmndrs/zustand)
- [RippleUI](https://www.ripple-ui.com)
- [react-hook-form](https://react-hook-form.com)
- [react-toastify](https://fkhadra.github.io/react-toastify)
- [Headless UI](https://headlessui.com/react)

## Prerequisites

#### - Node v20.5.1

### Cloning this repo

Clone the repo and navigate to it:

- `git clone https://github.com/devkarim/spotify-clone.git`
- `cd spotify-clone`

### Install required packages

Use one of the following commands to install the packages:

- `npm i`
- `yarn`
- `pnpm i`

### Setup .env file

These environment variables are required for the app to work:

```
DATABASE_URL=
SHADOW_DATABASE_URL=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PREMIUM_PLAN_ID=
```

You can check [.env.example](https://github.com/devkarim/spotify-clone/blob/main/.env.example) for more information.

### Start development server

Use one of the following commands to start the development server:

- `npm run dev`
- `yarn dev`
- `pnpm dev`

## Author

This project is made by [@devkarim](https://github.com/devkarim).

## License

This project is licensed under the [MIT](https://github.com/devkarim/spotify-clone/blob/main/LICENSE.md) License - feel free to explore, modify, and share.
