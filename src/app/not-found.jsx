import NotFound from '../components/NotFound'

export const metadata = {
  title: '404 — Page Not Found | Om Prakash Behera',
  description:
    "The requested page could not be found on Om Prakash Behera's portfolio. Explore featured AI, ML, and Full-Stack development projects.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFoundPage() {
  return <NotFound />
}
