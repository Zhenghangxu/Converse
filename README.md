This is a Retrieval-Augmented Generation (RAG) chatbot with access to info of more than 20,000 FDA-approved OTC drugs, bootstraped with [Upstash RAG SDK](https://upstash.com/docs/vector/sdks/rag-chat/gettingstarted) and [`Next.js`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<img width="1414" alt="image" src="https://github.com/user-attachments/assets/981b0165-365b-4bac-9799-0c654267a08d">

## Disclaimer
Please note this bot is not for medical advice. Only intended to used in research purpose

## Getting Started
First configure the credentials, check out the template env file provided (To be Upload) as a basic guidedance. You can also use your own db and LLM providers. 

Just modify `database.ts`, `user-ts`, `rag-chat.ts` to define your own vendor, or use a local LLM / DB.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You would need to setup **Upstash** and **Toether AI** account to get started, but feel free to swap to other vendors

You can start editing the pages by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## What If I just want the data?
You can go to [Open FDA](https://open.fda.gov/data/downloads/) and download the JSON files.


## Tech Stack & APIs
- Upstash Vector store for vector db
- AWS Dynamodb for User DB
- Upstash Redis for caching chat history (To be migrated to AWS)
- Lucia Auth for session management (WIP)
- Next UI as component library
- Vercel AI SDK for chat streaming and error handling
- markdown-it for markdown formatting (to be polished)
- `Meta-Llama-3-8B` for chat functionality, using together ai (To be migrated to AWS Bedrock)
- (WIP) Semantic Router running on AWS Lamda to guardrail discussion and manage the attention (e.g. when to switch topic and when to referenece db)

# Screenshot of UI

![image](https://github.com/user-attachments/assets/32685c04-8452-480f-ab1b-61a981193bf5)


