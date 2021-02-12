/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
 //* updated from detectmobilebrowser.com on 7/17/15 LJR *//
 
 (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
 

function get_browser()
{
    var N=navigator.appName, ua=navigator.userAgent, tem;
    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

    return M[0];
}


var  s_bMobile = jQuery.browser.mobile;
var browser = get_browser();
var isAnyIpad = navigator.userAgent.match(/iPad/i) != null;
var intHeader;


$(window).ready(function() {
	doOrientationChange();	
});


window.addEventListener("orientationchange", onOrientationChange );

function onOrientationChange(){

	if(isAnyIpad === true){
		s_bMobile = true;
		browser = 'Safari';		
	}
	
	if ((browser=="msie" || browser==="msie" )){
		s_bMobile = false;
		return;
	}

    if (window.matchMedia("(orientation: portrait)").matches) {
       // you're in PORTRAIT mode	
	   doOrientationChange();	   
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
       // you're in LANDSCAPE mode  do a force reload 
	  /*  var p = window.location.pathname;
       var root = p.substring(0, p.lastIndexOf('/'));
	   window.location.href= root + "/index.html";
		 */
		document.getElementById("no-portrait").style.display = "none"; 
		document.getElementById("game-container").style.display = "block";
		document.getElementById("btn-print").style.display = "none";
		intHeader = setInterval(updateHeader,100);			
		centerContent();
    }
	
}

function centerContent()
{	
	var screenW = window.innerWidth;
	var screenH = window.innerHeight - ($('#head-btn-container').height() * 2);
	$('#game-container').css('height', screenH +'px');
	var container = $('#game-container');
	var content = $('#message-container');
	//content.css("left", (screenW-content.width())/2);
	content.css("top", (screenH-content.height())/2);
}

function doOrientationChange() {

	var  s_bMobile = jQuery.browser.mobile;
	
	if(isAnyIpad === true){
		s_bMobile = true;
	}
	
	if ((browser=="msie" || browser==="msie" )){
		s_bMobile = false;
		return;
	}
	
	if(s_bMobile === false){
		document.getElementById("no-portrait").style.display = "none"; 
		document.getElementById("game-container").style.display = "block";
		return;
	}
       
    switch (window.orientation) {
		case -90:
			case 90:
				document.getElementById("no-portrait").style.display = "none"; 
				document.getElementById("game-container").style.display = "block";
				document.getElementById("btn-print").style.display = "none";
				intHeader = setInterval(updateHeader,100);
			break;
		default:
			document.getElementById("no-portrait").style.display = "block";
			document.getElementById("game-container").style.display = "none";
    }
}

/**
 * Determine whether the file loaded from PhoneGap or not
 */
function isPhoneGap() {
	return (window.cordova || window.PhoneGap || window.phonegap)
	&& /^file:\/{3}[^\/]/i.test(window.location.href)
	&& /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}

function updateHeader(){
	if($('#game-container #scbldr #message-container').css('display') == "none"){
		$('#game-container #head-btn-container #header h1').css('display','inline');	
	}else{
		$('#game-container #head-btn-container #header h1').css('display','none');
	}
	clearInterval(intHeader);
}

$(window).load(function()
{
	centerContent();
});

$(window).resize(function()
{
	centerContent();
});
	












