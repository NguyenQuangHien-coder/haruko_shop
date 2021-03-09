<?php

//////////////////////////////////////////////////////////////
//===========================================================
// post_metas.php
//===========================================================
// PAGELAYER
// Inspired by the DESIRE to be the BEST OF ALL
// ----------------------------------------------------------
// Started by: Pulkit Gupta
// Date:	   23rd Jan 2017
// Time:	   23:00 hrs
// Site:	   http://pagelayer.com/wordpress (PAGELAYER)
// ----------------------------------------------------------
// Please Read the Terms of use at http://pagelayer.com/tos
// ----------------------------------------------------------
//===========================================================
// (c)Pagelayer Team
//===========================================================
//////////////////////////////////////////////////////////////

// Are we being accessed directly ?
if(!defined('PAGELAYER_VERSION')) {
	exit('Hacking Attempt !');
}

// Show the post props
function pagelayer_meta_page(){
	global $post_type, $post_type_object, $post, $wp_meta_boxes, $current_screen, $user_ID, $post_ID;
	
	$post_ID = (int) @$_GET['post'];
	
	if(empty($post_ID)){
		return;
	}
	
	$post = get_post($post_ID);
	
	if(empty($post)){
		return;
	}
	
	if ( ! current_user_can( 'edit_post', $post_ID ) ) {
		wp_die( __( 'Sorry, you are not allowed to edit this item.' ) );
	}

	$post_type = $post->post_type;
	$post_type_object = get_post_type_object( $post_type );
	$user_ID = get_current_user_id();
	
	// Set current screen
	set_current_screen($post_type);
	
	// Flag that we're not loading the block editor.
	$current_screen = get_current_screen();
	$current_screen->is_block_editor = 0;
	
	// Enqueue Scripts
	wp_enqueue_script( 'post' );
	
	// Is support media
	$thumbnail_support = current_theme_supports( 'post-thumbnails', $post_type ) && post_type_supports( $post_type, 'thumbnail' );
	if ( ! $thumbnail_support && 'attachment' === $post_type && $post->post_mime_type ) {
		if ( wp_attachment_is( 'audio', $post ) ) {
			$thumbnail_support = post_type_supports( 'attachment:audio', 'thumbnail' ) || current_theme_supports( 'post-thumbnails', 'attachment:audio' );
		} elseif ( wp_attachment_is( 'video', $post ) ) {
			$thumbnail_support = post_type_supports( 'attachment:video', 'thumbnail' ) || current_theme_supports( 'post-thumbnails', 'attachment:video' );
		}
	}

	if ( $thumbnail_support ) {
		add_thickbox();
		wp_enqueue_media( array( 'post' => $post_ID ) );
	}
	
	$form_extra = '';
	$form_action  = 'editpost';
	$nonce_action = 'update-post_' . $post_ID;
	$form_extra  .= "<input type='hidden' id='post_ID' name='post_ID' value='" . esc_attr( $post_ID ) . "' />";

	// All meta boxes should be defined and added before the first do_meta_boxes() call (or potentially during the do_meta_boxes action).
	$lib = ABSPATH . 'site-admin/includes/meta-boxes.php';
	$lib = file_exists($lib) ? $lib : ABSPATH . 'wp-admin/includes/meta-boxes.php';
	require_once $lib;

	register_and_do_post_meta_boxes( $post );
	
	$locations = array( 'side', 'normal', 'advanced' );
	$priorities = array( 'high', 'sorted', 'core', 'default', 'low' );
	$to_remove_box = array('revisionsdiv', 'commentsdiv', 'formatdiv');
	
	// Remove Meta Boxes
	foreach( $locations as $location ){
		foreach( $priorities as $priority ){
			if( isset( $wp_meta_boxes[ $current_screen->id ][ $location ][ $priority ] ) ){
				foreach( $to_remove_box as $to_remove ) {
					if(array_key_exists($to_remove, $wp_meta_boxes[ $current_screen->id ][ $location ][ $priority ])){
						remove_meta_box($to_remove, $current_screen, $location);
					}
				}
			}
		}
	}
	
	// Add format div again to change the position
	if ( current_theme_supports( 'post-formats' ) && post_type_supports( $post_type, 'post-formats' ) ) {
		add_meta_box( 'formatdiv', _x( 'Format', 'post format' ), 'post_format_meta_box', null, 'side', 'default', array( '__back_compat_meta_box' => true ) );
	}
	
	// TO show all hidden meta boxes
	add_filter( 'hidden_meta_boxes',  function( $hidden, $screen, $use_defaults ){
		return array();
	}, 999, 3);
	
	?>
<style type="text/css">
body{
height: 100vh;
}

#wpcontent,
#wpbody-content,
html.wp-toolbar{
padding:0;
}

.postbox .handle-order-higher, .postbox .handle-order-lower,
#minor-publishing-actions,
.site-menu-header{
display:none;	
}

.postbox{
border: 0;
border-bottom: 1px solid #ccd0d4;
}

.pagelayer-side-meta .meta-box-sortables{
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 10px;
grid-auto-rows: auto;
}

.pagelayer-side-meta .postbox.closed{
height:max-content;	
}

#major-publishing-actions{
display:none;	
}

@media screen and (max-width: 1170px) {
.pagelayer-side-meta .meta-box-sortables{
grid-template-columns: repeat(2, 1fr);
}
}

@media screen and (max-width: 782px){
.auto-fold #wpcontent {
padding-left:4px;
}
.pagelayer-side-meta .meta-box-sortables{
grid-template-columns: auto;
}
}

.pagelayer-modal{
overflow: hidden;
position: fixed;
top:0;
left:0;
display: flex;
-ms-flex-direction: column;
flex-direction: column;
width: 100%;
height: 100vh;
pointer-events: auto;
background-color: #292e37;
background-clip: padding-box;
font-size: 14px;
font-weight: 600;
color : 333;
}

.pagelayer-tab-wrap,
.pagelayer-modal-holder{
position: relative;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
height: calc(100% - 60px);	
}

.pagelayer-tab-wrap{
flex-wrap: nowrap;
}

.pagelayer-modal-sidebar{
max-width: 256px;
min-width: 200px;
width: 100%;
position: relative;
color: #fff;
padding: 30px 20px;
height: calc(100% + 40px);
overflow:auto;
}

.pagelayer-sidebar-items{
padding: 10px;
}

.pagelayer-active-item,
.pagelayer-sidebar-items:hover{
background-color: #474c54;
transition:300ms;
}

.pagelayer-modal-content{
-webkit-box-flex: 1;
-ms-flex: 1 1 auto;
flex: 1 1 auto;
height: 100%;
background-color: #ffffff;
position: relative;
}

.pagelayer-form{
height:100%;
flex-grow:1;
}

.pagelayer-modal-holder{
flex-wrap: nowrap !important;
}

.pagelayer-modal-header{
padding: 20px 40px 20px 20px;
border-bottom: 1px solid #f1f1f1;
}

.pagelayer-modal-header h2{
margin:0;
}

.pagelayer-modal-body{
background-color: #f1f1f1;
height:100%;
}

.pagelayer-inner-body{
overflow:auto;
padding:20px;
height:calc(100% - 90px);
}

.pagelayer-inner-footer{
padding: 20px;
background-color: #ffffff;
position:absolute;
bottom:-65px;
left:0;
max-height:65px;
width:100%;
border-top: 1px solid #f1f1f1;
}

.pagelayer-meta-tabs{
display: flex;
align-items: center;
justify-content: center;
}

.pagelayer-tab-items{
cursor:pointer;
}

.pagelayer-meta-tabs .pagelayer-tab-items{
padding:20px 10px;
}

.pagelayer-meta-tabs .pagelayer-active-item,
.pagelayer-meta-tabs .pagelayer-tab-items:hover{
background-color: #f1f1f1;
transform: scale(1.02);
color: #3e8ef7;
}

.pagelayer-hidden{
display:none;
}

.pagelayer-show{
display:block;
}

.pagelayer-save-btn{
border: #398439 1px solid;
color: #fff;
background: #449d44;
padding: 5px 10px;
cursor: pointer;
}

.pagelayer-block{
display:block;
}

.pagelayer-textarea{
width:70%;
}

.pagelayer-h-full{
height: 100%;
}

.pagelayer-post-title{
margin-bottom: 20px;
}
</style>

<script type="text/javascript">
jQuery(document).ready(function(){

	jQuery('.pagelayer-modal .pagelayer-tab-items').on('click', function(){
		var jEle = jQuery(this);
		var show_panel = jEle.attr('data-tab');
		var holder = jEle.closest('.pagelayer-tab-wrap');
		
		// Hide all tab panels
		holder.find('[tab-panel]').hide();
		jEle.closest('.pagelayer-tab-holder').find('.pagelayer-tab-items').removeClass('pagelayer-active-item');
		
		// Show and active the click panel
		jEle.addClass('pagelayer-active-item');
		holder.find('[tab-panel="'+show_panel+'"]').first().show();
	});
	
	// TODO:- conform - Add publish option
	var post_status = jQuery('.pagelayer-modal select[name="post_status"]');
	var publish = post_status.find('option[value="publish"]').length > 0;
	var future = post_status.find('option[value="future"]').length > 0;
	
	if(! publish && !future){
		post_status.append('<option value="publish"><?php _e( "Published" ); ?></option>');
	}
	
});

function pagelayer_open_body_props(){
	
	var doc = jQuery(window.parent.document);
	var setting = doc.find('.pagelayer-settings-icon');
	
	if(setting.length < 1){
		return;
	}
	
	setting.attr('pagelayer-modal-none', 1);
	setting.click();
	doc.find('[pagelayer-elpd-tab=settings]').hide();
	doc.find('.pagelayer-props-modal').click();
	var opt = doc.find('[pagelayer-elpd-tab="options"]');
	opt.click().addClass("highlight");
	setting.removeAttr('pagelayer-modal-none');
	setTimeout(function(){
		opt.removeClass("highlight")
	}, 5000);
	
}
</script>

<div class="pagelayer-modal">
	<div class="pagelayer-modal-holder">
		<form name="post" action="post.php" method="post" onsubmit="return pagelayer_post_edit(this, event)" id="post" class="pagelayer-form pagelayer-tab-wrap" <?php $referer = wp_get_referer(); ?>>
				
			<?php wp_nonce_field( $nonce_action ); ?>
			<input type="hidden" name="is_pagelayer_editor" value="1" />
			<input type="hidden" id="user-id" name="user_ID" value="<?php echo (int) $user_ID; ?>" />
			<input type="hidden" id="hiddenaction" name="action1" value="<?php echo esc_attr( $form_action ); ?>" />
			<input type="hidden" id="originalaction" name="originalaction" value="<?php echo esc_attr( $form_action ); ?>" />
			<input type="hidden" id="post_author" name="post_author" value="<?php echo esc_attr( $post->post_author ); ?>" />
			<input type="hidden" id="post_type" name="post_type" value="<?php echo esc_attr( $post_type ); ?>" />
			<input type="hidden" id="original_post_status" name="original_post_status" value="<?php echo esc_attr( $post->post_status ); ?>" />
			<input type="hidden" id="referredby" name="referredby" value="<?php echo $referer ? esc_url( $referer ) : ''; ?>" />
			<?php if ( ! empty( $active_post_lock ) ) { ?>
			<input type="hidden" id="active_post_lock" value="<?php echo esc_attr( implode( ':', $active_post_lock ) ); ?>" />
				<?php
			}
			if ( 'draft' !== get_post_status( $post ) ) {
				wp_original_referer_field( true, 'previous' );
			}

			echo $form_extra;

			wp_nonce_field( 'meta-box-order', 'meta-box-order-nonce', false );
			wp_nonce_field( 'closedpostboxes', 'closedpostboxesnonce', false );

			?>
			<!-- Start Tabs-->
			<div class="pagelayer-modal-sidebar pagelayer-tab-holder">
				<div class="pagelayer-sidebar-items pagelayer-tab-items pagelayer-active-item" data-tab="post_props">
					<span class="dashicons dashicons-welcome-write-blog"></span> <?php _e('Properties') ?>
				</div>
				<div class="pagelayer-sidebar-items pagelayer-tab-items" data-tab="advanced_props">
					<span class="dashicons dashicons-welcome-add-page"></span> <?php _e('Advanced') ?>
				</div>
				<div class="pagelayer-sidebar-items pagelayer-tab-items" data-tab="hf_code">
					<span class="dashicons dashicons-editor-code"></span> <?php _e('Header and Footer') ?>
				</div>
				<div class="pagelayer-sidebar-items pagelayer-tab-items" data-tab="hf_code" onclick="pagelayer_open_body_props()">
					<span class="dashicons dashicons-admin-generic"></span> <?php _e('Body Style') ?>
				</div>
			</div>
			<!-- End Tabs-->
			<!-- Start Tab panels -->
			<div class="pagelayer-modal-content pagelayer-show" tab-panel="post_props">
				<div class="pagelayer-modal-header">
					<h2><?php _e('Post Props') ?></h2>
				</div>
				<div class="pagelayer-modal-body">
					<div class="pagelayer-inner-body metabox-holder pagelayer-side-meta">
						<div class="pagelayer-post-title"><?php pagelayer_post_title();?></div>
						<?php do_meta_boxes( $post_type, 'side', $post );?>
					</div>
					<div class="pagelayer-inner-footer">
						<input type="submit" class="pagelayer-save-btn" name="pagelayer_submit" value="<?php _e('Save Changes'); ?>">
					</div>
				</div>
			</div>
			<div class="pagelayer-modal-content pagelayer-hidden" tab-panel="advanced_props">
				<div class="pagelayer-modal-header">
					<h2><?php _e('Advanced Props') ?></h2>
				</div>
				<div class="pagelayer-modal-body">
					<div class="pagelayer-inner-body metabox-holder">
						<?php 
							do_meta_boxes( $post_type, 'normal', $post );
							do_meta_boxes( $post_type, 'advanced', $post ); 
						?>
					</div>
					<div class="pagelayer-inner-footer">
						<input type="submit" class="pagelayer-save-btn" name="pagelayer_submit2" value="<?php _e('Save Changes'); ?>">
					</div>
				</div>
			</div>
			<div class="pagelayer-modal-content pagelayer-hidden" tab-panel="hf_code">
				<?php pagelayer_post_hf_code(); ?>
			</div>
			<!-- End Tab panels -->
		</form>
	</div>
</div>
	<?php
	
}

// Post Title
function pagelayer_post_title(){
	global $post_type, $post_type_object, $post, $wp_meta_boxes, $current_screen, $user_ID, $post_ID;

	if ( !post_type_supports( $post_type, 'title' ) ) { 
		return ''; 
	}
?>
<div id="titlediv">
	<label for="title"><?php _e('Post Title') ?></label>
	<div id="titlewrap">
		<?php
		$title_placeholder = apply_filters( 'enter_title_here', __( 'Add title' ), $post );
		?>
		<label class="screen-reader-text" id="title-prompt-text" for="title"><?php echo $title_placeholder; ?></label>
		<input type="text" name="post_title" size="30" value="<?php echo esc_attr( $post->post_title ); ?>" id="title" spellcheck="true" autocomplete="off" />
	</div>
	<?php
	//do_action( 'edit_form_before_permalink', $post );
	?>
	<div class="inside">
		<?php
		$viewable = is_post_type_viewable( $post_type_object );

		if ( $viewable ) :
			$sample_permalink_html = $post_type_object->public ? get_sample_permalink_html( $post->ID ) : '';

			// As of 4.4, the Get Shortlink button is hidden by default.
			if ( has_filter( 'pre_get_shortlink' ) || has_filter( 'get_shortlink' ) ) {
				$shortlink = wp_get_shortlink( $post->ID, 'post' );

				if ( ! empty( $shortlink ) && $shortlink !== $permalink && home_url( '?page_id=' . $post->ID ) !== $permalink ) {
					$sample_permalink_html .= '<input id="shortlink" type="hidden" value="' . esc_attr( $shortlink ) . '" />' .
						'<button type="button" class="button button-small" onclick="prompt(&#39;URL:&#39;, jQuery(\'#shortlink\').val());">' .
						__( 'Get Shortlink' ) .
						'</button>';
				}
			}

			if ( $post_type_object->public
				&& ! ( 'pending' === get_post_status( $post ) && ! current_user_can( $post_type_object->cap->publish_posts ) )
			) {
				$has_sample_permalink = $sample_permalink_html && 'auto-draft' !== $post->post_status;
				?>
		<div id="edit-slug-box" class="hide-if-no-js">
				<?php
				if ( $has_sample_permalink ) {
					echo $sample_permalink_html;
				}
				?>
		</div>
				<?php
			}
	endif;
		?>
	</div>
	<?php
	wp_nonce_field( 'samplepermalink', 'samplepermalinknonce', false );
	?>
</div><!-- /titlediv -->
	<?php
}

// Header and footer code
function pagelayer_post_hf_code(){
	global $post_type, $post_type_object, $post, $wp_meta_boxes, $current_screen, $user_ID, $post_ID;
	
	?>
	<div class="pagelayer-modal-header">
		<h2><?php _e('Header and Footer Code') ?></h2>
	</div>
	<div class="pagelayer-modal-body">
		<div class="pagelayer-inner-body">
			<p> <?php _e('You can add custom code like HTML, JavaScript, CSS etc. for the current post.') ?> </p>
			
			<!-- Header Code-->
			<label class="pagelayer-block"><?php _e('Header Code'); ?> :- </label>
			<textarea name="pagelayer_header_code" placeholder="Enter your code to add in header" rows="10" class="pagelayer-textarea"><?php echo get_post_meta( $post_ID, 'pagelayer_header_code', true ); ?></textarea>
			<p> <?php echo __('This code will be printed in <code>&lt;head&gt;</code> Section.') ?> </p>
			
			<!-- Header Code-->
			<label class="pagelayer-block"><?php _e('Footer Code'); ?> :- </label>
			<textarea name="pagelayer_footer_code" placeholder="Enter your code to add in Footer" rows="10" class="pagelayer-textarea"><?php echo get_post_meta( $post_ID, 'pagelayer_footer_code', true ); ?></textarea>
			<p> <?php echo __('This code will be printed before closing the <code>&lt;/body&gt;</code> Section.') ?> </p>
		</div>
		<div class="pagelayer-inner-footer">
			<input type="submit" class="pagelayer-save-btn" name="pagelayer_submit" value="<?php _e('Save Codes'); ?>">
		</div>
	</div>
	<?php

}
