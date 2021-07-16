<?php



get_header();

?>



<div id="site-content" role="main">



<style type="text/css">

.logo img {
	display: none;
}

header {
	background: none;
}



.blocks-gallery-item.active-slide img {
	
	opacity: 1;
}


	#site-content {

	}

	

	.blocks-gallery-item img {

		position: fixed; 
		width: 100% !important;
		height: 100% !important;

		left: 0;
		right: 0;
		top: 0; 

		object-fit: cover !important;

		z-index: 0;
		pointer-events: none;

		
		
		transition: transform 7s ease-out, opacity 3s ease;
		
		opacity: 0;
		display:none;
	}





	.blocks-gallery-item__caption {
		display: none;
	}

.dots {
		position:fixed;
	bottom:0;
	right:0;
	left:0;
	width:100%;
	text-align:center;
	z-index:100 !important;
}


.dot {
  height: 12px;
  width: 12px;
  margin: 3px;
	opacity:0.4 !important;
	z-index:100 !important;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active-dot {
  background-color: black;
	
}



</style>

<div id="poster"></div>

<?php

if( have_posts() ) {

  while( have_posts() ) {

    the_post();

    the_content();

  }

}

?>

	<div style="">



		



	</div>



</div><!-- #site-content -->

<?php wp_footer(); ?>



<script></script>


   </body>
</html>


