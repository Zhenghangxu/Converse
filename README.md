This is a Retrieval-Augmented Generation (RAG) chatbot with access to info to more than 20,000 FDA-approved drugs, bootstraped with [Upstash RAG SDK](https://nextjs.org/) and [`Next.js`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First configure the credentials, check out the template env file provided (To be Upload) as a basic guidedance. You can also use your own db and LLM providers. 

Just modify `database.ts`, `user-ts`, `rag-chat.ts` to define your own vendor, or use a local LLM / DB.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You would need to setup **Upstash** and **Toether AI** account to get started, but feel free to swap to other vendors

You can start editing the pages by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Tech Stack & APIs
- Upstash Vector store for vector db
- AWS Dynamodb for User DB
- Upstash Redis for caching chat history
- Toether AI's xxx model for chat functionality
- (WIP) Semantic Router running on AWS Lamda to guardrail discussion and manage the attention (e.g. when to switch topic and when to referenece db)

