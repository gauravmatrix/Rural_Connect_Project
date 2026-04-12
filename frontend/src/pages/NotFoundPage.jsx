import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-content-center bg-slate-100 p-4 text-center">
      <h1 className="text-5xl font-bold text-[#0B3C5D]">404</h1>
      <p className="mt-2 text-slate-600">Page not found</p>
      <Link to="/" className="mt-5 rounded-full bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-white">
        Go Home
      </Link>
    </div>
  );
}
