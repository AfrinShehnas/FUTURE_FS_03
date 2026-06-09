const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("database.db");


// USERS
db.serialize(() => {

  // USERS
  db.run(`
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT
  )
  `);

  // PRODUCTS
  db.run(`
  CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    image TEXT,
    category TEXT,
    available INTEGER
  )
  `);

  // ORDERS
  db.run(`
  CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    phone TEXT,
    items TEXT,
    total INTEGER,
    date TEXT
  )
  `);

  // FEEDBACK
  db.run(`
  CREATE TABLE IF NOT EXISTS feedback(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    message TEXT,
    date TEXT
  )
  `);

  db.get(
    "SELECT COUNT(*) as count FROM products",
    (err, row) => {

      if(err){
        console.log(err);
        return;
      }

      if(row.count === 0){

        db.run(`
        INSERT INTO products
        (name,price,image,category,available)
        VALUES

        ('Apple',120,'images/apple.jpg','fruits',1),
        ('Banana',10,'images/banana.jpg','fruits',1),
        ('Dal',80,'images/dal.jpg','pulses',1),
        ('Red Beans',95,'images/redbeans.jpg','pulses',1),
        ('Beans',70,'images/beans.jpg','vegetables',1),
        ('Carrot',40,'images/carrot.jpg','vegetables',1),
        ('Basmati Rice',90,'images/basmatirice.jpg','grains',1),
        ('Matta Rice',60,'images/mattarice.jpg','grains',1),
        ('Barley',55,'images/barley.jpg','grains',1),
        ('Wheat',45,'images/wheat.jpg','grains',1),
        ('Oil Premium',180,'images/oil3.jpg','essentials',1),
        ('Oil Medium',150,'images/oil2.jpg','essentials',1),
        ('Oil Basic',120,'images/oil.jpg','essentials',1)
        `);

      }
    }
  );

});
app.post("/login",(req,res)=>{

const {name,phone}=req.body;

db.run(
"INSERT INTO users(name,phone) VALUES(?,?)",
[name,phone],
()=>{
res.json({
success:true
});
}
);

});
app.get("/products",(req,res)=>{

db.all(
"SELECT * FROM products",
[],
(err,rows)=>{
res.json(rows);
}
);

});
app.post("/admin-login",(req,res)=>{

const {username,password}=req.body;

if(
username==="admin" &&
password==="admin123"
){

res.json({
success:true
});

}else{

res.json({
success:false
});

}

});
app.post("/feedback",(req,res)=>{

const {
name,
phone,
message
}=req.body;

db.run(
`
INSERT INTO feedback
(name,phone,message,date)
VALUES(?,?,?,?)
`,
[
name,
phone,
message,
new Date().toLocaleString()
],
()=>{
res.send("Saved");
}
);

});
app.get("/feedbacks",(req,res)=>{

db.all(
"SELECT * FROM feedback ORDER BY id DESC",
[],
(err,rows)=>{
res.json(rows);
}
);

});
// ======================
// PLACE ORDER
// ======================
app.post("/place-order", (req, res) => {

  const {
    customer_name,
    phone,
    items,
    total
  } = req.body;

  db.run(
    `
    INSERT INTO orders
    (customer_name,phone,items,total,date)
    VALUES(?,?,?,?,?)
    `,
    [
      customer_name,
      phone,
      JSON.stringify(items),
      total,
      new Date().toLocaleString()
    ],
    () => {
      res.send("Order Saved");
    }
  );

});

// ======================
// GET ORDERS
// ======================
app.get("/orders", (req, res) => {

  db.all(
    "SELECT * FROM orders ORDER BY id DESC",
    [],
    (err, rows) => {
      res.json(rows);
    }
  );

});

// ======================
// UPDATE PRODUCT
// ======================
app.post("/update-product", (req, res) => {

  const {
    id,
    price,
    available
  } = req.body;

  db.run(
    "UPDATE products SET price=?, available=? WHERE id=?",
    [price, available, id],
    () => {
      res.send("Updated");
    }
  );

});

// ======================
// ADD PRODUCT
// ======================
app.post("/add-product", (req, res) => {

  const {
    name,
    price,
    image,
    category
  } = req.body;

  db.run(
    `
    INSERT INTO products
    (name,price,image,category,available)
    VALUES(?,?,?,?,1)
    `,
    [name, price, image, category],
    () => {
      res.send("Product Added");
    }
  );

});

// ======================
// DELETE PRODUCT
// ======================
app.post("/delete-product", (req, res) => {

  const { id } = req.body;

  db.run(
    "DELETE FROM products WHERE id=?",
    [id],
    () => {
      res.send("Deleted");
    }
  );

});
app.listen(PORT,()=>{

console.log(
"Server Running On Port",
PORT
);

});
