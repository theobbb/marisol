<?php

?>


<?php

global $post;     // if outside the loop

if ( $post->post_parent ) {

    ?><div id="mini-header"><?php

    // This is a subpage
	$post_id = get_the_ID();
	$parent_post_id = wp_get_post_parent_id($post_id);
    $parent_post = get_post($parent_post_id);
    $parent_post_title = $parent_post->post_title;
    echo '<h1 class="pagetitle">'. $parent_post_title .'</h1>';


    $siblings = new WP_Query( array(
        'post_type' => 'page',
        'post_parent' => $post->post_parent,
        'orderby' => 'menu_order',
        'order' => 'ASC',
        //'post__not_in' => array( $post->ID )

    ) );
    if ( $siblings->have_posts() ) :    


    $active_url = get_the_permalink();    

?>
    

	
    <ul class="menu">
        <?php while ( $siblings->have_posts() ) : $siblings->the_post(); ?>
            <?php if ( get_the_permalink() == $active_url ) : ?>
                <li class="menu-item current-menu-item">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </li>
                
            <?php else: ?>
                <li class="menu-item">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </li>                
           
            <?php endif; ?>
        <?php endwhile; wp_reset_postdata(); ?>
    </ul>
   
<?php 
        endif;

        ?></div><?php
    }
    else {
    	//echo '<h1 class="pagetitle">'. get_the_title() .'</h1>';
    	
    }

?>


<?php