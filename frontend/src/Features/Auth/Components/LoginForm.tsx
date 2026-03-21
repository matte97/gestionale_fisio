import { useState } from "react";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
  error?: { email?: string[]; password?: string[] } | null;
  isLoading?: boolean;
};

export function LoginForm({ onSubmit, error, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 sm:p-10 border border-slate-100 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-200 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Bentornato</h2>
          <p className="text-slate-500 mt-2 text-sm">Inserisci le tue credenziali per accedere al gestionale.</p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(email, password);
          }}
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 pl-1">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-11 px-4 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                error?.email ? "border-red-300 focus:ring-red-500" : "border-slate-200"
              }`}
            />
            {error?.email && <p className="text-red-500 text-xs mt-1.5 pl-1 font-medium">{error.email[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 pl-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-11 px-4 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                error?.password ? "border-red-300 focus:ring-red-500" : "border-slate-200"
              }`}
            />
            {error?.password && <p className="text-red-500 text-xs mt-1.5 pl-1 font-medium">{error.password[0]}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-[15px]"
            >
              {isLoading ? "Accesso in corso..." : "Accedi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
