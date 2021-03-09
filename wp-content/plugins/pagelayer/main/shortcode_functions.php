<?php

//////////////////////////////////////////////////////////////
//===========================================================
// class.php
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

// Is there a block ?
function pagelayer_render_blocks($pre_render, $parsed_block){
	
	global $pagelayer;
	
	if(empty($parsed_block)){
		return $pre_render;
	}
	
	$block_name = $parsed_block['blockName'];
	$tag = '';
	$content = $parsed_block['innerHTML'];
	$inner_blocks = $parsed_block['innerBlocks'];
	$atts = $parsed_block['attrs'];
	$atts['is_not_sc'] = 1;
	
	if ( is_string( $block_name ) && 0 === strpos( $block_name, 'pagelayer/' ) ) {
		$tag = substr( $block_name, 10 );
	}
	
	$allowed_tags = ['pl_inner_row', 'pl_inner_col'];
	
	if( (empty($tag) || !array_key_exists($tag, $pagelayer->shortcodes) ) && ! in_array( $tag, $allowed_tags) ){
		return $pre_render;
	}
	
	return pagelayer_render_shortcode($atts, $content, $tag, $inner_blocks);
}

// Is there a tag ?
function pagelayer_render_shortcode($atts, $content = '', $tag = '', $inner_blocks = array()){

	global $pagelayer;
	
	$is_block = 0;
	
	// Is block ?
	if(!empty($atts['is_not_sc'])){
		$is_block = 1;
		unset($atts['is_not_sc']);
	}
	
	$_tag = $class = $tag;
	$final_tag = $tag;
	
	// Check if the tag is inner row and col then change it to row and col tag
	if($tag == 'pl_inner_row'){
		$tag = 'pl_row';
	}elseif($tag == 'pl_inner_col'){
		$tag = 'pl_col';
		$final_tag = $tag;
	}
	
	// Clear the pagelayer tags
	if(substr($tag, 0, 3) == 'pl_'){
		$_tag = str_replace('pl_', '', $final_tag);
		$class = 'pagelayer-'.$_tag;
	}
	
	$atts = (array) $atts;

	// If global - > Get the post and replace $atts
	if(!empty($atts['global_id'])){
		
		if(!empty($pagelayer->global_widgets[$atts['global_id']])){
			$content = $pagelayer->global_widgets[$atts['global_id']]['$'];
			return pagelayer_change_id($content);
		}
		
		if(!empty($pagelayer->global_sections[$atts['global_id']])){
			$content = $pagelayer->global_sections[$atts['global_id']]['$'];
			return pagelayer_change_id($content);
		}

	}
	
	// Is there any function ?
	$func = @$pagelayer->shortcodes[$tag]['func'];
	
	// If not, we will search for a default func if prefix of tag is pl_
	if(empty($func) && substr($tag, 0, 3) == 'pl_'){
		$func = 'pagelayer_sc_'.substr($tag, 3);
	}
	
	// Create the element array. NOTE : This is similar to the JS el and is temporary
	$el = [];
	$el['atts'] = $atts;
	$el['oAtts'] = $atts;
	$el['id'] =  !empty($atts['pagelayer-id']) ? $atts['pagelayer-id'] : pagelayer_RandomString(16);
	$el['tmp'] = [];
	$el['tag'] = $final_tag;
	$el['content'] = $content;
	$el['selector'] = '[pagelayer-id="'.$el['id'].'"]';
	$el['wrap'] = '[pagelayer-wrap-id="'.$el['id'].'"]';
	
	// Remove pagelayer-id from attr
	if( !empty($atts['pagelayer-id']) ){
		unset($el['atts']['pagelayer-id']);
		unset($el['oAtts']['pagelayer-id']);
	}
	
	$innerHTML = @$pagelayer->shortcodes[$tag]['innerHTML'];
	if(!empty($innerHTML) && !empty($content)){
		$_content = str_replace('&', '&amp;', $content);
		$el['oAtts'][$innerHTML] = $_content;
		$el['atts'][$innerHTML] = $_content;
	}
	
	// The default class
	$el['classes'][] = $class;
	
	//pagelayer_print($el);
	
	// Lets create the CSS, Classes, Attr. Also clean the dependent atts
	foreach($pagelayer->tabs as $tab){
		
		if(empty($pagelayer->shortcodes[$tag][$tab])){
			continue;
		}
		
		foreach($pagelayer->shortcodes[$tag][$tab] as $section => $Lsection){
			
			$props = empty($pagelayer->shortcodes[$tag][$section]) ? @$pagelayer->styles[$section] : @$pagelayer->shortcodes[$tag][$section];
			
			//echo $tab.' - '.$section.' - <br>';
			
			if(empty($props)){
				continue;
			}
			
			foreach($props as $prop => $param){
			
				//echo $tab.' - '.$section.' - '.$prop.'<br>';
				
				// No value set
				if(empty($el['atts'][$prop]) && empty($el['atts'][$prop.'_tablet']) && empty($el['atts'][$prop.'_mobile'])){
					continue;
				}
				
				// Clean the not required atts
				if(!empty($param['req'])){
					
					$set = true;
					
					foreach($param['req'] as $rk => $reqval){
						$except = $rk[0] == '!' ? true : false;
						$rk = $except ? substr($rk, 1) : $rk;
						$val = @$el['atts'][$rk];
						
						//echo $prop.' - '.$rk.' : '.$reqval.' == '.$val.'<br>';
						
						// The value should not be there
						if($except){
							
							if(!is_array($reqval) && $reqval == $val){
								$set = false;
								break;
							}
							
							// Its an array and a value is found, then dont show
							if(is_array($reqval) && in_array($val, $reqval)){
								$set = false;
								break;
							}
							
						// The value must be equal
						}else{
							
							 if(!is_array($reqval) && $reqval != $val){
								$set = false;
								break;
							 }
							
							// Its an array and no value is found, then dont show
							if(is_array($reqval) && !in_array($val, $reqval)){
								$set = false;
								break;
							}
						}
						
					}
					
					// Unset as we dont need
					if(empty($set)){
						unset($el['atts'][$prop]);
						unset($el['atts'][$prop.'_tablet']);
						unset($el['atts'][$prop.'_mobile']);
					}
					
				}
				
				// We could have unset the value above, so we need to check again if the value is there
				if(empty($el['atts'][$prop]) && empty($el['atts'][$prop.'_tablet']) && empty($el['atts'][$prop.'_mobile'])){
					continue;
				}
				
				// Handle the edit fields
				if(!empty($param['edit'])){
					$el['edit'][$prop] = $param['edit'];
				}
				
				// Backward compatibility of row
				if($el['tag'] == 'pl_row' && $prop == 'content_pos' && !empty($el['atts'][$prop])){
					if($el['atts'][$prop] == 'baseline'){
						$el['atts'][$prop] = $el['oAtts'][$prop] = 'flex-start';
					}else if($el['atts'][$prop] == 'end'){
						$el['atts'][$prop] = $el['oAtts'][$prop] = 'flex-end';
					}
				}
				
				// Backward compatibility of Icons
				if($param['type'] == 'icon' && !empty($el['atts'][$prop]) && !preg_match('/\s/', $el['atts'][$prop])){
					$el['atts'][$prop] = $el['oAtts'][$prop] = 'fa fa-'.$el['atts'][$prop];
				}
				
				// Backward compatibility of Box Shadow
				if($param['type'] == 'box_shadow' && !empty($el['atts'][$prop]) && substr_count($el['atts'][$prop], ',') == 3){
					$el['atts'][$prop] = $el['oAtts'][$prop] = $el['atts'][$prop].',0,';
				}
				
				// Backward compatibility of units. And also for the default set value if it is numeric
				if(!empty($param['units']) && isset($el['atts'][$prop]) && is_numeric($el['atts'][$prop])){
					$el['atts'][$prop] = $el['oAtts'][$prop] = $el['atts'][$prop].$param['units'][0];
				}
				
				// Load any attachment values
				if(in_array($param['type'], ['image', 'video', 'audio', 'media'])){
					
					$attachment = ($param['type'] == 'image') ? pagelayer_image($el['atts'][$prop]) : pagelayer_attachment($el['atts'][$prop]);
	
					if(!empty($attachment)){
						foreach($attachment as $k => $v){
							$el['tmp'][$prop.'-'.$k] = $v;
						}
					}
					
				}
				
				// Load permalink values
				if($param['type'] == 'link'){
					$el['tmp'][$prop] = pagelayer_permalink($el['atts'][$prop]);
				}
				
				// Handle the AddClasses
				if(!empty($param['addClass']) && !empty($el['atts'][$prop])){
					
					// Convert to an array
					if(!is_array($param['addClass'])){
						$param['addClass'] = array($param['addClass']);
					}
					
					// Loop through
					foreach($param['addClass'] as $k => $v){
						$k = str_replace('{{element}}', '', $k);
						$el['classes'][] = [trim($k) => str_replace('{{val}}', $el['atts'][$prop], $v)];
					}
					
				}
				
				// Handle the AddAttributes
				if(!empty($param['addAttr']) && !empty($el['atts'][$prop])){
					
					// Convert to an array
					if(!is_array($param['addAttr'])){
						$param['addAttr'] = array($param['addAttr']);
					}
					
					// Loop through
					foreach($param['addAttr'] as $k => $v){
						$k = str_replace('{{element}}', '', $k);
						$el['attr'][] = [trim($k) => $v];
					}
					
				}				
				
				$modes = [
					'desktop' => '',
					'tablet' => '_tablet',
					'mobile' => '_mobile'
				];
				
				// Handle the CSS
				if(!empty($param['css'])){
					//echo $prop.'<br>';
					// Convert to an array
					if(!is_array($param['css'])){
						$param['css'] = array($param['css']);
					}
					
					// Loop the modes and check for values
					foreach($modes as $mk => $mv){
						
						$M_prop = $prop.$mv;
						
						// Any value ?
						if(empty($el['atts'][$M_prop])){
							continue;
						}
						
						// Loop through
						foreach($param['css'] as $k => $v){
							
							// Make the selector
							$selector = (!is_numeric($k) ? $k : $el['selector']);
							$selector = pagelayer_parse_el_vars($selector, $el);
							
							$ender = '';
							
							if($mk == 'tablet'){
								$selector = '@media (max-width: '.$pagelayer->settings['tablet_breakpoint'].'px) and (min-width: '.($pagelayer->settings['mobile_breakpoint'] + 1).'px){'.$selector;
								$ender = '}';
							}
							
							if($mk == 'mobile'){
								$selector = '@media (max-width: '.$pagelayer->settings['mobile_breakpoint'].'px){'.$selector;
								$ender = '}';
							}
							
							// Make the CSS
							if(!empty($selector)){
								$el['css'][$selector.'{|pl|}'.$ender][] = rtrim( trim( pagelayer_css_render($v, $el['atts'][$M_prop], @$param['sep']) ), ';' );
							}else{
								$el['css'][][] = pagelayer_parse_el_vars($el['atts'][$M_prop],$el);
							}
						}
						
					}
					
				}
				
				// Loop the modes and check for values
				foreach($modes as $mk => $mv){
					
					$M_prop = $prop.$mv;
					if($param['type'] == 'typography' && !empty($el['atts'][$M_prop])){
						$val = explode(',', $el['atts'][$M_prop]);
						
						if(!empty($val[0])){
							$font_weight = empty($val[3]) ? 400 : $val[3];
							$font_style = !empty($val[2]) && in_array($val[2], ['italic', 'oblique']) ? 'i' : '';
							$pagelayer->runtime_fonts[$val[0]][$font_weight.$font_style] = $font_weight.$font_style;
							//pagelayer_print($pagelayer->runtime_fonts);
						}
					}
					
					if($prop == 'font_family' && !empty($el['atts'][$M_prop])){
						$val = $el['atts'][$M_prop];
						if(!empty($val)){
							$font_weight = empty($el['atts']['font_weight'.$mv]) ? @$el['atts']['font_weight'] : $el['atts']['font_weight'.$mv];
							$font_weight = empty($font_weight) ? 400 : $font_weight;
							
							$font_style = empty($el['atts']['font_style'.$mv]) ? @$el['atts']['font_style'] : $el['atts']['font_style'.$mv];
							$font_style = empty($font_style) ? 'normal' : $font_style;							
							$font_style = in_array($font_style, ['italic', 'oblique']) ? 'i' : '';
							
							$pagelayer->runtime_fonts[$val][$font_weight.$font_style] = $font_weight.$font_style;
							
						}
					}
				}
			}
			
		}
		
	}
	
	//@pagelayer_print($el['css']);
	
	// Is there a function of the tag ?
	if(function_exists($func)){
		call_user_func_array($func, array(&$el));
	}
	
	// Create the default atts and tmp atts
	if(pagelayer_is_live()){
		pagelayer_create_sc($el, $is_block);
	}
	
	$div = '<div pagelayer-id="'.$el['id'].'">
			<style pagelayer-style-id="'.$el['id'].'"></style>';
	
	$is_group = !empty($pagelayer->shortcodes[$tag]['params']['elements']) ? true : false;
	
	// If there is an HTML AND you are not a GROUP, then make use of it, or append the real content
	if(!empty($pagelayer->shortcodes[$tag]['html'])){
		
		// Create the HTML object
		$node = pagelayerQuery::parseStr($pagelayer->shortcodes[$tag]['html']);
		
		// Remove the if-ext
		foreach($node('[if-ext]') as $v){
			$reqvar = pagelayer_var($v->attr('if-ext'));
			$v->removeAttr('if-ext');
			
			// Is the element there ?
			if(empty($el['atts'][$reqvar])){
				$v->after($v->html());
				$v->remove();
			}
		}
		
		// Remove the if
		foreach($node('[if]') as $v){
			$reqvar = pagelayer_var($v->attr('if'));
			$v->removeAttr('if');
			
			// Is the element there ?
			if(empty($el['atts'][$reqvar])){
				$v->remove();
			}
		}
		
		//die($node->html());
		
		// Do we have a holder ? Mainly for groups
		if(!empty($pagelayer->shortcodes[$tag]['holder'])){
			$node->query($pagelayer->shortcodes[$tag]['holder'])->html('{{pagelayer_do_shortcode}}');
			$do_shortcode = 1;
		}
		
		$html = pagelayer_parse_vars($node->html(), $el);
		
		// Append to the DIV
		$div .= $html;
		
	// Is it a widget ?
	}elseif(!empty($pagelayer->shortcodes[$tag]['widget'])){
		
		$class = $pagelayer->shortcodes[$tag]['widget'];
		$instance = [];
		
		// Is there any existing data ?
		if(!empty($el['atts']['widget_data'])){		
			$json = trim($el['atts']['widget_data']);
			$json = json_decode($json, true);
			//pagelayer_print($json);die();
			if(!empty($json)){
				$instance = $json;
			}
		}
		
		ob_start();
		the_widget($class, $instance, array('widget_id'=>'arbitrary-instance-'.$el['id'],
			'before_widget' => '',
			'after_widget' => '',
			'before_title' => '',
			'after_title' => ''
		));
		
		$div .= ob_get_contents();
		ob_end_clean();
		
	}else{
		$div .= '{{pagelayer_do_shortcode}}';
		$do_shortcode = 1;
	}
	
	// End the tag
	$div .= '</div>';
	
	// Add classes and attributes
	if(!empty($el['classes']) || !empty($el['attr']) || !empty($el['atts']['ele_attributes'])){
	
		// Create the HTML object
		$node = pagelayerQuery::parseStr($div);
		
		// Add the editable values
		if(!empty($el['edit']) && pagelayer_is_live()){
			
			foreach($el['edit'] as $k => $v){
				$node->query($v)->attr('pagelayer-editable', $k);
			}
			
		}
		
		// Add the classes
		if(!empty($el['classes'])){
			
			//pagelayer_print($el['classes']);
			
			foreach($el['classes'] as $k => $v){
				
				if(!is_array($v)){
					$v = [$v];
				}
				
				foreach($v as $kk => $vv){
					//echo $kk.' - '.$vv."\n";
					if(is_numeric($kk)){
						$node->query($el['selector'])->addClass($vv);
					}else{
						$node->query($kk)->addClass($vv);
					}
					
				}
				
			}
			
			//echo $node->html();
			//die();
			
		}
	
		// Add the attributes		
		if(!empty($el['attr'])){
			
			//pagelayer_print($el['attr']);
			
			foreach($el['attr'] as $k => $v){
				
				if(!is_array($v)){
					$v = [$v];
				}
				
				foreach($v as $kk => $vv){
					
					$att = explode('=', $vv, 2);
					$att[1] = pagelayer_parse_vars($att[1], $el);
					$att[1] = trim($att[1], '"');
					
					if(is_numeric($kk)){
						$node->query($el['selector'])->attr($att[0], $att[1]);
					}else{
						$node->query($kk)->attr($att[0], $att[1]);
					}
					
				}
				
			}
			
		}
	
		// Adding Custom Attributes
		if(!empty($el['atts']['ele_attributes'])){
					
			$val = explode(';', $el['atts']['ele_attributes']);			
			foreach($val as $value){
				if(strpos($value, '=')){
					$att = explode('=', $value);
					$node->query($el['selector'])->attr($att[0], $att[1]);
				}
			}
			
		}
		
		$div = $node->html();
		//die($div);
	
	}
		
	// Add the CSS if any or remove it
	$style = '';
	if(!empty($el['css'])){
		
		$style = '<style pagelayer-style-id="'.$el['id'].'">';
		foreach($el['css'] as $ck => $cv){
			$tck = explode('|pl|', $ck);
			$csel = !empty($tck[0]) ? $tck[0]: '';
			$cend = !empty($tck[1]) ? $tck[1]: '';
			$style .= $csel.implode(';', $cv).$cend."\n";
		}
		$style .= '</style>';
		$style = pagelayer_parse_vars($style, $el);
	
		if(!empty($pagelayer->shortcodes[$tag]['overide_css_selector'])){
			$overide_css_selector = pagelayer_parse_el_vars($pagelayer->shortcodes[$tag]['overide_css_selector'], $el);
			$style = str_replace($el['selector'], $overide_css_selector, $style);
			$style = str_replace($el['wrap'], $overide_css_selector, $style);
		}
		
		$style = pagelayer_unescapeHTML($style);
	}
	
	$div = str_replace('<style pagelayer-style-id="'.$el['id'].'"></style>', $style, $div);
	
	// Is there an inner content which requires a SHORTCODE ?
	if(!empty($do_shortcode)){
		
		$inner_content = '';
		if( !empty($inner_blocks) ){
			foreach($inner_blocks as $inner_block){
				$inner_content .= render_block($inner_block);
			}
		}else{
			$inner_content .=  do_shortcode($el['content']);
		}
		
		$div = str_replace('{{pagelayer_do_shortcode}}', $inner_content, $div);
	}
	
	// Sanitize the content
	$div = apply_filters( 'pagelayer_sanitize_do_shortcode', $div );
	
	return $div;
	
}

// Change pagelayer id in html
function pagelayer_change_id($content){

	if(pagelayer_is_live()){
	
		preg_match_all('/pagelayer-id="(.*?)"/', $content, $matches);
		$matches = array_unique($matches[1]);
	
		foreach($matches as $val){
			$id = pagelayer_RandomString(16);
			$content = str_replace($val, $id, $content);
		}
	}
	
	return $content;
}

// Creates the shortcode and returns a base64 encoded files
function pagelayer_create_sc(&$el, $is_block = 0){
	
	$a = $tmp = array();
	
	if(!empty($el['oAtts'])){
		
		foreach($el['oAtts'] as $k => $v){
			$v = str_replace('&', '&amp;', $v);
			if($is_block){
				$v = pagelayer_escapeHTML($v);
			}
			$el['attr'][] = 'pagelayer-a-'.$k.'="'.$v.'"';
		}
		
	}
	
	// Tmp atts
	if(!empty($el['tmp'])){
		
		foreach($el['tmp'] as $k => $v){
			$v = str_replace('&', '&amp;', $v);
			if($is_block){
				$v = pagelayer_escapeHTML($v);
			}
			$el['attr'][] = 'pagelayer-tmp-'.$k.'="'.$v.'"';
		}
		
	}
	
	// Add the tag
	$el['attr'][] = 'pagelayer-tag="'.$el['tag'].'"';
	
	// Make it a PageLayer element for editing
	$el['classes'][] = 'pagelayer-ele';
	
}

// Converts {{val}} to val
function pagelayer_var($var){
	return substr($var, 2, -2);
}

// Replace the variables
function pagelayer_parse_el_vars($str, &$el){
	
	global $pagelayer, $post;
	
	// if is 404 then @$post->ID
	if(!empty( $pagelayer->rendering_template_id ) && @$post->ID != $pagelayer->rendering_template_id){
		$is_editable = false;
	}else{
		$is_editable = true;
	}
	
	$str = str_replace('{{element}}', $el['selector'], $str);
	$is_live = pagelayer_is_live();
	if(!empty($is_live) && $is_editable){
		$str = str_replace('{{wrap}}', $el['wrap'], $str);
	}else{
		$str = str_replace('{{wrap}}', $el['selector'], $str);
	}
	$str = str_replace('{{ele_id}}', $el['id'], $str);
	
	return $str;

}

// Parse the variables
function pagelayer_parse_vars($str, &$el){
	
	//pagelayer_print($el);
	if(is_array($el['tmp'])){
		foreach($el['tmp'] as $k => $v){
			$str = str_replace('{{{'.$k.'}}}', $el['tmp'][$k], $str);
		}
	}
	
	if(is_array($el['atts'])){
		foreach($el['atts'] as $k => $v){
			$str = str_replace('{{'.$k.'}}', $el['atts'][$k], $str);
		}
	}
	
	return $str;
}

// Make the rule
function pagelayer_css_render($rule, $val, $sep = ','){
	
	// Seperator
	$sep = empty($sep) ? ',' : $sep;
	
	// Replace the val
	$rule = str_replace('{{val}}', pagelayer_hex8_to_rgba($val), $rule);
	
	// If there is an array
	if(preg_match('/\{val\[\d/is', $rule)){
		$val = explode($sep, $val);
		foreach($val as $k => $v){
			$rule = str_replace('{{val['.$k.']}}', pagelayer_hex8_to_rgba($v), $rule);
		}
	}
	
	return $rule;
	
}

// Post Property Handler
function pagelayer_sc_post_props(&$el){
	
	global $post;
	
	$el['oAtts']['post_title'] = $post->post_title;
	$el['oAtts']['post_name'] = $post->post_name;
	$el['oAtts']['post_excerpt'] = $post->post_excerpt;
	$el['oAtts']['post_status'] = $post->post_status;
	$el['oAtts']['featured_image'] = get_post_thumbnail_id($post);
	
	// Load featured image details
	if(!empty($el['oAtts']['featured_image'])){
		
		$attachment = pagelayer_image($el['oAtts']['featured_image']);

		if(!empty($attachment)){
			foreach($attachment as $k => $v){
				$el['tmp']['featured_image-'.$k] = $v;
			}
		}
	
	}
	
}

// ROW Handler
function pagelayer_sc_row(&$el){
	
	pagelayer_bg_video($el);
	
	if(!empty($el['atts']['row_shape_type_top'])){
		$path_top = PAGELAYER_DIR.'/images/shapes/'.$el['atts']['row_shape_type_top'].'-top.svg';
		$el['atts']['svg_top'] = file_get_contents($path_top);
	}
	
	if(!empty($el['atts']['row_shape_type_bottom'])){
		$path_bottom = PAGELAYER_DIR.'/images/shapes/'.$el['atts']['row_shape_type_bottom'].'-bottom.svg';
		$el['atts']['svg_bottom'] = file_get_contents($path_bottom);
	}
	
	// Row background slider
	if(!empty($el['atts']['bg_slider'])){
		$ids = explode(',', $el['atts']['bg_slider']);
		$urls = [];
		$el['atts']['slider'] = '';
		
		// Make the image URL
		foreach($ids as $k => $v){
			
			$image = pagelayer_image($v);
			$urls['i'.$v] = @$image['url'];
			
			$el['atts']['slider'] .= '<div class="pagelayer-bgimg-slide" style="background-image:url(\''.$image['url'].'\')"></div>';
			
		}
		
		if(!empty($urls)){
			$el['tmp']['bg_slider-urls'] = json_encode($urls);
		}
		
	}
}

// Column Handler
function pagelayer_sc_col(&$el){
	
	// Add the default col class
	$el['classes'][] = 'pagelayer-col';
	
	//return do_shortcode($el['content']);
	
	pagelayer_bg_video($el);
	
	// Column background slider
	if(!empty($el['atts']['bg_slider'])){
		$ids = explode(',', $el['atts']['bg_slider']);
		$urls = [];
		$el['atts']['slider'] = '';
		
		// Make the image URL
		foreach($ids as $k => $v){
			
			$image = pagelayer_image($v);
			$urls['i'.$v] = @$image['url'];
			
			$el['atts']['slider'] .= '<div class="pagelayer-bgimg-slide" style="background-image:url(\''.$image['url'].'\')"></div>';
			
		}
		
		if(!empty($urls)){
			$el['tmp']['bg_slider-urls'] = json_encode($urls);
		}
		
	}
	
}

// Just for BG handling
function pagelayer_bg_video(&$el){
	
	if(empty($el['tmp']['bg_video_src-url'])){
		return false;
	}
	
	// Get the video URL for the iframe
	$iframe_src = pagelayer_video_url($el['tmp']['bg_video_src-url']);
	
	$source = esc_url( $el['tmp']['bg_video_src-url'] );
	$source = str_replace('&amp;', '&', $source);
	$url = parse_url($source);

	$youtubeRegExp = '/youtube\.com|youtu\.be/is';
	$vimeoRegExp = '/vimeo\.com/is';
	
	if(!empty($el['atts']['mute'])){
		$iframe_src .= "?&mute=1";
		$el['atts']['mute'] = " muted ";
	}else{
		$iframe_src .= "?&mute=0";
		$el['atts']['mute'] = "";
	}

	if(empty($el['atts']['stop_loop'])){
		$iframe_src .= "&loop=1";	
		$el['atts']['stop_loop'] = " loop ";
	}else{
		$iframe_src .= "&loop=0";	
		$el['atts']['stop_loop'] = "";
	}
	
	if (!empty($source)) {
		
		if (preg_match($youtubeRegExp, $source)) {
			if (preg_match('/youtube\.com/is', $source)) {

				if (preg_match('/watch/is', $source)) {
					parse_str($url['query'], $parameters);

					if (isset($parameters['v']) && !empty($parameters['v'])) {
					   $videoId = $parameters['v'];
					}

				} else if (preg_match('/embed/is', $url['path'])) {
					$path = explode('/', $url['path']);
					if (isset($path[2]) && !empty($path[2])) {
						$videoId = $path[2];
					}
				}

			} else if (preg_match('/youtu\.be/is', $url['host'])) {
				$path = explode('/', $url['path']);

				if (isset($path[1]) && !empty($path[1])) {
					$videoId = $path[1];
				}

			}
			
			$el['atts']['vid_src'] = '<iframe src="'.$iframe_src.'autoplay=1&controls=0&showinfo=0&rel=0&autohide=1&playlist='.$videoId.'" allowfullscreen="1" webkitallowfullscreen="1" mozallowfullscreen="1" frameborder="0"></iframe>';
			
		} else if (preg_match($vimeoRegExp, $source)) {
			
			$el['atts']['vid_src'] = '<iframe src="'.$iframe_src.'background=1&autoplay=1&byline=0&title=0" allowfullscreen="1" webkitallowfullscreen="1" mozallowfullscreen="1" frameborder="0"></iframe>';
			
		}else{
			
			$el['atts']['vid_src'] = '<video autoplay playsinline '.$el['atts']['mute'].$el['atts']['stop_loop'].'>'.
				'<source src="'.$iframe_src.'" type="video/mp4">'.
			'</video>';
			
		}
	}
}

// Image Handler
function pagelayer_sc_social(&$el){
	if(empty($el['atts']['icon'])) return;
	$icon = explode(' fa-', $el['atts']['icon']);
	$el['classes'][] = ['.pagelayer-icon-holder' => 'pagelayer-'.$icon[1]];
}

// Image Handler
function pagelayer_sc_image(&$el){
	
	// Decide the image URL
	$el['atts']['func_id'] = @$el['tmp']['id-'.$el['atts']['id-size'].'-url'];
	$el['atts']['func_id'] = empty($el['atts']['func_id']) ? @$el['tmp']['id-url'] : $el['atts']['func_id'];
	
	// What is the link ?
	if(!empty($el['atts']['link_type'])){
		
		// Custom url
		if($el['atts']['link_type'] == 'custom_url'){
			$el['atts']['func_link'] = @$el['tmp']['link'];
		}
		
		// Link to the media file itself
		if($el['atts']['link_type'] == 'media_file'){
			$el['atts']['func_link'] = $el['atts']['func_id'];
		}
		
		// Lightbox
		if($el['atts']['link_type'] == 'lightbox'){
			$el['atts']['func_link'] = $el['atts']['func_id'];
		}
		
	}
	
	//pagelayer_print($el);
	
}

// Image Slider Handler
function pagelayer_sc_image_slider(&$el){
	
	if(empty($el['atts']['ids'])){
		$el['atts']['ids'] = '';
	}
	
	$ids = explode(',', $el['atts']['ids']);
	$urls = [];
	$all_urls = [];
	$final_urls = [];
	$ul = [];
	$size = $el['atts']['size'];
	
	// Make the image URL
	foreach($ids as $k => $v){
		
		$image = pagelayer_image($v);
		
		$final_urls[$v] = empty($image[$size.'-url']) ? @$image['url'] : $image[$size.'-url'];
		
		$urls['i'.$v] = @$image['url'];
		
		foreach($image as $kk => $vv){
			$si = strstr($kk, '-url', true);
			if(!empty($si)){
				$all_urls['i'.$v][$si] = $vv;
			}
		}
		
		$li = '<li class="pagelayer-slider-item">';
		
		// Any Link ?
		if(!empty($el['atts']['link_type'])){
			$link = ($el['atts']['link_type'] == 'media_file' ? $final_urls[$v] : @$el['tmp']['link']);
			$li .= '<a href="'.$link.'">';
		}
		
		// The Image
		$li .= '<img class="pagelayer-img" src="'.$final_urls[$v].'">';
		
		if(!empty($el['atts']['link_type'])){
			$li .= '</a>';
		}
		
		$li .= '</li>';
		
		$ul[] = $li;
		
	}
	
	//pagelayer_print($urls);
	//pagelayer_print($final_urls);
	//pagelayer_print($all_urls);
	
	// Make the TMP vars
	if(!empty($urls)){
		$el['tmp']['ids-urls'] = json_encode($urls);
		$el['tmp']['ids-all-urls'] = json_encode($all_urls);
		$el['atts']['ul'] = implode('', $ul);
	
		// Which arrows to show
		if(in_array(@$el['atts']['controls'], ['arrows', 'none'])){
			$el['attr'][] = ['.pagelayer-image-slider-ul' => 'data-pager="false"'];
		}
		
		if(in_array(@$el['atts']['controls'], ['pager', 'none'])){
			$el['attr'][] = ['.pagelayer-image-slider-ul' => 'data-controls="false"'];
		}
	}
	
};

//Grid Gallery Handler
function pagelayer_sc_grid_gallery(&$el){
	
	if(empty($el['atts']['ids'])){
		$el['atts']['ids'] = '';
	}
	
	$ids = explode(',', $el['atts']['ids']);
	$urls = [];
	$all_urls = [];
	$final_urls = [];
	$ul = [];
	$pagin = '<li class="pagelayer-grid-page-item active">1</li>';
	$size = $el['atts']['size'];
	$i = 0;
	$j = 1;
	$img_Page = $el['atts']['images_no'];
	$gallery_rand = 'gallery-id-'.floor((rand() * 100) + 1);
	
	$ul[] = '<ul class="pagelayer-grid-gallery-ul">';
	// Make the image URL
	foreach($ids as $k => $v){
		
		$image = pagelayer_image($v);
		
		$final_urls[$v] = empty($image[$size.'-url']) ? @$image['url'] : $image[$size.'-url'];
		
		$urls['i'.$v] = @$image['url'];
		$links['i'.$v] = @$image['link'];
		$titles['i'.$v] = @$image['title'];
		$captions['i'.$v] = @$image['caption'];
		
		foreach($image as $kk => $vv){
			$si = strstr($kk, '-url', true);
			if(!empty($si)){
				$all_urls['i'.$v][$si] = $vv;
			}
		}
		
		if($img_Page != 0 && ($i % $img_Page) == 0 && $i != 0 ){
			$ul[] = '</ul><ul class="pagelayer-grid-gallery-ul">';
			$j++;
			$pagin .= '<li class="pagelayer-grid-page-item">'.$j.'</li>';
		}
		
		$li = '<li class="pagelayer-gallery-item" >';
		
		if(empty($el['atts']['link_to'])){
			$li .= '<div>';
		}
		
		// Any Link ?
		if(!empty($el['atts']['link_to']) &&  $el['atts']['link_to'] == 'media_file'){
			$link = ($el['atts']['link_to'] == 'media_file' ? $final_urls[$v] : @$el['atts']['link']);
			$li .= '<a href="'.$link.'" class="pagelayer-ele-link">';
		}
		
		// Any Link ?
		if(!empty($el['atts']['link_to']) &&  $el['atts']['link_to'] == 'attachment' ){
			$link = $image['link'];
			$li .= '<a href="'.$link.'" class="pagelayer-ele-link">';
		}
		
		if(!empty($el['atts']['link_to']) && $el['atts']['link_to'] == 'lightbox'){			
			$li .= '<a href="'.$image['url'].'" data-lightbox-gallery="'.$gallery_rand.'" alt="'.$image['alt'].'" class="pagelayer-ele-link" pagelayer-grid-gallery-type="'.$el['atts']['link_to'].'">';
		}
		// The Image
		$li .= '<img class="pagelayer-img" src="'.$final_urls[$v].'" title="'.$image['title'].'" alt="'.$image['alt'].'">';
		
		if(!empty($el['atts']['caption'])){
			$li .= '<span class="pagelayer-grid-gallery-caption">'.$image['caption'].'</span>';
		}
		
		if(!empty($el['atts']['link_to'])){
			$li .= '</a>';
		}
		
		if(empty($el['atts']['link_to'])){
			$li .= '</div>';
		}
		
		$li .= '</li>';
		
		$ul[] = $li;
		$i++;
	}
	
	$ul[] = '</ul>';
	
	$pagiComplete[] = '<div class="pagelayer-grid-gallery-pagination"><ul class="pagelayer-grid-page-ul">'.'<li class="pagelayer-grid-page-item">&laquo;</li>'.$pagin.'<li class="pagelayer-grid-page-item">&raquo;</li>'.'</ul></div>';
	//pagelayer_print($urls);
	//pagelayer_print($final_urls);
	//pagelayer_print($all_urls);
	
	// Make the TMP vars
	if(!empty($urls)){
		$el['tmp']['ids-urls'] = json_encode($urls);
		$el['tmp']['ids-all-urls'] = json_encode($all_urls);
		$el['tmp']['ids-all-links'] = json_encode($links);
		$el['tmp']['ids-all-titles'] = json_encode($titles);
		$el['tmp']['ids-all-captions'] = json_encode($captions);
		$el['atts']['ul'] = implode('', $ul);
		$el['atts']['pagin'] = ($j>1) ? implode('', $pagiComplete) : '';	
		$el['tmp']['gallery-random-id'] = $gallery_rand;
	
	}
}

// Testimonial Handler
function pagelayer_sc_testimonial(&$el){
	
	if(empty($el['atts']['avatar']) || !empty($el['tmp']['avatar-no-image-set'])){
		$el['atts']['avatar'] = '';
	}
	
	$custom_size = empty($el['atts']['custom_size']) ? '' : @$el['tmp']['avatar-'.$el['atts']['custom_size'].'-url'];
	$el['atts']['func_image'] = empty($custom_size) ? @$el['tmp']['avatar-url'] : $custom_size;
	
}

// Video Handler
function pagelayer_sc_video(&$el){
	
	$el['atts']['custom_size'] = empty($el['atts']['custom_size']) ? '' : $el['atts']['custom_size'];
	$el['tmp']['video_overlay_image-url'] = empty($el['tmp']['video_overlay_image-url']) ? '' : $el['tmp']['video_overlay_image-url'];
	$el['atts']['video_overlay_image'] = empty($el['atts']['video_overlay_image']) ? '' : $el['atts']['video_overlay_image'];
	
	$el['atts']['video_overlay_image-url'] = empty($el['tmp']['video_overlay_image-'.$el['atts']['custom_size'].'-url']) ? $el['tmp']['video_overlay_image-url'] : $el['tmp']['video_overlay_image-'.$el['atts']['custom_size'].'-url'];
	$el['atts']['video_overlay_image-url'] = empty($el['atts']['video_overlay_image-url']) ? $el['atts']['video_overlay_image'] : $el['atts']['video_overlay_image-url'];
	
	// Get the video URL for the iframe
	$el['atts']['vid_src'] = pagelayer_video_url($el['tmp']['src-url']);
	
	if(!empty($el['atts']['autoplay'])){
		$el['atts']['vid_src'] .="?&autoplay=1";
	}else{
		$el['atts']['vid_src'] .="?&autoplay=0";
	}

	if(!empty($el['atts']['mute'])){
		$el['atts']['vid_src'] .="&mute=1";
	}else{
		$el['atts']['vid_src'] .="&mute=0";
	}

	if(!empty($el['atts']['loop'])){
		$el['atts']['vid_src'] .="&loop=1";	
	}else{
		$el['atts']['vid_src'] .="&loop=0";
	}

	$el['tmp']['ele_id'] = $el['id'];
	
}


// Shortcodes Handler
function pagelayer_sc_shortcodes(&$el){
	$is_live = pagelayer_is_live();
	if(empty($is_live)){
		$el['tmp']['shortcode'] = pagelayer_the_content($el['atts']['data']);
	}
}

// Shortcodes Handler
function pagelayer_sc_wp_widgets(&$el){
	
	global $wp_registered_sidebars;
	
	$data = '';	
	foreach($wp_registered_sidebars as $v){
		if($el['atts']['sidebar'] == $v['id']){
			ob_start();
			dynamic_sidebar($v['id']);
			$data = ob_get_clean();
		}
	}
	
	$el['tmp']['data'] = $data;
}


// Service Handler
function pagelayer_sc_service(&$el){
	
	if(!empty($el['atts']['service_image'])){		
		$el['atts']['func_image'] = @$el['tmp']['service_image-'.$el['atts']['service_image_size'].'-url'];
		$el['atts']['func_image'] = empty($el['atts']['func_image']) ? @$el['tmp']['service_image-url'] : $el['atts']['func_image'];
	}
}


/*pagelayer_print($atts);
pagelayer_print($content);
die();*/

/////////////////////////////////////
// Miscellaneous Shortcode Functions
/////////////////////////////////////

// The font family list
function pagelayer_font_family(){
	return array(
		'arial' => 'Arial',				
		'terminal' => 'Terminal'
	);
}

// Supported Icons
function pagelayer_icon_class_list(){
	return array();
}
