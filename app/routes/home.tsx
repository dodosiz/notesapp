import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Notes App" },
    { name: "description", content: "A simple notes application" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Notes App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Keep track of your thoughts and ideas
        </p>
        <Link
          to="/notes"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
