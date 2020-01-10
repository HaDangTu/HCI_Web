
function onConfirmLoad(){
    document.getElementById("account-id").innerHTML = sessionStorage.getItem("account-id");
    document.getElementById("account-balance").innerHTML = sessionStorage.getItem("account-balance");
    document.getElementById("id-tax").innerHTML = sessionStorage.getItem("id-tax");
    document.getElementById("customer-id").innerHTML = sessionStorage.getItem("customer-id");

    var bills = JSON.parse(sessionStorage.getItem("bills"));
    var payList = JSON.parse(sessionStorage.getItem("payList"));
    
    var sum = loadPayList(payList, bills);

    document.getElementById("sum-money").innerHTML = sum.toLocaleString() + " VND";
}

function onBackButtonClick(event){
   history.back();
}

function onContinueButtonClick(event){
    window.open("NhapMaOTP.html", "_self");
}

function loadPayList(payList, bills){
    document.getElementById("list-bill").style.visibility = "visible";
    var listBill = document.getElementById("list-bill");
    var sum = 0;
    for (var i = 0; i < payList.length; i++){
        
        var listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.style.background = "white";

        var Id = document.createElement("div");
        Id.className = "list-field";
        Id.innerHTML = '<p style="color: #29B82E;">Mã Số Thuế: <span style="color: #0F6112;">' + bills[payList[i]].Id + '</p>';

        var Name = document.createElement("div");
        Name.className = "list-field";
        Name.innerHTML = '<p style="color: #29B82E;">Tên Thuế: <span style="color: #0F6112;">' + bills[payList[i]].Name + '</p>';

        var sumMoney = document.createElement("div");
        sumMoney.className = "list-field";
        sumMoney.innerHTML = '<p style="color: #29B82E;">Tổng số tiền: <span style="color: red">' + bills[payList[i]].sumMoney.toLocaleString() + ' VND</span></p>';

        listItem.appendChild(Id);
        listItem.appendChild(Name);
        listItem.appendChild(sumMoney);

        listBill.appendChild(listItem);
        sum = sum + bills[payList[i]].sumMoney;
    }

    return sum;
}