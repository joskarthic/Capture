$(document).ready(function(){
alert("sync")
var name = "spine";
$.ajax({
	type: "POST",
	url: 'http://www.sedarspine.com/en/spineLogisticsApp/getUSerData',
	data :  'userid='+name,
	dataType:"json",
	processData: true,
	success:function (json) {
		var j=0;
		var ajaxlength = json.length;
		localStorage.setItem("app_user_count", ajaxlength);
		alert(ajaxlength);
	
		var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
		
		db.transaction(function(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS APPS_USER (USER_COMP_CODE TEXT, USER_ID INTEGER PRIMARY KEY AUTOINCREMENT, USER_DESC TEXT, USER_PERS_CODE TEXT, USER_PASSWD TEXT, USER_PW_CHANGE_YN TEXT, USER_EMAIL TEXT, USER_OFFICE_PHONE TEXT, USER_HOME_PHONE TEXT, USER_CELL_PHONE TEXT, USER_IMAGE_BLOB TEXT, USER_IMAGE_FILE TEXT, USER_FROM_DT TEXT, USER_UPTO_DT TEXT, USER_LOGIN_FROM TEXT, USER_LOGIN_UPTO TEXT, USER_ACTIVE_YN TEXT, USER_LANG_CODE TEXT, USER_CR_UID TEXT, USER_CR_DT TEXT, USER_UPD_UID TEXT, USER_UPD_DT TEXT, USER_LOCN_CODE TEXT) ');
			alert("success");
			for (var i = 0; i < ajaxlength; i++) {
				tx.executeSql('INSERT OR REPLACE INTO APPS_USER (USER_COMP_CODE, USER_ID, USER_DESC, USER_PERS_CODE, USER_PASSWD, USER_PW_CHANGE_YN, USER_EMAIL, USER_OFFICE_PHONE, USER_HOME_PHONE, USER_CELL_PHONE, USER_IMAGE_BLOB, USER_IMAGE_FILE, USER_FROM_DT, USER_UPTO_DT, USER_LOGIN_FROM, USER_LOGIN_UPTO, USER_ACTIVE_YN, USER_LANG_CODE, USER_CR_UID, USER_CR_DT, USER_UPD_UID, USER_UPD_DT, USER_LOCN_CODE) VALUES ("' + json[i].USER_COMP_CODE + '", "' + json[i].USER_ID + '", "' + json[i].USER_DESC + '", "' + json[i].USER_PERS_CODE + '", "' + json[i].USER_PASSWD + '", "' + json[i].USER_PW_CHANGE_YN + '", "' + json[i].USER_EMAIL + '", "' + json[i].USER_OFFICE_PHONE + '", "' + json[i].USER_HOME_PHONE + '", "' + json[i].USER_CELL_PHONE + '", "' + json[i].USER_IMAGE_BLOB + '", "' + json[i].USER_IMAGE_FILE + '", "' + json[i].USER_FROM_DT + '", "' + json[i].USER_UPTO_DT + '", "' + json[i].USER_LOGIN_FROM + '", "' + json[i].USER_LOGIN_UPTO + '", "' + json[i].USER_ACTIVE_YN + '", "' + json[i].USER_LANG_CODE + '", "' + json[i].USER_CR_UID + '", "' + json[i].USER_CR_DT + '", "' + json[i].USER_UPD_UID + '", "' + json[i].USER_UPD_DT + '", "' + json[i].USER_LOCN_CODE + '")', successID);
				
				j++;
				if(j==ajaxlength){
					
					alert('All data user updated');
					select();
				}
				
			}
		});
	}
});


function successID(){
	return true;
}

function select() {
	alert("select query");
	
	var db = window.openDatabase("Spine", "1.0", "Spine Demo", 100 * 1024 * 1024);
	alert(db);
	db.transaction(function (tx){
		alert("enter select");
		tx.executeSql('SELECT * FROM APPS_USER', [], function (tx, results) {
		//	var app_user_count = results.rows.length;
			alert("success count");
		//	localStorage.setItem("app_user_count", app_user_count);
			
			alert('inside');
		});
	});
}

});

