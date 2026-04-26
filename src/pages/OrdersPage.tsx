// src/pages/OrdersPage.tsx
// FINAL FIXED VERSION
// ✓ Ship Date visible
// ✓ Delivery visible
// ✓ All filters restored
// ✓ Good pagination colors
// ✓ Admin + Staff can update status
// ✓ Viewer read only
// ✓ Full data joins working

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../features/orders/ordersSlice";

export default function OrdersPage() {
  const dispatch = useDispatch();

  const state: any = useSelector((s: any) => s);

  const user = state.auth.user;

  const role = user?.role || "Viewer";

  const canEdit =
    role === "Admin" || role === "Staff";

  const orders =
    state.orders.items || [];

  const suppliers =
    state.suppliers.items || [];

  const brands =
    state.brands.items || [];

  const supplierMap: any = {};
  suppliers.forEach((x: any) => {
    supplierMap[x.id] = x.name;
  });

  const brandMap: any = {};
  brands.forEach((x: any) => {
    brandMap[x.id] = x.name;
  });

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [priority, setPriority] =
    useState("");

  const [page, setPage] =
    useState(1);

  const perPage = 10;

  const rows = useMemo(() => {
    return orders.filter((o: any) => {
      const supplier =
        supplierMap[o.supplierId] || "";

      const brand =
        brandMap[o.brandId] || "";

      const q =
        search.toLowerCase();

      const matchSearch =
        !search ||
        o.poNumber
          .toLowerCase()
          .includes(q) ||
        supplier
          .toLowerCase()
          .includes(q) ||
        brand
          .toLowerCase()
          .includes(q);

      const matchStatus =
        !status ||
        o.status === status;

      const matchPriority =
        !priority ||
        o.priority === priority;

      return (
        matchSearch &&
        matchStatus &&
        matchPriority
      );
    });
  }, [
    orders,
    search,
    status,
    priority
  ]);

  const totalPages =
    Math.ceil(
      rows.length / perPage
    ) || 1;

  const start =
    (page - 1) * perPage;

  const data =
    rows.slice(
      start,
      start + perPage
    );

  const pages = [];

  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {
    pages.push(i);
  }

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">
        Orders
      </h1>

      {/* FILTERS */}
      <div className="card p-6 mb-8">
        <div className="grid grid-cols-4 gap-4">

          <input
            placeholder="Search PO / Brand / Supplier"
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );
              setPage(1);
            }}
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(
                e.target.value
              );
              setPage(1);
            }}
          >
            <option value="">
              All Status
            </option>

            {[
              "Sampling",
              "Production",
              "QC",
              "Shipped",
              "Delivered",
              "Delayed",
              "Received"
            ].map((s) => (
              <option
                key={s}
                value={s}
              >
                {s}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => {
              setPriority(
                e.target.value
              );
              setPage(1);
            }}
          >
            <option value="">
              All Priority
            </option>

            {[
              "Low",
              "Medium",
              "High",
              "Urgent"
            ].map((s) => (
              <option
                key={s}
                value={s}
              >
                {s}
              </option>
            ))}
          </select>

          <button
            className="btn-primary"
            onClick={() => {
              setSearch("");
              setStatus("");
              setPriority("");
              setPage(1);
            }}
          >
            Reset
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="card p-6 overflow-auto">
        <table>
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Brand</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created</th>
              <th>Ship Date</th>
              <th>Delivery</th>
              <th>Currency</th>
            </tr>
          </thead>

          <tbody>
            {data.map((o: any) => (
              <tr key={o.id}>
                <td>{o.poNumber}</td>

                <td>
                  {brandMap[
                    o.brandId
                  ] || "-"}
                </td>

                <td>
                  {supplierMap[
                    o.supplierId
                  ] || "-"}
                </td>

                <td>
                  {canEdit ? (
                    <select
                      value={o.status}
                      onChange={(e) =>
                        dispatch(
                          updateStatus({
                            id: o.id,
                            status:
                              e.target
                                .value
                          })
                        )
                      }
                    >
                      {[
                        "Sampling",
                        "Production",
                        "QC",
                        "Shipped",
                        "Delivered",
                        "Delayed",
                        "Received"
                      ].map((x) => (
                        <option
                          key={x}
                          value={x}
                        >
                          {x}
                        </option>
                      ))}
                    </select>
                  ) : (
                    o.status
                  )}
                </td>

                <td>
                  {o.priority}
                </td>

                <td>
                  {o.createdAt}
                </td>

                <td>
                  {o.shipDate}
                </td>

                <td>
                  {o.deliveryDate}
                </td>

                <td>
                  {o.currency}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex items-center gap-2 mt-6">

          <button
            className="px-4 py-2 rounded-xl bg-slate-200"
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            Prev
          </button>

          {pages
            .slice(
              Math.max(
                0,
                page - 3
              ),
              Math.max(
                0,
                page - 3
              ) + 5
            )
            .map((p) => (
              <button
                key={p}
                onClick={() =>
                  setPage(p)
                }
                className={`px-4 py-2 rounded-xl ${
                  p === page
                    ? "bg-orange-500 text-white"
                    : "bg-slate-200"
                }`}
              >
                {p}
              </button>
            ))}

          <button
            className="px-4 py-2 rounded-xl bg-slate-200"
            disabled={
              page === totalPages
            }
            onClick={() =>
              setPage(page + 1)
            }
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}