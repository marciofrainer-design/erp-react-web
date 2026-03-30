import { ButtonBase } from "@/components/button/ButtonBase";
import { InputStringBase } from "@/components/inputs/string/InputStringBase";
import { Mail, Building2, EyeOff, Eye } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type ToolLoginProps = {
  onLoginClick: (email: string, password: string) => void;
};
const ToolLogin = ({ onLoginClick }: ToolLoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="order-2 lg:order-1 flex flex-col justify-center"
      >
        <div className="max-w-md w-full mx-auto lg:mx-0 p-8 lg:p-12 rounded-3xl bg-surface-container-lowest glass-effect shadow-[0_12px_40px_rgba(27,27,36,0.06)]">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-3 font-headline">
              Bem-vindo
            </h1>
            <p className="text-on-surface-variant font-body">
              Acesse sua conta na plataforma Desbravador Web System para gerenciar suas soluções em hotelaria de forma eficiente e inovadora.
            </p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <div className="relative group">
                <InputStringBase
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  id="email"
                  name="email"
                  placeholder="nome@empresa.com"
                  type="email"
                  Icon={Mail}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="relative group">
                <InputStringBase
                  label="Senha"
                  id="password"
                  value={password}
                  onChange={setPassword}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  Icon={showPassword ? Eye : EyeOff}
                />
                <a
                  className="text-xs font-bold text-primary hover:underline"
                  href="#"
                >
                  Esqueceu a senha?
                </a>
                <button
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-1">
              <input
                className="w-4 h-4 rounded-lg border-outline-variant text-primary focus:ring-primary/30"
                id="remember"
                type="checkbox"
              />
              <label
                className="text-sm text-on-surface-variant font-body cursor-pointer select-none"
                htmlFor="remember"
              >
                Manter conectado
              </label>
            </div>
            <ButtonBase label="Login" onClick={() => onLoginClick(email, password)}/>
            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <span className="relative px-4 bg-surface-container-lowest text-xs font-bold text-outline uppercase tracking-widest font-label">
                ou continue com
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-high hover:bg-surface-container-highest rounded-xl transition-colors active:scale-95"
                type="button"
              >
                <img
                  alt="Google"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiOFnJYibwirTU28JxeGuZgy55Utn3xRooMVnw1grWLHSXs83_glfWulu7BKpkX3we5OLqqWSWj_5imFTn3fVtx4WhRZeVqZTMNgohcnBXmEO7ediJPKeSBjwoOxKEpy9kDhjlwvfBxeFzY1rRXnIdWwjO_hRbGPxsEUHKZsWiBNb86uJHA-2hlZbY9G3l7Fcr_1JGzserbWq76_zmpivrM5XndjNNaydzBlQjcD0nVarLX8sjh4gE0vr5-0UAvRimHABT_8qC8tQ"
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm font-semibold text-on-surface font-label">
                  Google
                </span>
              </button>
              <button
                className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-high hover:bg-surface-container-highest rounded-xl transition-colors active:scale-95"
                type="button"
              >
                <Building2 size={18} className="text-on-surface" />
                <span className="text-sm font-semibold text-on-surface font-label">
                  SSO
                </span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="order-1 lg:order-2 flex flex-col items-center lg:items-end text-center lg:text-right"
      >
        <div className="relative group">
          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-primary rounded-[2rem] flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 mb-8 mx-auto lg:ml-auto lg:mr-0">
            <span className="text-on-primary text-5xl lg:text-7xl font-black font-headline tracking-tighter">
              A
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tighter mb-6 leading-tight font-headline">
            Desbravador
            <br />
            <span className="text-primary-container">Web System</span>
          </h2>
          <p className="text-xl text-on-surface-variant font-body max-w-md lg:ml-auto">
            A plataforma definitiva das melhores soluções para hotelaria.
          </p>
          {/* Decorative Graphic */}
          <div className="mt-12 hidden lg:block opacity-80">
            <div className="grid grid-cols-3 gap-3 w-64 ml-auto">
              <div className="h-16 rounded-2xl bg-primary/20 backdrop-blur-sm"></div>
              <div className="h-16 rounded-2xl bg-primary/40 backdrop-blur-sm"></div>
              <div className="h-16 rounded-2xl bg-primary-container"></div>
              <div className="h-16 col-span-2 rounded-2xl bg-surface-container-highest"></div>
              <div className="h-16 rounded-2xl bg-outline-variant/30"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ToolLogin;
