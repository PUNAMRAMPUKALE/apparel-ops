import { useSelector } from "react-redux";

export default function SettingsPage() {
  const user = useSelector(
    (s: any) => s?.auth?.user
  );

  return (
    <div>
      <style>{`
        a[href="/settings"]{
          background:linear-gradient(90deg,#b45309,#d97706);
          color:#fff !important;
          border-radius:14px;
          font-weight:700;
        }
      `}</style>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold mb-2">
            Settings
          </h1>
          <p className="text-slate-500 text-lg">
            Manage profile, system and access controls
          </p>
        </div>

        <button
          className="px-6 py-3 rounded-2xl text-white font-semibold"
          style={{
            background:
              "linear-gradient(90deg,#b45309,#d97706)"
          }}
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">

        {/* PROFILE */}
        <div className="card p-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
              style={{
                background:
                  "linear-gradient(90deg,#92400e,#d97706)"
              }}
            >
              {(
                user?.name ||
                "A"
              )
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Profile
              </h2>
              <p className="text-slate-500">
                User information
              </p>
            </div>
          </div>

          <div className="space-y-4 text-lg">
            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">
                Name
              </span>
              <span className="font-semibold">
                {user?.name ||
                  "Admin"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">
                Role
              </span>
              <span className="font-semibold uppercase">
                {user?.role ||
                  "ADMIN"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-slate-500">
                Email
              </span>
              <span className="font-semibold">
                {user?.email ||
                  "admin@ops.com"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Status
              </span>
              <span className="px-3 py-1 rounded-xl bg-green-100 text-green-700 font-semibold">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* SYSTEM */}
        <div className="card p-8">
          <h2 className="text-3xl font-bold mb-6">
            System
          </h2>

          <div className="space-y-5 text-lg">
            <div className="flex justify-between">
              <span className="text-slate-500">
                Theme
              </span>
              <span>
                Luxury Ops
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Currency
              </span>
              <span>USD</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Language
              </span>
              <span>English</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Data Mode
              </span>
              <span>
                Local Storage
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">
                Version
              </span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>

        {/* ACCESS */}
        <div className="card p-8">
          <h2 className="text-3xl font-bold mb-6">
            Permissions
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div className="p-4 rounded-2xl bg-slate-50 border">
              Orders Access
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border">
              Supplier Access
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border">
              Reports Access
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border">
              Settings Access
            </div>

          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="card p-8">
          <h2 className="text-3xl font-bold mb-6">
            Notifications
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between items-center">
              <span>
                Email Alerts
              </span>
              <span className="px-3 py-1 rounded-xl bg-green-100 text-green-700 font-semibold">
                Enabled
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>
                Delay Alerts
              </span>
              <span className="px-3 py-1 rounded-xl bg-green-100 text-green-700 font-semibold">
                Enabled
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>
                Weekly Summary
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-700 font-semibold">
                Optional
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}