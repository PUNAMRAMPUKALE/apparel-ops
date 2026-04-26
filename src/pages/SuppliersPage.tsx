import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function SuppliersPage() {
  const state: any = useSelector((s: any) => s);

  const rows =
    state?.suppliers?.items ||
    state?.suppliers ||
    [];

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");

  /* dynamic countries from real JSON */
  const countries = useMemo(() => {
    return [...new Set(rows.map((x: any) => x.country))]
      .filter(Boolean)
      .sort();
  }, [rows]);

  const items = useMemo(() => {
    return rows
      .filter((x: any) => {
        const okCountry = country
          ? x.country === country
          : true;

        const q = search.toLowerCase();

        const okSearch = search
          ? (x.name || "").toLowerCase().includes(q) ||
            (x.country || "").toLowerCase().includes(q)
          : true;

        return okCountry && okSearch;
      })
      .slice(0, 120);
  }, [rows, country, search]);

  return (
    <div>
      <style>{`
        a[href="/suppliers"]{
          background:linear-gradient(90deg,#b45309,#d97706);
          color:#fff !important;
          border-radius:14px;
          font-weight:700;
        }
      `}</style>

      <h1 className="text-5xl font-bold mb-8">Suppliers</h1>

      <div className="card p-6 mb-8">
        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Search supplier / country"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">All Countries</option>

            {countries.map((c: string) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {items.map((s: any) => (
          <div
            key={s.id}
            className="card p-6"
          >
            <h2 className="text-lg font-bold mb-3">
              {s.name}
            </h2>

            <div className="space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">
                  Country:
                </span>{" "}
                {s.country || "-"}
              </p>

              <p>
                <span className="font-semibold text-slate-800">
                  MOQ:
                </span>{" "}
                {s.moq || 100}
              </p>

              <p>
                <span className="font-semibold text-slate-800">
                  Lead Time:
                </span>{" "}
                {s.leadTime || "25 Days"}
              </p>

              <p>
                <span className="font-semibold text-slate-800">
                  Rating:
                </span>{" "}
                ⭐ {s.rating || 4}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}