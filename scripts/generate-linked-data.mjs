import fs from "fs";
import { faker } from "@faker-js/faker";

faker.seed(2026);

fs.mkdirSync("./src/data", { recursive: true });

const brandNames = [
  "Off White",
  "Fear of God",
  "Essentials",
  "CPFM",
  "Market",
  "Supreme",
  "Palm Angels",
  "Represent",
  "Aime Leon Dore",
  "Rhude",
  "Stussy",
  "Kith",
  "Amiri",
  "Yeezy",
  "Balenciaga"
];

const countries = [
  "India",
  "China",
  "Vietnam",
  "Bangladesh",
  "Turkey",
  "Portugal",
  "Mexico",
  "Italy"
];

const currencies = {
  India: "USD",
  China: "USD",
  Vietnam: "USD",
  Bangladesh: "USD",
  Turkey: "EUR",
  Portugal: "EUR",
  Mexico: "USD",
  Italy: "EUR"
};

const products = [
  "Oversized Hoodie",
  "T-Shirt",
  "Joggers",
  "Denim Jacket",
  "Cargo Pants",
  "Crewneck",
  "Cap",
  "Beanie",
  "Shorts",
  "Zip Hoodie"
];

const sizes = ["XS","S","M","L","XL","XXL"];
const statuses = ["Received","Sampling","Production","QC","Packed","Shipped","Delivered","Delayed"];
const priorities = ["Low","Medium","High","Urgent"];

const brands = [];
for (let i = 1; i <= 150; i++) {
  const country = faker.helpers.arrayElement(countries);
  brands.push({
    id: i,
    name: `${faker.helpers.arrayElement(brandNames)} ${i}`,
    country,
    currency: currencies[country]
  });
}

const suppliers = [];
for (let i = 1; i <= 300; i++) {
  suppliers.push({
    id: i,
    name: `${faker.company.name()} Manufacturing`,
    country: faker.helpers.arrayElement(countries),
    rating: faker.number.int({ min: 3, max: 5 })
  });
}

const orders = [];
const shipments = [];
const orderItems = [];

for (let i = 1; i <= 1000; i++) {
  const brandId = faker.number.int({ min: 1, max: brands.length });
  const supplierId = faker.number.int({ min: 1, max: suppliers.length });

  const created = faker.date.between({
    from: "2025-01-01",
    to: "2026-04-30"
  });

  const ship = faker.date.soon({
    days: 40,
    refDate: created
  });

  const delivery = faker.date.soon({
    days: 20,
    refDate: ship
  });

  const status = faker.helpers.arrayElement(statuses);
  const priority = faker.helpers.arrayElement(priorities);

  orders.push({
    id: i,
    poNumber: `PO-2026-${String(1000 + i)}`,
    brandId,
    supplierId,
    status,
    priority,
    createdAt: created.toISOString().slice(0,10),
    shipDate: ship.toISOString().slice(0,10),
    deliveryDate: delivery.toISOString().slice(0,10),
    currency: brands[brandId - 1].currency
  });

  shipments.push({
    id: i,
    orderId: i,
    carrier: faker.helpers.arrayElement(["DHL","FedEx","UPS","Maersk"]),
    mode: faker.helpers.arrayElement(["Air","Sea","Road"]),
    trackingNo: faker.string.alphanumeric(12).toUpperCase(),
    eta: delivery.toISOString().slice(0,10)
  });

  const lines = faker.number.int({ min: 1, max: 4 });

  for (let x = 1; x <= lines; x++) {
    const qty = faker.number.int({ min: 50, max: 500 });
    const unitCost = faker.number.float({ min: 5, max: 90, precision: 0.01 });

    orderItems.push({
      id: orderItems.length + 1,
      orderId: i,
      product: faker.helpers.arrayElement(products),
      size: faker.helpers.arrayElement(sizes),
      qty,
      unitCost,
      totalCost: +(qty * unitCost).toFixed(2)
    });
  }
}

const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@velocity.com",
    password: "admin123",
    role: "Admin"
  },
  {
    id: 2,
    name: "Merchandiser",
    email: "merch@velocity.com",
    password: "merch123",
    role: "Merchandiser"
  },
  {
    id: 3,
    name: "Operations",
    email: "ops@velocity.com",
    password: "ops123",
    role: "Operations"
  }
];

fs.writeFileSync("./src/data/users.json", JSON.stringify(users,null,2));
fs.writeFileSync("./src/data/brands.json", JSON.stringify(brands,null,2));
fs.writeFileSync("./src/data/suppliers.json", JSON.stringify(suppliers,null,2));
fs.writeFileSync("./src/data/orders.json", JSON.stringify(orders,null,2));
fs.writeFileSync("./src/data/shipments.json", JSON.stringify(shipments,null,2));
fs.writeFileSync("./src/data/orderItems.json", JSON.stringify(orderItems,null,2));

console.log("✅ Clean linked production data generated");
