import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import HeroCarousel from "../components/home/HeroCarousel";
import QuickActions from "../components/home/QuickActions";
import StatsSection from "../components/home/StatsSection";
import FloatingChatbot from "../components/chatbot/FloatingChatbot";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#dbeafe,_#f8fafc_35%,_#f8fafc)]">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-8 pt-6 sm:px-6">
        <HeroCarousel />

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Quick Actions</h2>
            <Link to="/register" className="text-sm font-semibold text-[#0B3C5D]">Create Account</Link>
          </div>
          <QuickActions />
        </section>

        <section className="mt-16 rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Public Impact</h2>
          <p className="mt-2 text-sm text-slate-500">Transparent monitoring and measurable rural service outcomes.</p>
          <div className="mt-6">
            <StatsSection />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingChatbot />
    </div>
  );
}
