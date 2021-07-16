


$(document).ready(function(){

	$('.lightbox li').addClass('item');



	//lightbox($('.lightbox'));

	//lightbox($('.lightbox'), $('.wp-block-gallery .blocks-gallery-item'))



	$('.lightbox:not(.open) .item').click(function(){

		$(this).addClass('active');
		$(this).parents('.lightbox').addClass('open');
	
		//$(this).animate({})
		
	})

})

/*
function lightbox(container, items){

	var items = $(container).find('li');
	var n = items.length;
	console.log($(container).attr('class'));

	

	$(items).click(function(e){
		if (!$(container).hasClass('open')) {
			




			$(container).addClass('open');
		} else {



			$(container).removeClass('open');
		}
	})
}
*/
	