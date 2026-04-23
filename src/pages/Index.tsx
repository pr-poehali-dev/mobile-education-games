import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "games" | "achievements" | "rating" | "settings" | "help" | "fastcount" | "wordbattle";

const SUBJECTS = [
  { id: "math", name: "Математика", emoji: "🧮", color: "hsl(var(--game-blue))", xp: 840, maxXp: 1000, level: 7 },
  { id: "russian", name: "Русский язык", emoji: "📝", color: "hsl(var(--game-pink))", xp: 620, maxXp: 800, level: 6 },
  { id: "reading", name: "Чтение", emoji: "📚", color: "hsl(var(--game-green))", xp: 450, maxXp: 500, level: 5 },
  { id: "science", name: "Окружающий мир", emoji: "🌍", color: "hsl(var(--game-orange))", xp: 230, maxXp: 600, level: 3 },
  { id: "english", name: "Английский", emoji: "🇬🇧", color: "hsl(var(--game-purple))", xp: 180, maxXp: 400, level: 2 },
];

const ACHIEVEMENTS = [
  { id: 1, title: "Первый шаг", desc: "Пройди первый урок", emoji: "🚀", earned: true, rarity: "common" },
  { id: 2, title: "Вундеркинд", desc: "5 уроков без ошибок", emoji: "🧠", earned: true, rarity: "rare" },
  { id: 3, title: "Огненная серия", desc: "7 дней подряд", emoji: "🔥", earned: true, rarity: "epic" },
  { id: 4, title: "Чемпион математики", desc: "Набери 1000 XP в математике", emoji: "🏆", earned: false, rarity: "legendary" },
  { id: 5, title: "Полиглот", desc: "Изучи 100 английских слов", emoji: "🌐", earned: false, rarity: "rare" },
  { id: 6, title: "Книжный червь", desc: "Прочитай 10 историй", emoji: "📖", earned: true, rarity: "common" },
  { id: 7, title: "Скоростной ум", desc: "Реши 20 задач за 5 минут", emoji: "⚡", earned: false, rarity: "epic" },
  { id: 8, title: "Отличник", desc: "Получи 100% в любом тесте", emoji: "⭐", earned: true, rarity: "common" },
];

const GAMES = [
  { id: 1, title: "Быстрый счёт", subject: "Математика", emoji: "⚡", color: "from-blue-600 to-cyan-500", difficulty: "Лёгкий", xpReward: 50, players: "1 игрок" },
  { id: 2, title: "Словесный бой", subject: "Русский язык", emoji: "⚔️", color: "from-pink-600 to-rose-500", difficulty: "Средний", xpReward: 80, players: "1–2 игрока" },
  { id: 3, title: "Планета знаний", subject: "Окруж. мир", emoji: "🌍", color: "from-green-600 to-emerald-500", difficulty: "Средний", xpReward: 70, players: "1 игрок" },
  { id: 4, title: "Буквы в бою", subject: "Английский", emoji: "🔤", color: "from-purple-600 to-violet-500", difficulty: "Сложный", xpReward: 120, players: "1–4 игрока" },
  { id: 5, title: "Читай-ка", subject: "Чтение", emoji: "📖", color: "from-orange-600 to-amber-500", difficulty: "Лёгкий", xpReward: 40, players: "1 игрок" },
  { id: 6, title: "Математический квест", subject: "Математика", emoji: "🗺️", color: "from-indigo-600 to-blue-500", difficulty: "Сложный", xpReward: 150, players: "1 игрок" },
];

type RatingPlayer = { place: number; name: string; avatar: string; xp: number; streak: number; badge: string | null; isMe?: boolean };

const RATING: RatingPlayer[] = [
  { place: 1, name: "Маша К.", avatar: "👧", xp: 4820, streak: 24, badge: "🏆" },
  { place: 2, name: "Артём П.", avatar: "👦", xp: 4650, streak: 18, badge: "🥈" },
  { place: 3, name: "Соня М.", avatar: "🧒", xp: 4100, streak: 15, badge: "🥉" },
  { place: 4, name: "Ты", avatar: "🌟", xp: 3240, streak: 7, badge: null, isMe: true },
  { place: 5, name: "Рома Д.", avatar: "👦", xp: 3100, streak: 12, badge: null },
  { place: 6, name: "Аня С.", avatar: "👧", xp: 2870, streak: 5, badge: null },
  { place: 7, name: "Коля В.", avatar: "🧒", xp: 2500, streak: 3, badge: null },
];

const RARITY_COLORS: Record<string, string> = {
  common: "border-muted-foreground/30 bg-muted/40",
  rare: "border-blue-500/50 bg-blue-900/20",
  epic: "border-purple-500/50 bg-purple-900/20",
  legendary: "border-amber-500/60 bg-amber-900/20",
};

const RARITY_LABELS: Record<string, string> = {
  common: "Обычное",
  rare: "Редкое",
  epic: "Эпическое",
  legendary: "Легендарное",
};

function XpBar({ xp, maxXp, color }: { xp: number; maxXp: number; color: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((xp / maxXp) * 100), 200);
    return () => clearTimeout(t);
  }, [xp, maxXp]);
  return (
    <div className="xp-bar h-3 w-full">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${width}%`, background: color }}
      />
    </div>
  );
}

function NavBar({ active, onChange }: { active: Page; onChange: (p: Page) => void }) {
  const items: { id: Page; label: string; emoji: string }[] = [
    { id: "home", label: "Главная", emoji: "🏠" },
    { id: "games", label: "Игры", emoji: "🎮" },
    { id: "achievements", label: "Призы", emoji: "🏆" },
    { id: "rating", label: "Рейтинг", emoji: "📊" },
    { id: "settings", label: "Настройки", emoji: "⚙️" },
    { id: "help", label: "Помощь", emoji: "❓" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-3"
      style={{
        background: "hsl(240 20% 6% / 0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid hsl(var(--border))",
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 ${
            active === item.id ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="text-lg leading-none">{item.emoji}</span>
          <span className="text-[9px] font-bold font-nunito leading-none">{item.label}</span>
          {active === item.id && <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
        </button>
      ))}
    </nav>
  );
}

function HomePage({ onPlay }: { onPlay: () => void }) {
  const totalXp = 3240;
  const levelXp = 3200;
  const nextLevelXp = 3600;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-5">
      <div
        className={`game-card p-5 stars-bg relative overflow-hidden transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="absolute top-3 right-3 text-4xl animate-float">🌟</div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--game-pink)))" }}
          >
            🦸
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-nunito">Добро пожаловать!</p>
            <h2 className="font-russo text-xl text-foreground">Алексей</h2>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs font-bold text-game-orange">🔥 7 дней подряд!</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-muted-foreground">Уровень 12</span>
          <span className="text-sm font-bold text-primary">
            {totalXp} / {nextLevelXp} XP
          </span>
        </div>
        <XpBar
          xp={totalXp - levelXp}
          maxXp={nextLevelXp - levelXp}
          color="linear-gradient(90deg, hsl(var(--primary)), hsl(var(--game-pink)))"
        />
        <p className="text-xs text-muted-foreground mt-1.5">До уровня 13 — {nextLevelXp - totalXp} XP</p>
      </div>

      <div
        className={`grid grid-cols-3 gap-3 transition-all duration-500 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {[
          { label: "Уроков пройдено", value: "47", emoji: "📚", color: "hsl(var(--game-blue))" },
          { label: "Достижений", value: "12", emoji: "🏆", color: "hsl(var(--game-orange))" },
          { label: "Место в рейтинге", value: "#4", emoji: "🎯", color: "hsl(var(--game-green))" },
        ].map((stat) => (
          <div key={stat.label} className="game-card p-3 text-center">
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <div className="font-russo text-xl" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-[10px] text-muted-foreground font-nunito leading-tight mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div
        className={`transition-all duration-500 delay-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="font-russo text-base text-foreground mb-3 flex items-center gap-2">
          📈 <span>Прогресс по предметам</span>
        </h3>
        <div className="space-y-3">
          {SUBJECTS.map((s, i) => (
            <div key={s.id} className="game-card p-3.5" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.emoji}</span>
                  <span className="font-bold text-sm text-foreground">{s.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-nunito">
                    {s.xp}/{s.maxXp} XP
                  </span>
                  <span
                    className="text-xs font-russo px-2 py-0.5 rounded-full text-white"
                    style={{ background: s.color }}
                  >
                    Ур.{s.level}
                  </span>
                </div>
              </div>
              <XpBar xp={s.xp} maxXp={s.maxXp} color={s.color} />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`transition-all duration-500 delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="font-russo text-base text-foreground mb-3 flex items-center gap-2">
          🎯 <span>Задание дня</span>
        </h3>
        <div
          className="game-card p-4"
          style={{
            border: "1px solid hsl(var(--game-orange) / 0.4)",
            background: "hsl(var(--game-orange) / 0.05)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-foreground">Реши 5 задач по математике</p>
              <p className="text-muted-foreground text-sm mt-1">Пройди тест на умножение и получи бонус!</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                  3/5 выполнено
                </span>
                <span className="text-xs font-bold text-game-orange">+100 XP</span>
              </div>
            </div>
            <button
              onClick={onPlay}
              className="shrink-0 px-4 py-2 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, hsl(var(--game-orange)), hsl(38 100% 45%))",
              }}
            >
              Играть
            </button>
          </div>
          <div className="mt-3">
            <XpBar xp={3} maxXp={5} color="hsl(var(--game-orange))" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GamesPage({ onPlayFast, onPlayWord }: { onPlayFast: () => void; onPlayWord: () => void }) {
  const handlers: Record<number, (() => void) | undefined> = { 1: onPlayFast, 2: onPlayWord };
  const active = new Set([1, 2]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-russo text-2xl text-foreground">🎮 Игры</h2>
        <p className="text-muted-foreground text-sm mt-1">Учись играя — зарабатывай очки!</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {GAMES.map((game, i) => {
          const isActive = active.has(game.id);
          return (
            <div
              key={game.id}
              onClick={handlers[game.id]}
              className={`game-card overflow-hidden animate-fade-in ${isActive ? "cursor-pointer" : "cursor-default opacity-70"}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`h-24 bg-gradient-to-br ${game.color} flex items-center justify-center text-5xl relative`}>
                {game.emoji}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-white text-xs font-bold bg-black/40 px-2 py-1 rounded-full">Скоро</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-russo text-sm text-foreground leading-tight">{game.title}</h3>
                <p className="text-muted-foreground text-[11px] mt-0.5">{game.subject}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground">
                    {game.difficulty}
                  </span>
                  <span className="text-[11px] font-bold text-game-green">+{game.xpReward} XP</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{game.players}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AchievementsPage() {
  const earned = ACHIEVEMENTS.filter((a) => a.earned).length;
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-russo text-2xl text-foreground">🏆 Достижения</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Получено: <span className="text-primary font-bold">{earned}</span> из {ACHIEVEMENTS.length}
        </p>
      </div>
      <div className="game-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-foreground">Общий прогресс</span>
          <span className="text-sm font-bold text-primary">
            {earned}/{ACHIEVEMENTS.length}
          </span>
        </div>
        <XpBar
          xp={earned}
          maxXp={ACHIEVEMENTS.length}
          color="linear-gradient(90deg, hsl(var(--game-orange)), hsl(var(--game-pink)))"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((ach, i) => (
          <div
            key={ach.id}
            className={`relative p-3.5 rounded-2xl border transition-all duration-200 animate-fade-in ${
              RARITY_COLORS[ach.rarity]
            } ${ach.earned ? "cursor-pointer hover:scale-105" : "opacity-50 grayscale"}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {ach.earned && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-game-green flex items-center justify-center">
                <span className="text-[10px] text-white">✓</span>
              </div>
            )}
            <div className="text-3xl mb-2 text-center">{ach.emoji}</div>
            <p className="font-russo text-xs text-foreground text-center leading-tight">{ach.title}</p>
            <p className="text-[10px] text-muted-foreground text-center mt-1 leading-tight">{ach.desc}</p>
            <div className="text-center mt-2">
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full font-bold"
                style={{
                  background:
                    ach.rarity === "legendary"
                      ? "hsl(var(--game-orange) / 0.2)"
                      : ach.rarity === "epic"
                      ? "hsl(var(--primary) / 0.2)"
                      : ach.rarity === "rare"
                      ? "hsl(var(--game-blue) / 0.2)"
                      : "hsl(var(--muted))",
                  color:
                    ach.rarity === "legendary"
                      ? "hsl(var(--game-orange))"
                      : ach.rarity === "epic"
                      ? "hsl(var(--primary))"
                      : ach.rarity === "rare"
                      ? "hsl(var(--game-blue))"
                      : "hsl(var(--muted-foreground))",
                }}
              >
                {RARITY_LABELS[ach.rarity]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RatingPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-russo text-2xl text-foreground">📊 Рейтинг</h2>
        <p className="text-muted-foreground text-sm mt-1">Борьба за первое место!</p>
      </div>
      <div className="game-card p-4 stars-bg">
        <div className="flex items-end justify-center gap-3">
          {[RATING[1], RATING[0], RATING[2]].map((player, idx) => {
            const heights = ["h-20", "h-28", "h-16"];
            const sizes = ["text-3xl", "text-4xl", "text-3xl"];
            return (
              <div key={player.place} className="flex flex-col items-center gap-1.5">
                <span className={sizes[idx]}>{player.avatar}</span>
                <span className="text-xs font-bold text-foreground truncate max-w-[60px] text-center">
                  {player.name}
                </span>
                <span className="text-[10px] text-game-orange font-bold">
                  {(player.xp / 1000).toFixed(1)}K
                </span>
                <div
                  className={`w-16 ${heights[idx]} rounded-t-xl flex items-start justify-center pt-2 font-russo text-xl`}
                  style={{
                    background:
                      idx === 1
                        ? "linear-gradient(180deg, hsl(var(--game-orange)), hsl(38 100% 40%))"
                        : idx === 0
                        ? "linear-gradient(180deg, hsl(var(--muted-foreground)), hsl(240 10% 40%))"
                        : "linear-gradient(180deg, hsl(38 70% 50%), hsl(38 70% 35%))",
                  }}
                >
                  {player.badge || ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="space-y-2">
        {RATING.map((player, i) => (
          <div
            key={player.place}
            className={`game-card p-3.5 flex items-center gap-3 animate-fade-in ${
              player.isMe ? "border-primary/50 bg-primary/5" : ""
            }`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span
              className={`font-russo text-lg w-7 text-center ${
                player.place === 1
                  ? "text-game-orange"
                  : player.place === 2
                  ? "text-muted-foreground"
                  : player.place === 3
                  ? "text-amber-600"
                  : "text-muted-foreground"
              }`}
            >
              {player.place}
            </span>
            <span className="text-2xl">{player.avatar}</span>
            <div className="flex-1">
              <p
                className={`font-bold text-sm ${
                  player.isMe ? "text-primary" : "text-foreground"
                }`}
              >
                {player.name}{" "}
                {player.isMe && (
                  <span className="text-[10px] bg-primary/20 px-1.5 py-0.5 rounded-full">это ты</span>
                )}
              </p>
              <p className="text-[11px] text-muted-foreground">🔥 {player.streak} дней подряд</p>
            </div>
            <div className="text-right">
              <p className="font-russo text-sm text-game-green">{player.xp.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">XP</p>
            </div>
            {player.badge && <span className="text-xl">{player.badge}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-russo text-2xl text-foreground">⚙️ Настройки</h2>
        <p className="text-muted-foreground text-sm mt-1">Настрой приложение под себя</p>
      </div>
      <div className="game-card p-4">
        <h3 className="font-russo text-sm text-muted-foreground mb-3">ПРОФИЛЬ</h3>
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl text-3xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--game-pink)))" }}
          >
            🦸
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground">Алексей</p>
            <p className="text-muted-foreground text-sm">Уровень 12 · 3240 XP</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl text-sm font-bold text-foreground border border-border hover:bg-muted transition-colors">
            Изменить
          </button>
        </div>
      </div>
      <div className="game-card p-4 space-y-4">
        <h3 className="font-russo text-sm text-muted-foreground">ЗВУК</h3>
        {[
          { label: "Звуковые эффекты", desc: "Звуки при ответах и действиях", val: sound, set: setSound, emoji: "🔊" },
          { label: "Фоновая музыка", desc: "Музыка во время игр", val: music, set: setMusic, emoji: "🎵" },
          { label: "Уведомления", desc: "Напоминания об уроках", val: notifications, set: setNotifications, emoji: "🔔" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.emoji}</span>
              <div>
                <p className="font-bold text-sm text-foreground">{item.label}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            </div>
            <button
              onClick={() => item.set(!item.val)}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                item.val ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-sm ${
                  item.val ? "left-6" : "left-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="game-card p-4">
        <h3 className="font-russo text-sm text-muted-foreground mb-3">СЛОЖНОСТЬ ИГР</h3>
        <div className="grid grid-cols-3 gap-2">
          {(["easy", "medium", "hard"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setDifficulty(lvl)}
              className={`py-2.5 rounded-xl font-bold text-sm transition-all ${
                difficulty === lvl ? "text-white scale-105" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              style={
                difficulty === lvl
                  ? {
                      background:
                        lvl === "easy"
                          ? "hsl(var(--game-green))"
                          : lvl === "medium"
                          ? "hsl(var(--game-orange))"
                          : "hsl(var(--game-red))",
                    }
                  : undefined
              }
            >
              {lvl === "easy" ? "🌱 Лёгкий" : lvl === "medium" ? "⚡ Средний" : "🔥 Сложный"}
            </button>
          ))}
        </div>
      </div>
      <div className="game-card p-4">
        <h3 className="font-russo text-sm text-muted-foreground mb-3">ПРОГРЕСС</h3>
        <button className="w-full py-2.5 rounded-xl font-bold text-sm text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors">
          Сбросить прогресс
        </button>
      </div>
    </div>
  );
}

function HelpPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs = [
    { id: 1, q: "Как зарабатывать очки XP?", a: "XP начисляются за каждый пройденный урок, правильные ответы и выполнение ежедневных заданий. Чем сложнее задание — тем больше XP!" },
    { id: 2, q: "Что такое серия дней?", a: "Серия — это количество дней подряд, когда ты занимаешься. Чем дольше серия, тем больше бонусных XP ты получаешь каждый день. Не прерывай цепочку! 🔥" },
    { id: 3, q: "Как разблокировать новые игры?", a: "Игры открываются автоматически по мере набора уровней. Достигай новых уровней в предметах, чтобы получить доступ к более сложным и интересным играм." },
    { id: 4, q: "Как поднять свой рейтинг?", a: "Играй каждый день, выполняй задания дня и решай задачи повышенной сложности. Серия дней даёт бонусные XP, а турниры — сразу большое количество очков!" },
    { id: 5, q: "Что делать, если игра зависла?", a: "Попробуй обновить страницу. Твой прогресс сохраняется автоматически. Если проблема повторяется — напиши нам!" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-russo text-2xl text-foreground">❓ Помощь</h2>
        <p className="text-muted-foreground text-sm mt-1">Ответы на частые вопросы</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { emoji: "🎯", title: "Выполняй задания дня", desc: "Получай бонусный XP каждый день" },
          { emoji: "🔥", title: "Не прерывай серию", desc: "Серия дней даёт двойной XP" },
          { emoji: "⭐", title: "Решай сложные задачи", desc: "Больше сложность — больше награда" },
          { emoji: "🏆", title: "Соревнуйся с друзьями", desc: "Совместные турниры каждую неделю" },
        ].map((tip) => (
          <div key={tip.title} className="game-card p-3 text-center">
            <div className="text-2xl mb-2">{tip.emoji}</div>
            <p className="font-bold text-xs text-foreground leading-tight">{tip.title}</p>
            <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{tip.desc}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-russo text-sm text-muted-foreground mb-3">ЧАСТЫЕ ВОПРОСЫ</h3>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div key={faq.id} className="game-card overflow-hidden">
              <button
                className="w-full p-3.5 flex items-center justify-between text-left gap-2"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                <span className="font-bold text-sm text-foreground">{faq.q}</span>
                <span
                  className={`text-muted-foreground transition-transform duration-200 shrink-0 ${
                    openId === faq.id ? "rotate-45" : ""
                  }`}
                >
                  <Icon name="Plus" size={16} />
                </span>
              </button>
              {openId === faq.id && (
                <div className="px-3.5 pb-3.5 text-sm text-muted-foreground animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className="game-card p-4 text-center"
        style={{
          background: "hsl(var(--primary) / 0.08)",
          border: "1px solid hsl(var(--primary) / 0.3)",
        }}
      >
        <p className="text-2xl mb-2">🚀</p>
        <p className="font-bold text-foreground mb-1">Нужна дополнительная помощь?</p>
        <p className="text-sm text-muted-foreground mb-3">Напиши нам — ответим в течение часа!</p>
        <button
          className="px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--game-pink)))" }}
        >
          Написать в поддержку
        </button>
      </div>
    </div>
  );
}

type GamePhase = "intro" | "playing" | "result";

function generateQuestion() {
  const base = Math.random() < 0.5 ? 2 : 3;
  const num = Math.floor(Math.random() * 10) + 1;
  const answer = base * num;
  const wrongs = new Set<number>();
  while (wrongs.size < 3) {
    const delta = Math.floor(Math.random() * 5) + 1;
    const wrong = answer + (Math.random() < 0.5 ? delta : -delta);
    if (wrong !== answer && wrong > 0) wrongs.add(wrong);
  }
  const options = [answer, ...Array.from(wrongs)].sort(() => Math.random() - 0.5);
  return { base, num, answer, options };
}

type Question = ReturnType<typeof generateQuestion>;

function FastCountGame({ onBack }: { onBack: () => void }) {
  const TOTAL_TIME = 60;
  const TOTAL_QUESTIONS = 10;

  const [phase, setPhase] = useState<GamePhase>("intro");
  const [question, setQuestion] = useState<Question>(generateQuestion());
  const [questionNum, setQuestionNum] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) { setPhase("result"); return; }
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft]);

  function startGame() {
    setPhase("playing");
    setQuestion(generateQuestion());
    setQuestionNum(1);
    setScore(0);
    setTimeLeft(TOTAL_TIME);
    setFeedback(null);
    setSelectedOption(null);
    setXpEarned(0);
    setCombo(0);
    setMaxCombo(0);
  }

  function handleAnswer(opt: number) {
    if (feedback !== null) return;
    setSelectedOption(opt);
    const isCorrect = opt === question.answer;
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const bonus = newCombo >= 3 ? 15 : 10;
      setScore((s) => s + 1);
      setXpEarned((x) => x + bonus);
    } else {
      setCombo(0);
    }

    setTimeout(() => {
      if (questionNum >= TOTAL_QUESTIONS) {
        setPhase("result");
      } else {
        setQuestion(generateQuestion());
        setQuestionNum((n) => n + 1);
        setFeedback(null);
        setSelectedOption(null);
      }
    }, 700);
  }

  const timerPct = (timeLeft / TOTAL_TIME) * 100;
  const timerColor = timeLeft > 20 ? "hsl(var(--game-green))" : timeLeft > 10 ? "hsl(var(--game-orange))" : "hsl(var(--game-red))";

  if (phase === "intro") {
    return (
      <div className="space-y-5 animate-fade-in">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="ArrowLeft" size={18} /> Назад
        </button>
        <div className="game-card p-6 text-center stars-bg">
          <div className="text-7xl mb-4 animate-float">⚡</div>
          <h2 className="font-russo text-2xl text-foreground mb-2">Быстрый счёт</h2>
          <p className="text-muted-foreground mb-1">Таблица умножения на 2 и 3</p>
          <p className="text-muted-foreground text-sm mb-6">10 вопросов · 60 секунд</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { emoji: "❓", label: "10 вопросов" },
              { emoji: "⏱️", label: "60 секунд" },
              { emoji: "⚡", label: "до 150 XP" },
            ].map((s) => (
              <div key={s.label} className="bg-muted/50 rounded-2xl p-3 text-center">
                <div className="text-2xl mb-1">{s.emoji}</div>
                <p className="text-xs font-bold text-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-muted/40 rounded-2xl p-3 mb-6 text-left space-y-1.5">
            <p className="text-xs text-muted-foreground flex items-center gap-2"><span>🔥</span> Комбо 3+ даёт бонусные +5 XP за ответ</p>
            <p className="text-xs text-muted-foreground flex items-center gap-2"><span>✅</span> За каждый верный ответ +10 XP</p>
            <p className="text-xs text-muted-foreground flex items-center gap-2"><span>⏰</span> Если время вышло — игра заканчивается</p>
          </div>
          <button
            onClick={startGame}
            className="w-full py-4 rounded-2xl font-russo text-lg text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, hsl(var(--game-blue)), hsl(var(--primary)))" }}
          >
            Начать игру!
          </button>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const accuracy = Math.round((score / questionNum) * 100);
    const stars = score >= 9 ? 3 : score >= 6 ? 2 : score >= 3 ? 1 : 0;
    return (
      <div className="space-y-5 animate-fade-in">
        <div className="game-card p-6 text-center stars-bg">
          <div className="text-6xl mb-2 animate-bounce-in">{stars === 3 ? "🏆" : stars === 2 ? "🥈" : stars === 1 ? "🥉" : "😅"}</div>
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3].map((s) => (
              <span key={s} className={`text-3xl transition-all ${s <= stars ? "opacity-100" : "opacity-20"}`}>⭐</span>
            ))}
          </div>
          <h2 className="font-russo text-2xl text-foreground mb-1">
            {stars === 3 ? "Отлично!" : stars === 2 ? "Хорошо!" : stars === 1 ? "Неплохо!" : "Попробуй ещё!"}
          </h2>
          <p className="text-muted-foreground text-sm mb-5">Результаты игры</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Верных ответов", value: `${score}/${questionNum}`, color: "hsl(var(--game-green))" },
              { label: "Точность", value: `${accuracy}%`, color: "hsl(var(--game-blue))" },
              { label: "Макс. комбо", value: `x${maxCombo}`, color: "hsl(var(--game-orange))" },
              { label: "XP заработано", value: `+${xpEarned}`, color: "hsl(var(--primary))" },
            ].map((s) => (
              <div key={s.label} className="bg-muted/50 rounded-2xl p-3 text-center">
                <p className="font-russo text-xl" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-3 rounded-2xl font-bold text-sm text-foreground border border-border hover:bg-muted transition-colors"
            >
              К играм
            </button>
            <button
              onClick={startGame}
              className="flex-1 py-3 rounded-2xl font-russo text-sm text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, hsl(var(--game-blue)), hsl(var(--primary)))" }}
            >
              Сыграть ещё
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <Icon name="ArrowLeft" size={16} /> Выйти
        </button>
        <div className="flex items-center gap-3">
          {combo >= 3 && (
            <span className="text-xs font-bold text-game-orange animate-pulse">🔥 Комбо x{combo}!</span>
          )}
          <span className="text-sm font-bold text-primary">+{xpEarned} XP</span>
        </div>
      </div>

      <div className="game-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-muted-foreground">Вопрос {questionNum}/{TOTAL_QUESTIONS}</span>
          <span className="font-russo text-sm" style={{ color: timerColor }}>⏱ {timeLeft}с</span>
        </div>
        <div className="xp-bar h-2.5 w-full mb-1">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${timerPct}%`, background: timerColor }}
          />
        </div>
        <div className="xp-bar h-1.5 w-full mt-2">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${((questionNum - 1) / TOTAL_QUESTIONS) * 100}%`, background: "hsl(var(--primary))" }}
          />
        </div>
      </div>

      <div className="game-card p-8 text-center stars-bg">
        <p className="text-muted-foreground text-sm mb-3 font-nunito">Сколько будет?</p>
        <p className="font-russo text-5xl text-foreground mb-1">
          {question.base} × {question.num} = ?
        </p>
        <p className="text-muted-foreground text-sm">
          {question.base === 2 ? "Таблица на 2" : "Таблица на 3"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt === question.answer;
          let bg = "hsl(var(--card))";
          let border = "hsl(var(--border))";
          let textColor = "hsl(var(--foreground))";
          if (isSelected && feedback === "correct") { bg = "hsl(var(--game-green) / 0.15)"; border = "hsl(var(--game-green))"; textColor = "hsl(var(--game-green))"; }
          if (isSelected && feedback === "wrong") { bg = "hsl(var(--game-red) / 0.15)"; border = "hsl(var(--game-red))"; textColor = "hsl(var(--game-red))"; }
          if (!isSelected && feedback !== null && isCorrect) { bg = "hsl(var(--game-green) / 0.1)"; border = "hsl(var(--game-green) / 0.6)"; }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={feedback !== null}
              className="py-5 rounded-2xl font-russo text-2xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-default border-2"
              style={{ background: bg, borderColor: border, color: textColor }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-1 mt-2">
        {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background: i < questionNum - 1
                ? "hsl(var(--game-green))"
                : i === questionNum - 1
                ? "hsl(var(--primary))"
                : "hsl(var(--muted))",
            }}
          />
        ))}
      </div>
    </div>
  );
}

type WordEntry = { word: string; wrong: string[]; hint: string; grade: 1 | 2 | 3 | 4 };

const WORD_BANK: WordEntry[] = [
  // 1 класс
  { word: "ворона", wrong: ["варона", "варана", "ворана"], hint: "Чёрно-белая птица", grade: 1 },
  { word: "молоко", wrong: ["малако", "молако", "малоко"], hint: "Белый напиток от коровы", grade: 1 },
  { word: "собака", wrong: ["сабака", "собока", "сабока"], hint: "Верный друг человека", grade: 1 },
  { word: "ребята", wrong: ["рибята", "рибета", "ребета"], hint: "Дети, друзья", grade: 1 },
  { word: "учитель", wrong: ["учитил", "учытель", "учытил"], hint: "Тот, кто учит в школе", grade: 1 },
  { word: "тетрадь", wrong: ["титрадь", "тетрать", "титрать"], hint: "Пишут в ней уроки", grade: 1 },
  { word: "карандаш", wrong: ["корандаш", "каранташ", "коранташ"], hint: "Им рисуют и пишут", grade: 1 },
  { word: "девочка", wrong: ["дивочка", "девачка", "дивачка"], hint: "Маленькая женщина", grade: 1 },
  { word: "мальчик", wrong: ["малчик", "мальчек", "малчек"], hint: "Маленький мужчина", grade: 1 },
  { word: "медведь", wrong: ["медвидь", "медведть", "мидведь"], hint: "Бурый хозяин леса", grade: 1 },
  // 2 класс
  { word: "берёза", wrong: ["бирёза", "берёса", "бирёса"], hint: "Белоствольное дерево России", grade: 2 },
  { word: "корова", wrong: ["карова", "корава", "карава"], hint: "Даёт молоко на ферме", grade: 2 },
  { word: "деревня", wrong: ["диревня", "деривня", "диривня"], hint: "Маленький населённый пункт", grade: 2 },
  { word: "пальто", wrong: ["палто", "пальта", "палта"], hint: "Верхняя тёплая одежда", grade: 2 },
  { word: "Россия", wrong: ["Расия", "Рассия", "Расея"], hint: "Наша Родина", grade: 2 },
  { word: "Москва", wrong: ["Масква", "Москова", "Маскова"], hint: "Столица нашей страны", grade: 2 },
  { word: "народ", wrong: ["нарот", "нород", "норот"], hint: "Большая группа людей", grade: 2 },
  { word: "завод", wrong: ["завот", "зовод", "зовот"], hint: "Место, где производят товары", grade: 2 },
  { word: "огород", wrong: ["огарод", "агород", "агарод"], hint: "Где растут овощи", grade: 2 },
  { word: "сорока", wrong: ["сарока", "сорака", "сарака"], hint: "Птица-белобока", grade: 2 },
  // 3 класс
  { word: "восток", wrong: ["восток", "васток", "востак"], hint: "Одна из сторон света", grade: 3 },
  { word: "горизонт", wrong: ["гаризонт", "горизант", "гаризант"], hint: "Линия, где небо встречает землю", grade: 3 },
  { word: "картина", wrong: ["картена", "картына", "картена"], hint: "Произведение живописи", grade: 3 },
  { word: "пожалуйста", wrong: ["пожалста", "пожалуста", "пажалуйста"], hint: "Слово вежливости", grade: 3 },
  { word: "телефон", wrong: ["тилефон", "телифон", "тилифон"], hint: "Устройство для звонков", grade: 3 },
  { word: "библиотека", wrong: ["библиатека", "библеотека", "библеатека"], hint: "Место, где хранятся книги", grade: 3 },
  { word: "экскурсия", wrong: ["экскурция", "ескурсия", "экскурсея"], hint: "Поездка с целью осмотра", grade: 3 },
  { word: "хозяйство", wrong: ["хазяйство", "хозяество", "хазяество"], hint: "Дом и всё имущество", grade: 3 },
  { word: "лестница", wrong: ["лесница", "лестнеца", "лесница"], hint: "По ней поднимаются этажи", grade: 3 },
  { word: "праздник", wrong: ["празник", "праздек", "пращник"], hint: "Особый торжественный день", grade: 3 },
  // 4 класс
  { word: "территория", wrong: ["терытория", "территорея", "терытарея"], hint: "Часть земной поверхности", grade: 4 },
  { word: "аккуратно", wrong: ["акуратно", "аккуратна", "акуратна"], hint: "Очень чисто и ровно", grade: 4 },
  { word: "путешествие", wrong: ["путишествие", "путешествее", "путишествее"], hint: "Поездка в далёкие места", grade: 4 },
  { word: "впечатление", wrong: ["впичатление", "впечатленее", "впичатленее"], hint: "То, что запомнилось", grade: 4 },
  { word: "расстояние", wrong: ["расстаяние", "расстояниe", "рассстояние"], hint: "Промежуток между двумя точками", grade: 4 },
  { word: "отечество", wrong: ["атечество", "отичество", "атичество"], hint: "Родная страна", grade: 4 },
  { word: "человечество", wrong: ["чиловечество", "человечиство", "чиловечиство"], hint: "Все люди на Земле", grade: 4 },
  { word: "революция", wrong: ["рэволюция", "революцея", "рэволюцея"], hint: "Коренное изменение в обществе", grade: 4 },
  { word: "конституция", wrong: ["кансытуция", "конституцея", "кансытуцея"], hint: "Главный закон страны", grade: 4 },
  { word: "президент", wrong: ["президэнт", "призидент", "призидэнт"], hint: "Глава государства", grade: 4 },
];

const GRADE_LABELS: Record<number, string> = { 1: "1 класс", 2: "2 класс", 3: "3 класс", 4: "4 класс" };
const GRADE_COLORS: Record<number, string> = {
  1: "hsl(var(--game-green))",
  2: "hsl(var(--game-blue))",
  3: "hsl(var(--game-orange))",
  4: "hsl(var(--game-pink))",
};

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildWordQuestion(entry: WordEntry) {
  const options = shuffleArray([entry.word, ...entry.wrong.slice(0, 3)]);
  return { ...entry, options };
}

type WordQuestion = ReturnType<typeof buildWordQuestion>;

function WordBattleGame({ onBack }: { onBack: () => void }) {
  const TOTAL_QUESTIONS = 10;

  const [phase, setPhase] = useState<GamePhase>("intro");
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3 | 4>(2);
  const [questions, setQuestions] = useState<WordQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  function startGame() {
    const pool = WORD_BANK.filter((w) => w.grade === selectedGrade);
    const picked = shuffleArray(pool).slice(0, TOTAL_QUESTIONS);
    const qs = picked.map(buildWordQuestion);
    setQuestions(qs);
    setCurrentIdx(0);
    setScore(0);
    setXpEarned(0);
    setCombo(0);
    setMaxCombo(0);
    setFeedback(null);
    setSelectedOption(null);
    setShowHint(false);
    setHintsUsed(0);
    setPhase("playing");
  }

  function handleAnswer(opt: string) {
    if (feedback !== null) return;
    const q = questions[currentIdx];
    const isCorrect = opt === q.word;
    setSelectedOption(opt);
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const bonus = newCombo >= 3 ? 15 : showHint ? 5 : 10;
      setScore((s) => s + 1);
      setXpEarned((x) => x + bonus);
    } else {
      setCombo(0);
    }

    setTimeout(() => {
      if (currentIdx + 1 >= questions.length) {
        setPhase("result");
      } else {
        setCurrentIdx((i) => i + 1);
        setFeedback(null);
        setSelectedOption(null);
        setShowHint(false);
      }
    }, 900);
  }

  function useHint() {
    if (showHint) return;
    setShowHint(true);
    setHintsUsed((h) => h + 1);
  }

  if (phase === "intro") {
    return (
      <div className="space-y-5 animate-fade-in">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <Icon name="ArrowLeft" size={18} /> Назад
        </button>
        <div className="game-card p-6 text-center stars-bg">
          <div className="text-6xl mb-3 animate-float">⚔️</div>
          <h2 className="font-russo text-2xl text-foreground mb-1">Словесный бой</h2>
          <p className="text-muted-foreground text-sm mb-5">Выбери правильное написание словарных слов</p>

          <p className="font-russo text-sm text-muted-foreground mb-3">ВЫБЕРИ КЛАСС</p>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {([1, 2, 3, 4] as const).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className="py-3 rounded-2xl font-russo text-sm transition-all"
                style={{
                  background: selectedGrade === g ? GRADE_COLORS[g] : "hsl(var(--muted))",
                  color: selectedGrade === g ? "white" : "hsl(var(--muted-foreground))",
                  transform: selectedGrade === g ? "scale(1.05)" : "scale(1)",
                }}
              >
                {g}<span className="text-xs">кл</span>
              </button>
            ))}
          </div>

          <div className="bg-muted/40 rounded-2xl p-3 mb-5 text-left space-y-1.5">
            <p className="text-xs text-muted-foreground flex items-center gap-2"><span>✅</span> Выбери правильное написание из 4 вариантов</p>
            <p className="text-xs text-muted-foreground flex items-center gap-2"><span>💡</span> Подсказка даётся за половину XP</p>
            <p className="text-xs text-muted-foreground flex items-center gap-2"><span>🔥</span> Комбо 3+ = бонус +5 XP за ответ</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { emoji: "❓", label: "10 слов" },
              { emoji: "💡", label: "Подсказки" },
              { emoji: "⚡", label: "до 150 XP" },
            ].map((s) => (
              <div key={s.label} className="bg-muted/50 rounded-2xl p-3 text-center">
                <div className="text-2xl mb-1">{s.emoji}</div>
                <p className="text-xs font-bold text-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={startGame}
            className="w-full py-4 rounded-2xl font-russo text-lg text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, hsl(var(--game-pink)), hsl(0 80% 55%))" }}
          >
            В бой!
          </button>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const accuracy = Math.round((score / questions.length) * 100);
    const stars = score >= 9 ? 3 : score >= 6 ? 2 : score >= 3 ? 1 : 0;
    return (
      <div className="space-y-5 animate-fade-in">
        <div className="game-card p-6 text-center stars-bg">
          <div className="text-6xl mb-2 animate-bounce-in">
            {stars === 3 ? "🏆" : stars === 2 ? "🥈" : stars === 1 ? "🥉" : "😅"}
          </div>
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3].map((s) => (
              <span key={s} className={`text-3xl ${s <= stars ? "opacity-100" : "opacity-20"}`}>⭐</span>
            ))}
          </div>
          <h2 className="font-russo text-2xl text-foreground mb-1">
            {stars === 3 ? "Грамотей!" : stars === 2 ? "Молодец!" : stars === 1 ? "Неплохо!" : "Учись дальше!"}
          </h2>
          <p className="text-muted-foreground text-sm mb-5">{GRADE_LABELS[selectedGrade]} · Словарные слова</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Верных ответов", value: `${score}/${questions.length}`, color: "hsl(var(--game-green))" },
              { label: "Точность", value: `${accuracy}%`, color: "hsl(var(--game-blue))" },
              { label: "Макс. комбо", value: `x${maxCombo}`, color: "hsl(var(--game-orange))" },
              { label: "XP заработано", value: `+${xpEarned}`, color: "hsl(var(--primary))" },
            ].map((s) => (
              <div key={s.label} className="bg-muted/50 rounded-2xl p-3 text-center">
                <p className="font-russo text-xl" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          {hintsUsed > 0 && (
            <p className="text-xs text-muted-foreground mb-4">💡 Использовано подсказок: {hintsUsed}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-3 rounded-2xl font-bold text-sm text-foreground border border-border hover:bg-muted transition-colors"
            >
              К играм
            </button>
            <button
              onClick={() => setPhase("intro")}
              className="flex-1 py-3 rounded-2xl font-russo text-sm text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, hsl(var(--game-pink)), hsl(0 80% 55%))" }}
            >
              Ещё раз
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const progress = ((currentIdx) / questions.length) * 100;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <Icon name="ArrowLeft" size={16} /> Выйти
        </button>
        <div className="flex items-center gap-3">
          {combo >= 3 && (
            <span className="text-xs font-bold text-game-orange animate-pulse">🔥 Комбо x{combo}!</span>
          )}
          <span className="text-sm font-bold text-primary">+{xpEarned} XP</span>
        </div>
      </div>

      <div className="game-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-muted-foreground">
            Слово {currentIdx + 1}/{questions.length}
          </span>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
            style={{ background: GRADE_COLORS[selectedGrade] }}
          >
            {GRADE_LABELS[selectedGrade]}
          </span>
        </div>
        <div className="xp-bar h-2.5 w-full">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: GRADE_COLORS[selectedGrade] }}
          />
        </div>
      </div>

      <div className="game-card p-6 text-center stars-bg relative">
        <p className="text-muted-foreground text-sm mb-3 font-nunito">Как пишется правильно?</p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <p className="font-russo text-4xl text-foreground">???</p>
          <button
            onClick={useHint}
            disabled={showHint || feedback !== null}
            className={`p-2 rounded-xl transition-all ${
              showHint ? "opacity-40 cursor-default" : "hover:scale-110 active:scale-95"
            }`}
            style={{ background: showHint ? "hsl(var(--muted))" : "hsl(var(--game-orange) / 0.2)", color: "hsl(var(--game-orange))" }}
            title="Подсказка (-5 XP)"
          >
            <Icon name="Lightbulb" size={20} />
          </button>
        </div>
        {showHint ? (
          <p className="text-game-orange text-sm font-bold animate-fade-in">💡 {q.hint}</p>
        ) : (
          <p className="text-muted-foreground text-sm">Нажми 💡 для подсказки</p>
        )}
        <div className="flex justify-center gap-1 mt-3">
          {Array.from({ length: questions.length }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background:
                  i < currentIdx
                    ? "hsl(var(--game-green))"
                    : i === currentIdx
                    ? GRADE_COLORS[selectedGrade]
                    : "hsl(var(--muted))",
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt === q.word;
          let bg = "hsl(var(--card))";
          let border = "hsl(var(--border))";
          let textColor = "hsl(var(--foreground))";
          if (isSelected && feedback === "correct") { bg = "hsl(var(--game-green) / 0.15)"; border = "hsl(var(--game-green))"; textColor = "hsl(var(--game-green))"; }
          if (isSelected && feedback === "wrong") { bg = "hsl(var(--game-red) / 0.15)"; border = "hsl(var(--game-red))"; textColor = "hsl(var(--game-red))"; }
          if (!isSelected && feedback !== null && isCorrect) { bg = "hsl(var(--game-green) / 0.1)"; border = "hsl(var(--game-green) / 0.6)"; }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={feedback !== null}
              className="py-4 px-3 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-default border-2 font-nunito"
              style={{ background: bg, borderColor: border, color: textColor }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState<Page>("home");

  const pages: Record<Page, JSX.Element> = {
    home: <HomePage onPlay={() => setPage("fastcount")} />,
    games: <GamesPage onPlayFast={() => setPage("fastcount")} onPlayWord={() => setPage("wordbattle")} />,
    achievements: <AchievementsPage />,
    rating: <RatingPage />,
    settings: <SettingsPage />,
    help: <HelpPage />,
    fastcount: <FastCountGame onBack={() => setPage("games")} />,
    wordbattle: <WordBattleGame onBack={() => setPage("games")} />,
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <header
        className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
        style={{
          background: "hsl(240 20% 6% / 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid hsl(var(--border))",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧩</span>
          <span className="font-russo text-lg shimmer-text">ЗнайКа</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-full">
            <span className="text-sm">⚡</span>
            <span className="font-russo text-sm text-game-orange">3240</span>
            <span className="text-xs text-muted-foreground">XP</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/60 px-2.5 py-1.5 rounded-full">
            <span className="text-sm">🔥</span>
            <span className="font-russo text-sm text-foreground">7</span>
          </div>
        </div>
      </header>

      <main className={`px-4 pt-4 ${page === "fastcount" || page === "wordbattle" ? "pb-6" : "pb-28"}`} key={page}>
        <div className="animate-fade-in max-w-lg mx-auto">{pages[page]}</div>
      </main>

      {page !== "fastcount" && page !== "wordbattle" && <NavBar active={page} onChange={setPage} />}
    </div>
  );
}