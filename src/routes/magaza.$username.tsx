import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  Check,
  Calendar,
  Package,
  LockKeyhole,
  MapPin,
  Video,
  Clock,
  Heart,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SetyLogo } from "@/components/sety/brand";
import creator from "@/assets/creator.jpg";
export const Route = createFileRoute("/magaza/$username")({
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.username === "emir7" ? "Emirhan’ın mağazası" : "Gizem Tepebaş — Seanslar"} | Sety`,
      },
      {
        name: "description",
        content: "Sety mağazasında danışmanlık seanslarını ve dijital ürünleri keşfet.",
      },
      { property: "og:title", content: `${params.username} | Sety mağazası` },
      { property: "og:description", content: "Seanslarını ve ürünlerini tek bir yerde keşfet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});
const sessions = [
  {
    title: "Yüz yüze danışmanlık",
    desc: "Kendine ayırdığın güvenli bir alan. Kliniğimizde birebir psikolojik danışmanlık.",
    icon: Heart,
    type: "KLİNİKTE GÖRÜŞME",
    duration: "50 dakika",
    color: "peach",
  },
  {
    title: "Online psikolojik danışmanlık",
    desc: "Nerede olursan ol, kendin için bir adım at. Online birebir görüşme.",
    icon: Video,
    type: "ONLINE GÖRÜŞME",
    duration: "50 dakika",
    color: "lilac",
  },
  {
    title: "Çift & evlilik terapisi",
    desc: "Birbirinizi yeniden duymak, anlamak ve birlikte ilerlemek için.",
    icon: UsersIcon,
    type: "BİRLİKTE BİR ADIM",
    duration: "60 dakika",
    color: "lime",
  },
];
function UsersIcon() {
  return <Heart />;
}
function Storefront() {
  const { username } = Route.useParams();
  const empty = username === "emir7";
  const [selected, setSelected] = useState<string | null>(null);
  const [day, setDay] = useState("14 Ekim");
  const [time, setTime] = useState("14:30");
  const [sent, setSent] = useState(false);
  return (
    <div className="storefront">
      <div className="store-banner">
        {empty
          ? "KENDİ HİKÂYEN. KENDİ MAĞAZAN."
          : "KENDİN İÇİN BİR ADIM · YÜZ YÜZE & ONLINE GÖRÜŞMELER"}
      </div>
      <div className="store-nav">
        <Button variant="ghost" asChild>
          <Link to="/">
            <ArrowLeft /> Sety’ye dön
          </Link>
        </Button>
        <span className="store-demo-label">Örnek vitrin</span>
      </div>
      <main className="store-main">
        <div className="store-profile">
          {empty ? (
            <div className="empty-avatar">@</div>
          ) : (
            <img src={creator} alt="Temsili profil fotoğrafı" width={1024} height={1024} />
          )}
          <span className="eyebrow">
            {empty ? "SENİN DİJİTAL VİTRİNİN" : "UZM. KLİNİK PSİKOLOG"}
          </span>
          <h1>
            {empty ? (
              "@emir7"
            ) : (
              <>
                Gizem Tepebaş{" "}
                <span className="verified">
                  <Check size={14} />
                </span>
              </>
            )}
          </h1>
          <p>
            {empty
              ? "Güzel şeyler için bir başlangıç."
              : "Kendini anlamaya, iyi hissetmeye ve değişime alan aç."}
          </p>
          {!empty && (
            <>
              <span className="profile-location">
                <MapPin size={13} /> Kahramanmaraş · Online & yüz yüze
              </span>
              <div className="store-tags">
                <span>Yetişkin</span>
                <span>Çift terapisi</span>
                <span>Psikolojik danışmanlık</span>
              </div>
            </>
          )}
        </div>
        {empty ? (
          <div className="empty-store">
            <Package size={38} />
            <h2>Yeni bir hikâye başlıyor.</h2>
            <p>
              Bu mağazada henüz ürün bulunmuyor.
              <br />
              Yeni ürünler için tekrar uğra.
            </p>
          </div>
        ) : (
          <>
            <div className="store-section-label">
              KENDİNE BİR ZAMAN AYIR <span>03 SEANS</span>
            </div>
            <div className="store-products">
              {sessions.map((s) => (
                <article className="store-product" key={s.title}>
                  <div className={`store-product-art ${s.color}`}>
                    <s.icon />
                  </div>
                  <div className="store-product-info">
                    <span className="eyebrow">{s.type}</span>
                    <h2>{s.title}</h2>
                    <p>{s.desc}</p>
                    <span className="store-duration">
                      <Clock size={12} />
                      {s.duration} · Ön görüşme
                    </span>
                    <Button
                      onClick={() => {
                        setSent(false);
                        setSelected(s.title);
                      }}
                    >
                      Randevu talep et <ArrowUpRight />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
            <div className="store-extra">
              <MapPin />
              <div>
                <strong>Kliniğimizde buluşalım.</strong>
                <p>Kahramanmaraş · Randevu ile görüşme</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Klinik bilgileri"
                onClick={() => {
                  setSelected("Klinik konumu");
                  setSent(false);
                }}
              >
                <ArrowUpRight />
              </Button>
            </div>
            <div className="store-note">
              <BookOpen size={16} />
              <p>
                Her yolculuk bir konuşmayla başlar.
                <br />
                Sen hazır olduğunda, buradayım.
              </p>
            </div>
          </>
        )}
        <div className="store-powered">
          <span>
            <LockKeyhole size={12} /> Güvenli bir mağaza deneyimi
          </span>
          <span>
            Powered by <SetyLogo />
          </span>
        </div>
        <div className="store-switch">
          <Link to="/magaza/$username" params={{ username: empty ? "gizem-tepebas" : "emir7" }}>
            {empty ? "Dolu mağaza örneğini gör" : "Boş mağaza örneğini gör"}{" "}
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </main>
      <Dialog
        open={!!selected}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
        }}
      >
        <DialogContent className="booking-modal">
          <span className="eyebrow">ÖRNEK RANDEVU AKIŞI</span>
          <DialogTitle>{selected}</DialogTitle>
          <DialogDescription>
            {selected === "Klinik konumu"
              ? "Kahramanmaraş. Bu vitrindeki profil ve seanslar örnek olarak gösterilmektedir."
              : "Kendine uygun bir zaman seç. Bu önizlemede gerçek randevu oluşturulmaz."}
          </DialogDescription>
          {selected !== "Klinik konumu" &&
            (sent ? (
              <div className="booking-success">
                <Check />
                <h3>Örnek talebin hazır.</h3>
                <p>
                  {day} · {time}
                </p>
                <p>Gerçek rezervasyon ve ödeme henüz bağlı değil.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label>
                  Gün
                  <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option>14 Ekim</option>
                    <option>15 Ekim</option>
                    <option>16 Ekim</option>
                  </select>
                </label>
                <label>
                  Saat
                  <select value={time} onChange={(e) => setTime(e.target.value)}>
                    <option>14:30</option>
                    <option>16:00</option>
                    <option>17:30</option>
                  </select>
                </label>
                <label>
                  Adın
                  <input required placeholder="Adın ve soyadın" />
                </label>
                <label>
                  E-posta
                  <input required type="email" placeholder="sen@ornek.com" />
                </label>
                <Button type="submit">
                  Örnek talebi tamamla <ArrowUpRight />
                </Button>
              </form>
            ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
