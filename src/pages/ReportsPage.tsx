import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function ReportsPage() {
  const state: any = useSelector((s: any) => s);

  const orders =
    state?.orders?.items ||
    state?.orders ||
    [];

  const items =
    state?.orderItems?.items ||
    state?.orderItems ||
    [];

  const [month, setMonth] = useState("");

  const months = useMemo(() => {
    return [
      ...new Set(
        orders.map((o: any) =>
          String(o.createdAt || "").slice(0, 7)
        )
      )
    ]
      .filter(Boolean)
      .sort()
      .reverse();
  }, [orders]);

  const data = useMemo(() => {
    const filteredOrders = orders.filter((o: any) =>
      month
        ? String(o.createdAt).startsWith(month)
        : true
    );

    const ids = new Set(
      filteredOrders.map((o: any) => o.id)
    );

    const filteredItems = items.filter((x: any) =>
      ids.has(x.orderId)
    );

    const delayed = filteredOrders.filter(
      (x: any) => x.status === "Delayed"
    ).length;

    const shipped = filteredOrders.filter(
      (x: any) =>
        x.status === "Shipped" ||
        x.status === "Delivered"
    ).length;

    const active = filteredOrders.filter(
      (x: any) =>
        ["Received","Sampling","Production","QC","Packed"].includes(
          x.status
        )
    ).length;

    const revenue = filteredItems.reduce(
      (a: number, b: any) =>
        a +
        ((b.sellPrice ||
          (b.unitCost || 0) * 1.7) *
          (b.qty || 0)),
      0
    );

    const cost = filteredItems.reduce(
      (a: number, b: any) =>
        a +
        ((b.unitCost || 0) *
          (b.qty || 0)),
      0
    );

    const profit = revenue - cost;

    const margin =
      revenue > 0
        ? ((profit / revenue) * 100).toFixed(1)
        : "0.0";

    const statusMap: any = {};

    filteredOrders.forEach((o: any) => {
      statusMap[o.status] =
        (statusMap[o.status] || 0) + 1;
    });

    const statusChart = Object.keys(statusMap).map(
      (k) => ({
        name: k,
        value: statusMap[k]
      })
    );

    const monthlyMap: any = {};

    orders.forEach((o: any) => {
      const m = String(o.createdAt).slice(0, 7);

      if (!monthlyMap[m]) {
        monthlyMap[m] = 0;
      }

      monthlyMap[m]++;
    });

    const monthlyChart = Object.keys(
      monthlyMap
    )
      .sort()
      .map((k) => ({
        month: k,
        orders: monthlyMap[k]
      }));

    return {
      active,
      shipped,
      delayed,
      revenue,
      cost,
      profit,
      margin,
      statusChart,
      monthlyChart
    };
  }, [orders, items, month]);

  const compactMoney = (n: number) =>
    new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1
      }
    ).format(n);

  const money = (n: number) =>
    "$" +
    n.toLocaleString(undefined, {
      maximumFractionDigits: 0
    });

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#f97316", // orange
  "#84cc16"  // lime
];

  return (
    <div>
      <style>{`
        a[href="/reports"]{
          background:linear-gradient(90deg,#b45309,#d97706);
          color:#fff !important;
          border-radius:14px;
          font-weight:700;
        }
      `}</style>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold">
          Reports
        </h1>

        <select
          value={month}
          onChange={(e) =>
            setMonth(e.target.value)
          }
          className="w-60"
        >
          <option value="">
            All Months
          </option>

          {months.map((m: string) => (
            <option
              key={m}
              value={m}
            >
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="card p-6">
          <p className="text-slate-500 mb-2">
            Active Orders
          </p>
          <h2 className="text-4xl font-bold">
            {data.active}
          </h2>
        </div>

        <div className="card p-6">
          <p className="text-slate-500 mb-2">
            Shipped
          </p>
          <h2 className="text-4xl font-bold">
            {data.shipped}
          </h2>
        </div>

        <div className="card p-6">
          <p className="text-slate-500 mb-2">
            Delayed
          </p>
          <h2 className="text-4xl font-bold">
            {data.delayed}
          </h2>
        </div>

        <div className="card p-6">
          <p className="text-slate-500 mb-2">
            Profit
          </p>
          <h2 className="text-4xl font-bold">
            {compactMoney(
              data.profit
            )}
          </h2>
        </div>

      </div>

      <div className="card p-6 mb-8">
        <h2 className="text-3xl font-bold mb-6">
          Revenue Summary
        </h2>

        <table>
          <thead>
            <tr>
              <th>Total Revenue</th>
              <th>Total Cost</th>
              <th>Total Profit</th>
              <th>Margin %</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{money(data.revenue)}</td>
              <td>{money(data.cost)}</td>
              <td>{money(data.profit)}</td>
              <td>{data.margin}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-8">

        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">
            Orders by Month
          </h2>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data.monthlyChart}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="#d97706"
                  radius={[8,8,0,0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">
            Order Status Mix
          </h2>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={
                    data.statusChart
                  }
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {data.statusChart.map(
                    (_: any, i: number) => (
                      <Cell
                        key={i}
                        fill={
                          COLORS[
                            i %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}