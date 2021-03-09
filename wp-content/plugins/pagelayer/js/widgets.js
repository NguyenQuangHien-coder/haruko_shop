
pagelayer_svg_cache = {};
var pagelayer_document_width;

// For automatic row parent change
jQuery(window).resize(function(){
		
	var new_vw = jQuery(document).width();
	
	if(new_vw == pagelayer_document_width){
		return false;
	}
	
	pagelayer_document_width = new_vw;
	
	// Set a timeout to prevent bubbling
	setTimeout(function(){

		jQuery(pagelayer_editable+' .pagelayer-row-stretch-full').each(function(){
			var par = jQuery(this).parent();
			pagelayer_pl_row_parent_full(par);
		});
	
	}, 200);
	
});

// Render for row
function pagelayer_render_pl_row(el){
	
	var img_urls = !pagelayer_empty(el.tmp['bg_slider-urls']) ? JSON.parse(el.tmp['bg_slider-urls']) : [];
	el.atts['slider'] = '';
	if(!pagelayer_empty(img_urls)){
		for(var x in img_urls){
			el.atts['slider'] += '<div class="pagelayer-bgimg-slide" style="background-image:url('+img_urls[x]+')"></div>'; 
		}
	}
	
	pagelayer_bg_video(el);	
}

// Render for inner row
function pagelayer_render_pl_inner_row(el){
	pagelayer_render_pl_row(el);
}

// Render for col
function pagelayer_render_pl_col(el){
	
	var img_urls = !pagelayer_empty(el.tmp['bg_slider-urls']) ? JSON.parse(el.tmp['bg_slider-urls']) : [];
	el.atts['slider'] = '';
	if(!pagelayer_empty(img_urls)){
		for(var x in img_urls){
			el.atts['slider'] += '<div class="pagelayer-bgimg-slide" style="background-image:url('+img_urls[x]+')"></div>'; 
		}
	}
	
	// We need the parent of type pagelayer-wrap-col
	var par = el.$.parent('.pagelayer-wrap-col');
	
	// Apply to wrapper
	if(!pagelayer_empty(el.atts['col'])){
		
		for(var x=1; x<=12; x++){
			if(par.hasClass('pagelayer-col-'+x)){
				par.removeClass('pagelayer-col-'+x);
				break;
			}
		}

		par.addClass('pagelayer-col-'+el.atts['col']);
		par.css('width', '');
	}
	
	if(el.atts['col_width']){
		par.css('width', '');
	}
	
	pagelayer_bg_video(el);
}	
	
function pagelayer_bg_video(el){

	var youtubeRegExp = /youtube\.com|youtu\.be/;
	var vimeoRegExp = /vimeo\.com/;
	
	el.tmp['bg_video_src-url'] = el.tmp['bg_video_src-url'] || el.atts['bg_video_src'];
	
	var src = el.tmp['bg_video_src-url'];
	
	var iframe_src = pagelayer_video_url(el.tmp['bg_video_src-url']);
  // Adding mute and loop option in row or col	
	if(el.atts['mute'] == "true"){
		iframe_src +="?&mute=1";
		el.atts['mute'] = " muted ";
	}else{
		iframe_src +="?&mute=0";
		el.atts['mute'] = "";
	}

	if(el.atts['stop_loop'] != "true"){
		iframe_src +="&loop=1";	
		el.atts['stop_loop'] = " loop ";
	}else{
		iframe_src +="&loop=0";	
		el.atts['stop_loop'] ="";
	}
  
	if (youtubeRegExp.exec(src)) {
		
		var youtubeRegExp1 = /youtube\.com/;
		var youtubewatch = /watch/;
		var youtubeembed = /embed/;
		var youtube = /youtu\.be/;
		var videoId;
		
		if (youtubeRegExp1.exec(src)) {
			
			if (youtubewatch.exec(src)) {
				 videoId = src.split('?v=');
									
			} else if (youtubewatch.exec(src)) {
				videoId = src.split('embed/');
			}
			
		} else if (youtube.exec(src)) {
			videoId = src.split('.be/');
		}
		//console.log(frame_height);
		el.atts['vid_src'] = '<iframe src="'+iframe_src+'autoplay=1&controls=0&showinfo=0&rel=0&autohide=1&playlist='+videoId[1]+'" allowfullscreen="1" webkitallowfullscreen="1" mozallowfullscreen="1" frameborder="0"></iframe>';
		
	} else if (vimeoRegExp.exec(src)) {
		
		el.atts['vid_src'] = '<iframe src="'+iframe_src+'background=1&autoplay=1&byline=0&title=0" allowfullscreen="1" webkitallowfullscreen="1" mozallowfullscreen="1" frameborder="0"></iframe>';
		
	}else{
		
		el.atts['vid_src'] = '<video autoplay playsinline '+el.atts['mute']+el.atts['stop_loop']+'>'+
				'<source src="'+iframe_src+'" type="video/mp4">'+
			'</video>';
			
	}
	
}

// Load the full width row
function pagelayer_render_end_pl_row(el){
		
	// The parent
	var par = el.$.parent();
	
	// Any class with full width
	if(el.$.hasClass('pagelayer-row-stretch-full')){
		
		// Give it the full width
		pagelayer_pl_row_full(el.$);
		
		// Give full width to the parent
		pagelayer_pl_row_parent_full(par);
		
		// Also add that we had a full width
		el.$.addClass('pagelayer-row-stretch-had-full');
	
	// Did this row have full width ?
	}else if(el.$.hasClass('pagelayer-row-stretch-had-full')){
		
		// Remove style
		el.$.removeAttr('style');
		par.removeAttr('style');
		par.children('.pagelayer-ele-overlay').removeAttr('style');
		
		// Remove HAD class
		el.$.removeClass('pagelayer-row-stretch-had-full');
		
	}
	
	pagelayer_pl_row_video(el.$);
	
	el.$.find('.pagelayer-parallax-window img').each(function(){
		pagelayer_pl_row_parallax(jQuery(this));
	});
	
	el.$.find('.pagelayer-bgimg-slider').each(function(){
		pagelayer_pl_row_slider(jQuery(this));
	});
	
	// Row shape
	if('row_shape_type_top' in el.atts){
		pagelayer_render_row_shape(el, 'top')
	}
	
	if('row_shape_type_bottom' in el.atts){
		pagelayer_render_row_shape(el, 'bottom')
	}
}

// Render for inner row
function pagelayer_render_end_pl_inner_row(el){
	pagelayer_render_end_pl_row(el);
}

// Set Row parent width
function pagelayer_pl_row_parent_full(par){
	var vw = jQuery('html').width();
	par.css({'width': vw,'max-width': '100vw'});
	par.offset({left: 0});
	par.children('.pagelayer-row').css({left: 0});
}

// Row shape render
function pagelayer_render_row_shape(el, shape_pos){
		
	var name = el.atts['row_shape_type_'+shape_pos]+'-'+shape_pos+'.svg';

	// DO we have in cache
	if(!(name in pagelayer_svg_cache)){
		// Make url and fetch
		var url = pagelayer_url+'/images/shapes/'+name;
		jQuery.get(url, function(data){
			el.$.find('.pagelayer-svg-'+shape_pos).html(data);
			pagelayer_svg_cache[name] = data;
		}, 'html');
	
	// Fill with cache
	}else{
		el.$.find('.pagelayer-svg-'+shape_pos).html(pagelayer_svg_cache[name]);
	}

}

// Load the col
function pagelayer_render_end_pl_col(el){
	
	pagelayer_pl_row_video(el.$);
	
	el.$.find('.pagelayer-parallax-window img').each(function(){
		pagelayer_pl_row_parallax(jQuery(this));
	});
	
	el.$.find('.pagelayer-bgimg-slider').each(function(){
		pagelayer_pl_row_slider(jQuery(this));
	});
	
}

// Render the image object
function pagelayer_render_pl_image(el){
	
	// Decide the image URL
	el.atts['func_id'] = el.tmp['id-'+el.atts['id-size']+'-url'] || el.tmp['id-url'];
	el.atts['func_id'] = el.atts['func_id'] || el.atts['id'];
	
	// What is the link ?
	if('link_type' in el.atts){
		
		// Custom url
		if(el.atts['link_type'] == 'custom_url'){
			el.atts['func_link'] = el.tmp['link'] || '';
		}
		
		// Link to the media file itself
		if(el.atts['link_type'] == 'media_file'){
			el.atts['func_link'] = el.tmp['id-url'] || el.atts['id'];
		}
		
		// Lightbox
		if(el.atts['link_type'] == 'lightbox'){
			el.atts['func_link'] = el.tmp['id-url'] || el.atts['id'];
		}
	}
}

// Incase if there is a lightbox
function pagelayer_render_end_pl_image(el){
	pagelayer_pl_image(el.$);
}

// Pre DragAndDrop function 
function pagelayer_preDAndD_image(jEle){
	
	dropzoneParent = jEle.find('.pagelayer-img').parent();
	
	// Check if drop zone is already there then return
	if(dropzoneParent.find('.pagelayer-image-drop-zone').length > 0){
		return;
	}
	
	var dropDiv = '<div class="pagelayer-image-drop-zone">'+
					'<div>'+
						'<i class="fa fa-upload"></i>'+
						'<h4>'+pagelayer_l('drop_file')+'</h4>'+
						'<div class="pagelayer-img-up-progress">'+
							'<div class="pagelayer-img-up-bar"></div>'+
						'</div>'+
					'</div>'+
				   '</div>';
				   
	dropzoneParent.prepend(dropDiv);		
	
	dropZone = dropzoneParent.find('.pagelayer-image-drop-zone');
	
	// Inserting values in image drag and drop function
	pagelayer_img_dragAndDrop(dropzoneParent, dropZone, jEle, '');	
	
}

// Render for video
function pagelayer_render_pl_video(el){
	el.atts['video_overlay_image-url'] = el.tmp['video_overlay_image-'+el.atts['custom_size']+'-url'] || el.tmp['video_overlay_image-url'];
	el.atts['video_overlay_image-url'] = el.atts['video_overlay_image-url'] || el.atts['video_overlay_image'];	
	el.tmp['src-url'] = el.tmp['src-url'] || el.atts['src'];
	el.tmp['ele_id'] = el['id'];
	el.atts['vid_src'] = pagelayer_video_url(el.tmp['src-url']);	

	if(el.atts['autoplay'] == "true"){
		el.atts['vid_src'] +="?&autoplay=1";
	}else{
		el.atts['vid_src'] +="?&autoplay=0";
	}

	if(el.atts['mute'] == "true"){
		el.atts['vid_src'] +="&mute=1";
	}else{
		el.atts['vid_src'] +="&mute=0";
	}

	if(el.atts['loop'] == "true"){
		el.atts['vid_src'] +="&loop=1";	
	}else{
		el.atts['vid_src'] +="&loop=0";
	}	
}

// Incase if there is a lightbox
function pagelayer_render_end_pl_video(el){
	pagelayer_pl_video(el.$);
}

// Render the testimonial
function pagelayer_render_pl_testimonial(el){
	
	if(!pagelayer_empty(el.tmp['avatar-no-image-set'])){
		el.atts['avatar'] = '';
		return;
	}
	
	//console.log(el);
	
	// Decide the image URL
	el.atts['func_image'] = el.tmp['avatar-'+el.atts['custom_size']+'-url'] || el.tmp['avatar-url'];
	el.atts['func_image'] = el.atts['func_image'] || el.atts['avatar'];
	
}

// Render the stars
function pagelayer_render_end_pl_stars(el){
	pagelayer_stars();
};
 

// Render the service box
function pagelayer_render_pl_service(el){
	
	// Decide the image URL
	el.atts['func_image'] = el.tmp['service_image-'+el.atts['service_image_size']+'-url'] || el.tmp['service_image-url'];
	el.atts['func_image'] = el.atts['func_image'] || el.atts['service_image'];
	
}

function pagelayer_render_end_pl_service(el){
	// Drag and Drop function for image
	if (typeof pagelayer_preDAndD_image !== "undefined") { 
    	pagelayer_preDAndD_image(el.$);
	}
}

function pagelayer_social(jEle,sel){
	var holder = jEle.find(sel);
	var icon = holder.data('icon');
	//alert(icon);
	var icon_splited = icon.split(' fa-');
	//console.log(icon_splited);
	holder.addClass('pagelayer-'+icon_splited[1]);
	
}

function pagelayer_social_icon_onchange(jEle, row, val){
	
	var url = '';
	
	// Lets get the value of the nearest social icon
	for(var k in pagelayer_social_urls){
		var patt = new RegExp(k, 'i');
		if(patt.test(val)){
			url = pagelayer_social_urls[k];
		}
	}
	
	if(url.length > 0){
		var social_url_row = row.parent().find('[pagelayer-elp-name="social_url"]');
		//console.log(social_url_row);
		social_url_row.find('.pagelayer-elp-link').val(url).trigger('change');
	}
}

// Render the social icon
function pagelayer_render_end_pl_social(el){
	pagelayer_social(el.$, '.pagelayer-icon-holder');
}

// Render the social profile group
function pagelayer_render_end_pl_social_grp(el){
	
	// Removing extra animation classes
	el.$.find('.pagelayer-icon-holder').removeClass (function (index, className) {
		return (className.match (/(^|\s)pagelayer-animation-\S+/g) || []).join(' ');
	});
	
	pagelayer_pl_social_profile(el.$);
}

// Render the counter
function pagelayer_render_end_pl_counter(el){
	pagelayer_counter();
};

// Render the progress
function pagelayer_render_end_pl_progress(el){
	pagelayer_progress();
};
 
// Render the image slider
function pagelayer_render_pl_image_slider(el){
	
	// The URLs
	var img_urls = !pagelayer_empty(el.tmp['ids-urls']) ? JSON.parse(el.tmp['ids-urls']) : [];
	var all_urls = !pagelayer_empty(el.tmp['ids-all-urls']) ? JSON.parse(el.tmp['ids-all-urls']) : [];
	//console.log(img_urls);
		
	var ul = '';
	var is_link = 'link_type' in el.atts && !pagelayer_empty(el.atts['link_type']) ? true : false;
	
	// Create figure HTML
	for (var x in img_urls){
		
		// Use the default URL first
		var url = img_urls[x];
		
		// But if we have a custom size, use that
		if(el.atts['size'] != 'custom' && x in all_urls && el.atts['size'] in all_urls[x]){
			url = all_urls[x][el.atts['size']];
		}
		
		ul += '<li class="pagelayer-slider-item">';
		
		if(is_link){
			var link = (el.atts['link_type'] == 'media_file' ? url : (el.tmp['link'] || ''))
			ul += '<a href="'+link+'">';
		}
		
		ul += '<img class="pagelayer-img" src="'+url+'">';
		
		if(is_link){
			ul += '</a>';
		}
		
		ul += '</li>';
	}
	
	if(pagelayer_empty(ul)){
		ul = '<h4 style="text-align:center;">'+ pagelayer_l('Please select Images from left side Widget properties.')+'</h4>';
	}
	
	el.atts['ul'] = ul;
	
	// Which arrows to show
	if('controls' in el.atts && (el.atts['controls'] == 'arrows' || el.atts['controls'] == 'none')){
		el.CSS.attr.push({'sel': '.pagelayer-image-slider-ul', 'val': 'data-pager="false"'});
	}
	
	if('controls' in el.atts && (el.atts['controls'] == 'pager' || el.atts['controls'] == 'none')){
		el.CSS.attr.push({'sel': '.pagelayer-image-slider-ul', 'val': 'data-controls="false"'});
	}
	
};

// Render the image slider
function pagelayer_render_end_pl_image_slider(el){
	pagelayer_owl_destroy(el.$, '.pagelayer-image-slider-ul');
	pagelayer_pl_image_slider(el.$);
};


// Render the grid gallery
function pagelayer_render_pl_grid_gallery(el){
	// The URLs
	var img_urls = !pagelayer_empty(el.tmp['ids-urls']) ? JSON.parse(el.tmp['ids-urls']) : [];
	var all_urls = !pagelayer_empty(el.tmp['ids-all-urls']) ? JSON.parse(el.tmp['ids-all-urls']) : [];
	var img_title = !pagelayer_empty(el.tmp['ids-all-titles']) ? JSON.parse(el.tmp['ids-all-titles']) : [];
	var img_links = !pagelayer_empty(el.tmp['ids-all-links']) ? JSON.parse(el.tmp['ids-all-links']) : [];
	var img_captions = !pagelayer_empty(el.tmp['ids-all-captions']) ? JSON.parse(el.tmp['ids-all-captions']) : [];
	//console.log(img_urls);
		
	var ul = '';
	var	pagin = '<li class="pagelayer-grid-page-item active">1</li>';
	var is_link = 'link_to' in el.atts && !pagelayer_empty(el.atts['link_to']) ? true : false;
	
	var i = 0;
	var j = 1;
	if(pagelayer_empty(el.tmp)){
		ul = '<h4 style="text-align:center;">'+ pagelayer_l('select_images')+'</h4>';
		el.atts['ul'] = ul;
		el.atts['pagin'] = '';
		return;
	}
  
	ul += '<ul class="pagelayer-grid-gallery-ul">';
	var gallery_rand = 'gallery-id-'+Math.floor((Math.random() * 100) + 1);
	var imgInPage = el.atts['images_no'];
	
	// Create figure HTML
	for (var x in img_urls){
		
		if(imgInPage != 0 && (i % imgInPage) == 0 && i != 0){
			ul += '</ul><ul class="pagelayer-grid-gallery-ul">';
			j++;
			pagin += '<li class="pagelayer-grid-page-item">'+j+'</li>';			
		}
		
		// Use the default URL first
		var url = img_urls[x];
		
		// But if we have a custom size, use that
		if(el.atts['size'] != 'custom' && x in all_urls && el.atts['size'] in all_urls[x]){
			url = all_urls[x][el.atts['size']];
		}

		
		ul += '<li class="pagelayer-gallery-item" >';
		
		if(!is_link){
			ul += '<div>';
		}
		
		if(is_link && el.atts['link_to'] == 'media_file'){
			var link = (el.atts['link_to'] == 'media_file' ? url : (el.atts['link'] || ''));
			ul += '<a href="'+link+'" class="pagelayer-ele-link">';
		}
		
		if(is_link && el.atts['link_to'] == 'attachment'){
			var link = img_links[x];
			ul += '<a href="'+link+'" class="pagelayer-ele-link">';
		}
		
		if(is_link && el.atts['link_to'] == 'lightbox'){			
			ul += '<a href="'+img_urls[x]+'" class="pagelayer-ele-link" data-lightbox-gallery="'+gallery_rand+'" alt="'+img_title[x]+'" pagelayer-grid-gallery-type="'+el.atts['link_to']+'">';
		}
		
		ul += '<img class="pagelayer-img" src="'+url+'" title="'+img_title[x]+'" alt="'+img_title[x]+'">';
		
		if(el.atts['caption'] == 'true'){
			ul += '<span class="pagelayer-grid-gallery-caption">'+img_captions[x]+'</span>';
		}
		
		if(is_link){
			ul += '</a>';
		}
		
		if(!is_link){
			ul += '</div>';
		}
		
		ul += '</li>';
		i++;
	}
	ul += '</ul>';
	
	el.atts['pagin'] = (j > 1) ? '<div class="pagelayer-grid-gallery-pagination"><ul class="pagelayer-grid-page-ul">'+'<li class="pagelayer-grid-page-item">&laquo;</li>'+
						pagin+
						'<li class="pagelayer-grid-page-item">&raquo;</li>'+'</ul></div>' : '';
	
	el.tmp['gallery-random-id'] = gallery_rand;
	
	el.atts['ul'] = ul;

}

function pagelayer_render_end_pl_grid_gallery(el){
	pagelayer_pl_grid_lightbox(el.$);
}

// Render for tabs
function pagelayer_render_html_pl_tabs(el){
	el.CSS.attr.push({'sel': '{{element}}', 'val': 'pagelayer-tabs-rotate="'+el.atts["rotate"]+'"'});
};

// Render the accordion item
function pagelayer_render_end_pl_tabs(el){
	pagelayer_pl_tabs(el.$);
}

// Render the accordion item
function pagelayer_render_end_pl_accordion(el){
	pagelayer_pl_accordion(el.$);
};

// Render the collapse item
function pagelayer_render_end_pl_collapse(el){
	pagelayer_pl_collapse(el.$);	
};

// Shortcode Handler
var pagelayer_shortcodes_timer;
function pagelayer_render_pl_shortcodes(el){
			
	// Clear any previous timeout
	clearTimeout(pagelayer_shortcodes_timer);
	
	// Set a timer for constant change
	pagelayer_shortcodes_timer = setTimeout(function(){
		
		// Make the call
		jQuery.ajax({
			url: pagelayer_ajax_url+'&action=pagelayer_do_shortcodes',
			type: 'POST',
			data: {
				pagelayer_nonce: pagelayer_ajax_nonce,
				shortcode_data: el.atts['data']
			},
			success:function(data) {
				el.$.find('.pagelayer-shortcodes-container').html(data);
			}
		});
	
	}, 500);
	
};

// Render the widget area i.e. Sidebars
function pagelayer_render_pl_wp_widgets(el){
			
	// Clear any previous timeout
	clearTimeout(pagelayer_shortcodes_timer);
	
	// Set a timer for constant change
	pagelayer_shortcodes_timer = setTimeout(function(){
	
		// Make the call
		jQuery.ajax({
			url: pagelayer_ajax_url+'&action=pagelayer_fetch_sidebar',
			type: 'POST',
			data: {
				pagelayer_nonce: pagelayer_ajax_nonce,
				sidebar: el.atts['sidebar']
			},
			success:function(data) {
				el.$.find('.pagelayer-wp-sidebar-holder').html(data);
			}
		});
	
	}, 500);

};

function pagelayer_owl_destroy(jEle, slides_class){
	
	var ul = jEle.find(slides_class);
	var setup = jEle.attr('pagelayer-setup');
	
	// Already setup ?
	if(setup && setup.length > 0){
		if(ul.children('.pagelayer-ele-wrap')){
			ul.pagelayerOwlCarousel('destroy');
			ul.find('[class^="pagelayer-owl-"]').remove();
			jEle.removeAttr('pagelayer-setup');
		}
	}
}

////////////
// Freemium
////////////

// Render the excerpt
function pagelayer_render_html_pl_post_excerpt(el){
	el.$.find('.pagelayer-post-excerpt').addClass('pagelayer-empty-widget');
}

// Render the featured image
function pagelayer_render_html_pl_featured_img(el){
	
	var param = {};
	
	param['pagelayer_nonce'] = pagelayer_ajax_nonce;
	
	// Post Id
	param['post_id'] = pagelayer_postID;
	
	// Image size
	if('size' in el.atts){
		param['size'] = el.atts['size'];
	}
	
	jQuery.ajax({
		url: pagelayer_ajax_url+'action=pagelayer_fetch_featured_img',
		type: 'post',
		data: param,
		success: function(data){
			
			var src = '';
			if(pagelayer_empty(data)){
				src = el.tmp['img-'+el.atts['size']+'-url'] || el.tmp['img-url'];
				src = src || el.atts['img'];
			}else{
				src = data;
				//url = el.atts['img-url'];
			}
			
			var img_html = '<img class="pagelayer-img" src="'+pagelayer.blank_img+'" />';
			if(src){
				img_html = '<img class="pagelayer-img" src="'+src+'" />';
			}
			
			el.$.find('.pagelayer-featured-img').html(img_html);
			
			if('link_type' in el.atts){
		
				// Custom url
				if(el.atts['link_type'] == 'custom_url'){
					el.$.find('a').attr('href', el.tmp['link']);
				}
				
				// Link to the media file itself
				if(el.atts['link_type'] == 'media_file' || el.atts['link_type'] == 'lightbox'){
					el.$.find('a').attr('href', src);
				}
			}
			
			pagelayer_pl_image(el.$);
		}
	});
}

/////////////////
// Freemium
/////////////////

// If you want to store ajax data then you can use this variable
var pagelayer_ajax_data = {};

var pagelayer_posts_data = {};

// Compare two objects
function pagelayer_compare_object(obj1, obj2){
   var objectsAreSame = true;
   for(var propertyName in obj1){
      if(obj1[propertyName] !== obj2[propertyName]){
         objectsAreSame = false;
         break;
      }
   }
   for(var propertyName in obj2){
      if(obj1[propertyName] !== obj2[propertyName]){
         objectsAreSame = false;
         break;
      }
   }
   return objectsAreSame;
}

// Incase if there is a lightbox
function pagelayer_render_end_pl_featured_img(el){
	pagelayer_pl_image(el.$);
}

// Render the archive Posts
function pagelayer_render_pl_archive_posts(el){
	
	// Need to do empty
	el.atts['pagelayer_pagination_top'] = '';
	el.atts['pagelayer_pagination_bottom'] = '';
	
}

// Render the archive Posts
function pagelayer_render_end_pl_archive_posts(el){
	var post = {};
	
	// All atts
	post['atts'] = JSON.parse(JSON.stringify(el.atts));
	post['atts']['pagelayer-id'] = el['id'];
	
	// The nonce
	post['pagelayer_nonce'] = pagelayer_ajax_nonce;
	
	var data_handle = function(data){
		//console.log(data);
		var d = jQuery(data);
		el.$.html(d.html());
		pagelayer_ajax_data[el['id']] = data;
	}
	
	if(pagelayer_empty(pagelayer_posts_data) || !pagelayer_compare_object(pagelayer_posts_data, post) || pagelayer_empty(pagelayer_ajax_data[el['id']])){
		
		pagelayer_posts_data = post;
	
		jQuery.ajax({
			url: pagelayer_ajax_url+'action=pagelayer_archive_posts_data',
			type: 'post',
			data: post,
			success: data_handle
		});
	}else{
		data_handle(pagelayer_ajax_data[el['id']]);
	}
}

var pagelayer_nav = {};

// Render the Primary menu
function pagelayer_render_pl_wp_menu(el){
	
	if(pagelayer_empty(pagelayer_nav[el.atts['nav_list']])){
		jQuery.ajax({
			url: pagelayer_ajax_url+'&action=pagelayer_fetch_primary_menu',
			type: 'post',
			data: {
				pagelayer_nonce: pagelayer_ajax_nonce,
				nav_list: el.atts['nav_list'],
			},
			async: false,
			success: function(data) {
				//console.log(data);
				//el.$.find('.pagelayer-wp-menu-container').html(data);
				pagelayer_nav[el.atts['nav_list']] = data;
				el.atts['nav_menu'] = data;
			}
		});
	}else{
		el.atts['nav_menu'] = pagelayer_nav[el.atts['nav_list']];
	}
}

// Render end the Primary menu
function pagelayer_render_end_pl_wp_menu(el){
	pagelayer_primary_menu(el.$);
}

// Render the post navigation
function pagelayer_render_end_pl_post_nav(el){

	jQuery.ajax({
		url: pagelayer_ajax_url+'&action=pagelayer_post_nav&postID='+pagelayer_postID,
		type: 'post',
		data: {
			pagelayer_nonce: pagelayer_ajax_nonce,
			data: el['atts'],
		},
		async:false,
		success: function(response){
			//console.log(response);
			var obj = jQuery.parseJSON(response);
			el.$.find('.pagelayer-prev-post').html(obj['atts']['prev_link']);
			el.$.find('.pagelayer-next-post').html(obj['atts']['next_link']);
		}
	});
	
}

// Render the site title
function pagelayer_render_pl_wp_title(el){	
	//console.log(el.tmp);

	// Use default logo
	if(pagelayer_empty(el.atts['logo_img_type'])){
		
		// But is there a default logo
		if(!pagelayer_empty(pagelayer_site_logo)){		
			el.atts['func_image'] = pagelayer_site_logo[el.atts['logo_img_size']+'-url'] || pagelayer_site_logo['url'];
		}
	
	// Custom logo
	}else{
		el.atts['func_image'] = el.tmp['logo_img-'+el.atts['logo_img_size']+'-url'] || el.tmp['logo_img-url'];
	}
}

// Render the Post comment
function pagelayer_render_end_pl_post_comment(el){
	
	var postID = pagelayer_postID;
		
	if(el['atts']['post_type'] == 'custom' && el['atts']['post_id']){
		postID = el['atts']['post_id'];
	}
	
	jQuery.ajax({
		url: pagelayer_ajax_url+'&action=pagelayer_post_comment&postID='+postID,
		type: 'post',
		data: {
			pagelayer_nonce: pagelayer_ajax_nonce,
		},
		success: function(response){
			el.$.find('.pagelayer-post-comment-container').html(response);
		}
	});

}

var pagelayer_post_info_timer = {};

// Render the Post info list
function pagelayer_render_pl_post_info_list(el){
	
	el.atts['post_info_content'] = 1;
	
	// Clear any previous timeout
	clearTimeout(pagelayer_post_info_timer[el.id]);
	
	// Set a timer for constant change
	pagelayer_post_info_timer[el.id] = setTimeout(function(){
	
		// Make the call
		jQuery.ajax({
			url: pagelayer_ajax_url+'&action=pagelayer_post_info&postID='+pagelayer_postID,
			type: 'post',
			data: {
				pagelayer_nonce: pagelayer_ajax_nonce,
				el: el.atts,
			},
			success: function(response){
				var obj = jQuery.parseJSON(response);
				//console.log(obj);el['atts'] = obj;
				
				if( pagelayer_empty(obj['post_info_content']) ){
					el.$.find('.pagelayer-post-info-list-container').remove();
					return;
				}
				
				el.$.find('.pagelayer-post-info-list-container').show();
				el.$.find('.pagelayer-post-info-label').html(obj['post_info_content']);
				el.$.find('.pagelayer-post-info-icon img').attr('src', obj['avatar_url']);
				el.$.find('.pagelayer-post-info-list-container > a').attr('href', obj['link']);
			}
		});
		
	}, 500);
	
}

// Render the Post info list
function pagelayer_render_html_pl_post_info_list(el){
	el.$.find('.pagelayer-post-info-list-container').hide();
}

// Render the contact form
function pagelayer_render_pl_contact(el){
	
	// Set post id in atts 
	el.atts['con_post_id'] = pagelayer_postID;
	el.atts['grecaptcha'] = pagelayer_recaptch_site_key;
	el.$.attr('pagelayer-a-con_post_id', pagelayer_postID);
}

// Render the contact form
function pagelayer_render_end_pl_contact(el){
	
	jQuery(el.$).find('.pagelayer-recaptcha').each(function(){
		var recaptcha = jQuery(this);
		var widgetID = recaptcha.attr('recaptcha-widget-id');
		
		if( !pagelayer_empty(window.grecaptcha) && (!pagelayer_empty(widgetID) || widgetID == 0) ){
			grecaptcha.reset(widgetID);
		}else{
			pagelayer_recaptcha_loader(recaptcha, true);
		}
	});
}

// Render the contact form
function pagelayer_render_pl_contact_item(el){ 
	var html = '';
	var options = '';
	var placeholder = '';
	var required = '';
	
	if(!pagelayer_empty(el.atts['required'])){
		required = 'required';
	}

	if(!pagelayer_empty(el.atts['label_name']) && pagelayer_empty(el.atts['label_as_holder'])){
		html = '<label for="'+el.atts['field_name']+'">'+
				'<span class="pagelayer-form-label">'+el.atts['label_name']+'</span>';
				
		if(!pagelayer_empty(required)){
			html += ' *';
		}
		
		html += '</label>';
	}
		
	if(!pagelayer_empty(el.atts['label_as_holder'])){
		placeholder = el.atts['label_name'];
	}else{
		if(!pagelayer_empty(el.atts['placeholder'])) placeholder = el.atts['placeholder'];
	}
	
	// File accept
	var file_accept = '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.pptx,.odt,.avi,.ogg,.m4a,.mov,.mp3,.mp4,.mpg,.wav,.wmv';
	
	if(!pagelayer_empty(el.atts['accept_file'])){
		file_accept = el.atts['accept_file'];
	}
	
	if(el.atts['field_type'] == 'select'){
    html += '<select name="'+el.atts['field_name']+'" '+required+'>'
		if(!pagelayer_empty(el.atts['label_name']) && !pagelayer_empty(el.atts['label_as_holder'])){
		   html += '<option value="" disabled selected>'+el.atts['label_name']+'</option>';
		}else{
			html += '<option value="" disabled selected>---</option>';
		}
		
		if(!pagelayer_empty(el.atts['values'])){
			options = el.atts['values'].split("\n");
			for(var x in options){
				html += '<option value="'+options[x].trim()+'">'+options[x].trim()+'</option>';
			}
		}
		html += '</select>';
	}else if(el.atts['field_type'] == 'checkbox'){
		if(!pagelayer_empty(el.atts['values'])){
			options = el.atts['values'].split("\n");
			html += '<div class="pagelayer-radcheck-holder">';
			for(var x in options){
				html += '<div><input type="checkbox" id="'+options[x].trim()+'" name="'+el.atts['field_name']+'" '+
				'value="'+options[x].trim()+'" '+required+'/><label for="'+options[x].trim()+'" class="pagelayer-form-label">'+options[x].trim()+'</label></div>';
			}
			html += '</div>';
		}
	}else if(el.atts['field_type'] == 'radio'){
		if(!pagelayer_empty(el.atts['values'])){
			options = el.atts['values'].split("\n");
			html += '<div class="pagelayer-radcheck-holder">';
			for(var x in options){
				html += '<div><input type="radio" name="'+el.atts['field_name']+'" '+
				'value="'+options[x].trim()+'" '+required+'/><span>'+options[x].trim()+'</span></div>';
			}
			html += '</div>';
		}
	}else if(el.atts['field_type'] == 'textarea'){
		html += '<textarea name="'+el.atts['field_name']+'" rows="'+el.atts['textarea_rows']+'" placeholder="'+placeholder+'" '+
				''+required+'></textarea>';
	}else if(el.atts['field_type'] == 'file'){
		html += '<input type="'+el.atts['field_type']+'" '+
				'name="'+el.atts['field_name']+'" placeholder="'+placeholder+'" accept="'+file_accept+'" '+required+' />';
	}else if(el.atts['field_type'] == 'label'){
		html += '';
	}else{
		html += '<input type="'+el.atts['field_type']+'" '+
				'name="'+el.atts['field_name']+'" placeholder="'+placeholder+'" '+required+'/>';
	}
	
	el.atts['fieldhtml'] = html;
	
}

// Render the post content
function pagelayer_render_pl_post_content(el){
	el.atts['post_content'] = 'Post Content Holder';
	el.CSS.css.push({'sel': '{{element}} .entry-content', 'val': 'min-height:20px;background-color:#e3e3e3;'});
	return;	
}

// Render the flipbox
function pagelayer_render_pl_flipbox(el){
	el.atts['func_image'] = el.tmp['heading_image-'+el.atts['heading_image_size']+'-url'] || el.tmp['heading_image-url'];
	el.atts['func_image'] = el.atts['func_image'] || el.atts['heading_image'];
}

// Render the Testimonial Slider
function pagelayer_render_end_pl_testimonial_slider(el){
	pagelayer_owl_destroy(el.$, '.pagelayer-testimonials-holder');
	pagelayer_pl_testimonial_slider(el.$);
}

// Render the countdown
function pagelayer_render_end_pl_countdown(el){ 
	var jEle = el.$;
	pagelayer_countdown(jEle);	
}

// Render the share
function pagelayer_render_pl_share(el){
	
	var icon_splited = el.atts['icon'].split(' fa-');
	
	var icon = icon_splited[1];
	
	if('text' in el.atts){
		el.atts['icon_label'] = el.atts['text'];
	}else{
		var labelList = { 'Facebook' : ['facebook', 'facebook-official', 'facebook-f', 'facebook-messenger', 'facebook-square'],
			'Twitter' : ['twitter', 'twitter-square'],
			'Google+' : ['google-plus', 'google-plus-square', 'google-plus-g'],
			'Instagram' : ['instagram'],
			'Linkedin' : ['linkedin', 'linkedin-square', 'linkedin-in'],
			'Pinterest' : ['pinterest', 'pinterest-p', 'pinterest-square'],
			'Reddit' : ['reddit-alien', 'reddit-square', 'reddit'],
			'Skype' : ['skype'],
			'Stumbleupon' : ['stumbleupon', 'stumbleupon-circle'],
			'Telegram' : ['telegram', 'telegram-plane'],
			'Tumblr' : ['tumblr', 'tumblr-square'],
			'VK' : ['vk'],
			'Weibo' : ['weibo'],
			'WhatsApp' : ['whatsapp', 'whatsapp-square'],
			'WordPress' : ['wordpress', 'wordpress-simple'],
			'Xing' : ['xing', 'xing-square'],
			'Delicious' : ['delicious'],
			'Dribbble' : ['dribbble', 'dribbble-square'],
			'Snapchat' : ['snapchat-ghost']
		}
		
		jQuery.each(labelList, function(key, value){
			if(jQuery.inArray(icon, value) != -1){
				el.atts['icon_label'] = key;
			}
		});
	}
}

// Render the share icon
function pagelayer_render_end_pl_share(el){
	pagelayer_social(el.$, '.pagelayer-share-content');
}

// copyright rendering function
var pagelayer_copyright;
function pagelayer_render_pl_copyright(el){
	if(pagelayer_empty(el.atts['copyright_text'])){
		return;
	}
	pagelayer_copyright = el.atts['copyright_text'];
	
}

// Render the animated heading
function pagelayer_render_pl_anim_heading(el){
	
	el.atts['rotate_html'] = '';
	
	// Creates html for rotating text
	if(!pagelayer_empty(el.atts['rotate_text'])){
		
		var rotate_text = '';
		rotate_text = el.atts['rotate_text'].split(',');
		
		el.atts['rotate_html'] += '<div class="pagelayer-animated-heading pagelayer-rotating-text pagelayer-words-wrapper">';
		
		jQuery.each(rotate_text, function(i){
			el.atts['rotate_html'] += '<span';
			if(i == 0){
				el.atts['rotate_html'] += ' class="pagelayer-is-visible"';
			}
			el.atts['rotate_html'] += '>' + rotate_text[i] + '</span>';
		});
		
		el.atts['rotate_html'] += '</div>';
	   
	}
	
	// Required classes for particular rotate
	el.atts['rotate_req'] = '';
	var letters = ['pagelayer-aheading-rotate2','pagelayer-aheading-rotate3','type','pagelayer-aheading-scale'];
	
	if(jQuery.inArray(el.atts['animations'], letters) != -1){
		el.atts['rotate_req'] = 'letters ';
	}
	
	if(el.atts['animations'] == 'pagelayer-aheading-clip'){
		el.atts['rotate_req'] = 'is-full-width ';
	}
	
}

// Render animated heading
function pagelayer_render_end_pl_anim_heading(el){
	var jEle = el.$;
	pagelayer_anim_heading(jEle);	
}

// Mega Menu popup handler
pagelayer_add_action('pagelayer_setup_history', function(){
	
	if(!('pagelayer_template_type' in pagelayer_post && pagelayer_post['pagelayer_template_type'] == 'menu')){
		return;
	}
	
	jQuery(pagelayer_editable).wrap('<div class="pagelayer-mega-menu-editor" >'+'</div>');
	
	pagelayer.$$('.pagelayer-settings-icon').attr("pagelayer-tag", "pl_mega_menu");
	pagelayer.$$(".pagelayer-settings-icon").click();
	pagelayer_mega_menu(jQuery('.pagelayer-mega-menu-editor'), pagelayer_post['ID']);
});

// Mega menu function place content editable in the menu
function pagelayer_mega_menu(mEle, postId){	
	var mainEle = jQuery('.pagelayer-mega-menu [menu-id="'+postId+'"]');	
	mainEle.empty();
	mainEle.append(mEle);	
	mainEle.parents('.pagelayer-mega-menu').show();
}

////////////////
// Freemium End
////////////////
