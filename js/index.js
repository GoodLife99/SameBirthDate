$(function(){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
	var nebpay = new NebPay();

	var dappAddress = "n1ztYBjxaWnd7UazCTDxWxYs2SE2YS7HD6t";
	var txHash = "03412ad6b38aafd5089d7b0ca986c3780edb924a4c9bffd9dd653b5ccfe3a509";
	
	$("#savebutton").click(function(){
		var birthdate = $("#datepicker").val();
		var email = $("#exampleInputEmail1").val();
		if(birthdate == ""){
			alert("Please input your birthdate.");
			return;
		}
		
		if(email == ""){
			alert("Please input your email");
			return;
		}	
		
		var to = dappAddress;
		var value = "0";
		var callFunction = "save";
		var callArgs = "[\"" + birthdate + "\",\"" + email + "\"]";
		
		nebpay.call(to, value, callFunction, callArgs, {
			listener: function(resp){
				console.log(JSON.stringify(resp));
			}
		});
	});
	
	$("#searchbutton").click(function(){
		var birthdate = $("#datepickerSearch").val();
		
		if(birthdate == ""){
			alert("Please input your birthdate.");
			return;
		}
		
		var to = dappAddress;
		var value = "0";
		var callFunction = "get";
		var callArgs = "[\"" + birthdate + "\"]";
		
		nebpay.simulateCall(to, value, callFunction, callArgs, {
			listener: function(resp){
				//console.log(JSON.stringify(resp.result));
				var myArr = JSON.parse(resp.result);

				var tempStr = "";
				for(var i=0;i<myArr.length;i++){					
						if(i%2 == 0){
							tempStr += '<tr class="warning">';
						}else{
							tempStr += '<tr class="info">';
						}
						tempStr += '<td >';
						tempStr += (i+1);
						tempStr += '</td>';
						tempStr += '<td>';
						tempStr += birthdate;
						tempStr += '</td>';
						tempStr += '<td>';
						tempStr += myArr[i].email;
						tempStr += '</td>';
						tempStr += '<td>';
						tempStr += myArr[i].author;
						tempStr += '</td>';
						tempStr += '</tr>';
					
				}
				console.log(tempStr);
				$("#searchresult").html(tempStr);
				$("#recordscount").html(myArr.length + " records");
			}
		});
	});
	

	
	
});