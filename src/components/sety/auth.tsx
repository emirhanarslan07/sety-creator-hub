import { createContext, useContext, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Store,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SetyLogo } from "./brand";
const AuthContext = createContext<{
  openModal: (mode: "login" | "signup") => void;
  demo: boolean;
  setDemo: (v: boolean) => void;
}>({ openModal: () => {}, demo: false, setDemo: () => {} });
export const useAuthModal = () => useContext(AuthContext);
export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [open, setOpen] = useState(false);
  const [demo, setDemo] = useState(false);
  const [show, setShow] = useState(false);
  const [notice, setNotice] = useState("");
  return (
    <AuthContext.Provider
      value={{
        openModal: (m) => {
          setMode(m);
          setNotice("");
          setOpen(true);
        },
        demo,
        setDemo,
      }}
    >
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="auth-modal">
          <SetyLogo compact />
          <div>
            <span className="eyebrow">BİR SONRAKİ ADIMIN, SETY</span>
            <DialogTitle className="auth-title">
              {mode === "signup" ? "Ürettiklerine bir mağaza aç." : "Tekrar hoş geldin."}
            </DialogTitle>
            <DialogDescription>
              {mode === "signup"
                ? "Fikirlerini, bilgini ve emeğini gelire dönüştür."
                : "Mağazana ve seni bekleyen fırsatlara geri dön."}
            </DialogDescription>
          </div>
          <Button
            variant="outline"
            className="google-button"
            onClick={() =>
              setNotice("Bu bir tasarım önizlemesidir. Google ile giriş henüz bağlı değil.")
            }
          >
            <span className="google-g">G</span> Google ile devam et
          </Button>
          <div className="form-divider">
            <span>veya e-posta ile</span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNotice(
                "Bu bir tasarım önizlemesidir. Hesap oluşturma ve giriş henüz bağlı değil.",
              );
            }}
          >
            {mode === "signup" && (
              <label>
                Adın
                <input required placeholder="Adın ve soyadın" autoComplete="name" />
              </label>
            )}
            <label>
              E-posta adresin
              <input required type="email" placeholder="sen@ornek.com" autoComplete="email" />
            </label>
            <label>
              Şifren
              <div className="password-input">
                <input
                  required
                  type={show ? "text" : "password"}
                  minLength={8}
                  placeholder="En az 8 karakter"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </label>
            {mode === "login" && (
              <Button
                type="button"
                variant="link"
                className="forgot"
                onClick={() => setNotice("Şifre sıfırlama henüz bağlı değil.")}
              >
                Şifremi unuttum
              </Button>
            )}
            <Button type="submit" className="auth-submit">
              {mode === "signup" ? "Ücretsiz mağazamı aç" : "Mağazama giriş yap"}
              <ArrowUpRight />
            </Button>
          </form>
          {notice && (
            <p className="form-notice" role="status">
              {notice}
            </p>
          )}
          <div className="auth-safe">
            <LockKeyhole size={13} /> Kredi kartı gerekmez <span>·</span>
            <ShieldCheck size={13} /> Bilgilerin güvende
          </div>
          <p className="auth-switch">
            {mode === "signup" ? "Zaten bir hesabın var mı?" : "Henüz hesabın yok mu?"}{" "}
            <Button
              variant="link"
              onClick={() => {
                setMode(mode === "signup" ? "login" : "signup");
                setNotice("");
              }}
            >
              {mode === "signup" ? "Giriş yap" : "Ücretsiz kayıt ol"}
            </Button>
          </p>
          <Button
            variant="ghost"
            onClick={() => {
              setDemo(true);
              setOpen(false);
              navigate({ to: "/panel/$tab", params: { tab: "genel-bakis" } });
            }}
          >
            Örnek yönetim panelini keşfet <ArrowUpRight />
          </Button>
        </DialogContent>
      </Dialog>
    </AuthContext.Provider>
  );
}
export function SiteHeader() {
  const { openModal, demo, setDemo } = useAuthModal();
  return (
    <header className="site-header">
      <SetyLogo />
      <nav className="desktop-nav">
        <a href="/#nasil-calisir">Nasıl çalışır?</a>
        <a href="/#neler-satabilirsin">Neler satabilirsin?</a>
        <Link to="/magaza/$username" params={{ username: "gizem-tepebas" }}>
          Örnek mağaza <ArrowUpRight size={13} />
        </Link>
      </nav>
      <div className="header-actions">
        {demo ? (
          <>
            <Button variant="outline" className="my-store" asChild>
              <Link to="/panel/$tab" params={{ tab: "magazam" }}>
                <Store /> Mağazam
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="profile-menu">
                  <span className="avatar">E</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="profile-label">
                  Emirhan Arslan<small>Örnek hesap</small>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/panel/$tab" params={{ tab: "ayarlar" }}>
                    <Settings size={15} /> Hesap ayarları
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDemo(false)}>
                  <LogOut size={15} /> Önizlemeden çık
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={() => openModal("login")}>
              Giriş yap
            </Button>
            <Button className="pill" onClick={() => openModal("signup")}>
              Ücretsiz başla <ArrowUpRight />
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
