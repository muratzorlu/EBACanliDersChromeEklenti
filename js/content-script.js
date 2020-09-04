

var $btn= $('<input type="button" value="MAC&PARDUS Zoom Aç" style="position: fixed;top: 55px;right:10px;" id="ekle"/>').click(goFrame);


var $url="https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//studytime/getteacherstudytime";
var $data="status=2&type=1&pageNumber=1&pageSize=25";
var $buton=0;


chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.action == 'SendIt') {
	  
	  var arr = window.location.toString().split('/');
$.each( arr, function( index, value ) {
	console.log(value);
    if(value.substring(0,15)=="livesessionview") 
	{
		$url="https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//studytime/getteacherstudytime";
		$data="status=2&type=1&pageNumber=1&pageSize=25";
		$buton=1;
	} else if(value.substring(0,14)=="liveMiddleware") 
	{
		$url="https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//studytime/getstudentstudytime";
		$data="status=1&type=2&pagesize=25&pagenumber=0";
		$buton=1;
	} else $buton=0;
});

    if (document.getElementsByName('etudViewType') && $buton==1)
	{
		 $("body").append($btn);
	}
	else $("#ekle").remove();

	  
   }
});

	
  /*  if (document.getElementsByName('etudViewType'))
	{
		 $("body").append($r);
	}*/
function goFrame() {
    $.ajax({
  url : $url,
  method : "POST",
  headers : {
    "Content-Type" : "application/x-www-form-urlencoded",
    "Accept" : "json"
  },
  data : $data,
  withCredentials : true,
  crossDomain : true,
  xhrFields : {
    withCredentials : true
  },
  dataType : "json",
  success : function(resp) {
    var result = resp.studyTimeList;
    var dersler = [];
    var dersText = "";
    var id = 1;
	console.log(result);
    for (var i in result) {
		
      if ((new Date).getTime() + 18000000 > result[i].startdate) {
        dersler.push(result[i]);
        dersText = dersText + (id.toString() + ") " + result[i].title + " (" + result[i].ownerName + ")\n");
        id = id + 1;
      }
    }
    if (dersler.length == 0) {
      alert("aktif ders yok");
      return;
    }
    var selectedDers = prompt("Seçim yapınız (sadece rakam girin):\n\n" + dersText);
    var ders = dersler[parseInt(selectedDers) - 1];
	console.log(ders.id);
    $.ajax({
      url : "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//livelesson/instudytime/start",
      method : "POST",
      headers : {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Accept" : "json"
      },
      data : {
        "studytimeid" : ders.id,
        "tokentype" : "asdasd"
      },
      withCredentials : true,
      crossDomain : true,
      xhrFields : {
        withCredentials : true
      },
      dataType : "json",
      success : function(resp2) {
        window.location = resp2.meeting.url + "?tk=" + resp2.meeting.token;
      }
    });
  }
});
}
