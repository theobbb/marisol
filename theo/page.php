<?php



get_header();

//include get_template_directory() . '/inc/mini-header.php';
 
?>



<div id="site-content" role="main">

<?php
if( have_posts() ) {
  while( have_posts() ) {
    the_post();
    the_content();
  }
}
?>

</div><!-- #site-content -->

<?php get_footer(); ?>
