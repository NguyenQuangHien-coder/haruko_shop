/*
PAGELAYER
http://pagelayer.com/
(c) Pagelayer Team
*/

var pagelayer_doc_width;

// Things to do on document load
jQuery(document).ready(function(){
	
	// Current width
	pagelayer_doc_width = jQuery(document).width();
	
	// Rows
	jQuery('.pagelayer-row-stretch-full').each(function(){
		pagelayer_pl_row_full(jQuery(this));
	});
	
	jQuery('.pagelayer-anim_heading').each(function(){
		pagelayer_anim_heading(jQuery(this));
	});
	
	// Setup any sliders
	jQuery('.pagelayer-image_slider').each(function(){
		pagelayer_pl_image_slider(jQuery(this));
	});
	
	jQuery('.pagelayer-accordion').each(function(){
		pagelayer_pl_accordion(jQuery(this));
	});
	
	jQuery('.pagelayer-collapse').each(function(){
		pagelayer_pl_collapse(jQuery(this));
	});
	
	jQuery('.pagelayer-tabs').each(function(){
		pagelayer_pl_tabs(jQuery(this));
	});
	
	jQuery('.pagelayer-video').each(function(){
		pagelayer_pl_video(jQuery(this));
	});
	
	jQuery('.pagelayer-image').each(function(){
		pagelayer_pl_image(jQuery(this));
	});
	
	jQuery('.pagelayer-grid_gallery').each(function(){
		pagelayer_pl_grid_lightbox(jQuery(this));
	});
	
	jQuery('.pagelayer-row, .pagelayer-inner_row, .pagelayer-col').each(function(){
		pagelayer_pl_row_video(jQuery(this));
	});
	
	jQuery('.pagelayer-parallax-window img').each(function(){
		pagelayer_pl_row_parallax(jQuery(this));
	});
	
	jQuery('.pagelayer-recaptcha').each(function(){
		pagelayer_recaptcha_loader(jQuery(this));
	});
	
	jQuery('.pagelayer-wp_menu').each(function(){
		pagelayer_primary_menu(jQuery(this));
	});
	
	jQuery('.pagelayer-contact').each(function(){
		pagelayer_contact_form(jQuery(this));
	});
	
	jQuery('.pagelayer-countdown').each(function(){
		pagelayer_countdown(jQuery(this));
	});
	
	jQuery('.pagelayer-testimonial_slider').each(function(){
		pagelayer_pl_testimonial_slider(jQuery(this));
	});
	
	jQuery('.pagelayer-social_grp').each(function(){
		pagelayer_pl_social_profile(jQuery(this));
	});	
	
	jQuery('ul.pagelayer-mega-menu').each(function(){
		pagelayer_mega_menu_position(jQuery(this));
	});	

	pagelayer_stars();
  
	// We need to call the is visible thing to show the widgets loading effect
	if(jQuery('.pagelayer-counter-content,.pagelayer-progress-container').length > 0){

		// First Call
		pagelayer_counter();
		pagelayer_progress();
		
		jQuery(window).scroll(function() {
			pagelayer_progress();
			pagelayer_counter();
		});
	}
	
	new WOW({boxClass:'pagelayer-wow'}).init();
	
});

// For automatic row change
jQuery(window).resize(function() {
	
	var new_vw = jQuery(document).width();
	
	if(new_vw == pagelayer_doc_width){
		return false;
	}
	
	pagelayer_doc_width = new_vw;
	
	// Remove style
	jQuery('.pagelayer-row-stretch-full').removeAttr('style');
	
	// Set a timeout to prevent bubbling
	setTimeout(function(){
		
		jQuery('.pagelayer-row-stretch-full').each(function(){
			pagelayer_pl_row_full(jQuery(this));
		});
	
	}, 200);
	
});

// Check if element is visible
function pagelayer_isVisible(ele) {
	
	var offset = jQuery(window).height();
	var viewTop = window.pageYOffset;
	var viewBottom = viewTop + offset - Math.min(ele.height(), ele.innerHeight());
	var top = ele.offset().top;
	var bottom = top + ele.innerHeight();
	
	if(top <= viewBottom && bottom >= viewTop){
		return true;
	}
	
	return false;
}

// Get media mode
function pagelayer_get_media_mode(){
	
	if(window.matchMedia("(min-width: "+ (pagelayer_settings['tablet_breakpoint'] + 1) +"px)").matches){
		return 'desktop';
	}
	
	if(window.matchMedia("(max-width: "+ pagelayer_settings['tablet_breakpoint'] +"px) and (min-width: "+ (pagelayer_settings['mobile_breakpoint'] + 1) +"px)").matches){
		return 'tablet';
	}
	
	if(window.matchMedia("(max-width: "+ pagelayer_settings['mobile_breakpoint'] +"px)").matches){
		return 'mobile';
	}
	
	return 'desktop';
}
	  
// Row background video and parallax
function pagelayer_pl_row_video(jEle){
	
	var vEle = jEle.children('.pagelayer-background-video');
	
	// Not a video in the element
	if(vEle.length < 1){
		return true;
	}
	
	var setup = vEle.attr('pagelayer-setup');
	if(setup && setup.length > 0){
		return true;
	}

	var frame_width = vEle.width();
	var frame_height = (frame_width/100)*56.25;
	var height = vEle.height();
	
	if(frame_height < height){
		
		frame_height = height;
		
	}
	
	vEle.children().css({'width':frame_width+'px','height':frame_height+'px'});
	
	vEle.attr('pagelayer-setup', 1);
		
}

// Row background parallax
function pagelayer_pl_row_parallax(jEle){
	
	//Parallax background
	var setup = jEle.attr('pagelayer-setup');
	if(setup && setup.length > 0){
		return true;
	}
	
	new pagelayerParallax(jEle);
	jEle.attr('pagelayer-setup', 1);
}

// Adjust rows
function pagelayer_pl_row_full(jEle){
	
	// Get current width
	var vw = jQuery('html').width();
	
	// Now give the row the width
	jEle.css({'width': vw, 'max-width': '100vw'});
	
	// Set the offset
	jEle.offset({left: 0});
	
	// Set a timeout as well as some themes can interfere with us
	setTimeout(function(){
		jEle.offset({left: 0});
	}, 500);
	
};

// Modal open
function pagelayer_render_pl_modal(param){
	jQuery(param).parent().parent().find('.pagelayer-modal-content').show();
};

// Modal close
function pagelayer_pl_modal_close(param){
	jQuery(param).parent().hide();
}

// Setup the image slider
function pagelayer_pl_image_slider(jEle){
	
	var ul = jQuery(jEle.find('.pagelayer-image-slider-ul'));
	
	// Build the options
	var options = pagelayer_fetch_dataAttrs(ul, 'data-slides-');
	
	pagelayer_owl_init(jEle, ul, options);

}

function pagelayer_tab_show(el, pl_id) {

	jQuery('[pagelayer-id='+pl_id+']').closest('.pagelayer-tabcontainer').find('.pagelayer-tab').hide();
	jQuery('[pagelayer-id='+pl_id+']').show();
	
	jQuery(el).parent().find('.pagelayer-tablinks').each(function(){
		jQuery(this).removeClass('active');
	});
	
	jQuery(el).addClass("active");
}

var pagelayer_tab_timers = {};

function pagelayer_pl_tabs(jEle) {
	
	var default_active = '';
	var children = jEle.find('.pagelayer-tabcontainer').find('.pagelayer-tab[pagelayer-id]');
	
	// Loop thru
	children.each(function(){
		var tEle = jQuery(this);
		var pl_id = tEle.attr('pagelayer-id');
		var title = tEle.attr('pagelayer-tab-title') || 'Tab';
		var func = "pagelayer_tab_show(this, '"+pl_id+"')";
		
		var icon = '';
		if(tEle.attr('pagelayer-tab-icon')){
			icon = tEle.attr('pagelayer-tab-icon');
		}
		
		// Set the default tab
		if(tEle.attr('pagelayer-default_active')){
			default_active = pl_id;
		}
		
		jEle.find('.pagelayer-tabs-holder').append('<span tab-id="'+pl_id+'" class="pagelayer-tablinks" onclick="'+func+'"> <i class="'+icon+'"></i> <span>'+title+'</span></span>');
	});

	// Set the default tab
	if(default_active.length > 0){
		pagelayer_tab_show(jEle.find('[tab-id='+default_active+']'), default_active);
	// Set the first tab as active
	}else{
		var first_tab = jEle.find('[tab-id]').first();
		pagelayer_tab_show(first_tab, first_tab.attr('tab-id'));
	}

	try{
		clearInterval(pagelayer_tab_timers[jEle.attr('pagelayer-id')])
	}catch(e){};
	
	var rotate = parseInt(jEle.attr('pagelayer-tabs-rotate'));
	
	// Are we to rotate
	if(rotate > 0){
		
		var i= 0;
		pagelayer_tab_timers[jEle.attr('pagelayer-id')] = setInterval(function () {
			
			if(i >= children.length){
				i = 0;
			}
			
			var tmp_pl_ele = jEle.find('.pagelayer-tabcontainer').find('.pagelayer-tab[pagelayer-id]')[i];
			var tmp_btn_ele = jEle.find('.pagelayer-tablinks')[i]
			var tmp_pl_id = jQuery(tmp_pl_ele).attr('pagelayer-id');
			
			jEle.find('.pagelayer-tablinks').each(function(){
				jQuery(this).removeClass('active');
			});
			
			jQuery(tmp_btn_ele).addClass("active");
			pagelayer_tab_show('', tmp_pl_id);
			
			i++;
	   
		}, rotate);
	}
	
}

// Setup the Accordion
function pagelayer_pl_accordion(jEle){
	
	var holder = jEle.find('.pagelayer-accordion-holder');
	var accHolder = jEle.find('.pagelayer-accordion_item');
	var scrolltop = false;
	
	if(accHolder.length < 1){
		return false;
	}
		
	var icon = holder.attr('data-icon');
	var active_icon = holder.attr('data-active_icon');
	
	accHolder.find('.pagelayer-accordion-tabs span i').attr('class', icon);
	var currentActiveTab = jEle.find('.pagelayer-accordion_item.active').first();
	
	// Any URL HASH ?
	var hash = location.hash.slice(1);	
	if(!pagelayer_empty(hash)){
		var scrollTab = jEle.find('#'+hash);
	
		if(!pagelayer_empty(scrollTab) && scrollTab.length > 0){
			currentActiveTab = scrollTab.closest('.pagelayer-accordion_item');
		}
	}
	
	accHolder.find('.pagelayer-accordion-tabs').unbind('click');
	accHolder.find('.pagelayer-accordion-tabs').click(function(){
		
		var currentTab = jQuery(this).closest('.pagelayer-accordion_item');
		
		if(currentTab.hasClass('active')){
			currentTab.removeClass('active').children('.pagelayer-accordion-panel').hide('slow');
			currentTab.find('.pagelayer-accordion-tabs span i').attr('class', icon);
			return true;
		}
		
		accHolder.find('.pagelayer-accordion-tabs span i').attr('class', icon);
		accHolder.removeClass('active').children('.pagelayer-accordion-panel').hide('slow');
			
		currentTab.addClass('active').children('.pagelayer-accordion-panel').show('slow');
		currentTab.find('.pagelayer-accordion-tabs span i').attr('class', active_icon);
		
	});
	
	// If active first tab from all active tabs
	currentActiveTab.removeClass('active');
	currentActiveTab.find('.pagelayer-accordion-tabs').click();
}

// Setup the Collapse
function pagelayer_pl_collapse(jEle){
	
	var holder = jEle.find('.pagelayer-collapse-holder');
	var tabs = jEle.find('.pagelayer-accordion_item');
		
	if(tabs.length < 1){
		return false;
	}
		
	var setup = tabs.attr('pagelayer-setup');
	var icon = holder.attr('data-icon');
	var active_icon = holder.attr('data-active_icon');
	
	// Any URL HASH ?
	var hash = location.hash.slice(1);	
	if(!pagelayer_empty(hash)){
		var scrollTab = jEle.find('#'+hash);
	
		if(!pagelayer_empty(scrollTab) && scrollTab.length > 0){
			scrollTab.closest('.pagelayer-accordion_item').addClass('active');
		}
	}
	
	var activeTabs = jEle.find('.pagelayer-accordion_item.active');

	tabs.find('.pagelayer-accordion-tabs span i').attr('class', icon);
	jQuery(activeTabs).addClass('active').children('.pagelayer-accordion-panel').show('slow');
	jQuery(activeTabs).find('.pagelayer-accordion-tabs span i').attr('class', active_icon);
		
	// Already setup ?
	if(setup && setup.length > 0){
		tabs.find('.pagelayer-accordion-tabs').unbind('click');
	}

	tabs.find('.pagelayer-accordion-tabs').click(function(){
		
		var currentTab = jQuery(this).closest('.pagelayer-accordion_item');
		
		if(currentTab.hasClass('active')){
			currentTab.removeClass('active').children('.pagelayer-accordion-panel').hide('slow');;
			currentTab.find('.pagelayer-accordion-tabs span i').attr('class', icon);
			return true;
		}
			
		currentTab.addClass('active').children('.pagelayer-accordion-panel').show('slow');
		currentTab.find('.pagelayer-accordion-tabs span i').attr('class', active_icon);
		
	});
	
	// Set that we have setup everything
	tabs.attr('pagelayer-setup', 1);
	
}

// Counter
function pagelayer_counter(){
	
	jQuery('.pagelayer-counter-content').each(function(){
		
		var jEle = jQuery(this);
		
		if(pagelayer_isVisible(jEle)){
			
			var setup = jEle.attr('pagelayer-setup');
			
			// Already setup ?
			if(setup && setup.length > 0){
				return true;
			}
			
			var options = {};
			options['duration'] = jEle.children('.pagelayer-counter-display').attr('pagelayer-counter-animation-duration');
			options['delimiter'] = jEle.children('.pagelayer-counter-display').attr('pagelayer-counter-seperator-type');
			options['toValue'] = jEle.children('.pagelayer-counter-display').attr('pagelayer-counter-last-value');					
			jEle.children('.pagelayer-counter-display').numerator( options );
		
			// Set that we have setup everything
			jEle.attr('pagelayer-setup', 1);
			
		}
	});
}

function pagelayer_progress(){
	jQuery('.pagelayer-progress-container').each(function(){
		var jEle = jQuery(this);
		
		if(pagelayer_isVisible(jEle)){
			
			var setup = jEle.attr('pagelayer-setup');
			if(setup && setup.length > 0){
				return true;
			}
			
			var progress_width = jEle.children('.pagelayer-progress-bar').attr('pagelayer-progress-width');
			if(progress_width == undefined){
				progress_width = "1";
			}
			
			var width = 0;
			var interval;
			
			var progress = function(){
				if (width >= progress_width) {
					clearInterval(interval);
				} else {
					width++;
					jEle.children('.pagelayer-progress-bar').css('width', width + '%'); 
					jEle.find('.pagelayer-progress-percent').text(width * 1  + '%');
				}
			}
			interval = setInterval(progress, 30);
			jEle.attr('pagelayer-setup', 1);
			
		}
	});
}

// Dismiss Alert Function
function pagelayer_dismiss_alert(x){
	jQuery(x).parent().parent().fadeOut();
}

// Video light box handler
function pagelayer_pl_video(jEle){
	var videoIframe = jEle.find('.pagelayer-video-iframe');
	// Adding loop, autoplay and mute properties on video before loading 
	videoIframe.on('load', function() {
		
		// Checking of video source if it is youtube or vimeo because 
		// TODO: Need to check, if this is not local file then return
		if(jQuery(this)[0].src.indexOf('youtube.com') != -1 || jQuery(this)[0].src.indexOf('vimeo.com') != -1){
			return;
		}
		
		var vidElm = jQuery(this).contents().find('video');
		var vidSrc = vidElm.children()[0].src;	
		
		if(vidSrc[vidSrc.indexOf('&loop=')+6] == 1){
			vidElm.attr('loop','loop');
		}
		if(vidSrc[vidSrc.indexOf('&autoplay=')+10] == 0){
			vidElm.removeAttr('autoplay');
			vidElm[0].pause();
		}
		if(vidSrc[vidSrc.indexOf('&mute=')+6] == 1){
			vidElm[0].muted = "muted";
		}
	});
	
	// A tag will be there ONLY if the lightbox is on
	var overlayval = jEle.find('.pagelayer-video-overlay');	
	var a = jEle.find(".pagelayer-video-holder a");
	
	// No lightbox
	if(a.length < 1 && pagelayer_empty(overlayval)){
		return;
	}

	a.nivoLightbox({
		effect: "fadeScale",
	});
	
	jEle.find(".pagelayer-video-holder .pagelayer-video-overlay").on("click", function(ev) {

		var target = jQuery(ev.target);

		if (!target.parent("a").length) {
			videoIframe[0].src = videoIframe[0].src.replace("&autoplay=0", "rel=0&autoplay=1");
			jQuery(this).hide();
		}
	});
	
}

// Image light box handler
function pagelayer_pl_image(jEle){
	
	// Drag and Drop function for image
	if (typeof pagelayer_preDAndD_image !== "undefined") {
		pagelayer_preDAndD_image(jEle);
	}
	
	// A tag will be there ONLY if the lightbox is on
	var a = jEle.find("[pagelayer-image-link-type=lightbox]");
	
	// No lightbox
	if(a.length < 1){
		return;
	}
	
	a.nivoLightbox({
		effect: "fadeScale",
	});
}

function pagelayer_stars(){
	jQuery('.pagelayer-stars-container').each(function(){
		var jEle = jQuery(this);
		var setup = jEle.attr('pagelayer-setup');
		if(setup && setup.length > 0){
			return true;
		}
		var count = jEle.attr('pagelayer-stars-count');
		
		if (isNaN(count)) {
			count = '0';
		}
		
		i = 0;
		var stars = "";
		while(i < count){			
			stars +='<div class="pagelayer-stars-icon pagelayer-stars-empty"><i class="fa fa-star" aria-hidden="true"></i></div>';
			i++;
		}

		jEle.empty();
		jEle.append(stars);
		var starsval = jEle.attr('pagelayer-stars-value');
		
		if (isNaN(starsval)) {
			starsval = count;
		}

		starsval = starsval.split('.');		
		var fullstars = starsval[0];
		var value =  starsval[1];
		var halfstar = parseInt(fullstars) + 1;
		var emptystars = parseInt(fullstars) + 2;
		jEle.children('.pagelayer-stars-icon').attr("class","pagelayer-stars-icon");
		jEle.children('.pagelayer-stars-icon:nth-child(-n+'+ fullstars +')').addClass('pagelayer-stars-full'); 
		if(value != undefined){
			jEle.children('.pagelayer-stars-icon:nth-child('+ halfstar +')').addClass('pagelayer-stars-'+value);		
		}else{
			jEle.children('.pagelayer-stars-icon:nth-child('+ halfstar +')').addClass('pagelayer-stars-empty');
		}
		jEle.children('.pagelayer-stars-icon:nth-child(n+'+ emptystars +')').addClass('pagelayer-stars-empty'); 		
		jEle.attr('pagelayer-setup', 1);
	});
}

// Grid Gallery pagination Off On function
function pagelayer_pl_grid_paginate(gridCont, pagination, pageValue, gridValue){
	gridCont.hide();
	pagination.removeClass('active');
	pagination.eq(pageValue).addClass('active');
	gridCont.eq(gridValue).show();
}

//Grid Gallery Lightbox
function pagelayer_pl_grid_lightbox(jEle){
	
	// Grid Gallery pagination settings
	var gridCont = jEle.find('.pagelayer-grid-gallery-container').children();
	var pagination = jEle.find('.pagelayer-grid-gallery-pagination ul').children();
	gridCont.hide();
	gridCont.eq(0).show();
	// Adding event listners to pagination
	jEle.find('.pagelayer-grid-page-item').each(function(){
		jQuery(this).on('click', function(event){
			var text = jQuery(this).text();
			switch(text){
				case '«':
					pagelayer_pl_grid_paginate(gridCont, pagination, 1, 0);
					break;
				case '»':
					pagelayer_pl_grid_paginate(gridCont, pagination, (pagination.length-2), (gridCont.length-1));
					break;
				default:
					pagelayer_pl_grid_paginate(gridCont, pagination, text, text-1);
					break;
			}
		});
	});	

	// A tag will be there ONLY if the lightbox is on
	var a = jEle.find("[pagelayer-grid-gallery-type=lightbox]");
	
	// No lightbox
	if(a.length < 1){
		return;
	}
	
	a.nivoLightbox({
		effect: "fadeScale",
		keyboardNav: true,
		clickImgToClose: false,
		clickOverlayToClose: true,
	});
}

// PHP equivalent empty()
function pagelayer_empty(mixed_var) {

  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, '', '0'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
	if (mixed_var === emptyValues[i]) {
	  return true;
	}
  }

  if (typeof mixed_var === 'object') {
	for (key in mixed_var) {
	  // TODO: should we check for own properties only?
	  //if (mixed_var.hasOwnProperty(key)) {
	  return false;
	  //}
	}
	return true;
  }

  return false;
};

function pagelayer_fetch_dataAttrs(ele, prefix){
	
	var options = {};
	
	jQuery.each(ele.get(0).attributes, function(i, attrib){
		
		//console.log(attrib);
		if(attrib.name.includes(prefix)){
			
			var opt_name = attrib.name.substring(prefix.length);
			
			// Check for any Uppercase attribute
			if(opt_name.includes('-')){
				
				opt_name = opt_name.split('-');
				//console.log(opt_name);
				var opt_arr = [];
				jQuery.each(opt_name, function(key, value) {
					if(key != 0){
						opt_arr.push(value.charAt(0).toUpperCase() + value.slice(1));
					}else{
						opt_arr.push(value);
					}
				});
				//console.log(opt_arr);
				opt_name = opt_arr.join('');
			}
			
			// Make the values correct
			var val = attrib.value;
			if(val == 'true') val = true;
			if(val == 'false') val = false;
			if(jQuery.isNumeric(val)) val = parseInt(val);
			
			options[opt_name] = val;
		}
	});
	
	//console.log(options);
	
	if(options['controls']){
		switch(options['controls']){
			case 'arrows':
				options['nav'] = true;
				options['dots'] = false;
				break;
			case 'pager':
				options['dots'] = true;
				options['nav'] = false;
				break;
			case 'none':
				options['nav'] = false;
				options['dots'] = false;
				break;
		}
	}else{
		options['nav'] = true;
		options['dots'] = true;
	}
	
	if(options['animateIn']){
		switch(options['controls']){
			case 'horizontal':
				options['animateIn'] = 'slideInLeft';
				break;
			case 'vertical':
				options['animateIn'] = 'slideInDown';
				break;
			case 'kenburns':
				options['animateIn'] = 'zoomIn';
				break;
			default:
				options['animateIn'] = options['animateIn'];
		}
	}
	
	if(!options['items']){
		options['items'] = 1;
	}
	options['responsive'] = {
		0:{items: 1},
		500:{items: options['items']}
	}

	options['responsiveRefreshRate'] = 1000;
	
	// If we are in editor don't loop the Owl items
	if (window.location.href.indexOf('pagelayer-live=1') > -1) {
		//console.log('here');
		options['loop'] = false;
	}
	
	return options;
}

function pagelayer_owl_init(jEle, ul, options){
	
	//console.log(options);
	var setup = jEle.attr('pagelayer-setup');

	// Already setup ?
	if(setup && setup.length > 0){
		return true;
	}
	
	var owlCar = ul.pagelayerOwlCarousel(options);
	
	// Refreshing Image slider after first load of page.
	setTimeout(function(){
		owlCar.trigger('refresh.owl.carousel');
	},700);
	
	// Set that we have setup everything
	jEle.attr('pagelayer-setup', 1);
	
}

// recaptcha handler
function pagelayer_recaptcha_loader(jEle, loadScript){
	
	loadScript = loadScript || false;
	
	// Render recaptcha
	var reParam = '';
	
	if(!pagelayer_empty(pagelayer_recaptch_lang)){
		reParam = '&hl='+pagelayer_recaptch_lang;
	}
	
	// Add recaptcha script
	if(pagelayer_empty(window.grecaptcha) && !pagelayer_empty(loadScript)){
		jQuery('body').append('<script src="https://www.google.com/recaptcha/api.js?render=explicit'+reParam+'" async defer></script>');
	}
	
	// Render recaptcha
	var recaptcha_interval = setInterval(function(){
		
		if(!pagelayer_empty(window.grecaptcha)){
			grecaptcha.ready(function() {
				try{			
					var widgetID = grecaptcha.render(jEle.get(0), {'sitekey' : jEle.data("sitekey")});
					jEle.attr('recaptcha-widget-id', widgetID);
				}catch(e){
					console.log("There is some issue in rendering reCaptcha. Please check your recaptcha site-key !");
				}
				
			});
			clearInterval(recaptcha_interval);
		}

	}, 500);
 
}

////////////
// Freemium
////////////

// Contact Form handler - Premium
function pagelayer_contact_form(jEle){
	
	jEle = jQuery(jEle);
	var id = jEle.attr('pagelayer-id');
	
	// Set pagelayer id to input field
	jEle.find('form input[name="cfa-pagelayer-id"]').val(id);
 
}

// Contact Form Submit handler - Premium
function pagelayer_contact_submit(jEle, e){
	e.preventDefault();
	
	// Trigger an action
	jQuery(document).trigger('pagelayer_contact_submit', e, jEle);
	
	//var fdata = jQuery(jEle).closest('form').serialize();
	var redirect = jQuery(jEle).find('input[name="cfa-redirect"]');
	var formData = new FormData( jQuery(jEle)[0] );
	var par = jQuery(jEle).parent();
	
	// Append the nonce
	formData.append('pagelayer_nonce', pagelayer_global_nonce);
	
	// Hide any message
	par.find(".pagelayer-message-box").hide();
	
	// Message pos to use ?
	var msg_pos = 'top';	
	if(par.parent().hasClass('pagelayer-message-box-bottom')){
		msg_pos = 'bottom';
	}
	
	par.find(".pagelayer-message-box").removeClass('pagelayer-cf-msg-err pagelayer-cf-msg-suc');
	
	jQuery.ajax({
		url: pagelayer_ajaxurl+'action=pagelayer_contact_submit',
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		cache:false,
		success:function(result){
			var json = jQuery.parseJSON(result);
			
			if('success' in json){
				par.find(".pagelayer-message-"+msg_pos).addClass('pagelayer-cf-msg-suc').html(json['success']).fadeIn();
				
				if(redirect.length > 0 && !pagelayer_empty(redirect.val())){
					window.location.href = redirect.val();
				}
			}else{
				par.find(".pagelayer-message-"+msg_pos).addClass('pagelayer-cf-msg-err').html(json['failed']).fadeIn();
			}
		},
		error:function(result){
			par.find(".pagelayer-message-"+msg_pos).addClass('pagelayer-cf-msg-err').html(json['failed']).fadeIn();
		}
	});
	jEle.reset();
	
	jQuery(jEle).find('.pagelayer-recaptcha').each(function(){
		var widgetID = jQuery(this).attr('recaptcha-widget-id');
		
		if(!pagelayer_empty(window.grecaptcha)){
			grecaptcha.reset(widgetID);
		}
	});
	
	return false;
}

// Primary Menu Handler - Premium
function pagelayer_primary_menu(jEle){
	
	var container = jEle.find('.pagelayer-wp-menu-container');
	var menu_bar = jEle.find('.pagelayer-primary-menu-bar').find('i.fa');
	var menu_holder = jEle.find('.pagelayer-wp-menu-holder');
	var layout = menu_holder.data('layout');
	var submenu_ind = menu_holder.data('submenu_ind');
	var responsive = menu_holder.data('responsive');
	var drop_breakpoint = menu_holder.data('drop_breakpoint');
	var close = jEle.find('.pagelayer-wp_menu-close');
	
	var media_mode =  pagelayer_get_media_mode();
	
	if( (drop_breakpoint == 'tablet' && (media_mode == 'tablet' || media_mode == 'mobile')) || (drop_breakpoint == 'mobile' && media_mode == 'mobile') ){
		
		menu_holder.addClass('pagelayer-wp-menu-dropdown');
		container.addClass('pagelayer-menu-type-dropdown');
		container.removeClass('pagelayer-menu-type-'+layout);
		layout = 'dropdown';
		
	}else{
		menu_holder.removeClass('pagelayer-wp-menu-dropdown');
		container.removeClass('pagelayer-menu-type-dropdown');
		container.addClass('pagelayer-menu-type-'+layout);
	}
	
	// Menu toggle
	jQuery(menu_bar).unbind('click');
	jQuery(menu_bar).click(function(){
		jQuery(container).toggleClass('pagelayer-togglt-on');
		if(jQuery(container).hasClass('pagelayer-togglt-on')){
			jQuery(this).removeClass('fa-bars');
			jQuery(this).addClass('fa-times');
		}else{
			jQuery(this).addClass('fa-bars');
			jQuery(this).removeClass('fa-times');
		}
	});
	
	// If has sub-menu the as icon
	var aEle_sub_menu = jQuery(container).find('.pagelayer-wp_menu-ul li ul.sub-menu').parent().children('a');
	
	if(aEle_sub_menu.children('.after-icon').length < 1){
		aEle_sub_menu.append('<span class="after-icon fa fa-'+submenu_ind+'"></span>');
	}
	
	// Toggle Sub nav
	var after_icon = jQuery(container).find('.pagelayer-wp_menu-ul li.menu-item-has-children .after-icon');
	
	after_icon.unbind('click');
	after_icon.click(function(e){
		e.preventDefault();
		if(window.matchMedia("(max-width: "+pagelayer_settings['tablet_breakpoint']+"px)").matches || layout != 'horizontal'){
			jQuery(this).closest('li').toggleClass('active-sub-menu');
		}else{
			jQuery(this).closest('li').removeClass('active-sub-menu');
		}
	});
	
	close.unbind('click');
	close.click(function(){
		jQuery(container).toggleClass('pagelayer-togglt-on');
		jQuery(menu_bar).removeClass('fa-times');
		jQuery(menu_bar).addClass('fa-bars');
	})
	
}

var count_int ={};
// Show countdown render
function pagelayer_countdown(jEle){
	
	var expiry_date = jEle.find('.pagelayer-countdown-container').attr('pagelayer-expiry-date');
	var timetype = jEle.find('.pagelayer-countdown-container').attr('pagelayer-time-type');
	var jEle_id = jEle.attr('pagelayer-id');
	
	if(pagelayer_empty(expiry_date) || expiry_date == "{{date}}"){
		var expiry_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	}
	
	var now;
	if(timetype == "server"){
		now = new Date(pagelayer_server_time*1000).getTime();
	}else{
		now = new Date().getTime();
	}

	var countDownDate = new Date(expiry_date).getTime();
	var distance = countDownDate - now;

	clearInterval(count_int[jEle_id]);
	count_int[jEle_id] = setInterval(function() {
		
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		jEle.find('.pagelayer-days-count').html(days);
		jEle.find('.pagelayer-hours-count').html(hours);
		jEle.find('.pagelayer-minutes-count').html(minutes);
		jEle.find('.pagelayer-seconds-count').html(seconds);
		
		// If the count down is over, write some text 
		if(distance < 0) {
			clearInterval(count_int[jEle_id]);
			jEle.find('.pagelayer-countdown-expired').show();
			jEle.find('.pagelayer-countdown-counter').hide();
		}
		
		distance = distance - 1000;
		
	}, 1000);
}

function pagelayer_pl_testimonial_slider(jEle){
	var ul = jQuery(jEle.find('.pagelayer-testimonials-holder'));
	
	// Build the options
	var options = pagelayer_fetch_dataAttrs(ul, 'data-slides-');
	
	pagelayer_owl_init(jEle, ul, options);
}

function pagelayer_anim_heading(jEle){
	var animationDelay = 2500,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 50,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect 
		revealDuration = 600,
		revealAnimationDelay = 1500;
	
	initHeadline();	

	function initHeadline(){
		//insert <i> element for each letter of a changing word
		singleLetters(jEle.find('.pagelayer-aheading-holder.letters').find('span'));
		//initialise headline animation
		animateHeadline(jEle.find('.pagelayer-aheading-holder'));
	}

	function singleLetters($words){
		$words.each(function(){
			var word = jQuery(this),
				letters = word.text().split(''),
				selected = word.hasClass('pagelayer-is-visible');
			for (i in letters) {
				if(word.parents('.pagelayer-aheading-rotate2').length > 0) letters[i] = '<b>' + letters[i] + '</b>';
				letters[i] = (selected) ? '<strong class="pagelayer-aheading-in">' + letters[i] + '</strong>': '<strong>' + letters[i] + '</strong>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines){
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = jQuery(this);
			
			if(headline.hasClass('pagelayer-aheading-loading-bar')){
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.pagelayer-words-wrapper').addClass('pagelayer-is-loading') }, barWaiting);
			}else if(headline.hasClass('pagelayer-aheading-clip')){
				var spanWrapper = headline.find('.pagelayer-words-wrapper'),
					newWidth = spanWrapper.width() + 10;
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type') ){
				var words = headline.find('.pagelayer-words-wrapper span'),
					width = 0;
				words.each(function(){
					var wordWidth = jQuery(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				headline.find('.pagelayer-words-wrapper').css('width', width);
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.pagelayer-is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word){
		var nextWord = takeNext($word);
		
		if($word.parents('.pagelayer-aheading-holder').hasClass('letters')){
			var bool = ($word.children('strong').length >= nextWord.children('strong').length) ? true : false;
			hideLetter($word.find('strong').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('strong').eq(0), nextWord, bool, lettersDelay);

		}else if($word.parents('.pagelayer-aheading-holder').hasClass('pagelayer-aheading-clip')){
			$word.parents('.pagelayer-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		}else if($word.parents('.pagelayer-aheading-holder').hasClass('pagelayer-aheading-loading-bar')){
			$word.parents('.pagelayer-words-wrapper').removeClass('pagelayer-is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.pagelayer-words-wrapper').addClass('pagelayer-is-loading') }, barWaiting);

		}else{
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration){
		if($word.parents('.pagelayer-aheading-holder').hasClass('pagelayer-aheading-clip')){
			$word.parents('.pagelayer-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
				setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration){
		$letter.removeClass('pagelayer-aheading-in').addClass('pagelayer-aheading-out');
		
		if(!$letter.is(':last-child')){
		 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
		}else if($bool){ 
		 	setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
		}

		if($letter.is(':last-child') && jQuery('html').hasClass('pagelayer-no-csstransitions')){
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		} 
	}

	function showLetter($letter, $word, $bool, $duration){
		$letter.addClass('pagelayer-aheading-in').removeClass('pagelayer-aheading-out');
		
		if(!$letter.is(':last-child')){ 
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
		}else{
			if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
		}
	}

	function takeNext($word){
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function switchWord($oldWord, $newWord){
		$oldWord.removeClass('pagelayer-is-visible').addClass('pagelayer-is-hidden');
		if(!$newWord.hasClass('pagelayer-is-visible')){
  		$newWord.removeClass('pagelayer-is-hidden').addClass('pagelayer-is-visible');
    }  
	}
}

function pagelayer_pl_row_slider(jEle){
	var index = 0;
 
	var imageEls = jEle.find('.pagelayer-bgimg-slide'); // Get the images to be cycled.
	var speed = jEle.data('speed'); // Get the speed of loop.
	imageEls.first().addClass('pagelayer-slide-show');
	setInterval(function (){
		// Get the next index.  If at end, restart to the beginning.
		index = index + 1 < imageEls.length ? index + 1 : 0;
		
		// Show the next
		imageEls.eq(index).addClass('pagelayer-slide-show');
		
		// Hide the previous
		imageEls.eq(index - 1).removeClass('pagelayer-slide-show');
	}, speed);
}

function pagelayer_pl_social_profile(jEle){
	var icon_holder = jEle.find('.pagelayer-icon-holder');
	
	// Assigning animation classes to icon holder
	if(!pagelayer_empty(jEle.attr('pagelayer-animation'))){
		icon_holder.addClass('pagelayer-animation-'+jEle.attr('pagelayer-animation'));
	}
}

// Mega menu function which applies id and adjust position
function pagelayer_mega_menu_position(mEle){
	
	var jEle = mEle.find('.pagelayer-mega_menu');
	var id = jEle.attr('pagelayer-id');	
	
	mEle.attr('pagelayer-mega-menu-id', id);
	
	colWidth = mEle.parents('.pagelayer-col').first();
	mEle.offset({'left':(colWidth.offset().left - mEle.parent().offset().left)});
}

////////////////
// Freemium End
////////////////