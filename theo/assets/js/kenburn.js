
$(document).ready(function(){

	var img = document.querySelector('img');

	if (img != null) {
		if (img.complete) {
		  start()
		} else {
		  img.addEventListener('load', function(){
			start();
			} )
		}
	} 

})	

function start() {

	$('#poster').fadeOut(3000);

	$('.gallery-item').each(function(){

	});

	
	$('.wp-block-gallery').append( $('<div class="dots"></div>') );

	$('.blocks-gallery-item').each(function(){

		caption = $(this).find('.blocks-gallery-item__caption').html();
		if (caption.split('')[0] == 'w') $(this).addClass('white');
		


		x = caption.split('')[1];
		y = caption.split('')[2];

		x1 = (x == 'm')? '100' : x +'0';
		y1 = (y == 'm')? '100' : y +'0';

		$(this).attr({'x': x1, 'y': y1});

		$(this).find('img').css({'object-position': ''+x1+'% '+y1+'%', 'transform-origin': ''+x1+'% '+y1+'%' });

		//$(this).find('img').addClass(caption);

		$('.dots').append( $('<span class="dot"></span>') )
	});
	
/*
	$('.blocks-gallery-item:first-child').addClass('active-slide');
	$('.blocks-gallery-item:not(:first-child)').fadeOut();

	$('.dot').first().addClass('active-dot');
	*/
	
	autoPlaySlide();

	function autoPlaySlide(){


		var currentSlide = $('.active-slide');
		var nextSlide = currentSlide.next();

		var currentDot = $('.active-dot');
		var nextDot = currentDot.next();

		if (nextSlide.length === 0) {

			nextSlide = $('.blocks-gallery-item').first();
			nextDot = $('.dot').first();

		} 
		
		if ($(nextSlide).hasClass('white') ) {
			$('header *').css('color', 'white');
			$('header img').css('filter', 'invert(100%)');
		} else {
			$('header *').css('color', 'initial');
			$('header img').css('filter', 'initial');				
		}
		
		origin = ($(nextSlide).attr('x')) +'% '+ ($(nextSlide).attr('y')) +'%';
		nextSlide.addClass('active-slide').find('img').css({'opacity': '1', 'transform': 'scale(1.3)'});
		//.fadeIn('3000').find('img').css({'transform-origin': origin ,'transform': 'scale(1.3)'});

		currentSlide.removeClass('active-slide').find('img').animate({'opacity': '0'}, 2000, function(){
			currentSlide.find('img').css({'transform': 'scale(1)'});
		})
		//.fadeOut('3000').find('img').css({'transform': 'scale(1)'})

		nextDot.addClass('active-dot');
		currentDot.removeClass('active-dot');

	}
	setInterval(autoPlaySlide, 6000 ); //Executes ever 5000ms	
}		

