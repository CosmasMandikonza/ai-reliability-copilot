# AI Reliability Copilot

A production-grade, citation-first copilot for SRE/DevOps built for the **Elastic Challenge**:
- **Hybrid Search** (BM25 + vectors) on Elastic
- **Vertex AI** for embeddings + optional rerank; **Gemini** for RAG that answers *only* from citations
- Top-tier UI (Next.js + Tailwind + shadcn/ui + Framer Motion)
- Robust API (Fastify + OpenAPI), Prisma/Postgres
- Ingest jobs (docs → chunks → embeddings → Elastic), synthetic telemetry generator
- Security, tests, CI/CD, observability to Elastic

> 🚩 Category: Elastic Challenge
