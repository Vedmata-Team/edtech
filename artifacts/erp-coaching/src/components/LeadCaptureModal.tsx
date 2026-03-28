import { useState, useEffect } from "react";
import { X, GraduationCap, BookOpen, Building2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  { label: "Student", icon: "🎓" },
  { label: "Teacher", icon: "📚" },
  { label: "Director / Owner", icon: "🏫" },
  { label: "Just Exploring", icon: "👀" },
];

const TRUST_POINTS = [
  "Free demo call — koi charge nahi",
  "Aapke institute ke naam se customize hoga",
  "500+ institutes already use EduCore",
];

export default function LeadCaptureModal() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("educore_lead_captured")) {
      const t = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);

  function dismiss() {
    setShow(false);
    localStorage.setItem("educore_lead_captured", "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Valid 10-digit Indian mobile number chahiye");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const body = new URLSearchParams({
        "form-name": "educore-leads",
        "bot-field": "",
        name,
        institute,
        city,
        mobile,
        role: role || "Not selected",
      });

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      // localStorage backup
      const leads = JSON.parse(localStorage.getItem("educore_leads") || "[]");
      leads.push({ name, institute, city, mobile, role, time: new Date().toISOString() });
      localStorage.setItem("educore_leads", JSON.stringify(leads));
      localStorage.setItem("educore_lead_captured", "1");

      setSubmitted(true);
      setTimeout(() => setShow(false), 3500);
    } catch {
      setError("Kuch problem aayi. Please try again.");
    }
    setLoading(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tricolor top bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

            <button
              onClick={dismiss}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            <div className="p-6">

              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-5">
                    <div className="text-4xl mb-2">🏫</div>
                    <h2 className="text-lg font-black text-slate-900 leading-snug">
                      Kya aapka bhi coaching institute hai? 🙏
                    </h2>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                      Jo demo aap dekh rahe hain —{" "}
                      <span className="font-semibold text-slate-700">
                        exactly aisa hi ERP
                      </span>{" "}
                      aapke institute ke liye bhi ban sakta hai.{" "}
                      <span className="text-blue-600 font-semibold">
                        Apna number chhod jaiye
                      </span>{" "}
                      — hum call karenge. 🤝
                    </p>
                  </div>

                  <form
                    name="educore-leads"
                    onSubmit={handleSubmit}
                    className="space-y-2.5"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                  >
                    <input type="hidden" name="form-name" value="educore-leads" />
                    <input type="hidden" name="bot-field" />

                    <input
                      type="text"
                      name="name"
                      placeholder="Aapka naam *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />

                    <input
                      type="text"
                      name="institute"
                      placeholder="Institute / Coaching ka naam"
                      value={institute}
                      onChange={(e) => setInstitute(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />

                    <input
                      type="text"
                      name="city"
                      placeholder="Aapka sheher (City)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number *"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
                          setError("");
                        }}
                        required
                        className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>

                    {/* Role selector */}
                    <input type="hidden" name="role" value={role || "Not selected"} />
                    <div className="grid grid-cols-2 gap-1.5">
                      {ROLES.map((r) => (
                        <button
                          key={r.label}
                          type="button"
                          onClick={() => setRole(r.label)}
                          className={`text-xs py-2 px-2 rounded-xl border font-semibold transition-all flex items-center gap-1.5 justify-center ${
                            role === r.label
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          <span>{r.icon}</span> {r.label}
                        </button>
                      ))}
                    </div>

                    {error && <p className="text-red-500 text-xs">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1E40AF] text-white font-bold text-sm transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-md"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Saving...
                        </>
                      ) : (
                        "🚀 Haan, Mujhe Chahiye Yeh ERP!"
                      )}
                    </button>
                  </form>

                  {/* Trust points */}
                  <div className="mt-4 bg-slate-50 rounded-xl px-4 py-3 space-y-1">
                    {TRUST_POINTS.map((p) => (
                      <div key={p} className="flex items-center gap-2 text-xs text-slate-500">
                        <span>✅</span> {p}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="text-xl font-black text-slate-900">
                    Shukriya, {name} ji! 🙏
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    Hum jald hi aapko call karenge.
                    <br />
                    Tab tak demo explore karein! 📚
                  </p>
                  <div className="flex justify-center gap-1 mt-3 text-xl">
                    🇮🇳 ❤️ 🏫
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
