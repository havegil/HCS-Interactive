var iv,
	activeScreen    = 1,
	controller      = new dragController(),
	// will be true if the device is mobile
	isMobile        = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	sceneContainerEl,canvasPrintScreenShotEl,gameContainerEl;

/* ---  Init Script on domw ready   --------------------------------------*/
$(document).ready(function(){
   $( init );
});

function init() {
	sceneContainerEl        = document.querySelector('#scbldr-container');
	canvasPrintScreenShotEl = document.querySelector('[data-js="toPrint"]');
	gameContainerEl         = document.querySelector('#game-container');
  $('.draggables').draggable( {
     revert: function(socketObj)
      {
         //if false then no socket object drop occurred.
         if(socketObj === false)
         {
            //revert the peg by returning true
             //typically this would return true but because we want to display correct 
            //even if they got it wrong we will overwrite defaul behavior here
             
             controller.handleReverts(this, socketObj);
            return false;
         }
         else
         {
            //socket object was returned,
            //we can perform additional checks here if we like
             //alert(socketObj.attr('id')); //would work fine
             var ddtargetRef = socketObj.attr('class').split(' ')[0];
             //controller.handleReverts(this, ddtargetRef);
			 
			 if(ddtargetRef == "no-drop"){
				return true;
			 }

            //return false so that the peg does not revert
            return false;
         }
      },
	  start: function() {
			//on drag start duplicate item being dragged
			var hasCopy = $(this).parent().children(".drag-copy");
			if(hasCopy.length > 0) {
				console.log('exist!');
				return;			
			}
			// sniffs for mobile (ipad/iphone/android), and sets the scale size accordingly
			var scaleUpTo   = (isMobile) ? '1.3' : '2',
				$draggingEl = $(this),
				dragged     = $draggingEl.attr('id'),
				x           = controller.coordOrigin($(this)).x,
				y           = controller.coordOrigin($(this)).y,
				dupe        = '<div class="drag-copy" style="position:relative;opacity:0.3;top:'+ y +';left:'+ x +';z-index:10;">' + $(this).first().html()  + '</div>';
			
			$draggingEl[0].setAttribute('data-ui-state','onStage');
			$draggingEl.css('z-index','25');
			$draggingEl.css('position','absolute');
			$draggingEl.animate({ scale: scaleUpTo }, 300);
			$draggingEl.parent().append(dupe);
       },
  } );

	var DDpos = {x: $('#draggable1').position().left, y:$('#draggable1').position().top}
	
  	$('.no_drop').droppable( {
		disabled: false,
		drop: function(event, ui){
			var dragged = $(ui.draggable).attr('id');
			var pos = {x: $('#'+dragged).position().left, y:$('#'+dragged).position().top}
			controller.reset(dragged);
		}, 
		over:function(event, ui){
			 //alert("over!!!");
		},
		out:function(event, ui){
		   var dragged = $(ui.draggable).attr('id');
		},
		stop: function ( event, ui ) {
			if ( $( '.draggables' ).data( 'hover' ) != 1){
				$('.draggables').animate( { 'left': $( '.draggables' ).data('left'), 'top': $( '.draggables' ).data( 'top' )}, 'slow');
			}			
		}
	});
	
  $('.ddtarget1').droppable( {
        accept:".draggables",
        drop: function(event, ui){
            var dragged = $(ui.draggable).attr('id');
        },
        over:function(event, ui){
         //$(this).find('div').addClass( "active_hazzard" );//hilite
        },

        out:function(event, ui){
           var dragged = $(ui.draggable).attr('id');           
        }
    });

    $('.ddtarget2').droppable( {
        accept:"#draggables",
        drop: function(event, ui){
          var dragged = $(ui.draggable).attr('id');
       },
        over:function(event, ui){
        },
        out:function(event, ui){
           var dragged = $(ui.draggable).attr('id');
        }
    });
	
	$('#btn-start-over').click(function(){
		controller.reset();
	});
	
	//return to kids landing	
	$('#btn-close').click(function(){
		window.location.href ="/kids/";
	});
	
	$('#btn-print').click(function(){
		sceneContainerEl.setAttribute('data-ui-state','printing');
		html2canvas(sceneContainerEl).then(function(canvas) {
			canvasPrintScreenShotEl.appendChild(canvas);
		    gameContainerEl.style.display = 'none';
		    window.print();
		    // clears out the canvas holding our DOM screen shot
			canvasPrintScreenShotEl.innerHTML = '';
			sceneContainerEl.removeAttribute('data-ui-state');
			gameContainerEl.style.display = 'block';
		});
	});	

		
	$("#lst-scene li div").each(function(index, value){
		$(this).click(function(){
			var currOpacity = $(this).css('opacity');
			controller.refreshScenes();
			
			if(currOpacity == 1){
				$(this).css('opacity', '0.3');
				if(s_bMobile === true){
					$('.scene img').attr('src', 'images/scene_0' + index +'m.jpg');
					//alert("This is mobile");
				}else{
					//alert("This is not mobile");
					$('.scene img').attr('src', 'images/scene_0' + index +'.jpg');
				}
			}
			if(index > 0){
				$('.scene').css('text-align', 'center');
				$('#scbldr-scene-container').addClass('scene_dsk');
			}else{
				$('#scbldr-scene-container').removeClass('scene_dsk');
			}
		});
	});
	
	$('.btn_play').click(function(){
		$('#message-container').css('display', 'none');
		if(s_bMobile === true){
			$('#game-container #head-btn-container #header h1').css('display','inline');
		}
		$('#scbldr-container').css('display', 'block');
		$('#scbldr-footer-container').css('display', 'block');
		$('#btn-close').css('display', 'inline');
	});
	
	$('.scrller-arrow').bind( "mousedown touchstart", function(e){

	});
	
	$('.scrller-arrow').bind( "mouseup touchend", function(e){		
		
	});	
	
}

//start the assumption we're at questionGroupIndex 1
function dragController(){

	this.reset = function(hasSelector){
		if( typeof hasSelector != 'undefined'){
			$("#drg-stickers li #" + hasSelector).each(function(index, value){
				var hasCopy = $(this).parent().children(".drag-copy");
				if(hasCopy.length > 0) {
					$(hasCopy).remove(".drag-copy");
					var obj = $(this);
					$(this).css('position','relative');
					$(obj).animate( { 'left': controller.coordOrigin(hasCopy).x, 'top': controller.coordOrigin(hasCopy).y, scale: 1}, 'slow');					
				} 
			});
			
			return;			
		}
		$("#drg-stickers li .draggables").each(function(index, value){
			var hasCopy = $(this).parent().children(".drag-copy");
			if(hasCopy.length > 0) {
				$(hasCopy).remove(".drag-copy");
				var obj = $(this);
				$(this).css('position','relative');
				$(obj).animate( { 'left': controller.coordOrigin(hasCopy).x, 'top': controller.coordOrigin(hasCopy).y, scale: 1}, 'slow');					
			} 
			
		});
	};

   this.handleReverts = function(dragObj, dropTargetObj){
      var dragged = $(dragObj).attr('id');
	  if(dropTargetObj === false){
		controller.reset();
	  }
   };
   
   this.refreshScenes = function(){
   		$('[data-ui-state~="onStage"]').each(function() { $(this)[0].removeAttribute('data-ui-state') });
		controller.reset();
		$("#lst-scene li div").each(function(index, value){
			var currOpacity = $(this).css('opacity');
			if(currOpacity < 1){
				$(this).css('opacity', '1');
			}
		});
   };
   
   this.coordOrigin = function(obj){   
		return {x: $(obj).position().left, y:$(obj).position().top}
   };
}

