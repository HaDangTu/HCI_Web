
function onConfirmLoad(){
    document.getElementById("account-id").innerHTML = sessionStorage.getItem("account-id");
    document.getElementById("account-balance").innerHTML = sessionStorage.getItem("account-balance");
    document.getElementById("supplier").innerHTML = sessionStorage.getItem("supplier");
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
    sessionStorage.clear();
}

function loadPayList(payList, bills){
    document.getElementById("list-bill").style.visibility = "visible";
    var listBill = document.getElementById("list-bill");
    var sum = 0;
    for (var i = 0; i < payList.length; i++){
        
        var listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.style.background = "white";

        var month = document.createElement("div");
        month.className = "list-field";
        month.innerHTML = '<p style="color: #29B82E;">Tháng ' + bills[payList[i]].month + '</p>';

        var values = document.createElement("div");
        values.className = "list-field";
        values.innerHTML = 
        '<p style="color: #29B82E;">Chỉ số cũ: <span style="color: #0F6112">' + bills[payList[i]].oldValue +'</span></p>' + 
        '<p style="color: #29B82E;">Chỉ số mới: <span style="color: #0F6112">' +bills[payList[i]].newValue + '</span></p>';

        var sumMoney = document.createElement("div");
        sumMoney.className = "list-field";
        sumMoney.innerHTML = '<p style="color: #29B82E;">Tổng số tiền: <span style="color: #0C550F">' + bills[payList[i]].sumMoney.toLocaleString() + ' VND</span></p>';

        listItem.appendChild(month);
        listItem.appendChild(values);
        listItem.appendChild(sumMoney);

        listBill.appendChild(listItem);
        sum = sum + bills[payList[i]].sumMoney;
    }

    return sum;
}