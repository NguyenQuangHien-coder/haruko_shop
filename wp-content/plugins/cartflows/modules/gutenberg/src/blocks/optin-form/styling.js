/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../dist/blocks/controls/generate-css"
import generateCSSUnit from "../../../dist/blocks/controls/generate-css-unit"

function styling( props ) {

	const {

		// General.
		generalPrimaryColor,
		generalFontFamily,
		generalFontWeight,
		generalFontSize,
		generalFontSizeType,
		generalFontSizeTablet,
		generalFontSizeMobile,
		generalLineHeightType,
		generalLineHeight,
		generalLineHeightTablet,
		generalLineHeightMobile,
		// Input Fields.
		inputFieldFontFamily,
		inputFieldFontWeight,
		inputFieldFontSize,
		inputFieldFontSizeType,
		inputFieldFontSizeTablet,
		inputFieldFontSizeMobile,
		inputFieldLineHeightType,
		inputFieldLineHeight,
		inputFieldLineHeightTablet,
		inputFieldLineHeightMobile,
		inputFieldLabelColor,
		inputFieldBackgroundColor,
		inputFieldTextPlaceholderColor,
		inputFieldBorderStyle,
		inputFieldBorderWidth,
		inputFieldBorderRadius,
		inputFieldBorderColor,
		// Submit Button.
		submitButtonFontFamily,
		submitButtonFontWeight,
		submitButtonFontSize,
		submitButtonFontSizeType,
		submitButtonFontSizeTablet,
		submitButtonFontSizeMobile,
		submitButtonLineHeightType,
		submitButtonLineHeight,
		submitButtonLineHeightTablet,
		submitButtonLineHeightMobile,
		submitButtonTextColor,
		submitButtonBackgroundColor,
		submitButtonTextHoverColor,
		submitButtonBackgroundHoverColor,
		submitButtonBorderStyle,
		submitButtonBorderWidth,
		submitButtonBorderRadius,
		submitButtonBorderColor,
		submitButtonBorderHoverColor,
		boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,

	} = props.attributes


	var selectors = {}
	var tablet_selectors = {}
	var mobile_selectors = {}

	var boxShadowPositionCSS = boxShadowPosition;
    
	if ( 'outset' === boxShadowPosition ) {
		boxShadowPositionCSS = '';
    }

	selectors = {
		// General.
		" .wcf-optin-form .checkout.woocommerce-checkout #order_review .woocommerce-checkout-payment button#place_order": {
			"background-color"	: generalPrimaryColor,
			"border-color"		: generalPrimaryColor,
		},
		" .wcf-optin-form .checkout.woocommerce-checkout label, .wcf-optin-form .checkout.woocommerce-checkout span input.input-text, .wcf-optin-form .checkout.woocommerce-checkout .wcf-order-wrap #order_review .woocommerce-checkout-payment button#place_order": {
			"font-family"	: generalFontFamily,
			"font-weight"	: generalFontWeight,
			"font-size"		: generateCSSUnit( generalFontSize, generalFontSizeType ),
			"line-height"	: generateCSSUnit( generalLineHeight, generalLineHeightType ),

		},

		// Input Fields.
		" .wcf-optin-form .checkout.woocommerce-checkout label": {
			"color"	: inputFieldLabelColor,
		},
		" .wcf-optin-form .checkout.woocommerce-checkout span input.input-text": {
			"color"				: inputFieldTextPlaceholderColor,
			"background-color"	: inputFieldBackgroundColor,
			"border-style"		: inputFieldBorderStyle,
			"border-width"		: generateCSSUnit( inputFieldBorderWidth, 'px' ),
			"border-radius"		: generateCSSUnit( inputFieldBorderRadius, 'px' ),
			"border-color"		: inputFieldBorderColor,
		},
		" .wcf-optin-form .checkout.woocommerce-checkout label, .wcf-optin-form .checkout.woocommerce-checkout span input.input-text": {
			"font-family"	: inputFieldFontFamily,
			"font-weight"	: inputFieldFontWeight,
			"font-size"		: generateCSSUnit( inputFieldFontSize, inputFieldFontSizeType ),
			"line-height"	: generateCSSUnit( inputFieldLineHeight, inputFieldLineHeightType ),

		},

		// Submit Button.
		" .wcf-optin-form .checkout.woocommerce-checkout .wcf-order-wrap #order_review .woocommerce-checkout-payment button#place_order": {
			"color"				: submitButtonTextColor,
			"background-color"	: submitButtonBackgroundColor,
			"border-style"		: submitButtonBorderStyle,
			"border-width"		: generateCSSUnit( submitButtonBorderWidth, 'px' ),
			"border-radius"		: generateCSSUnit( submitButtonBorderRadius, 'px' ),
			"border-color"		: submitButtonBorderColor,
			"font-family"		: submitButtonFontFamily,
			"font-weight"		: submitButtonFontWeight,
			"font-size"			: generateCSSUnit( submitButtonFontSize, submitButtonFontSizeType ),
			"line-height"		: generateCSSUnit( submitButtonLineHeight, submitButtonLineHeightType ),
			"box-shadow": generateCSSUnit( boxShadowHOffset, "px" ) + ' ' + generateCSSUnit( boxShadowVOffset, "px" ) + ' ' + generateCSSUnit( boxShadowBlur, "px" ) + ' ' + generateCSSUnit( boxShadowSpread, "px" ) + ' ' + boxShadowColor + ' ' + boxShadowPositionCSS
		},
		" .wcf-optin-form .checkout.woocommerce-checkout .wcf-order-wrap #order_review .woocommerce-checkout-payment button#place_order:hover": {
			"color"				: submitButtonTextHoverColor,
			"background-color"	: submitButtonBackgroundHoverColor,
			"border-color"		: submitButtonBorderHoverColor,
		},
		

	}

	// General.
    tablet_selectors[" .wcf-optin-form .checkout.woocommerce-checkout label, .wcf-optin-form .checkout.woocommerce-checkout span input.input-text, .wcf-optin-form .checkout.woocommerce-checkout .wcf-order-wrap #order_review .woocommerce-checkout-payment button#place_order"] = {
		"font-size": generateCSSUnit( generalFontSizeTablet, generalFontSizeType ),
        "line-height": generateCSSUnit( generalLineHeightTablet, generalLineHeightType ),
	}
	// Input Fields.
    tablet_selectors[" .wcf-optin-form .checkout.woocommerce-checkout label, .wcf-optin-form .checkout.woocommerce-checkout span input.input-text"] = {
		"font-size": generateCSSUnit( inputFieldFontSizeTablet, inputFieldFontSizeType ),
        "line-height": generateCSSUnit( inputFieldLineHeightTablet, inputFieldLineHeightType ),
	}
	// Submit Button.
    tablet_selectors[" .wcf-optin-form .checkout.woocommerce-checkout .wcf-order-wrap #order_review .woocommerce-checkout-payment button#place_order"] = {
		"font-size": generateCSSUnit( submitButtonFontSizeTablet, submitButtonFontSizeType ),
        "line-height": generateCSSUnit( submitButtonLineHeightTablet, submitButtonLineHeightType ),
	}
	
	// General.
	mobile_selectors[" .wcf-optin-form .checkout.woocommerce-checkout label, .wcf-optin-form .checkout.woocommerce-checkout span input.input-text, .wcf-optin-form .checkout.woocommerce-checkout .wcf-order-wrap #order_review .woocommerce-checkout-payment button#place_order"] = {
		"font-size": generateCSSUnit( generalFontSizeMobile, generalFontSizeType ),
		"line-height": generateCSSUnit( generalLineHeightMobile, generalLineHeightType ),
	}
	// Input Fields.
	mobile_selectors[" .wcf-optin-form .checkout.woocommerce-checkout label, .wcf-optin-form .checkout.woocommerce-checkout span input.input-text"] = {
		"font-size": generateCSSUnit( inputFieldFontSizeMobile, inputFieldFontSizeType ),
		"line-height": generateCSSUnit( inputFieldLineHeightMobile, inputFieldLineHeightType ),
	}
	// Submit Button.
	mobile_selectors[" .wcf-optin-form .checkout.woocommerce-checkout .wcf-order-wrap #order_review .woocommerce-checkout-payment button#place_order"] = {
		"font-size": generateCSSUnit( submitButtonFontSizeMobile, submitButtonFontSizeType ),
		"line-height": generateCSSUnit( submitButtonLineHeightMobile, submitButtonLineHeightType ),
	}

	var base_selector = `.block-editor-page #wpwrap .cf-block-${ props.clientId.substr( 0, 8 ) }`

	var styling_css = generateCSS( selectors, base_selector )

	styling_css += generateCSS( tablet_selectors, base_selector, true, "tablet" )

	styling_css += generateCSS( mobile_selectors, base_selector, true, "mobile" )

	return styling_css
}

export default styling
