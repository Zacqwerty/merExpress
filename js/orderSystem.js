//Initialize Constants
const selTab = document.getElementById("selectOrd");
const ordTab = document.getElementById("orderTab");
const ordText = ordTab.appendChild(document.createElement("h2"));
const ordList = ordTab.appendChild(document.createElement("ul"));
const homBtn = document.getElementById("cOrder");
const relBtn = document.getElementById("nOrder");

//For Total & Deliver Fee
const delFee = ordList.appendChild(document.createElement("li"));
const totalFee = ordList.appendChild(document.createElement("li"));

const delText = delFee.appendChild(document.createElement("h5"));
const delCost = delFee.appendChild(document.createElement("h5"));
const tText = totalFee.appendChild(document.createElement("h5"));
const tFee = totalFee.appendChild(document.createElement("h5"));

//Initializing Text + styles & adding del fee and total fee to list
ordList.appendChild(delFee);
ordList.appendChild(totalFee);

delFee.classList.add("list-group-item", "justify-content-between", "align-items-center", "itemList");
totalFee.classList.add("list-group-item", "justify-content-between", "align-items-center", "itemList")

delCost.style.marginRight = tFee.style.marginRight = '0';

delText.textContent = "Delivery Fee";
delCost.textContent = "₱50.00";
tText.textContent = "Total Payment";
tFee.textContent = "₱50.00";

delFee.id = "dFee";
ordTab.style.display = "none";

//Prepare After Order Btn
homBtn.onclick = function(){
    window.open('./index.html', "_self");
}

relBtn.onclick = function(){
    window.open('./order.html', "_self",);
}


//Initialize all available products
for (const prod of List.products){
    const pDiv = selTab.appendChild(document.createElement("div"));
    const title = pDiv.appendChild(document.createElement("h3"));
    const itemSel = pDiv.appendChild(document.createElement("select"));
    const addBtn = pDiv.appendChild(document.createElement("button"));

    pDiv.classList.add("order");
    itemSel.classList.add("form-select", "selItem");

    title.textContent = prod.name;

    for (const item of prod.items){
        const opt = itemSel.appendChild(document.createElement("option"));
        opt.textContent = `${item.name} - ₱${item.price}.00/${item.per}`
        opt.value = item.name;
    }

    addBtn.classList.add("btn", "addBtn");
    addBtn.textContent = "Add Meryenda Now!";
    addBtn.onclick = function(){
        addMeryenda(itemSel.value);        
    }
}

ordTab.classList.add("ordList");
ordText.textContent = "Meryenda List:"
ordList.classList.add("list-group");

async function addMeryenda(value){
    if (ordList.querySelector(`#${value.replace(" ", "_")}`)){
        const itemHold = ordList.querySelector(`#${value.replace(" ", "_")}`)
        const item = itemHold.querySelector(`#count-${value.replace(" ", "_")}`)
        const pricing = itemHold.querySelector(`#pricer`)

        item.value = parseInt(item.value) + 1;
        updatePrice(pricing, parseInt(item.value), value);
        return;
    }

    const orderItem = ordList.insertBefore(document.createElement("li"), ordList.querySelector("#dFee"));
    const orderName = orderItem.appendChild(document.createElement("h5"));
    const optDiv = orderItem.appendChild(document.createElement("div"));

    const pBtn = optDiv.appendChild(document.createElement("button"));
    const orderQ = optDiv.appendChild(document.createElement("input"));  
    const mBtn = optDiv.appendChild(document.createElement("button"));
    const xBtn = optDiv.appendChild(document.createElement("button"));
    const price = optDiv.appendChild(document.createElement("h5"));
    
    orderItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "itemList");
    orderItem.id = value.replace(" ", "_");
    orderName.textContent = value;

    optDiv.classList.add("optionDiv");

    orderQ.classList.add("form-control")
    pBtn.classList.add("btn", "addBtn", "optBtn");
    mBtn.classList.add("btn", "addBtn", "optBtn");
    xBtn.classList.add("btn", "addBtn", "optBtn");
    price.classList.add("optPrice")

    pBtn.textContent = "+";
    mBtn.textContent = "-";
    xBtn.textContent = "X";

    orderQ.type = 'number';

    pBtn.onclick = function(){
        addCount(orderQ, price, value);
    }
    mBtn.onclick = function(){
        minusCount(orderQ, price, value);
    }

    xBtn.onclick = function(){
        removeItem(orderItem);
    }

    orderQ.oninput = function(){
        if (orderQ.value == "") orderQ.value = 1;

        if (parseInt(orderQ.value) > 999) orderQ.value = 999;
            

        updatePrice(price, parseInt(orderQ.value), value);
    }

    optDiv.style.display = 'flex';
    optDiv.style.flexDirection = 'row';

    orderQ.id = `count-${value.replace(" ", "_")}`;
    orderQ.value = 1;
    

    price.textContent = `₱${List.products.find(p => p.items.find(e => e.name == value)).items.find(e => e.name == value).price}.00`;
    price.id = `pricer`;

    updateOrderList();
}

function addCount(counter, pricer, val){
    counter.value = parseInt(counter.value) + 1;
    updatePrice(pricer, parseInt(counter.value), val);
}

function minusCount(counter, pricer, val){
    if (parseInt(counter.value) > 1){
        counter.value = parseInt(counter.value)- 1;
        updatePrice(pricer, parseInt(counter.value), val);
    }
}

function removeItem(item){
    ordList.removeChild(item);
    updateOrderList();
}

function updatePrice(pricer, count, value){
    pricer.textContent = `₱${List.products.find(p => p.items.find(e => e.name == value)).items.find(e => e.name == value).price*count}.00`;
    updateOrderList();
}

function updateOrderList(){
    if (ordList.childElementCount > 2){

        ordTab.style.display = "block";
    } else {
        ordTab.style.display = "none";
    }

    var totalCost = parseInt(delCost.textContent.substring(1, delCost.textContent.length-1));

    ordList.childNodes.forEach(c => {     
        if (c.querySelector("#pricer")){
            totalCost += parseInt(c.querySelector("#pricer").textContent.substring(1, c.querySelector("#pricer").textContent.length-1));
        }
    })

    tFee.textContent = `₱${totalCost}.00`
}

if (window.location.search.length > 0){
    const val = window.location.search.split("=")[window.location.search.split("=").length-1].replace("_", " ");
    if (List.products.find(p => p.items.find(i => i.name == val))){
        hasLoad = true;
        addMeryenda(val);
    }
}

   