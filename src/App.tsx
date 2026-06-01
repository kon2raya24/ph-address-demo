import { useState } from 'react';
import { PhAddressPicker, type AddressValue } from '@ph-dev-utils/address-react';
import '@ph-dev-utils/address-react/theme.css';

function oneLine(v: AddressValue): string {
  return [v.barangay?.name, v.city?.name, v.province?.name, v.region?.name, v.zip]
    .filter(Boolean)
    .join(', ');
}

export function App() {
  const [value, setValue] = useState<AddressValue | null>(null);
  const ambiguous = (value?.zipOptions.length ?? 0) > 1;

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 font-sans">
      <header className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-ph-blue/10 px-3 py-1 text-xs font-semibold text-ph-blue">
          🇵🇭 @ph-dev-utils/address-react
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Philippine Address Picker
        </h1>
        <p className="mt-2 text-slate-600">
          A cascading <span className="font-medium">region → province → city/municipality → barangay → ZIP</span> selector
          for React. Barangays lazy-load per city; ZIP autofills. The city &amp; barangay fields are{' '}
          <span className="font-medium">searchable</span> (v0.3) — type to filter a 50+ entry list. Handles the things PH
          forms get wrong: NCR has no provinces, independent cities belong to no province, and big cities have many ZIP codes.
        </p>
        <pre className="mt-4 overflow-auto rounded-lg bg-slate-900 px-4 py-3 text-sm text-slate-100 font-mono">
          npm install @ph-dev-utils/address-react
        </pre>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Try it
          </h2>
          <PhAddressPicker onChange={setValue} showBarangay searchable />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Value
          </h2>
          {value && oneLine(value) ? (
            <p className="mb-3 rounded-lg bg-ph-blue/5 px-3 py-2 text-slate-800">{oneLine(value)}</p>
          ) : (
            <p className="mb-3 text-slate-400">Make a selection…</p>
          )}
          {ambiguous && (
            <p className="mb-3 rounded-lg bg-ph-yellow/20 px-3 py-2 text-sm text-amber-800">
              ⚠️ This city has {value!.zipOptions.length} ZIP codes — autofilled one; the picker lets you
              choose or edit.
            </p>
          )}
          <pre className="overflow-auto rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700 font-mono">
            {JSON.stringify(value, null, 2)}
          </pre>
        </section>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ['NCR has no provinces', 'Pick NCR → the province step disappears. province: null is a valid, complete value.'],
          ['Independent cities', 'Isabela City (r09) & Cotabato City (r12) belong to no province — still reachable.'],
          ['Multi-ZIP cities', 'Manila has ~200 ZIPs, Davao 12. Autofill + editable + a candidate picker — never silently wrong.'],
        ].map(([title, body]) => (
          <div key={title} className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-ph-blue">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{body}</p>
          </div>
        ))}
      </section>

      <footer className="mt-10 border-t border-slate-200 pt-5 text-sm text-slate-500">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a className="text-ph-blue hover:underline" href="https://www.npmjs.com/package/@ph-dev-utils/address-react">
            npm
          </a>
          <a className="text-ph-blue hover:underline" href="https://github.com/kon2raya24/ph-address-picker">
            GitHub
          </a>
          <span>Part of the @ph-dev-utils family for Filipino devs.</span>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Region/province/city: PSA Q4 2024 PSGC. ZIP: GeoNames (CC BY 4.0), community-sourced — not an
          official PHLPost feed. Verify ZIPs for production-critical use.
        </p>
      </footer>
    </div>
  );
}
