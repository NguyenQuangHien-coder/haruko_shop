<?php

//////////////////////////////////////////////////////////////
//===========================================================
// license.php
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

include_once(PAGELAYER_DIR.'/main/settings.php');

// The License Page
function pagelayer_website_settings(){
	
	global $pagelayer, $pl_error;
	
	pagelayer_load_font_options();
	
	if(!empty($_POST)){
		check_admin_referer('pagelayer-options');
	}
	
	if(isset($_POST['submit'])){
		
		$font_settings = ['body', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pagelayer_color' => 'color', 'pagelayer_sidebar' => 'sidebar'];
		
		foreach($font_settings as $setting => $key){
			
			if(isset($_POST[$key])){
				
				foreach($_POST[$key] as $k => $v){
					if($v == 'Default' || empty($v)){
						unset($_POST[$key][$k]);
					}
				}
				
				// For sidebar, width default should not be saved
				if($key == 'sidebar' && $k == 'width' && $v == 20){
					unset($_POST[$key][$k]);
				}
				
				$setting = is_numeric($setting) ? 'pagelayer_'.$key.'_typography' : $setting;
				
				// Are we to save ?
				update_option($setting, (!empty($_POST[$key]) ? $_POST[$key] : []));
				
			}
			
			// Blank the old Body font
			if(!empty($_POST['body']['font-family'])){
				update_option('pagelayer_body_font', '');
			}
			
		}
		
		//pagelayer_print($_POST);		
	
		// Content Width
		if(isset($_REQUEST['pagelayer_content_width'])){
			update_option( 'pagelayer_content_width', $_REQUEST['pagelayer_content_width'] );
		}

		// Tablet breakpoint 
		if(isset($_REQUEST['pagelayer_tablet_breakpoint'])){			
			update_option( 'pagelayer_tablet_breakpoint', $_REQUEST['pagelayer_tablet_breakpoint'] );			
		}

		// Mobile breakpoint 
		if(isset($_REQUEST['pagelayer_mobile_breakpoint'])){
			update_option( 'pagelayer_mobile_breakpoint', $_REQUEST['pagelayer_mobile_breakpoint'] );
		}
		
		// Widget Space
		if(isset($_REQUEST['pagelayer_between_widgets'])){
			update_option( 'pagelayer_between_widgets', $_REQUEST['pagelayer_between_widgets'] );
		}
		
		if(defined('PAGELAYER_PREMIUM')){
		
			// Save Header code
			if(isset($_REQUEST['pagelayer_header_code'])){	
				update_option( 'pagelayer_header_code', wp_unslash($_REQUEST['pagelayer_header_code'] ));
			}
			
			// Save Footyer code
			if(isset($_REQUEST['pagelayer_footer_code'])){
				update_option( 'pagelayer_footer_code', wp_unslash($_REQUEST['pagelayer_footer_code'] ));
			}
		
		}
		
		$GLOBALS['pl_saved'] = true;
		
	}
	
	pagelayer_website_settings_T();
	
}

// The License Page - THEME
function pagelayer_website_settings_T(){
	
	global $pagelayer, $pl_error;

	pagelayer_page_header('Pagelayer Website Settings');

	// Saved ?
	if(!empty($GLOBALS['pl_saved'])){
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
			<a href="#typography" class="nav-tab"><?php echo __pl('typography');?></a>
			<a href="#headings" class="nav-tab "><?php echo __pl('heading_style');?></a>
			<a href="#colors" class="nav-tab "><?php echo __pl('color');?></a>
			<a href="#website_container" class="nav-tab"><?php echo __pl('container');?></a>
			<!--<a href="#pagelayer-sidebar" class="nav-tab">Sidebar</a>-->
			<a href="#hf" class="nav-tab "><?php echo __pl('hf');?></a>
		</h2>
	
		<div class="pagelayer-tab-panel" id="typography">
		
			<center><h2><?php echo __pl('body_content'); ?></h2></center>
			
			<?php pagelayer_website_font_settings('body');?>
			
		</div>
	
		<div class="pagelayer-tab-panel" id="headings">
			
			<?php
			
			$headings = ['h1' => 'H1', 'h2' => 'H2', 'h3' => 'H3', 'h4' => 'H4', 'h5' => 'H5', 'h6' => 'H6'];
			
			echo '<div style="display:inline-block;vertical-align: top;">
			<ul class="nav-tab-wrapper pagelayer-wrapper pagelayer-heading-wrapper">';
				
			foreach($headings as $k => $v){
				echo '<li><a href="#tab_'.$k.'" class="nav-tab pagelayer-heading-tab" tab-class="pagelayer-heading-tab-panel">'.$v.' Settings</a></li>';				
			}
			
			echo '</ul>
			</div>
			
			<div style="display:inline-block;vertical-align: top;">';
			
			foreach($headings as $k => $v){
				echo '<div class="pagelayer-heading-tab-panel" id="tab_'.$k.'">
				<center><h2>'.$v.' Settings</h2></center>';
				pagelayer_website_font_settings($k);
				echo '</div>';
			}
			
			echo '</div>';
			
			?>
		
		</div>
	
		<div class="pagelayer-tab-panel" id="colors">
			<script src="https://unpkg.com/vanilla-picker@2.10.1/dist/vanilla-picker.min.js"></script>
			<?php
			pagelayer_website_color('Background Color', 'background');
			pagelayer_website_color('Text Color', 'text');
			pagelayer_website_color('Link Color', 'link');
			pagelayer_website_color('Link Hover Color', 'link-hover');
			pagelayer_website_color('Heading Color (H1-H6)', 'heading');
			
			echo __pl('color_notice');
			?>
		</div>
	
		<div class="pagelayer-tab-panel" id="website_container">
		
			<table>	
			
				<tr>
					<th><?php echo __('Content Width') ?></th>
					<td>
						<input name="pagelayer_content_width" type="number" step="1" min="320" max="5000" placeholder="1170" <?php if(get_option('pagelayer_content_width')){
							echo 'value="'.get_option('pagelayer_content_width').'"';
						}?>>
						<p><?php echo __('Set the custom width of the content area. The default width set is 1170px.') ?></p>
					</td>
				<tr>
				<tr>
					<th><?php echo __('Tablet Breakpoint') ?></th>
					<td>
						<input name="pagelayer_tablet_breakpoint" type="number" step="1" min="320" max="5000" placeholder="768" <?php if(get_option('pagelayer_tablet_breakpoint')){
							echo 'value="'.get_option('pagelayer_tablet_breakpoint').'"';
						}?>>
						<p><?php echo __('Set the breakpoint for tablet devices. The default breakpoint for tablet layout is 768px.') ?></p>
					</td>
				</tr>
				<tr>
					<th><?php echo __('Mobile Breakpoint') ?></th>
					<td>
						<input name="pagelayer_mobile_breakpoint" type="number" step="1" min="320" max="5000" placeholder="360" <?php if(get_option('pagelayer_mobile_breakpoint')){
							echo 'value="'.get_option('pagelayer_mobile_breakpoint').'"';
						}?>>
						<p><?php echo __('Set the breakpoint for mobile devices. The default breakpoint for mobile layout is 360px.') ?></p>
					</td>
				</tr>
				<tr>
					<th><?php echo __('Space Between Widgets') ?></th>
					<td>
						<input name="pagelayer_between_widgets" type="number" step="1" min="0" max="500" placeholder="15" <?php if(get_option('pagelayer_between_widgets')){
							echo 'value="'.get_option('pagelayer_between_widgets').'"';
						}?>>
						<p><?php echo __('Set the Space Between Widgets. The default Space set is 15px.') ?></p>
					</td>
				<tr>
		
			</table>
		
		</div>
	
		<div class="pagelayer-tab-panel" id="pagelayer-sidebar">
		
			<table width="100%">
				<tr>
					<td colspan="2">
						<b><?php echo __('Sidebar Preferences');?> :</b>
						<p><?php echo __('By default, the themes sidebar will be shown. But you can customize the settings here as per your preference. Note : This will work only if your theme uses the get_sidebar() function. Also the main content element and sidebar element should be siblings. If they are not siblings, then only the <b>No Sidebar</b> option will be usable.');?></p>
					</td>
				</tr>
				<tr>
					<th valign="top"><?php echo __('Default');?> : </th>
					<td>
						<?php pagelayer_sidebar_select('default');?>
						<p> <?php echo __('Default layout for the Sidebar throughout the site', 'pagelayer') ?> </p>
					</td>
				</tr>
				<tr>
					<th valign="top"><?php echo __('For Pages');?> : </th>
					<td>
						<?php pagelayer_sidebar_select('page');?>
					</td>
				</tr>
				<tr>
					<th valign="top"><?php echo __('For Posts');?> : </th>
					<td>
						<?php pagelayer_sidebar_select('post');?>
					</td>
				</tr>
				<tr>
					<th valign="top"><?php echo __('For Archives');?> : </th>
					<td>
						<?php pagelayer_sidebar_select('archives');?>
					</td>
				</tr>
				<tr>
					<th valign="top"><?php echo __('Width');?> : </th>
					<td>
						<input type="number" name="sidebar[width]" min="1" step="1" value="<?php echo (!empty($_POST) ? esc_html($_POST['sidebar']['width']) : (!empty($pagelayer->settings['sidebar']['width']) ? esc_html($pagelayer->settings['sidebar']['width']) : '20') );?>" /><span>%</span>
					</td>
				</tr>
			</table>
			
		</div>
		
		<div class="pagelayer-tab-panel" id="hf">
			<?php pagelayer_show_pro_notice();?>
			<table width="100%">
				<tr>
					<td colspan="2">
						<b><?php echo __('Header and Footer code');?> :</b>
						<p><?php echo __('You can add custom code like HTML, JavaScript, CSS etc. which will be inserted throughout your site.');?></p>
					</td>
				</tr>
				<tr>
					<th valign="top"><?php echo __('Header Code');?> : </th>
					<td>
						<textarea name="pagelayer_header_code" style="width:80%;" rows="6"><?php echo get_option( 'pagelayer_header_code' ); ?></textarea>
						<p> <?php echo __('This code will be printed in <code>&lt;head&gt;</code> Section.') ?> </p>
					</td>
				</tr>
				<tr>
					<th valign="top"><?php echo __('Footer Code');?> : </th>
					<td>
						<textarea name="pagelayer_footer_code" style="width:80%;" rows="6"><?php echo  get_option( 'pagelayer_footer_code' ); ?></textarea>
						<p> <?php echo __('This code will be printed before closing the <code>&lt;/body&gt;</code> Section.') ?> </p>
					</td>
				</tr>
			</table>
		</div>
		
	</div>
	<center><input type="submit" name="submit" class="button button-primary button-submit" value="Save Changes"></center>
	<br /><br />
</form>

<script>
	
// Show the vanilla selector
function pagelayer_show_vanilla(){
	jQuery('.pagelayer-show-vanilla').each(function(){
		var jEle = jQuery(this);
		var par = jEle.parent();
		var input = par.find('input');
		var sColor = '';
		
		if(input.val().length > 0){
			sColor = input.val();
			jEle.find('.pagelayer-color-div').css('background', sColor);
			jEle.find('.pagelayer-color-div').removeClass('pagelayer-color-none');
		}
		
		var picker = new Picker({
			parent : jEle[0],
			color : sColor,
		});
		
		// You can do what you want with the chosen color using two callbacks: onChange and onDone.
		picker.onChange = function(color) {
			jEle.find('.pagelayer-color-div').css('background', color.rgbaString);
			jEle.find('.pagelayer-color-div').removeClass('pagelayer-color-none');
			input.val(color.hex);
		};
		
		jEle.find('.dashicons').on('click', function(event){
			event.preventDefault();
			event.stopPropagation();
			jEle.find('.pagelayer-color-div').addClass('pagelayer-color-none');
			input.val('');
		});
	});
}

function pagelayer_handle_custom(ele){
	jEle = jQuery(ele);
	if(jEle.val().length > 1){
		jEle.siblings().show();
	}else{
		jEle.siblings().hide();
		jEle.siblings('input').val('');
	}
}

jQuery(document).ready(function(){
	pagelayer_show_vanilla();
	jQuery('.pagelayer-show-custom').each(function(){
		pagelayer_handle_custom(jQuery(this));
	});
	
});
</script>

<?php
	
	pagelayer_page_footer();

}

// Shows the font settings
function pagelayer_website_color($text, $field){
	
	global $pagelayer, $pl_error;
	
	$val = !empty($_POST) ? @$_POST['color'][$field] : @$pagelayer->settings['color'][$field];
	
	echo '
	<table>
		<tr>
			<th scope="row">'.$text.'</th>
			<td>
				<a href="#" class="pagelayer-show-vanilla"><div class="pagelayer-color-div pagelayer-color-none"></div><span class="dashicons dashicons-no"></span></a><input type="hidden" name="color['.$field.']" value="'.esc_html($val).'">
			</td>
		</tr>
	</table>';
	
}

// Shows the font settings
function pagelayer_website_font_settings($prefix){
	
	global $pagelayer, $pl_error;
	
	if(!empty($_POST)){
		$vals = $_POST;
	}else{
		$vals = $pagelayer->settings;
	}
	
	?>
	
	<table>
		<tr>
			<th scope="row"><?php echo __pl('font_family'); ?></th>
			<td>
				<label>
					<select name="<?php echo $prefix;?>[font-family]">
						<?php
							foreach($pagelayer->fonts as $k => $font){							
								echo '<option value="'.esc_html($font).'" '.($vals[$prefix]['font-family'] == $font ? 'selected' : '').'>'. esc_html(empty($font) ? 'Default': $font) .'</option>';
							}
						?>
					</select>
				</label>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><?php echo __pl('font_size'); ?></th>
			<td>
				<label>
					<select class="pagelayer-show-custom" onchange="pagelayer_handle_custom(this)">
						<option value="" <?php echo (empty($vals[$prefix]['font-size']) ? 'selected="seleted"' : '');?>>Default</option>
						<option value="custom" <?php echo (!empty($vals[$prefix]['font-size']) ? 'selected="seleted"' : '');?>>Custom</option>
					</select>
					<input type="number" name="<?php echo $prefix;?>[font-size]" <?php echo (!empty($vals[$prefix]['font-size']) ? 'value="'.esc_html($vals[$prefix]['font-size']).'"' : '');?> /><span>px</span>
				</label>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><?php echo __pl('font_style'); ?></th>
			<td>
				<label>
					<select name="<?php echo $prefix;?>[font-style]">
					<?php
						foreach($pagelayer->font_style as $k => $var){							
							echo '<option value="'.esc_html($k).'" '.($vals[$prefix]['font-style'] == $k ? 'selected' : '').'>'.esc_html($var).'</option>';
						}
					?>
					</select>
				</label>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><?php echo __pl('font_weight');?></th>
			<td>
				<label>
					<select name="<?php echo $prefix;?>[font-weight]">
					<?php
						foreach($pagelayer->font_weight as $k => $var){							
							echo '<option value="'.esc_html($k).'" '.($vals[$prefix]['font-weight'] == $k ? 'selected' : '').'>'.esc_html($var).'</option>';
						}
					?>
					</select>
				</label>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><?php echo __pl('text_transform');?></th>
			<td>
				<label>
					<select name="<?php echo $prefix;?>[text-transform]">
					<?php
						foreach($pagelayer->text_transform as $k => $var){							
							echo '<option value="'.esc_html($k).'" '.($vals[$prefix]['text-transform'] == $k ? 'selected' : '').'>'.esc_html($var).'</option>';
						}
					?>
					</select>
				</label>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><?php echo __pl('line_height');?></th>
			<td>
				<label>
					<select class="pagelayer-show-custom" onchange="pagelayer_handle_custom(this)">
						<option value="" <?php echo (empty($vals[$prefix]['line-height']) ? 'selected="seleted"' : '');?>>Default</option>
						<option value="custom" <?php echo (!empty($vals[$prefix]['line-height']) ? 'selected="seleted"' : '');?>>Custom</option>
					</select>
					<input type="number" name="<?php echo $prefix;?>[line-height]" min="0.1" step="0.1" <?php echo (!empty($vals[$prefix]['line-height']) ? 'value="'.esc_html($vals[$prefix]['line-height']).'"' : '');?> />
				</label>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><?php echo __pl('text_spacing');?></th>
			<td>
				<label>
					<select class="pagelayer-show-custom" onchange="pagelayer_handle_custom(this)">
						<option value="" <?php echo (empty($vals[$prefix]['letter-spacing']) ? 'selected="seleted"' : '');?>>Default</option>
						<option value="custom" <?php echo (!empty($vals[$prefix]['letter-spacing']) ? 'selected="seleted"' : '');?>>Custom</option>
					</select>
					<input type="number" name="<?php echo $prefix;?>[letter-spacing]" min="1" step="1" <?php echo (!empty($vals[$prefix]['letter-spacing']) ? 'value="'.esc_html($vals[$prefix]['letter-spacing']).'"' : '');?> /><span>px</span>
				</label>
			</td>
		</tr>
		
		<tr>
			<th scope="row"><?php echo __pl('word_spacing');?></th>
			<td>
				<label>
					<select class="pagelayer-show-custom" onchange="pagelayer_handle_custom(this)">
						<option value="" <?php echo (empty($vals[$prefix]['word-spacing']) ? 'selected="seleted"' : '');?>>Default</option>
						<option value="custom" <?php echo (!empty($vals[$prefix]['word-spacing']) ? 'selected="seleted"' : '');?>>Custom</option>
					</select>
					<input type="number" name="<?php echo $prefix;?>[word-spacing]" min="1" step="1" <?php echo (!empty($vals[$prefix]['word-spacing']) ? 'value="'.esc_html($vals[$prefix]['word-spacing']).'"' : '');?> /><span>px</span>
				</label>
			</td>
		</tr>
		
	</table>
	
<?php
	
}

function pagelayer_sidebar_select($name){
	
	global $pagelayer;
	
	$val = isset($pagelayer->settings['sidebar'][$name]) ? $pagelayer->settings['sidebar'][$name] : 'default';
	$val = !empty($_POST) ? @$_POST['sidebar'][$name] : $val;
	
	// We dont save the value "Default" (note case sensitivity), but the theme customizer saves "default"
	// We need to keep all values blank if user is submitting values as Default
	
	echo '
	<select class="pagelayer-show-custom" name="sidebar['.$name.']">
		<option value="Default" '.($val == 'default' ? 'selected="seleted"' : '').'>Default</option>
		<option value="no" '.($val == 'no' ? 'selected="seleted"' : '').'>No Sidebar</option>
		<option value="left" '.($val == 'left' ? 'selected="seleted"' : '').'>Left Sidebar</option>
		<option value="right" '.($val == 'right' ? 'selected="seleted"' : '').'>Right Sidebar</option>
	</select>
	';
}