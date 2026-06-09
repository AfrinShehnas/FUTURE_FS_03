// ======================
// LOAD PRODUCTS
// ======================

async function loadProducts(){

let res =
await fetch("/products");

let products =
await res.json();

let container =
document.getElementById(
"products"
);

container.innerHTML="";

products.forEach(p=>{

container.innerHTML += `

<div class="admin-card">

<img
src="${p.image}"
height="80"
>

<h3>${p.name}</h3>

<p>

Price ₹

<input
type="number"
id="price-${p.id}"
value="${p.price}"
>

</p>

<select
id="avail-${p.id}"
>

<option
value="1"
${Number(p.available)===1
? "selected"
: ""}
>
In Stock
</option>

<option
value="0"
${Number(p.available)===0
? "selected"
: ""}
>
Out Of Stock
</option>

</select>

<br><br>

<button
onclick="updateProduct(${p.id})"
>
Update
</button>

<button
onclick="deleteProduct(${p.id})"
>
Delete
</button>

</div>

`;

});

}

// ======================
// UPDATE PRODUCT
// ======================

async function updateProduct(id){

let price =
document.getElementById(
`price-${id}`
).value;

let available =
document.getElementById(
`avail-${id}`
).value;

await fetch(
"/update-product",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
id,
price,
available
})

}
);

alert(
"Product Updated"
);

loadProducts();

}

// ======================
// ADD PRODUCT
// ======================

async function addProduct(){

let name =
document.getElementById("pname").value;

let price =
document.getElementById("pprice").value;

let image =
document.getElementById("pimage").value;

let category =
document.getElementById("pcategory").value;

await fetch(
"/add-product",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
name,
price,
image,
category
})

}
);

alert(
"Product Added"
);

loadProducts();

}

// ======================
// DELETE PRODUCT
// ======================

async function deleteProduct(id){

if(
!confirm(
"Delete Product?"
)
){
return;
}

await fetch(
"/delete-product",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
id
})

}
);

loadProducts();

}

// ======================
// LOAD ORDERS
// ======================

async function loadOrders(){

let res =
await fetch("/orders");

let orders =
await res.json();

let container =
document.getElementById(
"orders"
);

container.innerHTML="";

orders.forEach(o=>{

container.innerHTML += `

<div class="admin-card">

<h3>
${o.customer_name}
</h3>

<p>
📞 ${o.phone}
</p>

<p>
💰 ₹${o.total}
</p>

<p>
📅 ${o.date}
</p>

</div>

`;

});

}

// ======================
// LOAD FEEDBACKS
// ======================

async function loadFeedbacks(){

let res =
await fetch("/feedbacks");

let feedbacks =
await res.json();

let container =
document.getElementById(
"feedbacks"
);

container.innerHTML="";

feedbacks.forEach(f=>{

container.innerHTML += `

<div class="admin-card">

<h3>
${f.name}
</h3>

<p>
📞 ${f.phone}
</p>

<p>
${f.message}
</p>

<p>
${f.date}
</p>

</div>

`;

});

}

// ======================
// LOGOUT
// ======================

function logout(){

localStorage.removeItem(
"admin"
);

window.location.href =
"login.html";

}