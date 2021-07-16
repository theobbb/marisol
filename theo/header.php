<?php

?><!DOCTYPE html>



<html <?php language_attributes(); ?>>


 
	<head>

		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" >


		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://use.typekit.net/zev6icp.css">

		<!-- jQuery library -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

		<?php wp_head(); ?>

	</head>


	<body <?php body_class(); ?>>

		<?php wp_body_open(); ?>
		<header id="site-header" class="m1" role="banner">

			<?php include get_template_directory() . '/inc/main-header.php'; ?>
			
		</header>

		<?php if ( ! WC()->cart->is_empty() ) : ?>
			<h2 class="cart-link">
				<a href="/cart">Voir le panier</a>
			</h2>
		
		<?php endif; ?>

		

			<?php include get_template_directory() . '/inc/mini-header.php'; ?>

		<?php
		// Output the menu modal.
		//get_template_part( 'template-parts/modal-menu' );
		
