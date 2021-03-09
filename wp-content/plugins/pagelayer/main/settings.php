<?php

//////////////////////////////////////////////////////////////
//===========================================================
// settings.php
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

// The Pagelayer Settings Header
function pagelayer_page_header($title = 'Pagelayer Editor'){
	
	wp_enqueue_script( 'pagelayer-admin', PAGELAYER_JS.'/pagelayer-admin.js', array('jquery'), PAGELAYER_VERSION);
	wp_enqueue_style( 'pagelayer-admin', PAGELAYER_CSS.'/pagelayer-admin.css', array(), PAGELAYER_VERSION);
		
	$promos = apply_filters('pagelayer_review_link', true);
		
	echo '<div style="margin: 0px;">	
<div class="metabox-holder">
<div class="postbox-container">	
<div class="wrap" style="margin-top:0px;">
	<h1 style="padding:0px"><!--This is to fix promo--></h1>
	<table cellpadding="2" cellspacing="1" width="100%" class="fixed" border="0">
		<tr>
			<td valign="top"><h1>'.$title.'</h1></td>
			'.($promos ? '<td align="right"><a target="_blank" class="button button-primary" href="https://wordpress.org/support/view/plugin-reviews/pagelayer">Review Pagelayer</a></td>' : '').'
			<td align="right" width="40"><a target="_blank" href="https://twitter.com/pagelayer"><img src="'.PAGELAYER_URL.'/images/twitter.png" /></a></td>
			<td align="right" width="40"><a target="_blank" href="https://www.facebook.com/pagelayer/"><img src="'.PAGELAYER_URL.'/images/facebook.png" /></a></td>
		</tr>
	</table>
	<hr />
	
	<!--Main Table-->
	<table cellpadding="8" cellspacing="1" width="100%" class="fixed">
	<tr>
		<td valign="top">';

}

// The Pagelayer Settings footer
function pagelayer_page_footer($no_twitter = 0){
	
	echo '
		</td>';
		
	$promos = apply_filters('pagelayer_right_bar_promos', true);
	
	if($promos){
	
		echo '
		<td width="200" valign="top" id="pagelayer-right-bar">';
		
		if(!defined('PAGELAYER_PREMIUM')){
			
			echo '
			<div class="postbox" style="min-width:0px !important;">
				<h2 class="hndle ui-sortable-handle">
					<span><a target="_blank" href="'.PAGELAYER_PRO_URL.'"><img src="'.PAGELAYER_URL.'/images/pagelayer_product.png" width="100%" /></a></span>
				</h2>
				<div class="inside">
					<i>Upgrade to the premium version and get the following features </i>:<br>
					<ul class="pagelayer-right-ul">
						<li>60+ Premium Widgets</li>
						<li>400+ Premium Sections</li>
						<li>Theme Builder</li>
						<li>WooCommerce Builder</li>
						<li>Theme Creator and Exporter</li>
						<li>Form Builder</li>
						<li>Popup Builder</li>
						<li>And many more ...</li>
					</ul>
					<center><a class="button button-primary" target="_blank" href="'.PAGELAYER_PRO_URL.'">Upgrade</a></center>
				</div>
			</div>';
			
		}
		
		echo '
			<div class="postbox" style="min-width:0px !important;">
				<h2 class="hndle ui-sortable-handle">
					<span><a target="_blank" href="https://wpcentral.co/?from=pagelayer-plugin"><img src="'.PAGELAYER_URL.'/images/wpcentral_product.png" width="100%" /></a></span>
				</h2>
				<div class="inside">
					<i>Manage all your WordPress sites from <b>1 dashboard</b> </i>:<br>
					<ul class="pagelayer-right-ul">
						<li>1-click Admin Access</li>
						<li>Update WordPress</li>
						<li>Update Themes</li>
						<li>Update Plugins</li>
						<li>Backup your WordPress Site</li>
						<li>Plugins & Theme Management</li>
						<li>Post Management</li>
						<li>And many more ...</li>
					</ul>
					<center><a class="button button-primary" target="_blank" href="https://wpcentral.co/?from=pagelayer-plugin">Visit wpCentral</a></center>
				</div>
			</div>
		
		</td>';
	}
	
	echo '
	</tr>
	</table>
	<br />';
	
	if(!defined('SITEPAD')){
			
		if(empty($no_twitter)){
			
			echo '
<div style="width:45%;background:#FFF;padding:15px; margin:auto">
	<b>Let your followers know that you use Pagelayer to build your website :</b>
	<form method="get" action="https://twitter.com/intent/tweet" id="tweet" onsubmit="return dotweet(this);">
		<textarea name="text" cols="45" row="3" style="resize:none;">I easily built my #WordPress #site using @pagelayer</textarea>
		&nbsp; &nbsp; <input type="submit" value="Tweet!" class="button button-primary" onsubmit="return false;" id="twitter-btn" style="margin-top:20px;"/>
	</form>	
</div>
<br />

<script>
function dotweet(ele){
	window.open(jQuery("#"+ele.id).attr("action")+"?"+jQuery("#"+ele.id).serialize(), "_blank", "scrollbars=no, menubar=no, height=400, width=500, resizable=yes, toolbar=no, status=no");
	return false;
}
</script>';
	
	}
	
	echo '<hr />
	<a href="'.PAGELAYER_WWW_URL.'" target="_blank">Pagelayer</a> v'.PAGELAYER_VERSION.' You can report any bugs <a href="http://wordpress.org/support/plugin/pagelayer" target="_blank">here</a>.';
	
	}

echo '
</div>	
</div>
</div>
</div>';

}

function pagelayer_settings_page(){

	$_REQUEST = wp_unslash($_REQUEST);
	$post_type = array();
	$exclude = [ 'attachment', 'pagelayer-template' ];
	$pt_objects = get_post_types(['public' => true,], 'objects');

	foreach ( $pt_objects as $pt_slug => $type ) {
		
		if ( in_array( $pt_slug, $exclude ) ) {
			continue;
		}
		
		$post_type[$pt_slug] = $type->labels->name;
	}

	$support_ept = get_option( 'pl_support_ept', ['post', 'page']);

	$option_name = 'pl_gen_setting';
	$new_value = '';
	
	// DO an admin referrer check
	if(!empty($_POST)){
		check_admin_referer('pagelayer-options');
	}
	
	// We do a $_POST check and hence we are checking the POST var here as well
	// Everywhere down as well, $_POST should be used to save data
	
	if(isset($_POST['pl_support_ept'])){

		$pl_support_ept = $_REQUEST['pl_support_ept'];
		
		foreach($pl_support_ept as $k => $v){
			if(empty($post_type[$v])){
				unset($pl_support_ept[$k]);
			}
		}
		
		// Update it
		update_option('pl_support_ept', $pl_support_ept );
		
		$support_ept = get_option( 'pl_support_ept');
		
		$done = 1;
		
	}
	
	
	if(isset($_POST['pagelayer_icons_set'])){
		$pagelayer_icons_set = $_REQUEST['pagelayer_icons_set'];
		
		// Update it
		update_option('pagelayer_icons_set', $pagelayer_icons_set);
		
		$done = 1;
	}
	
	$socials = ['pagelayer-facebook-url','pagelayer-twitter-url','pagelayer-instagram-url','pagelayer-linkedin-url','pagelayer-youtube-url','pagelayer-gplus-url','pagelayer-copyright','pagelayer-phone','pagelayer-address'];
	
	foreach( $socials as $social ){
		if(isset($_POST[$social])){
			$url = $_REQUEST[$social];
			update_option($social, $url);
			$done = 1;
		}
	}
	
	if(isset($_POST['pagelayer_cf_to_email'])){

		$to_email = $_REQUEST['pagelayer_cf_to_email'];
		
		update_option( 'pagelayer_cf_to_email', $to_email );
		
		$done = 1;
		
	}
		
	if(defined('PAGELAYER_PREMIUM')){
	
		if(isset($_POST['pagelayer_cf_subject'])){

			$subject = $_REQUEST['pagelayer_cf_subject'];
			
			update_option('pagelayer_cf_subject', $subject, 'no');
		
			$done = 1;
			
		}
		
		if(isset($_POST['pagelayer_cf_headers'])){

			$subject = $_REQUEST['pagelayer_cf_headers'];
			
			update_option('pagelayer_cf_headers', $subject, 'no');
		
			$done = 1;
			
		}
		
		if(isset($_POST['pagelayer_cf_from_email'])){

			$subject = $_REQUEST['pagelayer_cf_from_email'];
			
			update_option('pagelayer_cf_from_email', $subject, 'no');
		
			$done = 1;
			
		}
		
		if(isset($_POST['pagelayer_cf_success'])){

			$success = $_REQUEST['pagelayer_cf_success'];
			
			update_option( 'pagelayer_cf_success', $success, 'no');
		
			$done = 1;
			
		}
		
		if(isset($_POST['pagelayer_cf_failed'])){

			$failed = $_REQUEST['pagelayer_cf_failed'];
			
			update_option( 'pagelayer_cf_failed', $failed, 'no');
		
			$done = 1;
			
		}
		
		if(isset($_POST['pagelayer_recaptcha_failed'])){

			$failed = $_REQUEST['pagelayer_recaptcha_failed'];
			
			update_option( 'pagelayer_recaptcha_failed', $failed, 'no');
		
			$done = 1;
			
		}
		
		if(isset($_POST['pagelayer_google_captcha'])){

			$captcha = $_REQUEST['pagelayer_google_captcha'];
			
			update_option( 'pagelayer_google_captcha', $captcha );
		
			$done = 1;
			
		}
		
		if(isset($_POST['pagelayer_google_captcha_secret'])){

			$captcha_secret = $_REQUEST['pagelayer_google_captcha_secret'];
			
			update_option( 'pagelayer_google_captcha_secret', $captcha_secret );
		
			$done = 1;
			
		}
		
		if(isset($_POST['pagelayer_google_captcha_lang'])){

			$captcha_secret = $_REQUEST['pagelayer_google_captcha_lang'];
			
			update_option( 'pagelayer_google_captcha_lang', $captcha_secret );
		
			$done = 1;
			
		}
		
		// Facebook APP ID
		if(isset($_POST['pagelayer-fbapp-id'])){
			$fb_app_id = $_REQUEST['pagelayer-fbapp-id'];
			
			// Save it
			update_option( 'pagelayer-fbapp-id', $fb_app_id );
		
			$done = 1;
		}
	}

	// reCAPTCHA Langs
	$recap_lang[''] = 'Auto Detect';
	$recap_lang['ar'] = 'Arabic';
	$recap_lang['af'] = 'Afrikaans';
	$recap_lang['am'] = 'Amharic';
	$recap_lang['hy'] = 'Armenian';
	$recap_lang['az'] = 'Azerbaijani';
	$recap_lang['eu'] = 'Basque';
	$recap_lang['bn'] = 'Bengali';
	$recap_lang['bg'] = 'Bulgarian';
	$recap_lang['ca'] = 'Catalan';
	$recap_lang['zh-HK'] = 'Chinese (Hong Kong)';
	$recap_lang['zh-CN'] = 'Chinese (Simplified)';
	$recap_lang['zh-TW'] = 'Chinese (Traditional)';
	$recap_lang['hr'] = 'Croatian';
	$recap_lang['cs'] = 'Czech';
	$recap_lang['da'] = 'Danish';
	$recap_lang['nl'] = 'Dutch';
	$recap_lang['en-GB'] = 'English (UK)';
	$recap_lang['en'] = 'English (US)';
	$recap_lang['et'] = 'Estonian';
	$recap_lang['fil'] = 'Filipino';
	$recap_lang['fi'] = 'Finnish';
	$recap_lang['fr'] = 'French';
	$recap_lang['fr-CA'] = 'French (Canadian)';
	$recap_lang['gl'] = 'Galician';
	$recap_lang['ka'] = 'Georgian';
	$recap_lang['de'] = 'German';
	$recap_lang['de-AT'] = 'German (Austria)';
	$recap_lang['de-CH'] = 'German (Switzerland)';
	$recap_lang['el'] = 'Greek';
	$recap_lang['gu'] = 'Gujarati';
	$recap_lang['iw'] = 'Hebrew';
	$recap_lang['hi'] = 'Hindi';
	$recap_lang['hu'] = 'Hungarain';
	$recap_lang['is'] = 'Icelandic';
	$recap_lang['id'] = 'Indonesian';
	$recap_lang['it'] = 'Italian';
	$recap_lang['ja'] = 'Japanese';
	$recap_lang['kn'] = 'Kannada';
	$recap_lang['ko'] = 'Korean';
	$recap_lang['lo'] = 'Laothian';
	$recap_lang['lv'] = 'Latvian';
	$recap_lang['lt'] = 'Lithuanian';
	$recap_lang['ms'] = 'Malay';
	$recap_lang['ml'] = 'Malayalam';
	$recap_lang['mr'] = 'Marathi';
	$recap_lang['mn'] = 'Mongolian';
	$recap_lang['no'] = 'Norwegian';
	$recap_lang['fa'] = 'Persian';
	$recap_lang['pl'] = 'Polish';
	$recap_lang['pt'] = 'Portuguese';
	$recap_lang['pt-BR'] = 'Portuguese (Brazil)';
	$recap_lang['pt-PT'] = 'Portuguese (Portugal)';
	$recap_lang['ro'] = 'Romanian';
	$recap_lang['ru'] = 'Russian';
	$recap_lang['sr'] = 'Serbian';
	$recap_lang['si'] = 'Sinhalese';
	$recap_lang['sk'] = 'Slovak';
	$recap_lang['sl'] = 'Slovenian';
	$recap_lang['es'] = 'Spanish';
	$recap_lang['es-419'] = 'Spanish (Latin America)';
	$recap_lang['sw'] = 'Swahili';
	$recap_lang['sv'] = 'Swedish';
	$recap_lang['ta'] = 'Tamil';
	$recap_lang['te'] = 'Telugu';
	$recap_lang['th'] = 'Thai';
	$recap_lang['tr'] = 'Turkish';
	$recap_lang['uk'] = 'Ukrainian';
	$recap_lang['ur'] = 'Urdu';
	$recap_lang['vi'] = 'Vietnamese';
	$recap_lang['zu'] = 'Zulu';
	
	pagelayer_page_header('Pagelayer Settings');

	// Saved ?
	if(!empty($done)){
		echo '<div class="notice notice-success"><p>'. __('The settings were saved successfully', 'pagelayer'). '</p></div><br />';
	}

	// Any errors ?
	if(!empty($pl_error)){
		pagelayer_report_error($pl_error);echo '<br />';
	}
	
?>
	<form class="pagelayer-setting-form" method="post" action="">
		<?php wp_nonce_field('pagelayer-options'); ?>
		<div class="tabs-wrapper">
			<h2 class="nav-tab-wrapper pagelayer-wrapper">
				<?php
				if(!defined('SITEPAD')){
					echo '<a href="#general" class="nav-tab">'.__('General').'</a>';
				}
				?>
				<a href="#icons" class="nav-tab "><?php _e('Enable Icons');?></a>
				<a href="#social" class="nav-tab"><?php _e('Information');?></a>
				<?php if(defined('PAGELAYER_PREMIUM')){ ?>
				<a href="#integration" class="nav-tab"><?php _e('Integrations');?></a>
				<a href="#contactform" class="nav-tab "><?php _e('Contact Form');?></a>
				<a href="#captcha" class="nav-tab "><?php _e('Google Captcha');?></a>
				<?php  
				}
				if(!defined('SITEPAD')){
					echo '
					<a href="#support" class="nav-tab ">'.__('Support').'</a>
					<a href="#faq" class="nav-tab ">'.__('FAQ').'</a>';
				}
				?>
			</h2>
		
			<div class="pagelayer-tab-panel" id="general">
				 <table>
					<tr>
						<th scope="row"><?php _e('Editor Enables On');?></th>
						<td>
						<label>
					<?php
						foreach($post_type as $type => $name){							
							echo '<input type="checkbox" name="pl_support_ept[]" value="'.$type.'" '. (in_array($type, $support_ept) ? "checked" : "") .'/>'.$name.'</br>';
						}
					?>
						</label>
						</td>
					</tr>
				 </table>
			</div>
			<div class="pagelayer-tab-panel" id="icons">
				<table>
					<tr>
						<th scope="row"><?php _e('Enable Icons');?></th>
						<td>
						<label>
							<input type="checkbox" name="pagelayer_icons_set[]" value="font-awesome5" <?php if(in_array('font-awesome5',get_option( 'pagelayer_icons_set')) || !get_option( 'pagelayer_icons_set')){echo ' checked';}?> />font-awesome5</br>
						</label>
						</td>
					</tr>
				 </table>
			</div>
			<div class="pagelayer-tab-panel" id="social">
				<div class="pagelayer-settings-info" style="display:flex;">
					<div style="flex:1">
						<div class="pagelayer-title">
							<h2><?php _e('Address and Phone Number');?></h2>
						</div>
						<table>
							<tr>
								<th><?php _e('Address');?></th>
								<td><textarea name="pagelayer-address"><?php echo pagelayer_get_option('pagelayer-address');?></textarea></td>
							</tr>
							<tr>
								<th><?php _e('Phone Number');?></th>
								<td><input type="tel" name="pagelayer-phone" <?php echo 'value="'.pagelayer_get_option('pagelayer-phone').'"';?> /></td>
							</tr>
							
							<tr>
								<th scope="row"><?php _e('Contact Email');?></th>
								<td>
									<?php if(defined('PAGELAYER_PREMIUM')){																			
										echo '<p>'.__('You can change your contact email<br> from the Contact Form Settings.').'</p>';
									}else{
									?>
									<label>
										<input name="pagelayer_cf_to_email" type="email" placeholder="email@domain.com" <?php if(get_option('pagelayer_cf_to_email')){
										echo 'value="'.get_option('pagelayer_cf_to_email').'"';
									}?>/>
									</label>
									<?php } ?>
								</td>
							</tr>
							
						</table>
						<?php if(defined('PAGELAYER_PREMIUM')){ ?>
						<div class="pagelayer-title">
							<h2><?php _e('Copyright');?></h2>
						</div>
						<table>
							<tr>
								<th><?php _e('Copyright Text');?></th>
								<td><textarea name="pagelayer-copyright"><?php echo pagelayer_get_option('pagelayer-copyright'); ?></textarea></td>
							</tr>
						</table>
						<?php } ?>
					</div>
					<?php if(defined('PAGELAYER_PREMIUM')){ ?>
					<div style="flex:1">
						<div class="pagelayer-title">
							<h2><?php _e('Social Profile URLs');?></h2>
						</div>
						<table>
							<tr>
								<th><?php _e('Facebook');?></th>
								<td><input type="text" name="pagelayer-facebook-url" <?php echo 'value="'.get_option('pagelayer-facebook-url').'"';?>/></td>
							</tr>
							<tr>
								<th><?php _e('Twitter');?></th>
								<td><input type="text" name="pagelayer-twitter-url" <?php echo 'value="'.get_option('pagelayer-twitter-url').'"';?>/></td>
							</tr>
							<tr>
								<th><?php _e('Instagram');?></th>
								<td><input type="text" name="pagelayer-instagram-url" <?php  echo 'value="'.get_option('pagelayer-instagram-url').'"'; ?>/></td>
							</tr>
							<tr>
								<th><?php _e('LinkedIn');?></th>
								<td><input type="text" name="pagelayer-linkedin-url" <?php echo 'value="'.get_option('pagelayer-linkedin-url').'"'; ?>/></td>
							</tr>
							<tr>
								<th><?php _e('YouTube');?></th>
								<td><input type="text" name="pagelayer-youtube-url" <?php echo 'value="'.get_option('pagelayer-youtube-url').'"'; ?>/></td>
							</tr>
							<tr>
								<th><?php _e('Google+');?></th>
								<td><input type="text" name="pagelayer-gplus-url" <?php echo 'value="'.get_option('pagelayer-gplus-url').'"'; ?>/></td>
							</tr>
						</table>
					</div>
					<?php } ?>
				</div>
			</div>
			<?php if(defined('PAGELAYER_PREMIUM')){ ?>
			<div class="pagelayer-tab-panel" id="integration">
				<div class="pagelayer-title">
					<h2><?php _e('Facebook SDK Details');?></h2>
				</div>
				<table>
					<tr>
						<th><?php _e('App ID');?></th>
						<td><input type="text" name="pagelayer-fbapp-id" class="pagelayer-app-id" <?php if(get_option('pagelayer-fbapp-id')){
								echo 'value="'.get_option('pagelayer-fbapp-id').'"';
							}?>/></td>
					</tr>					
				</table>
			</div>
			<div class="pagelayer-tab-panel pagelayer-cf" id="contactform">
				 <table>
					<tr>
						<td colspan="2" style="align:middle;">
						<p><?php _e('You can use a field name with a prefix $ to print your field value e.g. if the field name is <b>fieldname</b> then use the variable <b>$fieldname</b>');?></p>
						</td>
					</tr>
					<tr>
						<td scope="row" width="50%">
							<?php echo '<b>'.__('To Email').' :</b><br><p>'.__('You can use comma seperated values for multiple emails').'</p>';?>
						</td>
						<td>
							<label>
								<input name="pagelayer_cf_to_email" type="text" placeholder="email@domain.com" <?php if(get_option('pagelayer_cf_to_email')){
								echo 'value="'.get_option('pagelayer_cf_to_email').'"';
							}?>/>
							</label>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('From Email');?>:</th>
						<td>
							<label>
								<input name="pagelayer_cf_from_email" type="text" placeholder="My Site <email@domain.com>" <?php 
								if(get_option('pagelayer_cf_from_email')){
								echo 'value="'.get_option('pagelayer_cf_from_email').'"';
							}?>/>
							</label>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Subject');?>:</th>
						<td>
							<label>
								<input name="pagelayer_cf_subject" type="text" placeholder="Subject" <?php if(get_option('pagelayer_cf_subject')){
								echo 'value="'.get_option('pagelayer_cf_subject').'"';
							}?> />
							</label>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Additional Headers');?>: </th>
						<td>
							<label>
								<textarea rows="3" name="pagelayer_cf_headers"><?php 
								if(get_option('pagelayer_cf_headers')){
									echo get_option('pagelayer_cf_headers');
								} ?></textarea>
							</label>
						</td>
					</tr>
					<tr>
						<td colspan="2"><b><?php echo __('Messages').' : </b><p>'.__('You can edit messages used for information of your form here.');?></p></td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Success Message');?> :</th>
						<td>
							<label>
								<input name="pagelayer_cf_success" type="text" placeholder="Success" <?php if(get_option('pagelayer_cf_success')){
								echo 'value="'.get_option('pagelayer_cf_success').'"';
							}?> />
							</label>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('Failed Message');?> :</th>
						<td>
							<label>
								<input name="pagelayer_cf_failed" type="text" placeholder="Failed" <?php if(get_option('pagelayer_cf_failed')){
								echo 'value="'.get_option('pagelayer_cf_failed').'"';
							}?> />
							</label>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('reCaptcha Failed Message');?> : </th>
						<td>
							<label>
								<input name="pagelayer_recaptcha_failed" type="text" placeholder="The CAPTCHA verification failed. Please try again." <?php
								echo 'value="'.get_option('pagelayer_recaptcha_failed', __pl('cap_ver_fail')).'"';
							?> />
							</label>
						</td>
					</tr>
				 </table>
			</div>
			<div class="pagelayer-tab-panel" id="captcha">
				 <table>
					<tr>
						<th scope="row"><?php _e('reCaptcha Site Key');?></th>
						<td>
							<label>
								<input name="pagelayer_google_captcha" type="text" placeholder="Site key" <?php if(get_option('pagelayer_google_captcha')){
								echo 'value="'.get_option('pagelayer_google_captcha').'"';
							}?> />
							</label>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('reCaptcha Secret Key');?></th>
						<td>
							<label>
								<input name="pagelayer_google_captcha_secret" type="text" placeholder="Secret key" <?php if(get_option('pagelayer_google_captcha_secret')){
								echo 'value="'.get_option('pagelayer_google_captcha_secret').'"';
							}?> />
							</label>
						</td>
					</tr>
					<tr>
						<th scope="row"><?php _e('reCaptcha Language');?> </th>
						<td>
							<label>
								<select name="pagelayer_google_captcha_lang">
									<?php
										foreach($recap_lang as $k => $v){
											echo '<option '.( get_option('pagelayer_google_captcha_lang', '') == $k ? 'selected="selected"' : '').' value="'.$k.'">'.$v.'</value>';								
										}
									?>
								</select>
							</label>
						</td>
					</tr>
				 </table>
			</div>
			<?php } ?>
			<div class="pagelayer-tab-panel" id="support">
				<h2><?php _e('Support');?></h2>
				<h3><?php _e('You can contact the Pagelayer Team via email. Our email address is <a href="mailto:support@pagelayer.com">support@pagelayer.com</a>. We will get back to you as soon as possible!');?></h3>
			</div>
			<div class="pagelayer-tab-panel" id="faq">
				<h2><?php _e('FAQ');?></h2>
				<div class="pagelayer-acc-wrapper">
					<span class="nav-tab pagelayer-acc-tab"><?php _e('1: Why choose us');?></span>
					<div class="pagelayer-acc-panel">
						<p><?php _e('Pagelayer is best live editor and easy to use and we will keep improving it !');?></P>
					</div>
					
					<span class="nav-tab pagelayer-acc-tab"><?php _e('2: Support');?></span>
					<div class="pagelayer-acc-panel">
						<p><?php _e('You can contact the PageLayer Group via email. Our email address is <a href="mailto:support@pagelayer.com">support@pagelayer.com</a>. We will get back to you as soon as possible!');?></p>
					</div>
				</div>
			</div>
		</div>
		<p>
			<input type="submit" name="submit" class="button button-primary" value="Save Changes">
		</p>
	</form>
	
<?php
	
	pagelayer_page_footer();

}