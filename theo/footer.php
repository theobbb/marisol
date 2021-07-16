<?php include_once get_template_directory() . '/lang/'. ICL_LANGUAGE_CODE .'.php'; ?>

</div>

<footer>
	
	
	<main>
		
	<?php //include get_template_directory() . '/lang/en.php' ; //echo get_template_directory() . '/lang/en.php'; ?>
	<h2><?php echo $lang['footer-email'] ?></h2>
	<input type="email" name="" placeholder="Email">
	<p>&copy; <script>document.write(new Date().getFullYear());</script> Marisol Sarrazin</p>
	<p><?php echo $lang['footer-copyright'] ?></p>

	<?php
/*
	<?php if (ICL_LANGUAGE_CODE == 'fr') : ?>
		<h2>Inscrivez-vous pour rester à l'affut des nouveautés</h2>
		<input type="email" name="" placeholder="Email">
		<p>&copy; <script>document.write(new Date().getFullYear())</script> Marisol Sarrazin</p>
		<p>Toutes les illustrations de ce site sont protégées par le droit d’auteur. Toute reproduction ou utilisation sans permission est strictement interdite. Le droit d’auteur et le droit de reproduction ne sont pas transférés avec la vente d’œuvres d’art.</p>
	<?php endif; ?>

	<?php if (ICL_LANGUAGE_CODE == 'en') : ?>
		<h2>Sign up to stay up to date with news</h2>
		<input type="email" name="" placeholder="Email">
		<p>&copy; <script>document.write(new Date().getFullYear())</script> Marisol Sarrazin</p>
		<p>Toutes les illustrations de ce site sont protégées par le droit d’auteur. Toute reproduction ou utilisation sans permission est strictement interdite. Le droit d’auteur et le droit de reproduction ne sont pas transférés avec la vente d’œuvres d’art.</p>

	<?php endif; ?>
*/
 ?>
	</main>

	<div id="footer-img" style=" <?php echo 'background-image: url('. get_template_directory_uri() . '/assets/img/footer.png' .')' ?> "></div>

</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
		<?php wp_footer(); ?>

	</body>
</html>
