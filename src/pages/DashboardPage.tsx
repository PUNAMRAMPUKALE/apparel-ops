// src/pages/DashboardPage.tsx
// FULL PAGE CODE - Revenue fallback fixed

import { useSelector } from "react-redux";

export default function DashboardPage() {
  const state:any = useSelector((s:any)=>s);

  const orders =
    state?.orders?.items || [];

  const suppliers =
    state?.suppliers?.items || [];

  const brands =
    state?.brands?.items || [];

  const orderItems =
    state?.orderItems?.items || [];

  const brandMap:any = {};
  brands.forEach((b:any)=>{
    brandMap[String(b.id)] = b.name;
  });

  const getQtyValue = (x:any)=>
    Number(
      x.qty ??
      x.quantity ??
      x.orderQty ??
      x.units ??
      0
    );

  const getSellValue = (x:any)=>
    Number(
      x.sellPrice ??
      x.salesPrice ??
      x.sellingPrice ??
      x.price ??
      x.rate ??
      x.unitPrice ??
      x.mrp ??
      x.amount ??
      x.total ??
      0
    );

  const getCostValue = (x:any)=>
    Number(
      x.unitCost ??
      x.cost ??
      x.buyPrice ??
      x.purchasePrice ??
      x.costPrice ??
      0
    );

  const revenue =
    orderItems.reduce(
      (sum:number,row:any)=>
        sum +
        (getQtyValue(row) *
         getSellValue(row)),
      0
    );

  const cost =
    orderItems.reduce(
      (sum:number,row:any)=>
        sum +
        (getQtyValue(row) *
         getCostValue(row)),
      0
    );

  const profit =
    revenue - cost;

  const delayed =
    orders.filter(
      (x:any)=>
        x.status==="Delayed"
    ).length;

  const shipped =
    orders.filter(
      (x:any)=>
        x.status==="Shipped"
    ).length;

  const pending =
    orders.filter(
      (x:any)=>
        x.status !== "Delivered" &&
        x.status !== "Shipped"
    ).length;

  const recent =
    orders.slice(0,8);

  const getItems = (id:any)=>{
    return orderItems.filter(
      (x:any)=>
        String(x.orderId) === String(id)
    );
  };

  const getBrand = (o:any)=>{
    return (
      o.brand ||
      o.brandName ||
      brandMap[String(o.brandId)] ||
      "-"
    );
  };

  const getProduct = (o:any)=>{
    const rows = getItems(o.id);

    return (
      o.product ||
      rows[0]?.product ||
      rows[0]?.productName ||
      "-"
    );
  };

  const getQty = (o:any)=>{
    const rows = getItems(o.id);

    const total =
      rows.reduce(
        (a:number,b:any)=>
          a + getQtyValue(b),
        0
      );

    return (
      o.qty ||
      (total > 0 ? total : "-")
    );
  };

  return(
    <div>

      <h1 className="text-5xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="text-slate-500 mb-8 text-xl">
        Overview of your operations
      </p>

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="card p-6">
          <p className="text-slate-500">
            Orders
          </p>
          <h2 className="text-5xl font-bold mt-2">
            {orders.length}
          </h2>
        </div>

        <div className="card p-6">
          <p className="text-slate-500">
            Suppliers
          </p>
          <h2 className="text-5xl font-bold mt-2">
            {suppliers.length}
          </h2>
        </div>

        <div className="card p-6">
          <p className="text-slate-500">
            Revenue
          </p>
          <h2 className="text-3xl font-bold mt-2 break-words">
            ${revenue.toLocaleString()}
          </h2>
        </div>

        <div className="card p-6">
          <p className="text-slate-500">
            Profit
          </p>
          <h2 className="text-3xl font-bold mt-2 break-words">
            ${profit.toLocaleString()}
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="card p-6">
          <p className="text-slate-500">
            Pending Orders
          </p>
          <h2 className="text-4xl font-bold">
            {pending}
          </h2>
        </div>

        <div className="card p-6">
          <p className="text-slate-500">
            Shipped Orders
          </p>
          <h2 className="text-4xl font-bold">
            {shipped}
          </h2>
        </div>

        <div className="card p-6">
          <p className="text-slate-500">
            Delayed Orders
          </p>
          <h2 className="text-4xl font-bold">
            {delayed}
          </h2>
        </div>

      </div>

      <div className="card p-6">

        <h2 className="text-2xl font-bold mb-4">
          Recent Orders
        </h2>

        <div className="overflow-auto">

          <table>
            <thead>
              <tr>
                <th>PO</th>
                <th>Brand</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {recent.map((o:any)=>(
                <tr key={o.id}>
                  <td>{o.poNumber}</td>
                  <td>{getBrand(o)}</td>
                  <td>{getProduct(o)}</td>
                  <td>{getQty(o)}</td>
                  <td>{o.status}</td>
                </tr>
              ))}

            </tbody>
          </table>

        </div>

      </div>

    </div>
  );
}