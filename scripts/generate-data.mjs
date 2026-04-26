import { faker } from '@faker-js/faker';
import fs from 'fs';

const countries = [
  "Pakistan","China","Vietnam","Bangladesh",
  "Turkey","United States","Mexico","India"
];

const statuses = [
  "Pending","Sampling","Production",
  "QC","Shipped","Delivered","Delayed"
];

const productTypes = [
  "T-Shirt","Hoodie","Sweatpants","Cap",
  "Denim Jacket","Joggers","Crewneck",
  "Shorts","Puffer Jacket","Beanie"
];

const roles = ["admin","staff","viewer"];

// USERS
const users = [];
for (let i = 1; i <= 100; i++) {
  users.push({
    id: i,
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: "1234",
    role: i === 1 ? "admin" : faker.helpers.arrayElement(roles),
    status: "active"
  });
}

// BRANDS
const brands = [];
for (let i = 1; i <= 50; i++) {
  brands.push({
    id: i,
    name: faker.company.name() + " Apparel"
  });
}

// SUPPLIERS
const suppliers = [];
for (let i = 1; i <= 250; i++) {
  suppliers.push({
    id: i,
    name: faker.company.name(),
    country: faker.helpers.arrayElement(countries),
    type: faker.helpers.arrayElement([
      "Cut & Sew",
      "Fabric Mill",
      "Accessories",
      "Printing",
      "Packaging"
    ]),
    moq: faker.number.int({ min: 50, max: 1000 }),
    leadTime: faker.number.int({ min: 7, max: 45 }),
    rating: faker.number.float({ min: 3, max: 5, multipleOf: 0.1 })
  });
}

// PRODUCTS
const products = [];
for (let i = 1; i <= 500; i++) {
  products.push({
    id: i,
    sku: "SKU-" + i,
    name: faker.helpers.arrayElement(productTypes),
    color: faker.color.human(),
    size: faker.helpers.arrayElement(["XS","S","M","L","XL","XXL"])
  });
}

// ORDERS
const orders = [];
for (let i = 1; i <= 3000; i++) {
  const qty = faker.number.int({ min: 50, max: 2500 });
  const unitCost = faker.number.float({ min: 4, max: 28, multipleOf: 0.01 });
  const sellPrice = unitCost + faker.number.float({ min: 5, max: 20, multipleOf: 0.01 });

  orders.push({
    id: 1000 + i,
    poNumber: "PO-2026-" + (1000 + i),
    brand: faker.helpers.arrayElement(brands).name,
    product: faker.helpers.arrayElement(productTypes),
    qty,
    sizes: {
      S: faker.number.int({ min: 10, max: 300 }),
      M: faker.number.int({ min: 10, max: 500 }),
      L: faker.number.int({ min: 10, max: 500 }),
      XL: faker.number.int({ min: 10, max: 300 })
    },
    supplierId: faker.number.int({ min: 1, max: 250 }),
    country: faker.helpers.arrayElement(countries),
    unitCost,
    sellPrice,
    freight: faker.number.int({ min: 100, max: 5000 }),
    tariff: faker.number.int({ min: 0, max: 18 }),
    profit: Number(((sellPrice - unitCost) * qty).toFixed(2)),
    status: faker.helpers.arrayElement(statuses),
    createdAt: faker.date.recent({ days: 180 }).toISOString().split('T')[0]
  });
}

// WRITE FILES
fs.writeFileSync('./src/data/users.json', JSON.stringify(users, null, 2));
fs.writeFileSync('./src/data/brands.json', JSON.stringify(brands, null, 2));
fs.writeFileSync('./src/data/suppliers.json', JSON.stringify(suppliers, null, 2));
fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, 2));
fs.writeFileSync('./src/data/orders.json', JSON.stringify(orders, null, 2));

console.log("Huge data generated successfully!");
