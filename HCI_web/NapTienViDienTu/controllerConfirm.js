function onBackClick() {
    history.back();
}

function onContinueClick(){
    sessionStorage.clear();
    window.open("NhapMaOTP.html", "_self");
}

function onConfirmLoad(){
    var flag = Boolean(sessionStorage.getItem("flag") == 'true');
    document.getElementById("transfer-one-form").style.display = flag ? "block" : "none";
    document.getElementById("transfer-more-form").style.display = flag ? "none" : "block";

    if (flag){
        document.getElementById("transfer-account-id").innerHTML = sessionStorage.getItem("transfer-account");
        document.getElementById("confirm-account-balance").innerHTML = sessionStorage.getItem("account-balance");
        document.getElementById("confirm-phone-number").innerHTML = sessionStorage.getItem("phone-number");
        document.getElementById("money").innerHTML = sessionStorage.getItem("transfer-amount")+" "+sessionStorage.getItem("transfer-unit");
        document.getElementById("confirm-suplier").innerHTML = sessionStorage.getItem("suplier");
    }
    else {
        document.getElementById("transfer-more-account-id").innerHTML = sessionStorage.getItem("transfer-account");
        document.getElementById("confirm-more-account-balance").innerHTML = sessionStorage.getItem("account-balance");
        loadTableData(sessionStorage.getItem("tableData"));
    }
}

function loadTableData(data){
    var tableData = JSON.parse(data);
    var table = document.getElementById("confirm-table");

    for (var i = 0; i < tableData.length; i++){
        var row = table.insertRow();
        var cellSoDienThoai = row.insertCell(0);
        cellSoDienThoai.innerHTML = '<span style="color:#0F6112; font-weight: bold;">' + tableData[i].SoDienThoai + '</span>';

        var cellSoTien = row.insertCell(1);
        cellSoTien.innerHTML = '<span style="color:#0F6112; font-weight: bold;">' + tableData[i].SoTien +" "+ tableData[i].DonVi + '</span>';

        var cellNhaCungCap = row.insertCell(2);
        cellNhaCungCap.innerHTML = '<span style="color:#29B82E;">' + tableData[i].NhaCungCap + '</span>';
    }
}

