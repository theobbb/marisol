
//window.stop();

$(window).scroll(function (event) {
	var s = $(window).scrollTop();

	//$('.full-img').scroll()

	//console.log(s);
})

$(document).ready(function(){

	
		if ($('.carousel').length) {
			carousels = $('.carousel');

			$('.carousel').attr({'class': 'carousel slide carousel-dark', 'data-bs-ride':'carousel'});
			$('.carousel ul').attr('class','carousel-inner');
			$('.carousel li').attr('class','carousel-item');
			$('.carousel li:first-child').addClass('active');

			for (i=0; i<carousels.length; i++) {
				n = 'carousel-'+(i+1);
				$(carousels)[i].id = n;
				$(carousels).eq(i).append('<button class="carousel-control-prev" type="button" data-bs-target="#'+n+'" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#'+n+'" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>')	
				
				
				
				$(carousels).eq(i).prepend('<div class="carousel-indicators"><button type="button" data-bs-target="#'+n+'" data-bs-slide-to="0" class="active" aria-current="true"></button></div>')
				$(carousels).eq(i).find('.carousel-item:not(:first-child)').each(function(){
					$(carousels).eq(i).find('.carousel-indicators').append('<button type="button" data-bs-target="#'+n+'" data-bs-slide-to="'+$(this).index()+'"></button>')
				})
			
			}		

		}
		if ($('.pswp').length) {
			if (!$('.dgwt-jg-item-desc').length) {
				document.body.addEventListener('click', function(){

					$('.dgwt-jg-item-desc').html( $('.dgwt-jg-item-desc').html().replace(/\"/g, '') );
					console.log('gallery: '+$('.dgwt-jg-item-desc').length )
				}, true);
			}
			
			
		}
		

	function accordion(){

	}
	accordion();


	$("#hamburger input").change(function() {
		if(this.checked) {
			$('body').removeClass('menu-open');
			$('body').removeClass('scroll')
			if ($('body').hasClass('scroll')) {
				
			}
			
			console.log('change');
		} else {
			$('body').addClass('menu-open');
			$('body').addClass('scroll')
			if ($('body').hasClass('scroll')) {
				
			}
		}
	});


	console.log($('.dgwt-jg-item-desc').length);
	$('.dgwt-jg-item-desc').each(function(){
		console.log('gg');
		$(this).html( $(this).html().replace(/\a/g, 'e') );
		
		
	})

	$('form').submit(function(){
		console.log('gfgf');
	})

	var n = 0;
	$('.fake-add-to-cart').click(function(){

		if (!$(this).hasClass('active')) {
			$(this).siblings().removeClass('active');

			$(this).addClass('active');

			$('input[name="variation_id"]').attr('value', $(this).attr('value'));

			$('.woocommerce-variation-add-to-cart-disabled').removeClass('woocommerce-variation-add-to-cart-disabled').addClass('woocommerce-variation-add-to-cart-enabled');
		
			$('button.disabled').removeClass('disabled');
		} 

	})

	

	$('.menu-item:not(.menu-item-has-children)').click(function(){
		if (!$(this).hasClass('current-menu-item')) {
			$(this).siblings().removeClass('current-menu-item');
			$(this).addClass('current-menu-item');
		}
	})
	$('.menu-item-language').click(function(){
		if (!$(this).hasClass('menu-item-language-current')) {
			$(this).siblings().removeClass('menu-item-language-current');
			$(this).addClass('menu-item-language-current');
		}
	})
/*
	$('a').click(function(){

		if (!$(this).parent().hasClass('active-link')) {
			$(this).parent().siblings().removeClass('active-link');
			$(this).parent().addClass('active-link');
		}

	})
*/

	if (!$(window).scrollTop() == 0) {
		$('body').removeClass('scroll0');
	}
	
	window.addEventListener("scroll", (event) => {
		let scroll = window.scrollY;

		


		if (scroll != 0) {
			if (!$('body').hasClass('scroll')) {
				//$('#description').css('display','block');
				$('body').addClass('scroll');

				
				//$('header .titre').css({'height': $('#titre').height() + 'px '});

				$('#description').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(event) {
					//$('#description').css('display','none');
					/* Just to make the output obvious :) */
					console.log('ff');
					//$('.logo').css('display', 'none');
				  
				});

				
				//$('.logo').fadeOut(300);
				//$('.socials').fadeOut(300);
				//$('#lang').fadeOut(300);
				//$('#description').fadeOut(300);
			}
			//console.log(scroll);
		} else {
			$('body').removeClass('scroll');

			
			//$('header .titre').css({'height': 'unset'});
		}

		var fixed = document.querySelector('.menu-container');

		fixed.addEventListener('touchmove', function(e) {
		
				e.preventDefault();
		
		}, false);		
		
	});


})


	
