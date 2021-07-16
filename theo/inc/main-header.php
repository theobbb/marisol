<?php

?>
<div class="gauche">
	<div class="titre">
	<?php



	echo "<h2 id='titre'><a class='rtl c2' href='". home_url() ."' data-type='page-transition'>". get_bloginfo( 'name' ) ."</a></h2>";
	echo "<p id='description'>". get_bloginfo( 'description' ) ."</p>";

	?>	
	</div>
	<?php  

	$custom_logo_id = get_theme_mod( 'custom_logo' );
	$logo = wp_get_attachment_image_src( $custom_logo_id , 'full' );
	 
	if ( has_custom_logo() ) {
		?>
		<div class="logo">
			<img src="<?php echo esc_url( $logo[0] ) ?>" alt="<?php echo get_bloginfo( 'name' ) ?>">
		</div>
	    
		<?php
	} 

	?>

</div>		

<nav class="" role="navigation">


<div class="lang">
	<?php
	wp_nav_menu( array( 
		'theme_location' => 'lang', 
		'container_class' => 'menu-container' ) ); 
	?>

	 
	</div>

		<?php
		wp_nav_menu( array( 
		    'theme_location' => 'navigation', 
		    'container_class' => 'menu-container' ) ); 
		?>
		
		
    <label id="hamburger" for="check">
      <input type="checkbox" id="check"/>
	  <div>
		<span></span>
		<span></span>
	  </div>
	  <div>
		<span></span>
		<span></span>
	  </div>
    </label>
	
	<div class="socials">
		<img src="<?php echo get_template_directory_uri() . '/assets/img/instagram.png' ?>" alt="">
	</div>


	
</nav>



<?php