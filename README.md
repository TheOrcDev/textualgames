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

In `.env` you need to put your `ChatGPT` configuration

```bash
GPT_API_KEY={YOUR_GPT_API_KEY}
GPT_MODEL="gpt-3.5-turbo"
GPT_TEMPERATURE="0.8"
GPT_MAX_TOKENS="1024"
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