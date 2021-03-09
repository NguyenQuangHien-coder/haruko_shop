<?php

// We need the ABSPATH
if (!defined('ABSPATH')) exit;

define('PAGELAYER_BASE', plugin_basename(PAGELAYER_FILE));
define('PAGELAYER_PRO_BASE', 'pagelayer-pro/pagelayer-pro.php');
define('PAGELAYER_VERSION', '1.3.5');
define('PAGELAYER_DIR', dirname(PAGELAYER_FILE));
define('PAGELAYER_SLUG', 'pagelayer');
define('PAGELAYER_URL', plugins_url('', PAGELAYER_FILE));
define('PAGELAYER_CSS', PAGELAYER_URL.'/css');
define('PAGELAYER_JS', PAGELAYER_URL.'/js');
define('PAGELAYER_PRO_URL', 'https://pagelayer.com/pricing?from=plugin');
define('PAGELAYER_WWW_URL', 'https://pagelayer.com/');
define('PAGELAYER_DOCS', 'https://pagelayer.com/docs/');
define('PAGELAYER_API', 'https://api.pagelayer.com/');
define('PAGELAYER_SC_PREFIX', 'pl');
define('PAGELAYER_YOUTUBE_BG', 'https://www.youtube.com/watch?v=Csa6rvCWmLU');
define('PAGELAYER_BLOCK_PREFIX', defined('SITEPAD') ? 'sp' : 'wp');
define('PAGELAYER_DEV', file_exists(dirname(__FILE__).'/dev.php') ? 1 : 0);

include_once(PAGELAYER_DIR.'/main/functions.php');
include_once(PAGELAYER_DIR.'/main/class.php');

// Ok so we are now ready to go
register_activation_hook(PAGELAYER_FILE, 'pagelayer_activation');

// Is called when the ADMIN enables the plugin
function pagelayer_activation(){

	global $wpdb;

	$sql = array();

	/*$sql[] = "DROP TABLE IF EXISTS `".$wpdb->prefix."pagelayer_logs`";

	foreach($sql as $sk => $sv){
		$wpdb->query($sv);
	}*/

	add_option('pagelayer_version', PAGELAYER_VERSION);
	add_option('pagelayer_options', array());

}

// Checks if we are to update ?
function pagelayer_update_check(){

global $wpdb;

	$sql = array();
	$current_version = get_option('pagelayer_version');
	$version = (int) str_replace('.', '', $current_version);

	// No update required
	if($current_version == PAGELAYER_VERSION){
		return true;
	}

	// Is it first run ?
	if(empty($current_version)){

		// Reinstall
		pagelayer_activation();

		// Trick the following if conditions to not run
		$version = (int) str_replace('.', '', PAGELAYER_VERSION);

	}

	// Save the new Version
	update_option('pagelayer_version', PAGELAYER_VERSION);

}

// Add the action to load the plugin 
add_action('plugins_loaded', 'pagelayer_load_plugin');

// The function that will be called when the plugin is loaded
function pagelayer_load_plugin(){

	global $pagelayer;

	// Check if the installed version is outdated
	pagelayer_update_check();

	// Set the array
	$pagelayer = new PageLayer();
	
	if(empty($pagelayer->BRAND_TEXT)){
		$pagelayer->BRAND_TEXT = 'Pagelayer';
	}
	
	if(empty($pagelayer->LOGO)){
		$pagelayer->LOGO = PAGELAYER_URL.'/images/pagelayer-logo-40.png';
	}
	
	// Load license
	pagelayer_load_license();

	// Is there any ACTION set ?
	$pagelayer->action = pagelayer_optreq('pagelayer-action');

	// Load settings
	$pagelayer->settings['post_types'] = empty(get_option('pl_support_ept')) ? ['post', 'page'] : get_option('pl_support_ept');
	$pagelayer->settings['enable_giver'] = get_option('pagelayer_enable_giver');
	$pagelayer->settings['max_width'] = (int) (empty(get_option('pagelayer_content_width')) ? 1170 : get_option('pagelayer_content_width'));
	$pagelayer->settings['tablet_breakpoint'] = (int) (empty(get_option('pagelayer_tablet_breakpoint')) ? 768 : get_option('pagelayer_tablet_breakpoint'));
	$pagelayer->settings['mobile_breakpoint'] = (int) (empty(get_option('pagelayer_mobile_breakpoint')) ? 360 : get_option('pagelayer_mobile_breakpoint'));
	$pagelayer->settings['body_font'] = get_option('pagelayer_body_font');
	$pagelayer->settings['body'] = get_option('pagelayer_body_typography');
	$pagelayer->settings['h1'] = get_option('pagelayer_h1_typography');
	$pagelayer->settings['h2'] = get_option('pagelayer_h2_typography');
	$pagelayer->settings['h3'] = get_option('pagelayer_h3_typography');
	$pagelayer->settings['h4'] = get_option('pagelayer_h4_typography');
	$pagelayer->settings['h5'] = get_option('pagelayer_h5_typography');
	$pagelayer->settings['h6'] = get_option('pagelayer_h6_typography');
	$pagelayer->settings['color'] = get_option('pagelayer_color');
	$pagelayer->settings['sidebar'] = get_option('pagelayer_sidebar');
	
	// To make things backward compatible
	if(!empty($pagelayer->settings['body_font'])){
		$pagelayer->settings['body']['font-family'] = $pagelayer->settings['body_font'];
	}
	
	// Load the language
	load_plugin_textdomain('pagelayer', false, PAGELAYER_SLUG.'/languages/');
	
	// Load our array for builder
	pagelayer_builder_array();
	
	// Its premium
	if(defined('PAGELAYER_PREMIUM')){
	
		// Check for updates
		include_once(PAGELAYER_DIR.'/main/plugin-update-checker.php');
		$pagelayer_updater = Pagelayer_PucFactory::buildUpdateChecker(PAGELAYER_API.'updates.php?version='.PAGELAYER_VERSION, PAGELAYER_FILE);
		
		// Add the license key to query arguments
		$pagelayer_updater->addQueryArgFilter('pagelayer_updater_filter_args');
		
		// Show the text to install the license key
		add_filter('puc_manual_final_check_link-pagelayer-pro', 'pagelayer_updater_check_link', 10, 1);
		
		// Load the template builder
		include_once(PAGELAYER_DIR.'/main/template-builder.php');
		
	}else{
	
		// Show the promo
		pagelayer_maybe_promo([
			'after' => 1,// In days
			'interval' => 30,// In days
			'pro_url' => PAGELAYER_PRO_URL,
			'rating' => 'https://wordpress.org/plugins/pagelayer/#reviews',
			'twitter' => 'https://twitter.com/pagelayer?status='.rawurlencode('I love #Pagelayer Site Builder by @pagelayer team for my #WordPress site - '.home_url()),
			'facebook' => 'https://www.facebook.com/pagelayer',
			'website' => PAGELAYER_WWW_URL,
			'image' => PAGELAYER_URL.'/images/pagelayer-logo-256.png'
		]);
	
	}	
	
	// Show the getting started video option
	$seen = get_option('pagelayer_getting_started');
	if(empty($seen) && @$_GET['page'] != 'pagelayer_getting_started'){
		add_action('admin_notices', 'pagelayer_getting_started_notice');
	}

}

// Add our license key if ANY
function pagelayer_updater_filter_args($queryArgs) {
	
	global $pagelayer;
	
	if ( !empty($pagelayer->license['license']) ) {
		$queryArgs['license'] = $pagelayer->license['license'];
	}
	
	return $queryArgs;
}

// Handle the Check for update link and ask to install license key
function pagelayer_updater_check_link($final_link){
	
	global $pagelayer;
	
	if(empty($pagelayer->license['license'])){
		return '<a href="'.admin_url('admin.php?page=pagelayer_license').'">Install Pagelayer Pro License Key</a>';
	}
	
	return $final_link;
}

// This adds the left menu in WordPress Admin page
add_action('admin_menu', 'pagelayer_admin_menu', 5);

// Shows the admin menu of Pagelayer
function pagelayer_admin_menu() {

	global $wp_version, $pagelayer;

	$capability = 'activate_plugins';// TODO : Capability for accessing this page

	// Add the menu page
	add_menu_page(__('Pagelayer Editor'), __('Pagelayer'), $capability, 'pagelayer', 'pagelayer_page_handler', PAGELAYER_URL.'/images/pagelayer-logo-19.png');

	// Settings Page
	add_submenu_page('pagelayer', __('Pagelayer Editor'), __('Settings'), $capability, 'pagelayer', 'pagelayer_page_handler');
	
	// Meta Settings Page
	add_submenu_page('admin.php', __('Meta Settings'), __('Meta Settings'), 'edit_posts', 'pagelayer_meta_setting', 'pagelayer_meta_handler');
	
	// UI Settings
	add_submenu_page('pagelayer', __('Website Settings'), __('Website Settings'), $capability, 'pagelayer_website_settings', 'pagelayer_website_page');

	// Add new template
	add_submenu_page('pagelayer', __('Theme Templates'), __('Theme Templates'), $capability, 'edit.php?post_type=pagelayer-template');

	// Add new template Link
	//add_submenu_page('pagelayer', __('Add New Template'), __('Add New Template'), $capability, 'edit.php?post_type=pagelayer-template#new');

	// Add new template
	add_submenu_page('pagelayer', __('Add New Template'), __('Add New Template'), $capability, 'pagelayer_template_wizard', 'pagelayer_builder_template_wizard');

	// Export Template Wizard
	add_submenu_page('pagelayer', __('Export Templates into a Theme'), __('Export Templates'), $capability, 'pagelayer_template_export', 'pagelayer_builder_export');
	
	// Getting Started
	add_submenu_page('pagelayer', __('Getting Started'), __('Getting Started'), $capability, 'pagelayer_getting_started', 'pagelayer_getting_started');

	// Its Free
	if(!defined('PAGELAYER_PREMIUM')){

		// Go Pro link
		add_submenu_page('pagelayer', __('Pagelayer Go Pro'), __('Go Pro'), $capability, PAGELAYER_PRO_URL);

	}

	// License Page
	add_submenu_page('pagelayer', __('Pagelayer Editor'), __('License'), $capability, 'pagelayer_license', 'pagelayer_license_page');

	// Import Page
	add_submenu_page('admin.php', __('Import a Theme and its Templates'), __('Import Theme'), $capability, 'pagelayer_import', 'pagelayer_import_page');

}

// This function will handle the Settings Pages in PageLayer
function pagelayer_website_page(){

	global $wp_version, $pagelayer;

	include_once(PAGELAYER_DIR.'/main/website.php');
	
	pagelayer_website_settings();

}

// Getting Started
function pagelayer_getting_started(){

	global $wp_version, $pagelayer;
	
	update_option('pagelayer_getting_started', time());

	include_once(PAGELAYER_DIR.'/main/getting_started.php');
	
}

// This function will handle the post_metas Pages in PageLayer
function pagelayer_meta_handler(){

	global $wp_version, $pagelayer;

	include_once(PAGELAYER_DIR.'/main/post_metas.php');
	
	pagelayer_meta_page();

}

// Pagelayer post meta page view handler
add_action('admin_head', 'pagelayer_post_meta_page');
function pagelayer_post_meta_page() {
	
	// Set Current screen
	$screen = get_current_screen();
	$meta_id = 'admin_page_pagelayer_meta_setting';
	
	if( !is_admin() || trim($screen->id) != $meta_id ) {
		return;
	}
	
	if(!isset($_REQUEST['post'])){
		return;		
	}
	
	// Remove all the notice hooks
	remove_all_actions('admin_notices');
	remove_all_actions('all_admin_notices');
	
	$_REQUEST['post'] = (int) $_REQUEST['post'];
	$post = get_post( $_REQUEST['post'] );
	
	$meta_box_url = admin_url( 'post.php' );		
	$meta_box_url = add_query_arg(
		array(
			'post'	=> $post->ID,
			'action'	=> 'editpost',
		),
		$meta_box_url
	);
	
	echo '<style>
.'.$meta_id.' #adminmenumain, .'.$meta_id.' #wpfooter, .'.$meta_id.' #wpadminbar{
display:none;
}
.'.$meta_id.' #wpcontent{
margin:auto;
}
</style>
	
<script type="text/javascript">

jQuery(document).ready(function(e){
	pagelayer_prevent_click_metas();
});

// Prevent the click Inside the meta pages
function pagelayer_prevent_click_metas(){
	jQuery(document).on("submit", function(event){
		event.preventDefault();
	});
	
	jQuery(document).on("click", function(event){
		var target = jQuery(event.target);
		if (target.closest("a").length > 0) {
			event.preventDefault();
			var href = target.closest("a").attr("href");
			
			if(!href.match(/(http|https):\/\//g)){
				return;
			}
			
			var exp = new RegExp("(http|https):\/\/"+window.location.hostname, "g");
			
			// Open new window
			if(href.match(exp)){
				
				// Reload same window
				window.parent.location.assign(href);
			}else{
				window.open(href, "_blank");
			}
			
		}
	});
}

function pagelayer_post_edit(jEle, e){
	
	e.preventDefault();
	var formData = new FormData( jQuery(jEle)[0] );

	jQuery.ajax({
		url: "'.$meta_box_url.'",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		cache:false,
		success:function(result){
			//window.location.reload();						
			alert("Post meta has been updated successfully !");
		},
		error:function(result){				
			alert("There is an error while updating post meta !");
		}
	});
}
		
</script>';
	
}

// On post Save handler
add_action('save_post', 'pagelayer_save_post', 10, 3);
function pagelayer_save_post( $post_id, $post, $update ) {
	
	if( !isset($_REQUEST['is_pagelayer_editor']) ){
		return;
	}
	
	// Save Header and footer code
	$header_code = !empty($_REQUEST['pagelayer_header_code']) ? $_REQUEST['pagelayer_header_code'] : '' ;
	$footer_code = !empty($_REQUEST['pagelayer_footer_code']) ? $_REQUEST['pagelayer_footer_code'] : '' ;
	
	// Set Custom header footer code
	if(!empty($header_code)){
		update_post_meta($post_id, 'pagelayer_header_code', $header_code);
	}else{
		delete_post_meta($post_id, 'pagelayer_header_code');
	}
	
	if(!empty($footer_code)){
		update_post_meta($post_id, 'pagelayer_footer_code', $footer_code);
	}else{
		delete_post_meta($post_id, 'pagelayer_footer_code');
	}
	
}

// This function will handle the Settings Pages in PageLayer
function pagelayer_page_handler(){

	global $wp_version, $pagelayer;

	include_once(PAGELAYER_DIR.'/main/settings.php');
	
	pagelayer_settings_page();

}

// This function will handle the Settings Pages in PageLayer
function pagelayer_license_page(){

	global $wp_version, $pagelayer;

	include_once(PAGELAYER_DIR.'/main/license.php');
	
	pagelayer_license();

}

// Import Pagelayer Templates
function pagelayer_import_page(){

	global $wp_version, $pagelayer;

	include_once(PAGELAYER_DIR.'/main/import.php');
	
	pagelayer_import();

}

// Load the Live Body
add_action('template_redirect', 'pagelayer_load_live_body', 4);

function pagelayer_load_live_body(){

	global $post;

	// If its not live editing then stop
	if(!pagelayer_is_live()){
		return;
	}

	// If its the iFRAME then return
	if(pagelayer_is_live_iframe()){
		return;
	}

	// Are you allowed to edit ?
	if(!pagelayer_user_can_edit($post->ID)){
		return;
	}

	// Load the editor live body
	include_once(PAGELAYER_DIR.'/main/live-body.php');

	pagelayer_live_body();

}

// Add the JS and CSS for Posts and Pages when being viewed ONLY if there is our content called
add_action('template_redirect', 'pagelayer_enqueue_frontend', 5);

function pagelayer_enqueue_frontend($force = false){

	global $post, $pagelayer;

	if(!empty($pagelayer->cache['enqueue_frontend'])){
		return;
	}

	if(empty($post->ID) && empty($force)){
		return;
	}
	
	$is_pagelayer = false;
	$is_audio = false;
	
	// This IF is for Archives mainly as $post->ID is only the first post in the archive 
	// and we need to make sure that other posts are pagelayer or not
	if(!empty($GLOBALS['wp_query']->posts) && is_array($GLOBALS['wp_query']->posts)){
		foreach($GLOBALS['wp_query']->posts as $v){
			if(get_post_meta($v->ID , 'pagelayer-data')){
				$is_pagelayer = true;
			}
			
			if(preg_match('/(\[pl_audio|pagelayer\/pl_audio)/is', $v->post_content)){
				$is_audio = true;
			}
		}
	}

	// Enqueue the FRONTEND CSS
	if((!empty($post->ID) && get_post_meta($post->ID , 'pagelayer-data')) || $is_pagelayer || $force){

		// We dont need the auto <p> and <br> as they interfere with us
		remove_filter('the_content', 'wpautop');
		
		// No need to add curly codes to the content
		remove_filter('the_content', 'wptexturize');

		pagelayer_load_shortcodes();
		$pagelayer->cache['enqueue_frontend'] = true;
		
		// Load the global styles
		add_action('wp_head', 'pagelayer_global_js', 2);
		
		$premium_js = '';
		$premium_css = '';
		if(defined('PAGELAYER_PREMIUM')){
			$premium_js = ',chart.min.js,premium-frontend.js,shuffle.min.js';
			$premium_css = ',premium-frontend.css';
			
			// Load this For audio widget
			if($is_audio || pagelayer_is_live_iframe()){
				wp_enqueue_script('wp-mediaelement');
				wp_enqueue_style( 'wp-mediaelement' );
			}
		}
		
		if(pagelayer_enable_giver()){
		
			$write = '';
			
			// Dev mode - Dynamic JS and CSS
			if(defined('PAGELAYER_DEV') && !empty(PAGELAYER_DEV)){
				$write = '&write=1';
			}
			
			// Enqueue our Editor's Frontend JS
			wp_register_script('pagelayer-frontend', PAGELAYER_JS.'/givejs.php?give=pagelayer-frontend.js,nivo-lightbox.min.js,wow.min.js,jquery-numerator.js,simpleParallax.min.js,owl.carousel.min.js&premium='.$premium_js.$write, array('jquery'), PAGELAYER_VERSION);
		
			// Get list of enabled icons
			$icons_css = '';
			$icons = pagelayer_enabled_icons();
			foreach($icons as $icon){
				$icons_css .= ','.$icon.'.min.css';
			}

			wp_register_style('pagelayer-frontend', PAGELAYER_CSS.'/givecss.php?give=pagelayer-frontend.css,nivo-lightbox.css,animate.min.css,owl.carousel.min.css,owl.theme.default.min.css'.$icons_css.'&premium='.$premium_css.$write, array(), PAGELAYER_VERSION);
		
		// Static Files
		}else{
			
			wp_register_script('pagelayer-frontend', PAGELAYER_JS.'/combined'.(!empty($premium_js) ? '.premium' : '').'.js', array('jquery'), PAGELAYER_VERSION);

			wp_register_style('pagelayer-frontend', PAGELAYER_CSS.'/combined'.(!empty($premium_css) ? '.premium' : '').'.css', array(), PAGELAYER_VERSION);
		}
		
		wp_enqueue_script('pagelayer-frontend');
		wp_enqueue_style('pagelayer-frontend');
		
		// Load the global styles
		add_action('wp_head', 'pagelayer_global_styles', 5);
		add_filter('body_class', 'pagelayer_body_class', 10, 2);
		
		// Load custom widgets
		do_action('pagelayer_custom_frontend_enqueue');

	}

}

// Load the google fonts
add_action('wp_footer', 'pagelayer_enqueue_fonts', 5);

function pagelayer_enqueue_fonts(){
	global $pagelayer;

	if(empty($pagelayer->cache['enqueue_frontend'])){
		return;
	}
	
	$url = [];
	
	// Global CSS settings
	$css_settings = ['body', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
		
	foreach($css_settings as $set){
	
		// Fetch body font if given
		if(!empty($pagelayer->settings[$set]['font-family'])){
			
			$val = $pagelayer->settings[$set]['font-family'];			
			$font_weight = empty($pagelayer->settings[$set]['font-weight']) ? 400 : $pagelayer->settings[$set]['font-weight'];
			$font_style = empty($pagelayer->settings[$set]['font-style']) ? 'normal' : $pagelayer->settings[$set]['font-style'];$font_style = in_array($font_style, ['italic', 'oblique']) ? 'i' : '';
			
			$pagelayer->runtime_fonts[$val][$font_weight.$font_style] = $font_weight.$font_style;
			
		}
	
	}
	
	foreach($pagelayer->runtime_fonts as $font => $weights){
		$url[] = $font.':'.implode(',', $weights);
	}
	
	// If no fonts are to be set, then we dont set
	if(empty($url)){
		return false;
	}
	
	wp_register_style('pagelayer-google-font', 'https://fonts.googleapis.com/css?family='.rawurlencode(implode('|', $url)), array(), PAGELAYER_VERSION);
	wp_enqueue_style('pagelayer-google-font');
	
}

// Load any header we have
function pagelayer_global_js(){
	global $pagelayer;
	
	$pagelayer_recaptch_lang = get_option('pagelayer_google_captcha_lang');

	echo '<script>
var pagelayer_ajaxurl = "'.admin_url( 'admin-ajax.php' ).'?";
var pagelayer_global_nonce = "'.wp_create_nonce('pagelayer_global').'";
var pagelayer_server_time = '.time().';
var pagelayer_is_live = "'.pagelayer_is_live().'";
var pagelayer_facebook_id = "'.get_option('pagelayer-fbapp-id').'";
var pagelayer_settings = '.json_encode($pagelayer->settings).';
var pagelayer_recaptch_lang = "'.(!empty($pagelayer_recaptch_lang) ? $pagelayer_recaptch_lang : '').'";
</script>';

}

// We need to handle global styles
function pagelayer_global_styles(){
	
	global $pagelayer;
	
	$styles = '<style id="pagelayer-global-styles" type="text/css">'.PHP_EOL;
	
	// Style for only child row holder
	$styles .= '.pagelayer-row-stretch-auto > .pagelayer-row-holder, .pagelayer-row-stretch-full > .pagelayer-row-holder.pagelayer-width-auto{ max-width: '.$pagelayer->settings['max_width'].'px; margin-left: auto; margin-right: auto;}'.PHP_EOL;
	
	if(!pagelayer_is_live()){
		
		// Set responsive value
		$styles .= '@media (min-width: '.($pagelayer->settings['tablet_breakpoint'] + 1).'px){
			.pagelayer-hide-desktop{
				display:none !important;
			}
		}

		@media (max-width: '.$pagelayer->settings['tablet_breakpoint'].'px) and (min-width: '.($pagelayer->settings['mobile_breakpoint'] + 1).'px){
			.pagelayer-hide-tablet{
				display:none !important;
			}
		}

		@media (max-width: '.$pagelayer->settings['mobile_breakpoint'].'px){
			.pagelayer-hide-mobile{
				display:none !important;
			}
		}'.PHP_EOL;

	}

$styles .= '@media (max-width: '.$pagelayer->settings['tablet_breakpoint'].'px){
	[class^="pagelayer-offset-"],
	[class*=" pagelayer-offset-"] {
		margin-left: 0;
	}

	.pagelayer-row .pagelayer-col {
		margin-left: 0;
		width: 100%;
	}
	.pagelayer-row.pagelayer-gutters .pagelayer-col {
		margin-bottom: 16px;
	}
	.pagelayer-first-sm {
		order: -1;
	}
	.pagelayer-last-sm {
		order: 1;
	}
}'.PHP_EOL;
	
	// Colors
	if(!empty($pagelayer->settings['color']['background'])){
		$pagelayer->settings['body']['background-color'] = $pagelayer->settings['color']['background'];
	}
	
	if(!empty($pagelayer->settings['color']['text'])){
		$pagelayer->settings['body']['color'] = $pagelayer->settings['color']['text'];
	}
	
	// Global CSS settings
	$css_settings = ['body', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
	
	// PX suffix
	$pxs = ['font-size', 'letter-spacing', 'word-spacing'];
	
	foreach($css_settings as $k => $v){
		
		$key = is_numeric($k) ? $v : $k;
		$r = [];
			
		if(empty($pagelayer->settings[$key])){
			continue;
		}
		
		foreach($pagelayer->settings[$key] as $kk => $vv){
			
			if(empty($vv)){
				continue;
			}
			
			$r[] = $kk.':'.$vv.(in_array($kk, $pxs) ? 'px' : '');
			
		}
		
		if(empty($r)){
			continue;
		}
		
		$styles .= 'body.pagelayer-body '.($v == 'body' ? '' : $v).'{'.implode(';', $r)."}\n";
	}
	
	// Link Color
	if(!empty($pagelayer->settings['color']['link'])){
		$styles .= 'body.pagelayer-body a{color: '.$pagelayer->settings['color']['link'].'}'.PHP_EOL;
	}
	
	// Link Hover Color
	if(!empty($pagelayer->settings['color']['link-hover'])){
		$styles .= 'body.pagelayer-body a:hover{color: '.$pagelayer->settings['color']['link-hover'].'}'.PHP_EOL;
	}
	
	// Link Hover Color
	if(!empty($pagelayer->settings['color']['heading'])){
		$styles .= 'body.pagelayer-body h1,h2,h3,h4,h5,h6{color: '.$pagelayer->settings['color']['heading'].'}'.PHP_EOL;
	}
	
	$styles .= PHP_EOL.'</style>';
	
	echo $styles;
}

function pagelayer_body_class($classes, $class){
	$classes[] = 'pagelayer-body';
	return $classes;
}

// Load the live editor if needed
add_action('wp_enqueue_scripts', 'pagelayer_load_live', 9999);

function pagelayer_load_live(){

	global $post;

	// If its not live editing then stop
	if(!pagelayer_is_live_iframe()){
		return;
	}

	// Are you allowed to edit ?
	if(!pagelayer_user_can_edit($post->ID)){
		return;
	}

	// Load the editor class
	include_once(PAGELAYER_DIR.'/main/live.php');

	// Call the constructor
	$pl_editor = new PageLayer_LiveEditor();

}

// If we are doing ajax and its a pagelayer ajax
if(wp_doing_ajax()){	
	include_once(PAGELAYER_DIR.'/main/ajax.php');
}

// Show the backend editor options
add_action('edit_form_after_title', 'pagelayer_after_title', 10);
function pagelayer_after_title(){

	global $post;
	
	// Get the current screen
	$current_screen = get_current_screen();
	
	// For gutenberg
	if(method_exists($current_screen, 'is_block_editor') && $current_screen->is_block_editor()){

		// Add the code in the footer
		add_action('admin_footer', 'pagelayer_gutenberg_after_title');
		
		return;
	}
	
	// Is pagelayer supposed to edit this ?
	if(!pagelayer_user_can_edit($post)){
		return;
	}
	
	$link = pagelayer_shortlink($post->ID).'&pagelayer-live=1';

	echo '
<div id="pagelayer-editor-button-row" style="margin-top:15px; display:inline-block;">
	<a id="pagelayer-editor-button" href="'.$link.'" class="button button-primary button-large" style="height:auto; padding:6px; font-size:18px;">
		<img src="'.PAGELAYER_URL.'/images/pagelayer-logo-40.png" align="top" width="24" /> <span>'.__('Edit with Pagelayer').'</span>
	</a>
</div>';

}

function pagelayer_gutenberg_after_title(){

	global $post;
	
	// Is pagelayer supposed to edit this ?
	if(!pagelayer_user_can_edit($post)){
		return;
	}
	
	$link = pagelayer_shortlink($post->ID).'&pagelayer-live=1';

	echo '
<div id="pagelayer-editor-button-row" style="margin-left:15px; display:none">
	<a id="pagelayer-editor-button" href="'.$link.'" class="button button-primary button-large" style="height:auto; padding:6px; font-size:18px;">
		<img src="'.PAGELAYER_URL.'/images/pagelayer-logo-40.png" align="top" width="24" /> <span>'.__('Edit with Pagelayer').'</span>
	</a>
</div>

<script type="text/javascript">
jQuery(document).ready(function(){
	
	var pagelayer_timer;
	var pagelayer_button = function(){
		var button = jQuery("#pagelayer-editor-button-row");
		var g = jQuery(".edit-post-header-toolbar");
		if(g.length < 1){
			return;
		}
		button.detach();
		//console.log(button);
		g.append(button);
		button.show();
		clearInterval(pagelayer_timer);
	}
	pagelayer_timer = setInterval(pagelayer_button, 100);
});
</script>';
	
}

// Handle Old Slug URL redirect for live link
add_filter( 'old_slug_redirect_url', 'pagelayer_old_slug_redirect', 10, 1);
function pagelayer_old_slug_redirect($link){
	
	if(pagelayer_optreq('pagelayer-live')){
		$link = add_query_arg('pagelayer-live', '1', $link);
	}
	
	return $link;
}

add_filter( 'post_row_actions', 'pagelayer_quick_link', 10, 2 );
add_filter( 'page_row_actions', 'pagelayer_quick_link', 10, 2 );
function pagelayer_quick_link($actions, $post){
	global $pagelayer;
	
	// Is pagelayer supposed to edit this ?
	if(!pagelayer_user_can_edit($post)){
		return $actions;
	}

	$link = pagelayer_shortlink($post->ID).'&pagelayer-live=1';	

	$actions['pagelayer'] = '<a href="'.esc_url( $link ).'">'.__( 'Edit using Pagelayer', 'pagelayer') .'</a>';

	return $actions;
}

// Add settings link on plugin page
add_filter('plugin_action_links_pagelayer/pagelayer.php', 'pagelayer_plugin_action_links');
function pagelayer_plugin_action_links($links){
	
	if(!defined('PAGELAYER_PREMIUM')){
		 $links[] = '<a href="'.PAGELAYER_PRO_URL.'" style="color:#3db634;" target="_blank">'._x('Go Pro', 'Upgrade to Pagelayer Pro for many more features', 'pagelayer').'</a>';
	}

	$settings_link = '<a href="admin.php?page=pagelayer">Settings</a>';	
	array_unshift($links, $settings_link); 
	
	return $links;
}

// Add custom header
add_action('wp_head', 'pagelayer_add_custom_head');
function pagelayer_add_custom_head(){
	global $post;
	
	$global_code = wp_unslash( get_option('pagelayer_header_code') );

	if(!empty($post)){
		$header_code = get_post_meta($post->ID , 'pagelayer_header_code', true);
	}
	
	if(!empty($global_code)){
		echo $global_code."\n";
	}
	
	if(!empty($header_code)){
		echo $header_code."\n";
	}
		
}

// Add custom footer
add_action('wp_footer', 'pagelayer_add_custom_footer');
function pagelayer_add_custom_footer(){
	global $post;
		
	$global_code = wp_unslash( get_option('pagelayer_footer_code') );
	
	if(!empty($post)){
		$footer_code = get_post_meta($post->ID , 'pagelayer_footer_code', true);
	}
	
	if(!empty($global_code)){
		echo $global_code."\n";
	}
	
	if(!empty($footer_code)){
		echo $footer_code."\n";
	}
	
}

// Handle Logout Redirect here
add_action('wp_logout', 'pagelayer_after_logout');
function pagelayer_after_logout($user_id){
	
	// Get the URL
	$url = get_user_option('pagelayer_logout_url', $user_id);
	
	// Now blank it
	update_user_option($user_id, 'pagelayer_logout_url', '');
	
	// We will redirect if we have the given item set.
	if(!empty($url)){
		wp_redirect( $url );
		exit();
	}
	
}

// Pagelayer Template Loading Mechanism
include_once(PAGELAYER_DIR.'/main/template.php');