import generateCSS from "../../../dist/blocks/controls/generate-css"
import generateCSSUnit from "../../../dist/blocks/controls/generate-css-unit"

function styling( props ) {

	const {
        headBgColor,
        headFontSize,
        headFontSizeType,
        headFontSizeTablet,
        headFontSizeMobile,
        headFontFamily,
        headFontWeight,
        headLineHeightType,
        headLineHeight,
        headLineHeightTablet,
        headLineHeightMobile,
        buttonFontSize,
        buttonFontSizeType,
        buttonFontSizeTablet,
        buttonFontSizeMobile,
        buttonFontFamily,
        buttonFontWeight,
        buttonLineHeightType,
        buttonLineHeight,
        buttonLineHeightTablet,
        buttonLineHeightMobile,
        buttonTextColor,
        buttonBgColor,			
        buttonTextHoverColor,
        buttonBgHoverColor,
        buttonBorderColor,
        buttonBorderHoverColor,
        buttonBorderStyle,
        buttonBorderWidth,
        buttonBorderRadius,
        paymentdescriptionColor,
        paymenttitleColor,
        sectionbgColor,
        informationbgColor,
        sectionhrPadding,
        sectionvrPadding,
        sectionhrMargin,
        sectionvrMargin,
        sectionBorderRadius,
        fieldLabelColor,
        fieldBgColor,
        fieldInputColor,
        fieldBorderStyle,
        fieldBorderWidth ,
        fieldBorderRadius,
        fieldBorderColor,
        inputFontSize,	
        inputFontSizeType,
        inputFontSizeTablet,
        inputFontSizeMobile,
        inputFontFamily,
        inputFontWeight,
        inputLineHeightType,
        inputLineHeight,
        inputLineHeightTablet,
        inputLineHeightMobile,
        globaltextColor,
        globalbgColor,
        globalFontSize,	
        globalFontSizeType,
        globalFontSizeTablet,
        globalFontSizeMobile,
        globalFontFamily,
        globalFontWeight,
        globalLineHeightType,
        globalLineHeight,
        globalLineHeightTablet,
        globalLineHeightMobile,
        backgroundType,
		backgroundImageColor,
		backgroundOpacity,
        backgroundColor,
        backgroundHoverColor,
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
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
    } = props.attributes
    var position = backgroundPosition.replace( "-", " " )
    var boxShadowPositionCSS = boxShadowPosition;
    
	if ( 'outset' === boxShadowPosition ) {
		boxShadowPositionCSS = '';
    }

	var selectors = {
        " .wcf-embed-checkout-form .woocommerce" : {
            "font-size": generateCSSUnit( globalFontSize, globalFontSizeType ),
			"font-weight": globalFontWeight,
			"font-family": globalFontFamily,
			"line-height": generateCSSUnit( globalLineHeight, globalLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce h3, .wcf-embed-checkout-form .woocommerce-checkout #order_review_heading, .wcf-embed-checkout-form .woocommerce h3, .wcf-embed-checkout-form .woocommerce-checkout .woocommerce-shipping-fields h3#ship-to-different-address, .wcf-embed-checkout-form.wcf-embed-checkout-form-two-step .wcf-embed-checkout-form-steps .wcf-current .step-name" : {
            "color" : headBgColor,
            "font-size": generateCSSUnit( headFontSize, headFontSizeType ),
			"font-weight": headFontWeight,
			"font-family": headFontFamily,
			"line-height": generateCSSUnit( headLineHeight, headLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form.wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns .wcf-next-button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button" : {
            "color":buttonTextColor,
            "border-style": buttonBorderStyle,
            "border-width": generateCSSUnit( buttonBorderWidth, "px" ),
            "border-color": buttonBorderColor,
            "border-radius": generateCSSUnit( buttonBorderRadius, "px" ),
            "font-size": generateCSSUnit( buttonFontSize, buttonFontSizeType ),
            "font-weight": buttonFontWeight,
            "font-family": buttonFontFamily,
            "line-height": generateCSSUnit( buttonLineHeight, buttonLineHeightType ),
            "background-color":buttonBgColor,
        },
        " .wcf-embed-checkout-form .woocommerce #payment #place_order:hover" : {
            "color": buttonTextHoverColor,
            "border-color":  buttonBorderHoverColor,
            "background-color":buttonBgHoverColor,
        },
        " .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small:hover" : {
            "color": buttonTextHoverColor,
            "border-color":  buttonBorderHoverColor,
            "background-color":buttonBgHoverColor,
        },
        " .wcf-embed-checkout-form .woocommerce-checkout #payment ul.payment_methods" : {
            "background-color" :sectionbgColor,
            "padding": sectionhrPadding + "px " + sectionvrPadding + "px",
            "margin": sectionhrMargin + "px " + sectionvrMargin + "px",
            "border-radius": generateCSSUnit( sectionBorderRadius,'px'),
        },
        " .wcf-embed-checkout-form .woocommerce-checkout #payment label a, .wcf-embed-checkout-form .woocommerce-checkout #payment label" : {
            "color":paymenttitleColor,
        },
        " .wcf-embed-checkout-form #payment .woocommerce-privacy-policy-text p" : {
            "color":paymentdescriptionColor,
        },
        " .wcf-embed-checkout-form .woocommerce-checkout #payment div.payment_box" : {
            "background-color":informationbgColor,
            "color":paymentdescriptionColor,
        },
        " .wcf-embed-checkout-form .woocommerce form p.form-row label" : {
            "font-size": generateCSSUnit( inputFontSize, inputFontSizeType ),
			"font-weight": inputFontWeight,
			"font-family": inputFontFamily,
            "line-height": generateCSSUnit( inputLineHeight, inputLineHeightType ),
            "color": fieldLabelColor,
        },
        " .wcf-embed-checkout-form .woocommerce form .form-row input.input-text, .wcf-embed-checkout-form .woocommerce form .form-row select, .wcf-embed-checkout-form .woocommerce form .form-row textarea, .wcf-embed-checkout-form #order_review .wcf-custom-coupon-field input[type='text'], .wcf-embed-checkout-form .woocommerce form .form-row select#billing_country, .wcf-embed-checkout-form .woocommerce form .form-row select#billing_state" : {
            "background-color" :fieldBgColor,
            "border-radius": generateCSSUnit( fieldBorderRadius,'px'),
            "border-color": fieldBorderColor,
            "border-style": fieldBorderStyle,
            "border-width": generateCSSUnit( fieldBorderWidth, "px" ),
            "color": fieldInputColor,
        },
        " .wcf-embed-checkout-form .woocommerce form .form-row input.input-text, .wcf-embed-checkout-form .woocommerce form .form-row textarea, .wcf-embed-checkout-form .woocommerce form .form-row select#billing_country, .wcf-embed-checkout-form .woocommerce form .form-row select#billing_state, span#select2-billing_country-container, .wcf-embed-checkout-form .select2-container--default .select2-selection--single .select2-selection__rendered, .wcf-embed-checkout-form #order_review .wcf-custom-coupon-field input[type='text'], .wcf-embed-checkout-form .woocommerce form .form-row input.input-text, .wcf-embed-checkout-form .woocommerce form .form-row textarea, .wcf-embed-checkout-form .select2-container--default .select2-selection--single, .wcf-embed-checkout-form .woocommerce form .form-row select, .wcf-embed-checkout-form .woocommerce form .form-row select, .wcf-embed-checkout-form ::placeholder, .wcf-embed-checkout-form ::-webkit-input-placeholder" : {
            "font-size": generateCSSUnit( inputFontSize, inputFontSizeType ),
			"font-weight": inputFontWeight,
			"font-family": inputFontFamily,
            "line-height": generateCSSUnit( inputLineHeight, inputLineHeightType ),
            "color": fieldInputColor,
        },
        " .wcf-embed-checkout-form .woocommerce #payment [type='radio']:checked + label, .wcf-embed-checkout-form .woocommerce #payment [type='radio']:not(:checked) + label" : {
            "font-size": generateCSSUnit( inputFontSize, inputFontSizeType ),
			"font-weight": inputFontWeight,
			"font-family": inputFontFamily,
            "line-height": generateCSSUnit( inputLineHeight, inputLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce-checkout #payment div.payment_box::before " : {
            "border-bottom-color": informationbgColor,
        },
        "  .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button, .wcf-embed-checkout-form form.checkout_coupon .button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns .wcf-next-button, body .wcf-pre-checkout-offer-wrapper #wcf-pre-checkout-offer-content button.wcf-pre-checkout-offer-btn" : {
            'background-color': globalbgColor,
            "box-shadow": generateCSSUnit( boxShadowHOffset, "px" ) + ' ' + generateCSSUnit( boxShadowVOffset, "px" ) + ' ' + generateCSSUnit( boxShadowBlur, "px" ) + ' ' + generateCSSUnit( boxShadowSpread, "px" ) + ' ' + boxShadowColor + ' ' + boxShadowPositionCSS
        },
        " .wcf-embed-checkout-form .woocommerce #payment input[type=radio]:checked:before, .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button, .wcf-embed-checkout-form .woocommerce-checkout form.login .button:hover, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button:hover, .wcf-embed-checkout-form .woocommerce #payment #place_order:hover, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small:hover, .wcf-embed-checkout-form-two-step .wcf-embed-checkout-form-steps .step-one.wcf-current:before, .wcf-embed-checkout-form-two-step .wcf-embed-checkout-form-steps .step-two.wcf-current:before, .wcf-embed-checkout-form-two-step .wcf-embed-checkout-form-steps .steps.wcf-current:before, .wcf-embed-checkout-form-two-step .wcf-embed-checkout-form-note, body .wcf-pre-checkout-offer-wrapper .wcf-nav-bar-step.active .wcf-progress-nav-step, body .wcf-pre-checkout-offer-wrapper .wcf-nav-bar-step.active .wcf-nav-bar-step-line:before, body .wcf-pre-checkout-offer-wrapper .wcf-nav-bar-step.active .wcf-nav-bar-step-line:after" : {
            "background-color" : globalbgColor,
        },
        " .wcf-embed-checkout-form-two-step .wcf-embed-checkout-form-note:before" : {
            "border-top-color" : globalbgColor,
        },
        " .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns .wcf-next-button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button, .wcf-embed-checkout-form form.checkout_coupon .button, body .wcf-pre-checkout-offer-wrapper #wcf-pre-checkout-offer-content button.wcf-pre-checkout-offer-btn" : {
             "background-color" : globalbgColor,
        },
        " .wcf-embed-checkout-form,  .wcf-embed-checkout-form #payment .woocommerce-privacy-policy-text p" : {
            'color': globaltextColor,
        }

    }

	if( ( "gradient" == backgroundType ) ){
		selectors[" .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button, .wcf-embed-checkout-form form.checkout_coupon .button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button"] = {
            "box-shadow": generateCSSUnit( boxShadowHOffset, "px" ) + ' ' + generateCSSUnit( boxShadowVOffset, "px" ) + ' ' + generateCSSUnit( boxShadowBlur, "px" ) + ' ' + generateCSSUnit( boxShadowSpread, "px" ) + ' ' + boxShadowColor + ' ' + boxShadowPositionCSS
		}	
	}

	if( "image" == backgroundType ) {
		selectors[" .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button, .wcf-embed-checkout-form form.checkout_coupon .button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button"] = {
			"opacity" : ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : "",
			"background-color": backgroundImageColor,
			"background-image": ( backgroundImage ) ? `url(${ backgroundImage.url })` : null,
			"background-position": position,
			"background-attachment": backgroundAttachment,
			"background-repeat": backgroundRepeat,
            "background-size": backgroundSize,
            "box-shadow": generateCSSUnit( boxShadowHOffset, "px" ) + ' ' + generateCSSUnit( boxShadowVOffset, "px" ) + ' ' + generateCSSUnit( boxShadowBlur, "px" ) + ' ' + generateCSSUnit( boxShadowSpread, "px" ) + ' ' + boxShadowColor + ' ' + boxShadowPositionCSS
		}
	} else if( "color" == backgroundType ) {
		selectors[" .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button, .wcf-embed-checkout-form form.checkout_coupon .button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button"] = {
            "opacity" : ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : "",
            "background-color" : backgroundColor,
            "box-shadow": generateCSSUnit( boxShadowHOffset, "px" ) + ' ' + generateCSSUnit( boxShadowVOffset, "px" ) + ' ' + generateCSSUnit( boxShadowBlur, "px" ) + ' ' + generateCSSUnit( boxShadowSpread, "px" ) + ' ' + boxShadowColor + ' ' + boxShadowPositionCSS
        }
        selectors[" .wcf-embed-checkout-form .woocommerce #order_review button:hover, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button:hover, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small:hover, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button:hover, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button:hover, .wcf-embed-checkout-form form.checkout_coupon .button:hover, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button:hover, .wcf-embed-checkout-form .woocommerce #payment #place_order:hover"] = {
            "background-color" : backgroundHoverColor,
		}
	}
	
	else if ( "gradient" === backgroundType ) {

		selectors[" .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button, .wcf-embed-checkout-form form.checkout_coupon .button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button"]["background-color"] = "transparent"
		selectors[" .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button, .wcf-embed-checkout-form form.checkout_coupon .button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button"]["opacity"] = ( typeof backgroundOpacity != "undefined" ) ? backgroundOpacity/100 : ""
		if( gradientValue ) {
			selectors[" .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button, .wcf-embed-checkout-form form.checkout_coupon .button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button"]["background-image"] = gradientValue

		} else {
			if ( "linear" === gradientType ) {

				selectors[" .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button, .wcf-embed-checkout-form form.checkout_coupon .button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button"]["background-image"] = `linear-gradient(${ gradientAngle }deg, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`
			} else {
	
				selectors[" .wcf-embed-checkout-form .woocommerce #order_review button, .wcf-embed-checkout-form .woocommerce form.woocommerce-form-login .form-row button, .wcf-embed-checkout-form .woocommerce #order_review button.wcf-btn-small, .wcf-embed-checkout-form .woocommerce-checkout form.woocommerce-form-login .button, .wcf-embed-checkout-form .woocommerce-checkout form.checkout_coupon .button, .wcf-embed-checkout-form form.checkout_coupon .button, .wcf-embed-checkout-form-two-step .woocommerce .wcf-embed-checkout-form-nav-btns a.wcf-next-button"]["background-image"] = `radial-gradient( at ${ gradientPosition }, ${ gradientColor1 } ${ gradientLocation1 }%, ${ gradientColor2 } ${ gradientLocation2 }%)`
			}
		}
		
	}

    var tablet_selectors = {
        " .wcf-embed-checkout-form .woocommerce" : {
            "font-size": generateCSSUnit( globalFontSizeTablet, globalFontSizeType ),
            "line-height": generateCSSUnit( globalLineHeightTablet, globalLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce h3, .wcf-embed-checkout-form .woocommerce-checkout #order_review_heading, .wcf-embed-checkout-form .woocommerce h3, .wcf-embed-checkout-form .woocommerce-checkout .woocommerce-shipping-fields h3#ship-to-different-address" : {
        "font-size": generateCSSUnit( headFontSizeTablet, headFontSizeType ),
			"line-height": generateCSSUnit( headLineHeightTablet, headLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce #order_review button" : {
            "font-size": generateCSSUnit( buttonFontSizeTablet, buttonFontSizeType ),
            "line-height": generateCSSUnit( buttonLineHeightTablet, buttonLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce form p.form-row label" : {
            "font-size": generateCSSUnit( inputFontSizeTablet, inputFontSizeType ),
            "line-height": generateCSSUnit( inputLineHeightTablet, inputLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce form .form-row input.input-text, .wcf-embed-checkout-form .woocommerce form .form-row textarea, .wcf-embed-checkout-form .woocommerce form .form-row select#billing_country, .wcf-embed-checkout-form .woocommerce form .form-row select#billing_state, span#select2-billing_country-container, .wcf-embed-checkout-form .select2-container--default .select2-selection--single .select2-selection__rendered, .wcf-embed-checkout-form #order_review .wcf-custom-coupon-field input[type='text'], .wcf-embed-checkout-form .woocommerce form .form-row input.input-text, .wcf-embed-checkout-form .woocommerce form .form-row textarea, .wcf-embed-checkout-form .select2-container--default .select2-selection--single, .wcf-embed-checkout-form .woocommerce form .form-row select, .wcf-embed-checkout-form .woocommerce form .form-row select, .wcf-embed-checkout-form ::placeholder, .wcf-embed-checkout-form ::-webkit-input-placeholder" : {
            "font-size": generateCSSUnit( inputFontSizeTablet, inputFontSizeType ),
            "line-height": generateCSSUnit( inputLineHeightTablet, inputLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce #payment [type='radio']:checked + label, .wcf-embed-checkout-form .woocommerce #payment [type='radio']:not(:checked) + label" : {
            "font-size": generateCSSUnit( inputFontSizeTablet, inputFontSizeType ),
            "line-height": generateCSSUnit( inputLineHeightTablet, inputLineHeightType ),
        },
    }

	var mobile_selectors = {
        " .wcf-embed-checkout-form .woocommerce" : {
            "font-size": generateCSSUnit( globalFontSizeMobile, globalFontSizeType ),
            "line-height": generateCSSUnit( globalLineHeightMobile, globalLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce h3, .wcf-embed-checkout-form .woocommerce-checkout #order_review_heading, .wcf-embed-checkout-form .woocommerce h3, .wcf-embed-checkout-form .woocommerce-checkout .woocommerce-shipping-fields h3#ship-to-different-address" : {
            "font-size": generateCSSUnit( headFontSizeMobile, headFontSizeType ),
			"line-height": generateCSSUnit( headLineHeightMobile, headLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce #order_review button" : {
            "font-size": generateCSSUnit( buttonFontSizeMobile, buttonFontSizeType ),
            "line-height": generateCSSUnit( buttonLineHeightMobile, buttonLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce form p.form-row label" : {
            "font-size": generateCSSUnit( inputFontSizeMobile, inputFontSizeType ),
            "line-height": generateCSSUnit( inputLineHeightMobile, inputLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce form .form-row input.input-text, .wcf-embed-checkout-form .woocommerce form .form-row textarea, .wcf-embed-checkout-form .woocommerce form .form-row select#billing_country, .wcf-embed-checkout-form .woocommerce form .form-row select#billing_state, span#select2-billing_country-container, .wcf-embed-checkout-form .select2-container--default .select2-selection--single .select2-selection__rendered, .wcf-embed-checkout-form #order_review .wcf-custom-coupon-field input[type='text'], .wcf-embed-checkout-form .woocommerce form .form-row input.input-text, .wcf-embed-checkout-form .woocommerce form .form-row textarea, .wcf-embed-checkout-form .select2-container--default .select2-selection--single, .wcf-embed-checkout-form .woocommerce form .form-row select, .wcf-embed-checkout-form .woocommerce form .form-row select, .wcf-embed-checkout-form ::placeholder, .wcf-embed-checkout-form ::-webkit-input-placeholder" : {
            "font-size": generateCSSUnit( inputFontSizeMobile, inputFontSizeType ),
            "line-height": generateCSSUnit( inputLineHeightMobile, inputLineHeightType ),
        },
        " .wcf-embed-checkout-form .woocommerce #payment [type='radio']:checked + label, .wcf-embed-checkout-form .woocommerce #payment [type='radio']:not(:checked) + label" : {
            "font-size": generateCSSUnit( inputFontSizeMobile, inputFontSizeType ),
            "line-height": generateCSSUnit( inputLineHeightMobile, inputLineHeightType ),
        },
    }

    var base_selector = `.cf-block-${ props.clientId.substr( 0, 8 ) }`
    
    var styling_css = generateCSS( selectors, base_selector)
    
    styling_css += generateCSS( tablet_selectors, base_selector, true, "tablet" )
    
    styling_css += generateCSS( mobile_selectors, base_selector, true, "mobile" )

    return styling_css
    
    }
    
    export default styling