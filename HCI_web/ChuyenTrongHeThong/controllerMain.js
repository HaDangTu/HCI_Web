var receivers_info = [
    {"account" : "012324594", "name" : "TuHa"},
    {"account" : "011576964", "name" : "TuHa2"}
];

var last_row = 1;

function openTab(event, tabName) {
    var i, tabContent, tabLink;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++)
        tabContent[i].style.display = "none";

    tabLink = document.getElementsByClassName("tab-links");
    for (i = 0; i < tabLink.length; i++){
        tabLink[i].className = tabLink[i].className.replace(" active", "");
    }

    if (tabName == 'transfer-one')
        sessionStorage.setItem("flag", true);
    else
        sessionStorage.setItem("flag", false);

    document.getElementById(tabName).style.display = "block";
    
    event.currentTarget.className += " active"
}

function onMainLoad() { 
    if (sessionStorage.getItem("flag") != null) {
        var flag = Boolean(sessionStorage.getItem("flag") == 'true');
        
        if (flag) {
            document.getElementById("defaultTab").click();
            document.getElementById("account-balance").innerHTML = sessionStorage.getItem("account-balance");
        }
        else {
            document.getElementById("transfer-more-tab").click();
            // document.getElementById("acount-balance-more").innerHTML = sessionStorage.getItem("acount-balance-more");

            var tableContent = sessionStorage.getItem("tableContent");
            var tableData = sessionStorage.getItem("tableData");
            
            if (tableData != null && tableContent != null){
                attachData(tableContent, JSON.parse(tableData));
            }
        }
    }
    else {
        loadDatalist(document.getElementById("list-receive-acc"), receivers_info);
        document.getElementById("defaultTab").click();
    }
}

function attachData(tableContent, data){
    var j = 0;
    var table = document.getElementById("table");
    table.innerHTML = tableContent;
    for (var i = 1; i < table.rows.length; i++){
        table.rows[i].cells[0].firstChild.value = data[j].SoTaiKhoan;
        table.rows[i].cells[1].firstChild.value = data[j].Ten;
        table.rows[i].cells[2].firstChild.value = data[j].SoTien;
        table.rows[i].cells[3].firstChild.value = data[j].PhiChuyen;
        table.rows[i].cells[4].firstChild.value = data[j].NoiDung;
        table.rows[i].cells[5].firstChild.value = data[j].DonVi;
        j += 1;
    }
}
function onConfirmButtonClick(event) {
    var flag = Boolean(sessionStorage.getItem("flag") == 'true');
    if (flag) {  
        var transferAccText = document.getElementById("select-transfer-account").value;
        var accountBalanceText = document.getElementById("account-balance").innerHTML;      
        var receiverAccText = document.getElementById("receiver-acc").value;
        var receiverName = document.getElementById("receiver-name").value;
        var transferAmountText = document.getElementById("transfer-amount").value;
        var unitText = document.getElementById("select-unit").value;
        var contentText = document.getElementById("content").value;

        sessionStorage.setItem("select-transfer-account", transferAccText);
        sessionStorage.setItem("acount-balance", accountBalanceText);
        sessionStorage.setItem("receiver-acc", receiverAccText);
        sessionStorage.setItem("receiver-name", receiverName);
        sessionStorage.setItem("transfer-amount", transferAmountText);
        sessionStorage.setItem("select-unit", unitText);
        sessionStorage.setItem("content", contentText);
    }
    else { 
        sessionStorage.setItem("select-transfer-account-more", document.getElementById("select-transfer-account-more").value);
        sessionStorage.setItem("acount-balance-more", document.getElementById("acount-balance-more").innerHTML);

        sessionStorage.setItem("tableData", JSON.stringify(getDataFromTable()));
        sessionStorage.setItem("tableContent", document.getElementById("table").innerHTML);
    }

    window.open("ConfirmTransfer.html", "_self");
}

function getDataFromTable() {
    var table = document.getElementById("table");
    var tableData = [];
    
    for (var i = 1; i < table.rows.length; i++) {
        if (table.rows[i].cells[0].firstChild.value == "") {
            continue;
        }

        var obj = {
            "SoTaiKhoan": table.rows[i].cells[0].firstChild.value,
            "Ten": table.rows[i].cells[1].firstChild.value,
            "SoTien": table.rows[i].cells[2].firstChild.value,
            "PhiChuyen": table.rows[i].cells[3].firstChild.value,
            "NoiDung": table.rows[i].cells[4].firstChild.value,
            "DonVi" : table.rows[i].cells[5].firstChild.value
        };
        tableData.push(obj);
    }

    return tableData;
}

function onSelectTransferAccountChange(idSelect, idText) {   
    var value = document.getElementById(idSelect).value;
    convertValue(value, idText);
}

function convertValue(value, idText){
    var moneyElement = document.getElementById(idText);

    if (value == "011232404"){
        moneyElement.innerHTML = "200,000,000 VND";
    }
    else if (value == "011232403"){
        moneyElement.innerHTML = "3,000,000,000 VND";
    }
    else if (value == "011232402"){
        moneyElement.innerHTML = "4,000,000,000 VND"
    }
}

function onInputAccountChange() {
   var name = document.getElementById("receiver-name");
   var inputAccount = document.getElementById("receiver-acc");
   name.value = get(receivers_info, inputAccount.value);
}

function onInputChange(rowIndex) {  
    if (last_row == rowIndex) {
        addRow(rowIndex);
        last_row += 1;
    }
}

function addRow(rowIndex) {
    var table = document.getElementById("table");
    var row = table.insertRow(table.rows.length);

    var cellAccountNumber = row.insertCell(0);
    var cellName = row.insertCell(1);
    var cellTransferAmount = row.insertCell(2);
    var cellTransferFee = row.insertCell(3);
    var cellContent = row.insertCell(4);
    var cellUnit = row.insertCell(5);
    
    // cellAccountNumber.className = "table-data";
    cellAccountNumber.innerHTML = '<input type="text" onchange="onInputChange('+ (rowIndex + 1) + ')">';

    // cellName.className = "table-data";
    cellName.innerHTML = '<input type="text" onchange="onInputChange('+ (rowIndex + 1) + ')">';

    // cellTransferAmount.className = "table-data";
    cellTransferAmount.innerHTML = '<input type="text" onchange="onInputChange('+ (rowIndex + 1) + ')">';

    // cellTransferFee.className = "table-data1";
    cellTransferFee.innerHTML = '<select style="width: 120px; font-size: 12px;">' +
        '<option>Người chuyển trả</option>' +
        '<option>Người nhận trả</option>' +
    '</select>';

    // cellContent.className = "table-data2";
    // cellContent.innerHTML = '<textarea onchange="onInputChange('+ (rowIndex + 1) + ')"></textarea>';
    cellContent.innerHTML = '<input style="width: 150px;" onchange="onInputChange('+ (rowIndex + 1) + ')"/>';

    // cellUnit.className = "table-data1";
    cellUnit.innerHTML = '<select>' + 
    '<option>VND</option>' +
    '<option>USD</option>' +
    '<option>YEN</option>' +
    '<option>AUD</option>' +
    '</select>';
}

function onChooseFileChange(){
    console.log("Choose file change");
    var files = document.getElementById("file-picker").files;
    var reader = new FileReader();
    reader.onload = (progressEvent) => {
        var data = progressEvent.target.result;
        var workbook = XLSX.read(data, {type:"binary"});
        var json_object = toJSON(workbook);
        var table = document.getElementById("table");
        for (var i = 1; i < table.rows.length; i++)
            table.deleteRow(i);
        var cellCount = 0;
        json_object.forEach((element) => {
            var row = table.insertRow(table.rows.length);
            //SoTaiKhoan
            var cellAccountID = row.insertCell(0);
            // cellAccountID.className = 'table-data';
            cellAccountID.innerHTML = '<input type="text" value="' + element.SoTaiKhoan + '">';

            //Ten
            var cellName = row.insertCell(1);
            // cellName.className = 'table-data';
            cellName.innerHTML = '<input type="text" value="' + element.Ten + '">';

            //SoTien
            var cellTransferAmount = row.insertCell(2);
            // cellTransferAmount.className = 'table-data';
            cellTransferAmount.innerHTML = '<input type="text" value="' + element.SoTien + '">';

            //PhiChuyen
            var cellTransferFee = row.insertCell(3);
            // cellTransferFee.className = 'table-data1'
            cellTransferFee.innerHTML ='<select id="select' + cellCount + '"' + 
            'style="width: 120px; font-size: 12px;">' +
                '<option value="Người chuyển trả">Người chuyển trả</option>' +
                '<option value="Người nhận trả">Người nhận trả</option>'
            '</select>';
            document.getElementById("select" + cellCount).value = element.PhiChuyen;
            cellCount++;
            
            var cellContent = row.insertCell(4);
            // cellContent.className = 'table-data2'
            cellContent.innerHTML = '<input type="text" style ="width: 150px;">' + element.NoiDungChuyen + '</textarea>';

            var cellUnit = row.insertCell(5);
            // cellUnit.className = 'table-data1'
            cellUnit.innerHTML = '<select id="select' + cellCount + '">' + 
            '<option>VND</option>' + 
            '<option>USD</option>' + 
            '<option>YEN</option>' + 
            '<option>AUD</option>' + 
            '</select>';
            document.getElementById("select" + cellCount).value = element.DonVi;
            cellCount++;
        });
    }

    reader.readAsBinaryString(files[0]);
}

function toJSON(workbook) {
    var firstSheet = workbook.SheetNames[0];
    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    var json_string = JSON.stringify(XL_row_object);
    return JSON.parse(json_string);
}


function onCheckboxChange() {
    var checkbox = document.getElementById("save-info");
    var datalist = document.getElementById("list-receive-acc");
    var receiverName = document.getElementById("receiver-name");
    var receiverAcc = document.getElementById("receiver-acc");

    if (checkbox.checked){
        if (receiverAcc.value != "" && receiverName.value != ""){
            if (!receivers_info.includes({"account": receiverAcc.value, "name": receiverName.value})){
                receivers_info.push({"account": receiverAcc.value, "name": receiverName.value});
            }
        }    
    }
    else {
        receivers_info.pop();
    }
    loadDatalist(datalist, receivers_info);
}

function loadDatalist(datalist, receivers) {
    datalist.innerHTML = "";
    for (var i = 0; i < receivers.length; i++) {
        datalist.innerHTML += '<option value="'+ receivers[i].account + '">' + receivers[i].name + '</option>';
    }
}

function get(receivers, key) {
    for (var i = 0; i < receivers.length; i++){
        if (receivers[i].account == key)
            return receivers[i].name;
    }
    return null;
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
