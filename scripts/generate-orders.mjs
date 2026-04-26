import fs from "fs";
import { faker } from "@faker-js/faker";

faker.seed(500);

const brands = [
 "Market","CPFM","Off White","Essentials","Fear of God",
 "Represent","Rhude","Palm Angels","Kith","Stussy"
];

const products = [
 "Oversized Hoodie",
 "Heavy Tee",
 "Joggers",
 "Cargo Pants",
 "Crewneck",
 "Beanie",
 "Cap",
 "Puffer Jacket",
 "Shorts",
 "Denim Jacket"
];

const countries = [
 "Pakistan","China","Vietnam","Bangladesh",
 "Turkey","India","Mexico","United States"
];

const statuses = [
 "Received","Sampling","Confirmed","Production",
 "QC","Packed","Shipped","In Transit",
 "Delivered","Delayed"
];

/* NO OS ANYMORE */
const sizeMap = {
 "Oversized Hoodie":["S","M","L","XL","XXL"],
 "Heavy Tee":["XS","S","M","L","XL"],
 "Joggers":["S","M","L","XL"],
 "Cargo Pants":["30","32","34","36","38"],
 "Crewneck":["S","M","L","XL","XXL"],
 "Beanie":["S","M","L"],
 "Cap":["S","M","L"],
 "Puffer Jacket":["M","L","XL","XXL"],
 "Shorts":["S","M","L","XL"],
 "Denim Jacket":["M","L","XL","XXL"]
};

function rand(min,max){
 return faker.number.int({min,max});
}

function makeSizes(product, qty){
 const allowed = [...sizeMap[product]];
 const pickCount = rand(2, Math.min(allowed.length,4));

 const selected = faker.helpers.shuffle(allowed).slice(0,pickCount);

 let remain = qty;
 const out = {};

 selected.forEach((size,index)=>{
   if(index === selected.length-1){
     out[size] = remain;
   }else{
     const left = selected.length-index-1;
     const maxAlloc = remain-left;
     const val = rand(1, Math.max(1, Math.floor(maxAlloc*0.65)));
     out[size] = val;
     remain -= val;
   }
 });

 return out;
}

function cost(product){
 switch(product){
  case "Cap": return rand(4,8);
  case "Beanie": return rand(3,7);
  case "Heavy Tee": return rand(6,14);
  case "Oversized Hoodie": return rand(14,28);
  case "Crewneck": return rand(12,24);
  case "Joggers": return rand(12,22);
  case "Cargo Pants": return rand(16,30);
  case "Shorts": return rand(10,18);
  case "Puffer Jacket": return rand(28,65);
  case "Denim Jacket": return rand(24,55);
  default: return rand(8,20);
 }
}

const orders = [];

for(let i=1;i<=1200;i++){

 const product = faker.helpers.arrayElement(products);
 const qty = rand(120,5000);
 const sizes = makeSizes(product, qty);

 const unitCost = cost(product);
 const sellPrice = unitCost + rand(8,28);

 const freight = rand(500,6500);
 const tariff = rand(0,18);

 const revenue = qty * sellPrice;
 const landedCost = qty*unitCost + freight + ((qty*unitCost)*tariff/100);
 const profit = revenue - landedCost;
 const margin = Number(((profit/revenue)*100).toFixed(2));

 const created = faker.date.between({
   from:"2025-10-01",
   to:"2026-04-25"
 });

 const ship = faker.date.soon({days:45, refDate:created});
 const delivery = faker.date.soon({days:25, refDate:ship});

 orders.push({
   id:i,
   poNumber:`PO-2026-${1000+i}`,
   brand: faker.helpers.arrayElement(brands),
   product,
   qty,
   sizes,
   supplierId: rand(1,250),
   supplierName: `${faker.company.name()} Manufacturing`,
   country: faker.helpers.arrayElement(countries),
   unitCost,
   sellPrice,
   freight,
   tariff,
   landedCost:Number(landedCost.toFixed(2)),
   revenue:Number(revenue.toFixed(2)),
   profit:Number(profit.toFixed(2)),
   margin,
   priority: faker.helpers.arrayElement(["Low","Medium","High","Urgent"]),
   merchandiser: faker.person.fullName(),
   status: faker.helpers.arrayElement(statuses),
   createdAt: created.toISOString().slice(0,10),
   shipDate: ship.toISOString().slice(0,10),
   deliveryDate: delivery.toISOString().slice(0,10)
 });
}

fs.writeFileSync(
 "./src/data/orders.json",
 JSON.stringify(orders,null,2)
);

console.log("Orders regenerated without OS sizes");
