// The Atom Group

$(document).ready(function() {

	//Explore drop menu
	$('#explore-menu-wrapper').hover(
		function(){
			$('#explore-menu').slideDown();
		},
		function(){
			$('#explore-menu').stop(true, true).slideUp();
		}
	);

	if($('#jj').attr('class') === 'home'){
		$('#explore-menu ul li.home a').addClass('active');
	}else if($('#jj').attr('class') === 'timeline'){
		$('#explore-menu ul li.timeline a').addClass('active');
	}else if($('#jj').attr('class') === 'favs'){
		$('#explore-menu ul li.fav-subs a').addClass('active');
	}else if($('#jj').attr('class') === 'celeb-interviews'){
		$('#explore-menu ul li.celeb-interviews a').addClass('active');
	}else if($('#jj').attr('class') === 'pants-dance-game'){
		$('#explore-menu ul li.pants-dance-game a').addClass('active');
	}else if($('#jj').attr('class') === 'stories'){
		$('#explore-menu ul li.stories a').addClass('active');
	}else if($('#jj').attr('class') === 'tips'){
		$('#explore-menu ul li.tips a').addClass('active');
	}else if($('#jj').attr('class') === 'foundation'){
		$('#explore-menu ul li.foundation a').addClass('active');
	}
});



