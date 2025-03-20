import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center">
      {/* Animated 404 Text */}
      <h1 className="text-9xl font-bold gradient-title mb-4 animate-bounce">
        404
      </h1>

      {/* Page Not Found Heading */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>

      {/* Return Home Button */}
      <Link href="/">
        <Button className="bg-blue-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
          Return Home
        </Button>
      </Link>
    </div>
  );
}