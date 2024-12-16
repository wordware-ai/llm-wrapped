# LLMwrapped 🔥

![Social Roast AI](https://llm-wrapped.vercel.app/og.png)

Social Roast AI is a web application that creates AI-powered, personalized "roasts" based on your social media presence. Think Spotify Wrapped, but for your entire digital personality - and with a humorous twist! Choose between LinkedIn (professional roast), Spotify (music taste roast), or Tinder (dating profile roast) for a unique AI-generated analysis of your online presence. 🎯

## Explore the prompts used in this project that were created with Wordware

- [Spotify](https://app.wordware.ai/org/wordware/proj_10d71a12-e41e-46ff-91f6-2962d672a801/files?promptId=dc809790-ad1d-432b-ac28-ef317f5cac2b)
- [LinkedIn](https://app.wordware.ai/org/wordware/proj_10d71a12-e41e-46ff-91f6-2962d672a801/files?promptId=34207f4e-eff2-4a4d-b03f-c256d8425341)
- [Twitter](https://app.wordware.ai/org/wordware/proj_10d71a12-e41e-46ff-91f6-2962d672a801/files?promptId=62e272c7-31af-4e9d-95e8-635ce7ec30b7)

## Features 🌟

- **Multi-Platform Analysis**: Connect your LinkedIn, Spotify, or Tinder account for personalized insights
- **AI-Powered Roasts**: Get witty, AI-generated commentary about your digital presence
- **Shareable Results**: Easy-to-share cards with your personalized roasts
- **Privacy-First**: Secure data handling with temporary analysis only

## Tech Stack 💻

- Next.js for the frontend and API routes
- Supabase for database and authentication
- Various AI models through Wordware API
- PostHog for analytics
- BrightData for data extraction

## Getting Started 🚀

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- Required API keys (see Environment Variables section)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/wordware-ai/llm-wrapped.git
cd llm-wrapped
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

   - Create a `.env.local` file in the root directory
   - Copy the content from `.env.example`
   - Fill in your values (see Environment Variables section)

4. Start the development server:

```bash
pnpm run dev
```

## Environment Variables 🔐

Create a `.env.local` file in the root directory with the following variables:

```plaintext
# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Database Configuration
DATABASE_URL="postgresql://user:password@host:port/database"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"

# Third-Party API Keys
WORDWARE_API_KEY="your_wordware_api_key"
BRIGHTDATA_API_KEY="your_brightdata_api_key"

# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY="your_posthog_key"
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
POSTHOG_PROJECT_ID="your_posthog_project_id"
POSTHOG_PERSONAL_API_KEY="your_posthog_personal_api_key"

# Monitoring and Configuration
BETTER_STACK_SOURCE_TOKEN="your_better_stack_token"
```

### Key Components

- Authentication flow with Supabase
- Data extraction from social media platforms
- AI processing using Wordware API
- Result generation and sharing functionality

---

Made with ❤️ by [Wordware](https://wordware.ai)
