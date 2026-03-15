function toggleDarkMode(){
document.body.classList.toggle("dark");
}

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function displayExpenses(){

let list = document.getElementById("list");
list.innerHTML = "";

let total = 0;

expenses.forEach((expense,index)=>{

let row = document.createElement("tr");

row.innerHTML =
"<td>"+expense.date+"</td>"+
"<td>"+expense.category+"</td>"+
"<td>₹"+expense.amount+"</td>"+
"<td><button onclick='editExpense("+index+")'>Edit</button> "+
"<button onclick='deleteExpense("+index+")'>Delete</button></td>";

list.appendChild(row);

total += expense.amount;

});

document.getElementById("total").textContent = total;

localStorage.setItem("expenses", JSON.stringify(expenses));

}


function addExpense(){

let categoryInput = document.getElementById("category");
let amountInput = document.getElementById("amount");

let category = categoryInput.value;
let amount = parseFloat(amountInput.value);

if(category=="" || isNaN(amount)){
alert("Enter valid data");
return;
}

let today = new Date().toLocaleString();

expenses.push({
date: today,
category: category,
amount: amount
});

displayExpenses();

categoryInput.value="";
amountInput.value="";

categoryInput.focus();

}


function deleteExpense(index){

expenses.splice(index,1);

displayExpenses();

}


function editExpense(index){

let newCategory = prompt("Enter new category", expenses[index].category);
let newAmount = prompt("Enter new amount", expenses[index].amount);

if(newCategory && newAmount){

expenses[index].category = newCategory;
expenses[index].amount = parseFloat(newAmount);

displayExpenses();

}

}


function searchExpense(){

let search = document.getElementById("search").value.toLowerCase();

let list = document.getElementById("list");
list.innerHTML = "";

let total = 0;

expenses.forEach((expense,index)=>{

if(expense.category.toLowerCase().includes(search)){

let row = document.createElement("tr");

row.innerHTML =
"<td>"+expense.date+"</td>"+
"<td>"+expense.category+"</td>"+
"<td>₹"+expense.amount+"</td>"+
"<td><button onclick='editExpense("+index+")'>Edit</button> "+
"<button onclick='deleteExpense("+index+")'>Delete</button></td>";

list.appendChild(row);

total += expense.amount;

}

});

document.getElementById("total").textContent = total;

}


function downloadCSV(){

let csv = "Date,Category,Amount\n";

expenses.forEach(function(expense){
csv += expense.date + "," + expense.category + "," + expense.amount + "\n";
});

let blob = new Blob([csv], { type: "text/csv" });

let url = window.URL.createObjectURL(blob);

let a = document.createElement("a");
a.href = url;
a.download = "expenses.csv";

document.body.appendChild(a);
a.click();

document.body.removeChild(a);

window.URL.revokeObjectURL(url);

}


window.onload=function(){
displayExpenses();
}
