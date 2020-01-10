function onConfirmTransferLoad() {
    var flag = Boolean(sessionStorage.getItem("flag") == 'true'); 
    if (flag) {
        var transferAccText = sessionStorage.getItem("select-transfer-account");
        var accountBalanceText = sessionStorage.getItem("acount-balance");
        var receiverBankText = sessionStorage.getItem("receiver-bank");
        var receiverAccText = sessionStorage.getItem("receiver-acc");
        var receiverName = sessionStorage.getItem("receiver-name");
        var transferAmountText = sessionStorage.getItem("transfer-amount");
        var unitText = sessionStorage.getItem("select-unit");
        var contentText = sessionStorage.getItem("content");

        document.getElementById("transfer-account-id").innerHTML = transferAccText;
        document.getElementById("confirm-account-balance").innerHTML = accountBalanceText;
        document.getElementById("receive-banking-id").innerHTML = receiverBankText;
        document.getElementById("receive-account-id").innerHTML = receiverAccText;
        document.getElementById("name").innerHTML = receiverName;
        document.getElementById("confirm-transfer-amount").innerHTML = transferAmountText + " " + unitText;
        document.getElementById("content").innerHTML = contentText;
    }
    else {
        var accountID = document.getElementById("transfer-more-account-id");
        var accountBalance = document.getElementById("confirm-more-account-balance");

        accountID.innerHTML = sessionStorage.getItem("select-transfer-account-more");
        accountBalance.innerHTML = sessionStorage.getItem("acount-balance-more");
        loadTableData(sessionStorage.getItem("tableData"));
    }

    document.getElementById("transfer-one-form").style.display = flag ? "block" : "none";
    document.getElementById("transfer-more-form").style.display = flag ? "none" : "block";
}

function loadTableData(data){
    var tableData = JSON.parse(data);
    var table = document.getElementById("confirm-table");

    for (var i = 0; i < tableData.length; i++){
        var row = table.insertRow();
        var cellNganHang = row.insertCell(0);
        cellNganHang.innerHTML = '<span style="font-weight: bold;">' + tableData[i].NganHang + '</span>';

        var cellSoTaiKhoan = row.insertCell(1);
        cellSoTaiKhoan.innerHTML = '<span style="font-weight: bold;">' + tableData[i].SoTaiKhoan + '</span>';

        var cellSoTien = row.insertCell(2);
        cellSoTien.innerHTML = '<span style="color:blue; font-weight: bold;">' + tableData[i].Ten + '</span>';

        var cellSoTien = row.insertCell(3);
        cellSoTien.innerHTML = '<span style="color:red; font-weight: bold;">' + tableData[i].SoTien + " " + tableData[i].DonVi + '</span>';

        var cellPhiChuyen = row.insertCell(4);
        cellPhiChuyen.innerHTML = "3.300 VND";

        var cellNoiDung = row.insertCell(5);
        cellNoiDung.innerHTML = tableData[i].NoiDung;
    }
}

function onBackClick(event) {
    history.back();
}

function onContinueClick(){
    sessionStorage.clear();
    window.open("NhapMaOTP.html", "_self");
}

function deletTableRow(table, rows) {
    var i = 0;
    while (i < rows) {
        table.deleteRow(1);
        i++;
    }
}