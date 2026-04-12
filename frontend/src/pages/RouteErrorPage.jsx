import { Link, useRouteError } from "react-router-dom";

export default function RouteErrorPage() {
  const error = useRouteError();
  const message = error?.statusText || error?.message || "Unexpected route error";

  return (
    <div className="grid min-h-screen place-content-center bg-slate-100 px-4 text-center">
      <div className="max-w-lg rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">Page Error</h1>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <Link to="/" className="mt-5 inline-flex rounded-full bg-[#F59E0B] px-4 py-2 text-sm font-semibold text-white">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
