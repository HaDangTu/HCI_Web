function onConfirmTransferLoad() {
    var flag = Boolean(sessionStorage.getItem("flag") == 'true'); 
    if (flag) {
        var transferAccText = sessionStorage.getItem("select-transfer-account");
        var accountBalanceText = sessionStorage.getItem("acount-balance");
        var receiverAccText = sessionStorage.getItem("receiver-acc");
        var receiverName = sessionStorage.getItem("receiver-name");
        var transferAmountText = sessionStorage.getItem("transfer-amount");
        var unitText = sessionStorage.getItem("select-unit");
        var contentText = sessionStorage.getItem("content");

        document.getElementById("transfer-account-id").innerHTML = transferAccText;
        document.getElementById("confirm-account-balance").innerHTML = accountBalanceText;
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
        var cellSoTaiKhoan = row.insertCell(0);
        cellSoTaiKhoan.innerHTML = '<span style="color: #0F6112; font-weight: bold;">' + tableData[i].SoTaiKhoan + '</span>';

        var cellSoTien = row.insertCell(1);
        cellSoTien.innerHTML = '<span style="color:#0F6112; font-weight: bold;">' + tableData[i].Ten + '</span>';

        var cellTen = row.insertCell(2);
        cellTen.innerHTML = '<span style="color:#1A871E; font-weight: bold;">' + tableData[i].SoTien + " " + tableData[i].DonVi + '</span>';

        var cellPhiChuyen = row.insertCell(3);
        cellPhiChuyen.innerHTML = '<span style="color: #29B82E";> 3.300 VND</span>';

        var cellNoiDung = row.insertCell(4);
        cellNoiDung.innerHTML = '<span style="color: #29B82E;">'+ tableData[i].NoiDung + '</span>';
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