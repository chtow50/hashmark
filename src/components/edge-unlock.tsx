import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useCallback, type ReactNode } from "react";
import { EdgeBuyButton } from "@/components/edge-pack";
import { DeskChip, Stat } from "@/components/marks";
import { PageHead, Panel } from "@/components/shell";
import { Button } from "@/components/ui/button";
import {
  EDGE_SUPPORT_EMAIL,
  UNLOCK_COPY,
  type EdgeUnlockPack,
  type EdgeUnlockResult,
  type EdgeUnlockStatus,
} from "@/lib/edge-unlock";
import { cn } from "@/lib/utils";

function rec(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function SupportMail({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className="text-fg underline-offset-4 hover:underline">
      {email}
    </a>
  );
}

function Gate({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <div className="space-y-8">
      <PageHead kicker={kicker} title={title} lede={lede} />
      {children}
      <Panel>
        <p className="text-sm leading-relaxed text-muted">
          {UNLOCK_COPY.supportLine}: <SupportMail email={EDGE_SUPPORT_EMAIL} />
        </p>
        <p className="mt-4 text-sm">
          <Link to="/edge" className="text-fg underline-offset-4 hover:underline">
            Back to Edge Pack
          </Link>
          <span className="text-faint"> · </span>
          <Link to="/" className="text-fg underline-offset-4 hover:underline">
            The board
          </Link>
        </p>
      </Panel>
    </div>
  );
}

function downloadText(filename: string, text: string, type: string) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function PackDownloads({ pack }: { pack: EdgeUnlockPack }) {
  const onMd = useCallback(() => {
    downloadText(pack.manifest.files.md, pack.markdown, "text/markdown;charset=utf-8");
  }, [pack]);
  const onJson = useCallback(() => {
    downloadText(pack.manifest.files.json, pack.jsonText, "application/json;charset=utf-8");
  }, [pack]);
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={onMd}>
        <Download className="size-4" />
        Download brief (.md)
      </Button>
      <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={onJson}>
        <Download className="size-4" />
        Download machine (.json)
      </Button>
    </div>
  );
}

type Card = {
  game: string;
  kick: string;
  hx: string;
  vegas: string;
  gap: string;
  flip: boolean;
  tier: string;
  cal: string;
  blurb: string;
};

function cardsFromPack(json: Record<string, unknown>): Card[] {
  const raw = json.confidence_cards;
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    const row = rec(item) ?? {};
    const gap = num(row.abs_gap_pts);
    return {
      game: str(row.game),
      kick: str(row.kick_ct),
      hx: str(row.hx_line),
      vegas: str(row.vegas_line),
      gap: gap == null ? "—" : gap.toFixed(1),
      flip: row.winner_flip === true,
      tier: str(row.confidence_tier),
      cal: [str(row.calibration_slice), str(row.calibration_flag)].filter(Boolean).join(" · "),
      blurb: str(row.pack_blurb),
    };
  });
}

function pulseRows(json: Record<string, unknown>, key: "top_up" | "top_down") {
  const pulse = rec(json.unit_od_pulse);
  const raw = pulse?.[key];
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 6).map((item) => {
    const row = rec(item) ?? {};
    const dhx = num(row.delta_hx);
    return {
      team: str(row.team),
      dhx: dhx == null ? "—" : (dhx >= 0 ? "+" : "") + dhx.toFixed(3),
      note: str(row.note),
    };
  });
}

function make12Rows(json: Record<string, unknown>) {
  const sim = rec(json.make12_full_sim);
  const raw = sim?.top15_make_field;
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, 10).map((item) => {
    const row = rec(item) ?? {};
    return {
      rank: num(row.rank_make_field),
      name: str(row.name),
      make: num(row.make_field_display),
      title: num(row.win_title_display),
    };
  });
}

function UnlockedPack({ pack }: { pack: EdgeUnlockPack }) {
  const json = pack.json;
  const desk = rec(json.desk_line);
  const tape = rec(json.week2_tape_scorecard);
  const cards = cardsFromPack(json);
  const notes = Array.isArray(json.model_notes)
    ? json.model_notes.filter((n): n is string => typeof n === "string")
    : [];
  const watch = rec(json.unit_od_pulse);
  const watchNotes = Array.isArray(watch?.watch_notes)
    ? watch.watch_notes.filter((n): n is string => typeof n === "string")
    : [];
  const make12 = rec(json.make12_full_sim);
  const tease = rec(make12?.free_board_tease);

  return (
    <div className="space-y-8">
      <PageHead
        kicker={`${pack.manifest.hx_stamp} · Week ${pack.manifest.week} · CLEARED`}
        title={UNLOCK_COPY.thanksTitle}
        lede={UNLOCK_COPY.thanksLede}
      />

      <Panel>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {pack.manifest.product}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {UNLOCK_COPY.supportLine}: <SupportMail email={pack.manifest.support_email} />
        </p>
        <div className="mt-5">
          <PackDownloads pack={pack} />
        </div>
      </Panel>

      {desk ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Panel>
            <Stat label="Top 25 closer" value={str(desk.top25_closer) || "—"} />
          </Panel>
          <Panel>
            <Stat label="Full slate closer" value={str(desk.full_slate_closer) || "—"} />
          </Panel>
          <Panel>
            <Stat label="SU" value={str(desk.su_full) || "—"} />
          </Panel>
          <Panel>
            <Stat
              label="Week 3 cards"
              value={num(desk.week3_cards) != null ? String(desk.week3_cards) : "—"}
              hint={`${num(desk.winner_flips) ?? "—"} winner flips · ${num(desk.abs_gap_ge_4) ?? "—"} |Δ| ≥ 4`}
            />
          </Panel>
        </div>
      ) : null}

      {tape ? (
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Week 2 tape</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{str(tape.headline)}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Stat label="SU" value={str(tape.su_full) || "—"} />
            <Stat label="Closer" value={str(tape.closer_full) || "—"} />
            <Stat label="Top 25 closer" value={str(tape.closer_top25) || "—"} />
          </div>
          {Array.isArray(tape.board_flags) ? (
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              {tape.board_flags.filter((n): n is string => typeof n === "string").map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </Panel>
      ) : null}

      {cards.length > 0 ? (
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Confidence cards</h2>
          <p className="mt-2 text-sm text-muted">
            Schema A–D. Never a lock badge. Soft-slice cards stay FLAG and do not lead.
          </p>
          <div className="mt-4 -mx-4 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em] text-faint">
                  <th className="px-4 py-2 font-medium sm:pl-0">Tier</th>
                  <th className="px-2 py-2 font-medium">Game</th>
                  <th className="px-2 py-2 font-medium">HX</th>
                  <th className="px-2 py-2 font-medium">Vegas</th>
                  <th className="px-2 py-2 font-medium">|Δ|</th>
                  <th className="px-4 py-2 font-medium sm:pr-0">Cal</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card) => (
                  <tr key={card.game} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 align-top sm:pl-0">
                      <DeskChip tone={card.tier === "D" ? "warn" : "accent"}>{card.tier}</DeskChip>
                      {card.flip ? (
                        <div className="mt-1">
                          <DeskChip tone="warn">Flip</DeskChip>
                        </div>
                      ) : null}
                    </td>
                    <td className="px-2 py-3 align-top">
                      <div className="font-medium text-fg">{card.game}</div>
                      <div className="mt-1 text-xs text-muted">{card.kick}</div>
                      <div className="mt-1 text-xs text-faint">{card.blurb}</div>
                    </td>
                    <td className="px-2 py-3 align-top tabular text-fg">{card.hx}</td>
                    <td className="px-2 py-3 align-top tabular text-muted">{card.vegas}</td>
                    <td className="px-2 py-3 align-top tabular text-fg">{card.gap}</td>
                    <td className="px-4 py-3 align-top text-xs text-muted sm:pr-0">{card.cal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Unit O/D pulse</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Top up</p>
              <ul className="mt-2 space-y-2 text-sm">
                {pulseRows(json, "top_up").map((row) => (
                  <li key={row.team} className="flex justify-between gap-3">
                    <span className="text-fg">{row.team}</span>
                    <span className="tabular text-up">{row.dhx}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Top down</p>
              <ul className="mt-2 space-y-2 text-sm">
                {pulseRows(json, "top_down").map((row) => (
                  <li key={row.team} className="flex justify-between gap-3">
                    <span className="text-fg">{row.team}</span>
                    <span className="tabular text-down">{row.dhx}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {watchNotes.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              {watchNotes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </Panel>
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Make 12</h2>
          {tease ? (
            <p className="mt-2 text-sm text-muted">
              {str(tease.team)} make-field {num(tease.make_field_display)} · title{" "}
              {num(tease.win_title_display)} — {str(tease.note) || "Make ≠ title"}.
            </p>
          ) : null}
          <ul className="mt-4 space-y-2 text-sm">
            {make12Rows(json).map((row) => (
              <li key={row.name} className="flex justify-between gap-3">
                <span className="text-fg">
                  <span className="tabular text-faint">{row.rank} </span>
                  {row.name}
                </span>
                <span className="tabular text-muted">
                  {row.make}% / {row.title}%
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {notes.length > 0 ? (
        <Panel>
          <h2 className="font-display text-2xl tracking-wide">Model notes</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            {notes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Panel>
      ) : null}

      <Panel>
        <h2 className="font-display text-2xl tracking-wide">Full brief</h2>
        <p className="mt-2 text-sm text-muted">CLEARed markdown, same file as the download.</p>
        <pre
          className={cn(
            "mt-4 max-h-[36rem] overflow-auto rounded-lg bg-inset p-4",
            "font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted",
          )}
        >
          {pack.markdown}
        </pre>
      </Panel>

      <p className="max-w-2xl text-xs leading-relaxed text-faint">
        {str(json.disclaimer) || "Not betting advice. No locks."} {str(json.footer)}
      </p>
    </div>
  );
}

function BuyAgain() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Panel>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Week sample</p>
        <p className="mt-2 text-sm text-muted">One week of the pack.</p>
        <EdgeBuyButton kind="week" label="Buy week sample" className="mt-5" />
      </Panel>
      <Panel>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Monthly</p>
        <p className="mt-2 text-sm text-muted">Weekly pack through the season.</p>
        <EdgeBuyButton kind="month" label="Buy monthly" className="mt-5" />
      </Panel>
    </div>
  );
}

const GATE: Record<
  Exclude<EdgeUnlockStatus, "unlocked">,
  { title: string; lede: string; buy?: boolean }
> = {
  missing_session: {
    title: UNLOCK_COPY.missingTitle,
    lede: UNLOCK_COPY.missingLede,
    buy: true,
  },
  invalid_session: {
    title: UNLOCK_COPY.invalidTitle,
    lede: "The session id on this URL is not a Stripe Checkout Session. Use the return link from checkout.",
    buy: true,
  },
  missing_key: {
    title: UNLOCK_COPY.keyTitle,
    lede: UNLOCK_COPY.keyLede,
  },
  not_found: {
    title: UNLOCK_COPY.notFoundTitle,
    lede: "Stripe does not have a Checkout Session for this id. Start from Edge Pack checkout.",
    buy: true,
  },
  unpaid: {
    title: UNLOCK_COPY.unpaidTitle,
    lede: UNLOCK_COPY.unpaidLede,
    buy: true,
  },
  stripe_error: {
    title: UNLOCK_COPY.stripeTitle,
    lede: UNLOCK_COPY.stripeLede,
  },
  pack_unavailable: {
    title: UNLOCK_COPY.packTitle,
    lede: "Payment verified, but this week’s pack is not marked CLEARED. Email the desk.",
  },
};

export function EdgeUnlockPage({ result }: { result: EdgeUnlockResult }) {
  if (result.status === "unlocked") {
    return <UnlockedPack pack={result.pack} />;
  }
  const gate = GATE[result.status];
  return (
    <Gate kicker="HX Edge Pack · unlock" title={gate.title} lede={gate.lede}>
      {gate.buy ? <BuyAgain /> : null}
    </Gate>
  );
}
