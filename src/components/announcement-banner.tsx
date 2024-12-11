export default function AnnouncementBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-400">
      <div className="mx-auto max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid gap-2 md:grid-cols-2 md:items-center md:justify-between">
          <div className="text-center md:order-2 md:flex md:items-center md:justify-end md:text-start">
            <p className="me-5 inline-block text-sm font-semibold text-white">
              Ready to get started?
            </p>
            <a
              className="inline-flex items-center gap-x-2 rounded-lg border-2 border-white px-3 py-2 text-sm font-medium text-white hover:border-white/70 hover:text-white/70 focus:border-white/70 focus:outline-none focus:text-white/70 disabled:pointer-events-none disabled:opacity-50"
              href="#"
            >
              Sign up
            </a>
          </div>

          <div className="flex items-center">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus:bg-white/10 focus:outline-none"
              href="#"
            >
              <svg
                className="size-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch demo
            </a>
            <span className="mx-2 inline-block h-5 w-px border-e border-white/30"></span>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus:bg-white/10 focus:outline-none"
              href="#"
            >
              Explore what&apos;s new
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 