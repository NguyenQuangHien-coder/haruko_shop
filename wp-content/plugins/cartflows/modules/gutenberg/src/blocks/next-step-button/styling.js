/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/controls/generate-css"
import generateCSSUnit from "../../../dist/blocks/controls/generate-css-unit"

function styling( props ) {

	const {
		align,
		talign,
		malign,
		titletextTransform,
		subtitletextTransform,
		textAlignment,
		//Padding
		paddingTypeDesktop,
		paddingTypeTablet,
		paddingTypeMobile,
		vPaddingDesktop,
		hPaddingDesktop,
		vPaddingTablet,
		hPaddingTablet,
		vPaddingMobile,
		hPaddingMobile,
		//Border
		borderStyle,
		borderWidth,
		borderRadius,
		borderColor,
		borderHoverColor,
		// Text Color
		textColor,
		textHoverColor,
		// Button Color
		buttonColor,
		buttonHoverColor,
		// Title
		titleFontFamily,
		titleFontWeight,
		titleFontSubset,
		titleFontSize,
		titleFontSizeType,
		titleFontSizeMobile,
		titleFontSizeTablet,
		titleLineHeight,
		titleLineHeightType,
		titleLineHeightMobile,
		titleLineHeightTablet,
		titleLoadGoogleFonts,
		// Sub Title
		subTitleFontFamily,
		subTitleFontWeight,
		subTitleFontSubset,
		subTitleFontSize,
		subTitleFontSizeType,
		subTitleFontSizeMobile,
		subTitleFontSizeTablet,
		subTitleLineHeight,
		subTitleLineHeightType,
		subTitleLineHeightMobile,
		subTitleLineHeightTablet,
		subTitleLoadGoogleFonts,
		// Title Bottom Margin
		titleBottomSpacing,
		// Icon
		iconPosition,
		iconColor,
		iconHoverColor,
		iconSize,
		iconSpacing,
		backgroundType,
		backgroundImageColor,
		backgroundOpacity,
		backgroundColor,
		gradientColor1,
		gradientColor2,
		gradientLocation1,
		gradientLocation2,
		gradientType,
		gradientAngle,
		gradientPosition,
		backgroundPosition,
		backgroundSize,
		backgroundAttachment,
		backgroundImage,
		backgroundRepeat,
		gradientValue,
		subtitleletterSpacing,
		titleletterSpacing ,
	} = props.attributes
	var position = backgroundPosition.replace( "-", " " )
	var selectors = {}
	var tablet_selectors = {}
	var mobile_selectors = {}
	selectors = {
		" .wpcf__next-step-button-wrap": {
			"text-align": align,
		},
		" .wpcf__next-step-button-link:hover": {
			"background-color": buttonHoverColor,
			"color"			  : textHoverColor,
			"border-color"	  : borderHoverColor,
		},
		" .wpcf__next-step-button-link .wpcf__next-step-button-content-wrap .wpcf__next-step-button-title-wrap": {
			"font-family": titleFontFamily,
			"font-weight": titleFontWeight,
			"font-size": generateCSSUnit( titleFontSize, titleFontSizeType ),
			"line-height": generateCSSUnit( titleLineHeight, titleLineHeightType ),
			"text-transform":titletextTransform,
			"letter-spacing":generateCSSUnit( titleletterSpacing,'px' ),
		},
		" .wpcf__next-step-button-link .wpcf__next-step-button-content-wrap .wpcf__next-step-button-sub-title": {
			"font-family": subTitleFontFamily,
			"font-weight": subTitleFontWeight,
			"font-size": generateCSSUnit( subTitleFontSize, subTitleFontSizeType ),
			"line-height": generateCSSUnit( subTitleLineHeight, subTitleLineHeightType ),
			"margin-top": generateCSSUnit( titleBottomSpacing, 'px' ),
			"text-transform":subtitletextTransform,
			"letter-spacing": generateCSSUnit( subtitleletterSpacing, 'px' ),
		},
		" .wpcf__next-step-button-icon svg" : {
			"width" : generateCSSUnit( iconSize, "px" ),
			"height" : generateCSSUnit( iconSize, "px" ),
			"fill" : iconColor
		},
		" .wpcf__next-step-button-link:hover .wpcf__next-step-button-icon svg" : {
			"fill" : iconHoverColor
		},
	}

	selectors[" .wpcf__next-step-button-link"] = {}

	if( ( "gradient" == backgroundType ) ){
		selectors[" .wpcf__next-step-button-link"] = {
			"border-style"	  : borderStyle,
			"border-color"	  : borderColor,
			"border-width"	  : generateCSSUnit( borderWidth, 'px' ),
			"border-radius"	  : generateCSSUnit( borderRadius, 'px' ),
			"padding-top"	  : generateCSSUnit( vPaddingDesktop, paddingTypeDesktop ),
			"padding-bottom"  : generateCSSUnit( vPaddingDesktop, paddingTypeDesktop ),
			"padding-left"	  : generateCSSUnit( hPaddingDesktop, paddingTypeDesktop ),
			"padding-right"	  : generateCSSUnit( hPaddingDesktop, paddingTypeDesktop ),
			"color"			  : textColor,
			"text-align"	  : textAlignment
		}	
	}

	if( "image" == backgroundType ) {
		selectors[" .wpcf__next-step-button-link"] = {
			"opacity" : ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : '',
			"background-color": backgroundImageColor,
			"border-style"	  : borderStyle,
			"border-color"	  : borderColor,
			"border-width"	  : generateCSSUnit( borderWidth, 'px' ),
			"border-radius"	  : generateCSSUnit( borderRadius, 'px' ),
			"padding-top"	  : generateCSSUnit( vPaddingDesktop, paddingTypeDesktop ),
			"padding-bottom"  : generateCSSUnit( vPaddingDesktop, paddingTypeDesktop ),
			"padding-left"	  : generateCSSUnit( hPaddingDesktop, paddingTypeDesktop ),
			"padding-right"	  : generateCSSUnit( hPaddingDesktop, paddingTypeDesktop ),
			"color"			  : textColor,
			"background-image": ( backgroundImage ) ? `url(${ backgroundImage.url })` : null,
			"background-position": position,
			"background-attachment": backgroundAttachment,
			"background-repeat": backgroundRepeat,
			"background-size": backgroundSize,
			"text-align"	  : textAlignment
		}
	} else if( "color" == backgroundType ) {
		selectors[" .wpcf__next-step-button-link"] = {
			"opacity" : ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : '',
			"background-color" : backgroundColor,
			"border-style"	  : borderStyle,
			"border-color"	  : borderColor,
			"border-width"	  : generateCSSUnit( borderWidth, 'px' ),
			"border-radius"	  : generateCSSUnit( borderRadius, 'px' ),
			"padding-top"	  : generateCSSUnit( vPaddingDesktop, paddingTypeDesktop ),
			"padding-bottom"  : generateCSSUnit( vPaddingDesktop, paddingTypeDesktop ),
			"padding-left"	  : generateCSSUnit( hPaddingDesktop, paddingTypeDesktop ),
			"padding-right"	  : generateCSSUnit( hPaddingDesktop, paddingTypeDesktop ),
			"color"			  : textColor,
			"text-align"	  : textAlignment
		}
	}
	
	else if ( "gradient" === backgroundType ) {

		selectors[" .wpcf__next-step-button-link"]["background-color"] = "transparent"
		selectors[" .wpcf__next-step-button-link"]["opacity"] = ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : ''
		if( gradientValue ) {
			selectors[" .wpcf__next-step-button-link"]["background-image"] = gradientValue

		} else {
			if ( "linear" === gradientType ) {

				selectors[" .wpcf__next-step-button-link"]["background-image"] = `linear-gradient(${ gradientAngle }deg, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`
			} else {
	
				selectors[" .wpcf__next-step-button-link"]["background-image"] = `radial-gradient( at ${ gradientPosition }, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`
			}
		}
		
	}

	if( align === 'full'){
		selectors[" a.wpcf__next-step-button-link"] = {
			"width" : "100%",
			"justify-content":"center",
		}
	}

	let margin_type = ( "after_title" == iconPosition || "after_title_sub_title" == iconPosition ) ? "margin-left" : "margin-right";
	selectors[" .wpcf__next-step-button-icon svg"][margin_type] = generateCSSUnit( iconSpacing, "px" )

	tablet_selectors[" .wpcf__next-step-button-wrap"] = {
		"text-align": talign,
	}
	tablet_selectors[" .wpcf__next-step-button-link"] = {
		"padding-top"	  : generateCSSUnit( vPaddingTablet, paddingTypeTablet ),
		"padding-bottom"  : generateCSSUnit( vPaddingTablet, paddingTypeTablet ),
		"padding-left"	  : generateCSSUnit( hPaddingTablet, paddingTypeTablet ),
		"padding-right"	  : generateCSSUnit( hPaddingTablet, paddingTypeTablet ),
	}
	tablet_selectors[" .wpcf__next-step-button-link .wpcf__next-step-button-content-wrap .wpcf__next-step-button-title-wrap"] = {
		"font-size": generateCSSUnit( titleFontSizeTablet, titleFontSizeType ),
		"line-height": generateCSSUnit( titleLineHeightTablet, titleLineHeightType ),
	}
	tablet_selectors[" .wpcf__next-step-button-link .wpcf__next-step-button-content-wrap .wpcf__next-step-button-sub-title"] = {
		"font-size": generateCSSUnit( subTitleFontSizeTablet, titleFontSizeType ),
		"line-height": generateCSSUnit( subTitleLineHeightTablet, titleLineHeightType ),
	}
	mobile_selectors[" .wpcf__next-step-button-wrap"] = {
		"text-align": malign,
	}
	mobile_selectors[" .wpcf__next-step-button-link"] = {
		"padding-top"	  : generateCSSUnit( vPaddingMobile, paddingTypeMobile ),
		"padding-bottom"  : generateCSSUnit( vPaddingMobile, paddingTypeMobile ),
		"padding-left"	  : generateCSSUnit( hPaddingMobile, paddingTypeMobile ),
		"padding-right"	  : generateCSSUnit( hPaddingMobile, paddingTypeMobile ),
	}
	mobile_selectors[" .wpcf__next-step-button-link .wpcf__next-step-button-content-wrap .wpcf__next-step-button-title-wrap"] = {
		"font-size": generateCSSUnit( titleFontSizeMobile, titleFontSizeType ),
		"line-height": generateCSSUnit( titleLineHeightMobile, titleLineHeightType ),
	}
	mobile_selectors[" .wpcf__next-step-button-link .wpcf__next-step-button-content-wrap .wpcf__next-step-button-sub-title"] = {
		"font-size": generateCSSUnit( subTitleFontSizeMobile, titleFontSizeType ),
		"line-height": generateCSSUnit( subTitleLineHeightMobile, titleLineHeightType ),
	}

	var base_selector = `.block-editor-page #wpwrap .cf-block-${ props.clientId.substr( 0, 8 ) }`

	var styling_css = generateCSS( selectors, base_selector )

	styling_css += generateCSS( tablet_selectors, base_selector, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, base_selector, true, "mobile" )

	return styling_css
}

export default styling
