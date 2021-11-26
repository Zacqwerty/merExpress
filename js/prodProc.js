const merEx = List;

for (const categ of merEx.products){ 
    const container = document.getElementById("lister").appendChild(document.createElement("div"));
    if (merEx.products.indexOf(categ)%2 == 0){
        container.classList.add("section-one");
    } else{
        container.classList.add("section-two");
    }
    
    const heading = container.appendChild(document.createElement("h1"));
    const descriptor = container.appendChild(document.createElement("p"));
    const itemCon = container.appendChild(document.createElement("div"));

    heading.textContent = categ.name
    descriptor.innerHTML = "&nbsp&nbsp&nbsp&nbsp" + categ.desc;

    for (const item of categ.items){
        //Add Items
        const curItem = itemCon.appendChild(document.createElement("div"));
        
        const divImg = curItem.appendChild(document.createElement("div"))
        const imgItem = divImg.appendChild(document.createElement("img"));
        
        const divBot = curItem.appendChild(document.createElement("div"));
        const itemHead = divBot.appendChild(document.createElement("h3"));
        const itemPrice = divBot.appendChild(document.createElement("h4"));
        const formOrder = divBot.appendChild(document.createElement("form"));
        const orderBtn = formOrder.appendChild(document.createElement("button"));

        //Set img source
        imgItem.src = `./imgs/${categ.name}/${item.name}.png`;

        //Add classes to items
        curItem.classList.add("card");
        curItem.classList.add("itemCard");

        divImg.classList.add("card-img-top");
        divImg.classList.add("itemImg");

        divBot.classList.add("itemDivBot");
        orderBtn.classList.add("btn");

        //Set Attributes
        if (merEx.products.indexOf(categ)%2 == 0) {
            curItem.style.backgroundColor = "#a88e61";
        } else {
            curItem.style.backgroundColor = "#c0ad8c";
        }

        imgItem.style.objectFit = 'cover';

        imgItem.onload = function(){
            imgItem.style.height = '100%';
            imgItem.style.width = 'auto';

            if (divImg.clientWidth - imgItem.clientWidth > 2){
                imgItem.style.height = 'auto';
                imgItem.style.width = '100%';
            }
        }

        itemHead.textContent = item.name;
        itemPrice.textContent = `₱${item.price}.00/${item.per}`

        orderBtn.textContent = `Order ${item.name} Now!`
        orderBtn.style.marginTop = '5px';
        orderBtn.style.color = 'whitesmoke'

        if (merEx.products.indexOf(categ)%2 == 0) {
            orderBtn.classList.add("btn-one");
        } else {
            orderBtn.classList.add("btn-two");
        }

        formOrder.action="./order.html";
        orderBtn.name = "order";
        orderBtn.value = item.name.replace(" ", "_");
    }
}