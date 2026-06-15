let tables = [];
let currentTable = null;

// 🔐 LOCAL WAITER LOGS ONLY
let myLogs = [];

// 🍔 MENU
let menu = [
  { name: "Chicken Kebab", price: 7 },
  { name: "Fries", price: 3 },
  { name: "Coke", price: 2 }
];

// 🧾 GLOBAL LOG (SIMULATED)
let globalLogs = [];

// ➕ ADD TABLE
function addTable() {
  tables.push({
    id: tables.length + 1,
    orders: [],
    total: 0,
    payment: "UNPAID"
  });

  logAction(`Created Table ${tables.length}`);
  renderTables();
}

// 📊 RENDER TABLES
function renderTables() {
  let box = document.getElementById("tables");
  box.innerHTML = "";

  tables.forEach(t => {
    box.innerHTML += `
      <div class="table" onclick="openTable(${t.id})">
        Table ${t.id}<br>
        €${t.total}<br>
        ${t.payment}
      </div>
    `;
  });
}

// 📂 OPEN TABLE
function openTable(id) {
  currentTable = tables.find(t => t.id === id);
  renderOrder();
}

// 🍽️ ORDER PANEL
function renderOrder() {

  let menuHTML = menu.map((m, i) => `
    <button onclick="addItem(${i})">${m.name} €${m.price}</button>
  `).join("");

  let ordersHTML = currentTable.orders.map((o, i) => `
    <li>
      ${o.name} €${o.price}
      <button onclick="removeItem(${i})">❌</button>
    </li>
  `).join("");

  document.getElementById("orderPanel").innerHTML = `
    <h3>Table ${currentTable.id}</h3>

    <h4>Menu</h4>
    ${menuHTML}

    <h4>Orders</h4>
    <ul>${ordersHTML}</ul>

    <h3>Total: €${currentTable.total}</h3>

    <button onclick="cashPay()">💵 Cash</button>
    <button onclick="cardPay()">💳 Card</button>

    <br><br>

    <button onclick="sendKitchen()">🖨 Kitchen</button>
    <button onclick="closeTable()">🚪 Close</button>
  `;
}

// ➕ ADD ITEM
function addItem(i) {
  let item = menu[i];

  currentTable.orders.push(item);
  currentTable.total += item.price;

  logAction(`Added ${item.name} to Table ${currentTable.id}`);

  renderTables();
  renderOrder();
}

// ❌ REMOVE ITEM (mistake protection)
function removeItem(i) {
  let item = currentTable.orders[i];

  currentTable.total -= item.price;
  currentTable.orders.splice(i, 1);

  logAction(`Removed ${item.name} from Table ${currentTable.id}`);

  renderTables();
  renderOrder();
}

// 💵 CASH
function cashPay() {
  currentTable.payment = "CASH PAID";

  logAction(`Table ${currentTable.id} paid CASH`);

  closeTable();
}

// 💳 CARD
function cardPay() {
  currentTable.payment = "CARD PAID";

  logAction(`Table ${currentTable.id} paid CARD`);

  closeTable();
}

// 🖨 KITCHEN
function sendKitchen() {
  alert("Kitchen Ticket:\n" +
    currentTable.orders.map(o => o.name + " €" + o.price).join("\n")
  );
}

// 🚪 CLOSE TABLE
function closeTable() {
  if (!currentTable) return;

  currentTable.orders = [];
  currentTable.total = 0;
  currentTable.payment = "CLOSED";

  alert("Table Closed");

  currentTable = null;

  renderTables();
  document.getElementById("orderPanel").innerHTML = "Select a table";
}

// 📋 LOG ACTION
function logAction(text) {
  let log = {
    time: new Date().toLocaleTimeString(),
    action: text
  };

  myLogs.push(log);
  globalLogs.push(log);
}

// 📋 WAITER LOG VIEW
function showMyLogs() {
  let text = "MY ACTIONS:\n\n";

  myLogs.forEach(l => {
    text += `${l.time} - ${l.action}\n`;
  });

  alert(text);
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
