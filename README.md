## Getting Started

First, install all dependencies:

```bash
pnpm install
```

After that create your `.env` file

Copy `.env.example` to `.env` and fill in the values

In `.env` you need to put your `ChatGPT` configuration

```bash
GPT_API_KEY={YOUR_GPT_API_KEY}
GPT_MODEL="gpt-3.5-turbo"
GPT_TEMPERATURE="0.8"
GPT_MAX_TOKENS="1024"
OPENAI_ORGANIZATION={YOUR_OPENAI_ORGANIZATION}
```

After that everything is ready, just run the app:

```bash
pnpm dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.