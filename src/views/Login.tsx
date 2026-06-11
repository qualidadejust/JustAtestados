import { FileText, Building2 } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-petroleum-700">
          <div className="w-14 h-14 rounded-xl bg-petroleum-900 flex items-center justify-center shadow-lg dark:shadow-none">
            <FileText size={32} className="text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          JustAtestados
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Gestão de Saúde Ocupacional e Absenteísmo
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-xl sm:px-10 border border-slate-100 dark:border-slate-800">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                E-mail corporativo
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue="analista.rh@construtora.com.br"
                  className="block w-full appearance-none rounded-md border border-slate-300 dark:border-slate-600 px-3 py-2 text-slate-900 dark:text-slate-50 placeholder-slate-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 focus:outline-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  defaultValue="••••••••"
                  className="block w-full appearance-none rounded-md border border-slate-300 dark:border-slate-600 px-3 py-2 text-slate-900 dark:text-slate-50 placeholder-slate-400 focus:border-petroleum-500 dark:focus:border-petroleum-400 focus:outline-none focus:ring-petroleum-500 dark:focus:ring-petroleum-400 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-petroleum-600 focus:ring-petroleum-500 dark:focus:ring-petroleum-400"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900 dark:text-slate-50">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-petroleum-600 hover:text-petroleum-500">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-petroleum-700 py-2.5 px-4 text-sm font-medium text-white shadow-sm dark:shadow-none hover:bg-petroleum-800 focus:outline-none focus:ring-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:ring-offset-2 transition-colors"
              >
                Entrar no Sistema
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400">Ou acesse com</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onLogin}
                className="flex w-full items-center justify-center rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-2 px-4 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-none hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-petroleum-500 dark:focus:ring-petroleum-400 focus:ring-offset-2"
              >
                <Building2 className="mr-2 h-5 w-5 text-slate-400" />
                SSO Corporativo (Microsoft 365)
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} Construtora. Sistema de Uso Restrito Interno.
      </div>
    </div>
  );
}
