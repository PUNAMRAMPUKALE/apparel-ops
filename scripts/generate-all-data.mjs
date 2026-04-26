import fs from "fs";
import { faker } from "@faker-js/faker";

faker.seed(42);

const roles = ["admin","staff","viewer"];

const users = [
 { id:1,name:"Admin User",email:"admin@apparel.com",password:"1234",role:"admin",status:"active"},
 { id:2,name:"Staff User",email:"staff@apparel.com",password:"1234",role:"staff",status:"active"},
 { id:3,name:"Viewer User",email:"viewer@apparel.com",password:"1234",role:"viewer",status:"active"},
];

for(let i=4;i<=40;i++){
 users.push({
   id:i,
   name:faker.person.fullName(),
   email:`user${i}@apparel.com`,
   password:"1234",
   role:faker.helpers.arrayElement(roles),
   status:"active"
 });
}

const brandNames = [
 "Market","CPFM","Essentials","Fear of God","Represent",
 "Rhude","Palm Angels","Off White","Daily Paper","Alo",
 "Kith","Stussy","Supreme","Nike Collab","Adidas Lab"
];

const brands = brandNames.map((x,i)=>({
 id:i+1,
 name:x,
 tier:faker.helpers.arrayElement(["A","B","C"]),
 region:faker.helpers.arrayElement(["USA","EU","UAE","UK","Asia"]),
 yearlyRevenue:faker.number.int({min:500000,max:12000000})
}));

const productNames = [
 "Heavy Tee","Oversized Hoodie","Joggers","Cargo Pants","Crewneck",
 "Beanie","Cap","Puffer Jacket","Shorts","Sweatpants","Denim Jacket"
];

const colors = [
 "Black","White","Cream","Grey","Olive","Brown","Navy","Sand","Blue","Red"
];

const sizes = ["XS","S","M","L","XL","XXL"];

const products = [];

for(let i=1;i<=300;i++){
 products.push({
   id:i,
   sku:`SKU-${1000+i}`,
   name:faker.helpers.arrayElement(productNames),
   category:faker.helpers.arrayElement(["Topwear","Bottomwear","Outerwear","Accessories"]),
   color:faker.helpers.arrayElement(colors),
   size:faker.helpers.arrayElement(sizes),
   baseCost:Number(faker.finance.amount(4,30,2)),
   active:true
 });
}

const countries = [
 "Pakistan","China","Vietnam","Bangladesh","Turkey","India","Mexico","United States"
];

const supplierTypes = [
 "Cut & Sew","Fabric Mill","Printing","Packaging","Accessories"
];

const suppliers = [];

for(let i=1;i<=250;i++){
 suppliers.push({
   id:i,
   name:`${faker.company.name()} Manufacturing`,
   country:faker.helpers.arrayElement(countries),
   type:faker.helpers.arrayElement(supplierTypes),
   moq:faker.number.int({min:100,max:3000}),
   leadTime:faker.number.int({min:10,max:60}),
   rating:Number(faker.finance.amount(3,5,1)),
   paymentTerms:faker.helpers.arrayElement(["30% Advance","Net 30","Net 45"]),
   compliance:faker.helpers.arrayElement(["Approved","Audit Due","Pending"]),
   monthlyCapacity:faker.number.int({min:5000,max:50000})
 });
}

function buildSizes(qty){
 let rem = qty;
 const obj = {};
 const order = ["XS","S","M","L","XL","XXL"];
 for(let i=0;i<order.length;i++){
   if(i===order.length-1){
     obj[order[i]] = rem;
   }else{
     const val = faker.number.int({min:0,max:Math.floor(rem*0.45)});
     obj[order[i]] = val;
     rem -= val;
   }
 }
 return obj;
}

const statuses = [
 "Received","Sampling","Confirmed","Production","QC",
 "Packed","Shipped","In Transit","Delivered","Delayed"
];

const orders = [];

for(let i=1;i<=1500;i++){

 const qty = faker.number.int({min:120,max:5000});
 const unitCost = Number(faker.finance.amount(4,28,2));
 const sellPrice = Number((unitCost + faker.number.int({min:5,max:22})).toFixed(2));
 const freight = faker.number.int({min:500,max:7000});
 const tariff = faker.number.int({min:0,max:18});

 const revenue = qty*sellPrice;
 const landedCost = qty*unitCost + freight + ((qty*unitCost)*tariff/100);
 const profit = revenue - landedCost;
 const margin = Number(((profit/revenue)*100).toFixed(2));

 const supplier = faker.helpers.arrayElement(suppliers);
 const brand = faker.helpers.arrayElement(brands);
 const product = faker.helpers.arrayElement(products);

 const created = faker.date.between({
   from:"2025-10-01",
   to:"2026-04-25"
 });

 const ship = faker.date.soon({ days:45, refDate:created });
 const delivery = faker.date.soon({ days:25, refDate:ship });

 orders.push({
   id:i,
   poNumber:`PO-2026-${1000+i}`,
   brand:brand.name,
   product:product.name,
   qty,
   sizes:buildSizes(qty),
   supplierId:supplier.id,
   supplierName:supplier.name,
   country:supplier.country,
   unitCost,
   sellPrice,
   freight,
   tariff,
   landedCost:Number(landedCost.toFixed(2)),
   revenue:Number(revenue.toFixed(2)),
   profit:Number(profit.toFixed(2)),
   margin,
   priority:faker.helpers.arrayElement(["Low","Medium","High","Urgent"]),
   merchandiser:faker.person.fullName(),
   status:faker.helpers.arrayElement(statuses),
   createdAt:created.toISOString().slice(0,10),
   shipDate:ship.toISOString().slice(0,10),
   deliveryDate:delivery.toISOString().slice(0,10)
 });
}

fs.writeFileSync("./src/data/users.json",JSON.stringify(users,null,2));
fs.writeFileSync("./src/data/brands.json",JSON.stringify(brands,null,2));
fs.writeFileSync("./src/data/products.json",JSON.stringify(products,null,2));
fs.writeFileSync("./src/data/suppliers.json",JSON.stringify(suppliers,null,2));
fs.writeFileSync("./src/data/orders.json",JSON.stringify(orders,null,2));

console.log("All complete realistic data files generated.");
