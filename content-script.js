var $r= $('<input type="button" value="MAC&PARDUS Zoom Aç" style="position: fixed;top: 55px;right:10px;" id="ekle"/>').click(goFrame);


/*var $sayfa=0;
	var arr = window.location.toString().split('/');
$.each( arr, function( index, value ) {
	console.log(value);
    if(value.substring(0,15)=="livesessionview") $sayfa=1;
});

    if (document.getElementsByName('etudViewType') && $sayfa==1)
	{
		 $("body").append($r);
	}
*/
    if (document.getElementsByName('etudViewType'))
	{
		 $("body").append($r);
	}
function goFrame() {
    $.ajax({
  url : "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//studytime/getstudentstudytime",
  method : "POST",
  headers : {
    "Content-Type" : "application/x-www-form-urlencoded",
    "Accept" : "json"
  },
  data : "status=1&type=2&pagesize=25&pagenumber=0",
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

