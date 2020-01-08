var last_row = 1;

function openTab(event, tabName) {
    var i, tabContent, tabLink;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++)
        tabContent[i].style.display = "none";

    tabLink = document.getElementsByClassName("tab-links");
    for (i = 0; i < tabLink.length; i++) {
        tabLink[i].className = tabLink[i].className.replace(" active", "");
    }

    if (tabName == 'transfer-one')
        sessionStorage.setItem("flag", true);
    else
        sessionStorage.setItem("flag", false);

    document.getElementById(tabName).style.display = "block";

    event.currentTarget.className += " active"
}

function onConfirmButtonClick(event) {
    var flag = sessionStorage.getItem("flag");
    if (Boolean(flag == "true")) {
        sessionStorage.setItem("transfer-account", document.getElementById("select-transfer-account").value);
        sessionStorage.setItem("account-balance", document.getElementById("account-balance").innerHTML);
        sessionStorage.setItem("phone-number", document.getElementById("phone-number").value);
        sessionStorage.setItem("transfer-amount", document.getElementById("transfer-amount").value);
        sessionStorage.setItem("unit", document.getElementById("select-unit").value);
        sessionStorage.setItem("suplier", document.getElementById("select-suplier").value);
    }
    else {
        sessionStorage.setItem("transfer-account", document.getElementById("select-transfer-account-more").value);
        sessionStorage.setItem("account-balance", document.getElementById("account-balance-more").innerHTML);
        sessionStorage.setItem("tableData", JSON.stringify(getDataFromTable()));
        sessionStorage.setItem("tableContent", document.getElementById("table").innerHTML);
    }
    
    window.open("Confirm.html", "_self");
}

function onSelectTransferAccountChange(idSelect, idText) {
    var value = document.getElementById(idSelect).value;
    convertValue(value, idText);
}

function convertValue(value, idText) {
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

function onInputKeyUp(event) {
    var selection = window.getSelection().toString();
    if (selection !== '') {
        return;
    }

    var input = event.target.value;
    input = input.replace(/[\D\s\._\-]+/g, "");

    input = input ? parseInt(input, 10) : 0;
    event.target.value = addDot(input);
}

function addDot(input) {
    return (input === 0) ? "" : input.toLocaleString();
}

function onMainLoad() {
    var flag = sessionStorage.getItem("flag");
    if (flag != null) {
        if (Boolean(flag == "true")) {
            document.getElementById("defaultTab").click();
            document.getElementById("account-balance").innerHTML = sessionStorage.getItem("account-balance");
        }
        else {
            document.getElementById("transfer-more-tab").click();
            document.getElementById("account-balance-more").innerHTML = sessionStorage.getItem("account-balance");
            var data = sessionStorage.getItem("tableData");
            var tableContent = sessionStorage.getItem("tableContent");
            if (data != null && tableContent != null)
                attachData(tableContent, JSON.parse(data));
        }
    }
    else {
        document.getElementById("defaultTab").click();
    }
}

function attachData(tableContent, data){
    var j = 0;
    var table = document.getElementById("table");
    table.innerHTML = tableContent;
    
    for (var i = 1; i < table.rows.length; i++){
        table.rows[i].cells[0].firstChild.value = data[j].SoDienThoai;
        table.rows[i].cells[1].firstChild.value = data[j].SoTien;
        table.rows[i].cells[2].firstChild.value = data[j].NhaCungCap;
        j += 1;
    }
}

function toJSON(workbook) {
    var firstSheet = workbook.SheetNames[0];
    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    var json_string = JSON.stringify(XL_row_object);
    return JSON.parse(json_string);
}

function onChooseFileChange() {
    var files = document.getElementById("file-picker").files;
    var reader = new FileReader();
    reader.onload = (progressEvent) => {
        var data = progressEvent.target.result;
        var workbook = XLSX.read(data, { type: "binary" });
        var json_object = toJSON(workbook);
        var table = document.getElementById("table");
        for (var i = 1; i < table.rows.length; i++)
            table.deleteRow(i);
        var cellCount = 0;
        json_object.forEach((element) => {
            var row = table.insertRow(table.rows.length);
            //Số điện thoại
            var cell1 = row.insertCell(0);
            cell1.innerHTML = '<input type="text" value="' + element.SoDienThoai + '">';
            cellCount++;

            //Số tiền
            var cell2 = row.insertCell(1);
            cell2.innerHTML = '<input type="text" value="' + element.SoTien + '">';
            cellCount++;
            

            //Nhà cung cấp
            var cell4 = row.insertCell(2);
            cell4.innerHTML = '<select id="table-select-data' + cellCount + '" style="width: 120px; font-size: 12px;">' +
                '<option>Viettel</option>' +
                '<option>Mobifone</option>' +
                '<option>VietnamMobile</option>' +
                '<option>Vinaphone</option>' +
                '</select>';

            document.getElementById("table-select-data" + cellCount).value = element.NhaCungCap;
            cellCount++;
        });
    }

    reader.readAsBinaryString(files[0]);
}

function getDataFromTable() {
    var table = document.getElementById("table");
    var tableData = [];
    for (var i = 1; i < table.rows.length; i++) {
        if (table.rows[i].cells[0].firstChild.value == "") {
            continue;
        }

        var obj = {
            "SoDienThoai": table.rows[i].cells[0].firstChild.value,
            "SoTien": table.rows[i].cells[1].firstChild.value,
            "NhaCungCap": table.rows[i].cells[2].firstChild.value
        };
        
        tableData.push(obj);
    }

    return tableData;
}

function onInputChange(rowIndex) {
    if (last_row == rowIndex) {
        var table = document.getElementById("table");
        var row = table.insertRow(table.rows.length);
        var cellSoDienThoai = row.insertCell(0);
        cellSoDienThoai.innerHTML = '<input type="text" onchange="onInputChange(' + (rowIndex + 1) + ')">';

        var cellSoTien = row.insertCell(1);
        cellSoTien.innerHTML = '<input type="text" onchange="onInputChange(' + (rowIndex + 1) + ')" onkeyup="onInputKeyUp(event)">';

        var cellNhaCungCap = row.insertCell(2);
        cellNhaCungCap.innerHTML = '<select style="width: 120px; font-size: 12px;">' +
            '<option>Viettel</option>' +
            '<option>Mobifone</option>' +
            '<option>VietnamMobile</option>' +
            '<option>Vinaphone</option>' +
            '</select>';
        last_row += 1;
    }
}