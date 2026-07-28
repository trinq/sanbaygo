import { useLanguage } from '../../contexts/LanguageContext';

const STEP_ICON_PATHS = [
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", // clock
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", // document
  "M13 10V3L4 14h7v7l9-11h-7z", // lightning
];

export function HowItWorks() {
  const { t } = useLanguage();
  const { steps, title } = t.landing.howItWorks;

  return (
    <section className="mt-16 border-t border-surface-border pt-12">
      <h2 className="text-center text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {steps.map((step: { number: string; label: string; description: string }, i: number) => (
          <div key={step.number} className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={STEP_ICON_PATHS[i]} />
                </svg>
              </div>
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {step.number}
              </span>
            </div>
            <h3 className="mt-4 font-semibold text-ink">{step.label}</h3>
            <p className="mt-2 text-sm text-ink-soft">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
