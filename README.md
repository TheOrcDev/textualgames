# Textual Games

Textual Games offers a nostalgic journey into the realm of classic MUD gaming, infused with an innovative twist of AI. Here, you have the power to craft your very own narrative, weaving tales that are uniquely yours.

## Getting Started

First, install all dependencies:

```bash
npm i
```

or

```bash
yarn install
```

or

```bash
pnpm i
```

After that create your `.env` file

Copy `.env.example` to `.env` and fill in the values

In `.env` you need to put your `app URL`

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

your `ChatGPT` configuration

```bash
GPT_API_KEY="YOUR_GPT_API_KEY"
GPT_MODEL="gpt-3.5-turbo"
GPT_TEMPERATURE="0.8"
GPT_MAX_TOKENS="1024"
```

your `Postgres DB` URL

```bash
DATABASE_URL="YOUR_DATABASE_URL"
```

your `Stripe` publishable and secret key for payments

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="YOUR_STRIPE_PUBLISHABLE_KEY"
STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY"
```
and your `Clerk` keys for authentication

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="YOUR_CLERK_PUBLISHABLE_KEY"
CLERK_SECRET_KEY="YOUR_CLERK_SECRET_KEY"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

After that everything is ready, just run the app, and play the game!

```bash
npm run dev
```

or

```bash
yarn dev
```

or

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.