import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-32 text-center">
      <h2 className="text-2xl font-sans font-bold mb-4">404: Page Not Found</h2>
      <p className="text-gray-700 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-gray-800 underline hover:text-black">
        &larr; Return to Home
      </Link>
    </div>
  );
}
