var bills = [
    { "month": 9, "oldValue": 1234, "newValue": 1577, "sumMoney": 234000 },
    { "month": 10, "oldValue": 1577, "newValue": 1778, "sumMoney": 157000 },
    { "month": 11, "oldValue": 1778, "newValue": 1920, "sumMoney": 280000 }
];

var pay_list = [];

function onMainLoad() {
    var soduTK = sessionStorage.getItem("account-balance");
    if (soduTK != null) {
        document.getElementById("account-balance").innerHTML = soduTK;
        document.getElementById("list-bill").style.visibility = "visible";
        loadListBill();

        var payList = JSON.parse(sessionStorage.getItem("payList"));
        for (var i = 0; i < payList.length; i++) {
            document.getElementById("cb" + payList[i]).click();
        }
    }
}

function getBillClick() {
    document.getElementById("list-bill").style.visibility = "visible";
    loadListBill();
}

function loadListBill() {
    var listBill = document.getElementById("list-bill");
    if (listBill.children.length > 0) return;

    for (var i = 0; i < bills.length; i++) {
        var listItem = document.createElement("div");
        listItem.className = "list-item";

        var month = document.createElement("div");
        month.className = "list-field";
        month.innerHTML = '<p>Tháng ' + bills[i].month + '</p>';

        var values = document.createElement("div");
        values.className = "list-field";
        values.innerHTML =
            '<p>Chỉ số cũ: <span style="color: blue">' + bills[i].oldValue + '</span></p>' +
            '<p>Chỉ số mới: <span style="color: red">' + bills[i].newValue + '</span></p>' +
            '<input id="cb' + i + '" class="pay-checkbox" type="checkbox" onchange="onCheckChange(' + i + ')">';

        var sumMoney = document.createElement("div");
        sumMoney.className = "list-field";
        sumMoney.innerHTML = '<p>Tổng số tiền: <span style="color: red">' + bills[i].sumMoney.toLocaleString() + ' VND</span></p>';

        listItem.appendChild(month);
        listItem.appendChild(values);
        listItem.appendChild(sumMoney);

        listBill.appendChild(listItem);
    }
}

function onPayAllCheckboxChange() {
    var checkbox = document.getElementById("pay-all-checkbox");
    var payCheckboxs = document.getElementsByClassName("pay-checkbox");

    if (checkbox.checked) {
        for (var i = 0; i < payCheckboxs.length; i++) {
            if (payCheckboxs[i].checked == false) payCheckboxs[i].click();
        }
    }else {
        for (var i = 0; i < payCheckboxs.length; i++) {
            payCheckboxs[i].click();
        }
    }
}

function onSelectTransferAccountChange(idSelect, idText) {
    var value = document.getElementById(idSelect).value;
    var moneyElement = document.getElementById(idText);

    if (value == "011232404") {
        moneyElement.innerHTML = "2.000.000.000 VND";
    }
    else if (value == "011232403") {
        moneyElement.innerHTML = "3.000.000.000 VND";
    }
    else if (value == "011232402") {
        moneyElement.innerHTML = "4.000.000.000 VND"
    }
}

function onConfirmButtonClick(event) {
    sessionStorage.setItem("account-id", document.getElementById("select-transfer-account").value);
    sessionStorage.setItem("account-balance", document.getElementById("account-balance").innerHTML);
    sessionStorage.setItem("supplier", document.getElementById("suppliers").value);
    sessionStorage.setItem("customer-id", document.getElementById("customer-id").value);
    sessionStorage.setItem("bills", JSON.stringify(bills));
    sessionStorage.setItem("payList", JSON.stringify(pay_list));
    window.open("Confirm.html", "_self");
}

function onCheckChange(index) {
    var checkbox = document.getElementById("cb" + index);
    console.log("Check box change");
    if (checkbox.checked) {
        pay_list.push(index);
    } else removeItem(index);
}

function removeItem(index) {
    for (var i = 0; i < pay_list.length; i++) {
        if (pay_list[i] == index) {
            pay_list.splice(i, 1);
        }
    }
}