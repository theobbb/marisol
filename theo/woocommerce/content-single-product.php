<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

/**
 * Hook: woocommerce_before_single_product.
 *
 * @hooked woocommerce_output_all_notices - 10
 */
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
?>
<div class="single-product-tb" id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>

	<?php
	$custom = get_post_custom();
	?>

	<h1><?php echo get_the_title(); ?></h1>
<div class="m1">
	<div class="main" style="">
		
		<div class="main-img" style="display:flex; height:100%; flex-direction: column;">
			<figure><img src="<?php echo get_the_post_thumbnail_url($product->ID); ?>"/></figure>
			
		</div>
		
		<div>
			<p><?php echo $custom['resume'][0]; ?></p>
			
			<div class="imgs">
				<?php
				$attachment_ids = $product->get_gallery_image_ids();
				foreach( $attachment_ids as $attachment_id ) {
					echo '<figure><img src="'. wp_get_attachment_url( $attachment_id , 'large') .'"></img></figure>';
				}
				?>
			</div>
		</div>



	</div>

	<div class="p">
			<div>
				
				<p><?php echo $custom['prix_litteraires'][0]; ?></p>
				<div>
					<p><?php echo $custom['informations'][0]; ?></p>
					<p><?php echo $custom['droits_vendus'][0]; ?></p>
				</div>
			</div>
	
			<div>
				
				<?php do_action( 'tb_add_to_cart' ); ?>
			</div>
		</div>
	</div>

	
	<?php
        /**
         * woocommerce_single_product_summary hook.
         *
         * @hooked woocommerce_template_single_title - 5
         * @hooked woocommerce_template_single_rating - 10
         * @hooked woocommerce_template_single_price - 10
         * @hooked woocommerce_template_single_excerpt - 20
         * @hooked woocommerce_template_single_add_to_cart - 30
         * @hooked woocommerce_template_single_meta - 40
         * @hooked woocommerce_template_single_sharing - 50
         */
	?>
</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>
