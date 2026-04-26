import fs from "fs";
import { faker } from "@faker-js/faker";

faker.seed(2026);

const roles = [
 { id:1, name:"admin", permissions:["all"] },
 { id:2, name:"staff", permissions:["orders.read","orders.write","products.read","suppliers.read"] },
 { id:3, name:"viewer", permissions:["orders.read","reports.read"] }
];

/* USERS 150 */
const users = [];
users.push(
 { id:1,name:"Admin User",email:"admin@apparel.com",password:"1234",roleId:1,status:"active"},
 { id:2,name:"Staff User",email:"staff@apparel.com",password:"1234",roleId:2,status:"active"},
 { id:3,name:"Viewer User",email:"viewer@apparel.com",password:"1234",roleId:3,status:"active"}
);

for(let i=4;i<=150;i++){
 users.push({
   id:i,
   name:faker.person.fullName(),
   email:`user${i}@apparel.com`,
   password:"1234",
   roleId: faker.helpers.arrayElement([1,2,2,2,3,3]),
   status:"active"
 });
}

/* BRANDS 50 */
const brandNames = [
 "Market","CPFM","Fear of God","Off White","Rhude","Represent","Palm Angels",
 "Kith","Stussy","Supreme","Alo","Nike Lab","Adidas Lab","Daily Paper","Essentials"
];

const brands = [];
for(let i=1;i<=50;i++){
 brands.push({
   id:i,
   name:`${faker.helpers.arrayElement(brandNames)} ${i}`,
   region:faker.helpers.arrayElement(["USA","EU","UK","UAE","Asia"]),
   currency:faker.helpers.arrayElement(["USD","EUR","GBP"]),
   active:true
 });
}

/* SUPPLIERS 200 */
const suppliers = [];
for(let i=1;i<=200;i++){
 suppliers.push({
   id:i,
   name:`${faker.company.name()} Manufacturing`,
   country:faker.helpers.arrayElement(["Pakistan","China","Vietnam","Bangladesh","Turkey","India","Mexico"]),
   type:faker.helpers.arrayElement(["Cut & Sew","Fabric Mill","Printing","Accessories"]),
   rating:Number(faker.finance.amount(3.5,5,1)),
   leadTime:faker.number.int({min:12,max:55}),
   monthlyCapacity:faker.number.int({min:5000,max:80000})
 });
}

/* PRODUCTS 120 */
const productMaster = [
 ["Oversized Hoodie","Topwear",18],
 ["Heavy Tee","Topwear",8],
 ["Joggers","Bottomwear",14],
 ["Cargo Pants","Bottomwear",16],
 ["Crewneck","Topwear",15],
 ["Cap","Accessories",5],
 ["Beanie","Accessories",4],
 ["Shorts","Bottomwear",11],
 ["Denim Jacket","Outerwear",24],
 ["Puffer Jacket","Outerwear",38]
];

const colors = ["Black","White","Grey","Cream","Navy","Olive","Brown","Red","Blue","Sand"];

const products = [];
for(let i=1;i<=120;i++){
 const p = faker.helpers.arrayElement(productMaster);
 products.push({
   id:i,
   sku:`SKU-${1000+i}`,
   name:p[0],
   category:p[1],
   color:faker.helpers.arrayElement(colors),
   baseCost:p[2],
   active:true
 });
}

/* VARIANTS 500+ */
const product_variants = [];
let variantId = 1;

const sizeMap = {
 "Oversized Hoodie":["S","M","L","XL","XXL"],
 "Heavy Tee":["XS","S","M","L","XL"],
 "Joggers":["S","M","L","XL"],
 "Cargo Pants":["30","32","34","36","38"],
 "Crewneck":["S","M","L","XL","XXL"],
 "Cap":["Adjustable"],
 "Beanie":["Standard"],
 "Shorts":["S","M","L","XL"],
 "Denim Jacket":["M","L","XL","XXL"],
 "Puffer Jacket":["M","L","XL","XXL"]
};

for(const p of products){
 for(const s of sizeMap[p.name]){
   product_variants.push({
     id:variantId++,
     productId:p.id,
     color:p.color,
     size:s
   });
 }
}

/* ORDERS 400 */
const statuses = ["Received","Sampling","Production","QC","Packed","Shipped","Delivered","Delayed"];

const orders = [];
const order_items = [];
const order_item_sizes = [];
const shipments = [];
const costing = [];

let itemId = 1;
let sizeId = 1;
let shipId = 1;
let costId = 1;

for(let i=1;i<=400;i++){

 const brand = faker.helpers.arrayElement(brands);
 const supplier = faker.helpers.arrayElement(suppliers);

 const created = faker.date.between({
   from:"2025-10-01",
   to:"2026-04-25"
 });

 const shipDate = faker.date.soon({days:45, refDate:created});
 const delivery = faker.date.soon({days:25, refDate:shipDate});

 orders.push({
   id:i,
   poNumber:`PO-2026-${1000+i}`,
   brandId:brand.id,
   supplierId:supplier.id,
   currency:brand.currency,
   status:faker.helpers.arrayElement(statuses),
   priority:faker.helpers.arrayElement(["Low","Medium","High","Urgent"]),
   createdAt:created.toISOString().slice(0,10),
   shipDate:shipDate.toISOString().slice(0,10),
   deliveryDate:delivery.toISOString().slice(0,10)
 });

 const itemCount = faker.number.int({min:1,max:4});

 for(let j=1;j<=itemCount;j++){

   const product = faker.helpers.arrayElement(products);
   const qty = faker.number.int({min:120,max:2500});

   order_items.push({
     id:itemId,
     orderId:i,
     productId:product.id,
     color:product.color,
     qty,
     unitCost:product.baseCost,
     sellPrice:product.baseCost + faker.number.int({min:8,max:28})
   });

   const sizes = sizeMap[product.name];
   let remain = qty;

   for(let k=0;k<sizes.length;k++){
     const size = sizes[k];
     let sizeQty;

     if(k===sizes.length-1){
       sizeQty = remain;
     }else{
       sizeQty = faker.number.int({
         min:0,
         max:Math.floor(remain/(sizes.length-k))
       });
       remain -= sizeQty;
     }

     if(sizeQty>0){
       order_item_sizes.push({
         id:sizeId++,
         orderItemId:itemId,
         size,
         qty:sizeQty
       });
     }
   }

   costing.push({
     id:costId++,
     orderItemId:itemId,
     freight:faker.number.int({min:200,max:3000}),
     tariffPct:faker.number.int({min:0,max:18}),
     misc:faker.number.int({min:50,max:500})
   });

   itemId++;
 }

 shipments.push({
   id:shipId++,
   orderId:i,
   mode:faker.helpers.arrayElement(["Sea","Air","Road"]),
   trackingNo:`TRK-${10000+i}`,
   eta:delivery.toISOString().slice(0,10),
   status:faker.helpers.arrayElement(["Booked","In Transit","Delivered"])
 });
}

/* WRITE */
fs.writeFileSync("./src/data/roles.json",JSON.stringify(roles,null,2));
fs.writeFileSync("./src/data/users.json",JSON.stringify(users,null,2));
fs.writeFileSync("./src/data/brands.json",JSON.stringify(brands,null,2));
fs.writeFileSync("./src/data/suppliers.json",JSON.stringify(suppliers,null,2));
fs.writeFileSync("./src/data/products.json",JSON.stringify(products,null,2));
fs.writeFileSync("./src/data/product_variants.json",JSON.stringify(product_variants,null,2));
fs.writeFileSync("./src/data/orders.json",JSON.stringify(orders,null,2));
fs.writeFileSync("./src/data/order_items.json",JSON.stringify(order_items,null,2));
fs.writeFileSync("./src/data/order_item_sizes.json",JSON.stringify(order_item_sizes,null,2));
fs.writeFileSync("./src/data/shipments.json",JSON.stringify(shipments,null,2));
fs.writeFileSync("./src/data/costing.json",JSON.stringify(costing,null,2));

console.log("Huge normalized data generated successfully.");
