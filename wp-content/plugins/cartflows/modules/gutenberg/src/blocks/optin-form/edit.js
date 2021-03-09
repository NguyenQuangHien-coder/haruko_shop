/**
 * BLOCK: Optin Detail Form Block
 */

// Import block dependencies and components.
import classnames from 'classnames';
import styling from './styling';

// Import all of our Text Options requirements.
import TypographyControl from '../../components/typography';
import BoxShadowControl from '../../components/box-shadow';

// Import Web font loader for google fonts.
import WebfontLoader from '../../components/typography/fontloader';

const { __ } = wp.i18n;

const { BlockControls, InspectorControls, ColorPalette } = wp.blockEditor;

const { withSelect } = wp.data;

const {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	Placeholder,
	Spinner,
	TextControl,
} = wp.components;

const { Component, Fragment } = wp.element;

class OptinForm extends Component {
	constructor() {
		super( ...arguments );
		this.getIcon = this.getIcon.bind( this );
	}

	getIcon( value ) {
		this.props.setAttributes( { icon: value } );
	}

	componentDidMount() {
		this.props.setAttributes( { isHtml: false } );
		// Assigning block_id in the attribute.
		this.props.setAttributes( {
			block_id: this.props.clientId.substr( 0, 8 ),
		} );

		// Assigning block_id in the attribute.
		this.props.setAttributes( { classMigrate: true } );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'wpcf-optin-form-style-' + this.props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}

	componentDidUpdate( prevProps, prevState ) {
		var element = document.getElementById(
			'wpcf-optin-form-style-' + this.props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}

		if (
			this.props.attributes.formJson &&
			document.querySelector( '#place_order' )
		) {
			var submitButtonTextEditor =
				this.props.attributes.submitButtonText !== ''
					? this.props.attributes.submitButtonText
					: this.props.attributes.formJson.data.buttonText;
			document.querySelector(
				'#place_order'
			).innerHTML = submitButtonTextEditor;
		}
	}

	render() {
		// Setup the attributes
		const {
			className,
			attributes,
			setAttributes,
			attributes: {
				formJson,
				isHtml,
				input_skins,
				// General
				generalPrimaryColor,
				generalLoadGoogleFonts,
				generalFontFamily,
				generalFontWeight,
				generalFontSubset,
				generalFontSizeType,
				generalLineHeightType,
				generalFontSize,
				generalFontSizeTablet,
				generalFontSizeMobile,
				generalLineHeight,
				generalLineHeightTablet,
				generalLineHeightMobile,
				// Input Fields
				inputFieldLoadGoogleFonts,
				inputFieldFontFamily,
				inputFieldFontWeight,
				inputFieldFontSubset,
				inputFieldFontSizeType,
				inputFieldLineHeightType,
				inputFieldFontSize,
				inputFieldFontSizeTablet,
				inputFieldFontSizeMobile,
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
				submitButtonText,
				submitButtonLoadGoogleFonts,
				submitButtonFontFamily,
				submitButtonFontWeight,
				submitButtonFontSubset,
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
			},
		} = this.props;

		let html = '';

		if ( formJson && formJson.data.html ) {
			html = formJson.data.html;
		}

		let loadGeneralGoogleFonts;
		let loadInputFieldGoogleFonts;
		let loadSubmitButtonGoogleFonts;

		if ( true === generalLoadGoogleFonts ) {
			const gconfig = {
				google: {
					families: [
						generalFontFamily +
							( generalFontWeight
								? ':' + generalFontWeight
								: '' ),
					],
				},
			};
			loadGeneralGoogleFonts = (
				<WebfontLoader config={ gconfig }></WebfontLoader>
			);
		}

		if ( true === inputFieldLoadGoogleFonts ) {
			const ifconfig = {
				google: {
					families: [
						inputFieldFontFamily +
							( inputFieldFontWeight
								? ':' + inputFieldFontWeight
								: '' ),
					],
				},
			};
			loadInputFieldGoogleFonts = (
				<WebfontLoader config={ ifconfig }></WebfontLoader>
			);
		}

		if ( true === submitButtonLoadGoogleFonts ) {
			const sbfconfig = {
				google: {
					families: [
						submitButtonFontFamily +
							( submitButtonFontWeight
								? ':' + submitButtonFontWeight
								: '' ),
					],
				},
			};
			loadSubmitButtonGoogleFonts = (
				<WebfontLoader config={ sbfconfig }></WebfontLoader>
			);
		}

		const optinFormGeneralSettings = () => {
			return (
				<PanelBody
					title={ __( 'General', 'cartflows' ) }
					initialOpen={ true }
				>
					<p className="cf-setting-label">
						{ __( 'Primary Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: generalPrimaryColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ generalPrimaryColor }
						onChange={ ( colorValue ) =>
							setAttributes( { generalPrimaryColor: colorValue } )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: generalLoadGoogleFonts,
							label: 'generalLoadGoogleFonts',
						} }
						fontFamily={ {
							value: generalFontFamily,
							label: 'generalFontFamily',
						} }
						fontWeight={ {
							value: generalFontWeight,
							label: 'generalFontWeight',
						} }
						fontSubset={ {
							value: generalFontSubset,
							label: 'generalFontSubset',
						} }
						fontSizeType={ {
							value: generalFontSizeType,
							label: 'generalFontSizeType',
						} }
						fontSize={ {
							value: generalFontSize,
							label: 'generalFontSize',
						} }
						fontSizeMobile={ {
							value: generalFontSizeMobile,
							label: 'generalFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: generalFontSizeTablet,
							label: 'generalFontSizeTablet',
						} }
						lineHeightType={ {
							value: generalLineHeightType,
							label: 'generalLineHeightType',
						} }
						lineHeight={ {
							value: generalLineHeight,
							label: 'generalLineHeight',
						} }
						lineHeightMobile={ {
							value: generalLineHeightMobile,
							label: 'generalLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: generalLineHeightTablet,
							label: 'generalLineHeightTablet',
						} }
					/>
				</PanelBody>
			);
		};

		let skinOption = [];

		if ( cf_blocks_info.is_cartflows_pro_install === '' ) {
			skinOption = [
				{ value: 'deafult', label: __( 'Default', 'cartflows' ) },
				{
					value: 'floating-labels',
					label: __( 'Floating Label ( Pro )', 'cartflows' ),
				},
			];
		} else {
			skinOption = [
				{ value: 'deafult', label: __( 'Default', 'cartflows' ) },
				{
					value: 'floating-labels',
					label: __( 'Floating Label', 'cartflows' ),
				},
			];
		}

		const optinFormInputFieldsSettings = () => {
			return (
				<PanelBody
					title={ __( 'Input Field', 'cartflows' ) }
					initialOpen={ false }
				>
					<Fragment>
						<SelectControl
							label={ __( 'Style', 'cartflows' ) }
							value={ input_skins }
							onChange={ ( value ) =>
								setAttributes( { input_skins: value } )
							}
							options={ skinOption }
						/>
						{ 'floating-labels' == input_skins &&
							cf_blocks_info.is_cartflows_pro_install === '' && (
								<p className="cf-settings-notice">
									{ __(
										'Note: This feature is available in the CartFlows Pro. Upgrade Now!.',
										'cartflows'
									) }
								</p>
							) }
					</Fragment>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: inputFieldLoadGoogleFonts,
							label: 'inputFieldLoadGoogleFonts',
						} }
						fontFamily={ {
							value: inputFieldFontFamily,
							label: 'inputFieldFontFamily',
						} }
						fontWeight={ {
							value: inputFieldFontWeight,
							label: 'inputFieldFontWeight',
						} }
						fontSubset={ {
							value: inputFieldFontSubset,
							label: 'inputFieldFontSubset',
						} }
						fontSizeType={ {
							value: inputFieldFontSizeType,
							label: 'inputFieldFontSizeType',
						} }
						fontSize={ {
							value: inputFieldFontSize,
							label: 'inputFieldFontSize',
						} }
						fontSizeMobile={ {
							value: inputFieldFontSizeMobile,
							label: 'inputFieldFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: inputFieldFontSizeTablet,
							label: 'inputFieldFontSizeTablet',
						} }
						lineHeightType={ {
							value: inputFieldLineHeightType,
							label: 'inputFieldLineHeightType',
						} }
						lineHeight={ {
							value: inputFieldLineHeight,
							label: 'inputFieldLineHeight',
						} }
						lineHeightMobile={ {
							value: inputFieldLineHeightMobile,
							label: 'inputFieldLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: inputFieldLineHeightTablet,
							label: 'inputFieldLineHeightTablet',
						} }
					/>
					<hr className="cf-editor__separator" />
					<p className="cf-setting-label">
						{ __( 'Label Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: inputFieldLabelColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ inputFieldLabelColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								inputFieldLabelColor: colorValue,
							} )
						}
						allowReset
					/>
					<p className="cf-setting-label">
						{ __( 'Field Background Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: inputFieldBackgroundColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ inputFieldBackgroundColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								inputFieldBackgroundColor: colorValue,
							} )
						}
						allowReset
					/>
					<p className="cf-setting-label">
						{ __( 'Input Text / Placeholder Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: inputFieldTextPlaceholderColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ inputFieldTextPlaceholderColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								inputFieldTextPlaceholderColor: colorValue,
							} )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Border', 'cartflows' ) }</h2>
					<SelectControl
						label={ __( 'Border Style', 'cartflows' ) }
						value={ inputFieldBorderStyle }
						onChange={ ( value ) =>
							setAttributes( { inputFieldBorderStyle: value } )
						}
						options={ [
							{ value: '', label: __( 'Default', 'cartflows' ) },
							{
								value: 'solid',
								label: __( 'Solid', 'cartflows' ),
							},
							{
								value: 'dotted',
								label: __( 'Dotted', 'cartflows' ),
							},
							{
								value: 'dashed',
								label: __( 'Dashed', 'cartflows' ),
							},
							{
								value: 'double',
								label: __( 'Double', 'cartflows' ),
							},
							{
								value: 'groove',
								label: __( 'Groove', 'cartflows' ),
							},
							{
								value: 'inset',
								label: __( 'Inset', 'cartflows' ),
							},
							{
								value: 'outset',
								label: __( 'Outset', 'cartflows' ),
							},
							{
								value: 'ridge',
								label: __( 'Ridge', 'cartflows' ),
							},
						] }
					/>
					{ '' != inputFieldBorderStyle && (
						<RangeControl
							label={ __( 'Border Width', 'cartflows' ) }
							value={ inputFieldBorderWidth }
							onChange={ ( value ) =>
								setAttributes( {
									inputFieldBorderWidth: value,
								} )
							}
							min={ 0 }
							max={ 50 }
							allowReset
						/>
					) }
					{ '' != inputFieldBorderStyle && (
						<RangeControl
							label={ __( 'Border Radius', 'cartflows' ) }
							value={ inputFieldBorderRadius }
							onChange={ ( value ) =>
								setAttributes( {
									inputFieldBorderRadius: value,
								} )
							}
							min={ 0 }
							max={ 1000 }
							allowReset
						/>
					) }
					{ '' != inputFieldBorderStyle && (
						<Fragment>
							<p className="cf-setting-label">
								{ __( 'Border Color', 'cartflows' ) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: inputFieldBorderColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ inputFieldBorderColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										inputFieldBorderColor: colorValue,
									} )
								}
								allowReset
							/>
						</Fragment>
					) }
				</PanelBody>
			);
		};

		const optinFormSubmitButtonSettings = () => {
			return (
				<PanelBody
					title={ __( 'Submit Button', 'cartflows' ) }
					initialOpen={ false }
				>
					<p className="components-base-control__label">
						{ __( 'Submit Button Text', 'cartflows' ) }
					</p>
					<TextControl
						value={ submitButtonText }
						onChange={ ( value ) =>
							setAttributes( { submitButtonText: value } )
						}
						placeholder={ __( 'Submit', 'cartflows' ) }
					/>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: submitButtonLoadGoogleFonts,
							label: 'submitButtonLoadGoogleFonts',
						} }
						fontFamily={ {
							value: submitButtonFontFamily,
							label: 'submitButtonFontFamily',
						} }
						fontWeight={ {
							value: submitButtonFontWeight,
							label: 'submitButtonFontWeight',
						} }
						fontSubset={ {
							value: submitButtonFontSubset,
							label: 'submitButtonFontSubset',
						} }
						fontSizeType={ {
							value: submitButtonFontSizeType,
							label: 'submitButtonFontSizeType',
						} }
						fontSize={ {
							value: submitButtonFontSize,
							label: 'submitButtonFontSize',
						} }
						fontSizeMobile={ {
							value: submitButtonFontSizeMobile,
							label: 'submitButtonFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: submitButtonFontSizeTablet,
							label: 'submitButtonFontSizeTablet',
						} }
						lineHeightType={ {
							value: submitButtonLineHeightType,
							label: 'submitButtonLineHeightType',
						} }
						lineHeight={ {
							value: submitButtonLineHeight,
							label: 'submitButtonLineHeight',
						} }
						lineHeightMobile={ {
							value: submitButtonLineHeightMobile,
							label: 'submitButtonLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: submitButtonLineHeightTablet,
							label: 'submitButtonLineHeightTablet',
						} }
					/>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Colors', 'cartflows' ) }</h2>
					<TabPanel
						className="cf-inspect-tabs cf-inspect-tabs-col-2"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'normal',
								title: __( 'Normal', 'cartflows' ),
								className: 'cf-normal-tab',
							},
							{
								name: 'hover',
								title: __( 'Hover', 'cartflows' ),
								className: 'cf-focus-tab',
							},
						] }
					>
						{ ( tabName ) => {
							let tabout_color;
							if ( 'normal' === tabName.name ) {
								tabout_color = (
									<Fragment>
										<p className="cf-setting-label">
											{ __( 'Text Color', 'cartflows' ) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: submitButtonTextColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={ submitButtonTextColor }
											onChange={ ( colorValue ) =>
												setAttributes( {
													submitButtonTextColor: colorValue,
												} )
											}
											allowReset
										/>
										<p className="cf-setting-label">
											{ __(
												'Background Color',
												'cartflows'
											) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: submitButtonBackgroundColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={
												submitButtonBackgroundColor
											}
											onChange={ ( colorValue ) =>
												setAttributes( {
													submitButtonBackgroundColor: colorValue,
												} )
											}
											allowReset
										/>
									</Fragment>
								);
							} else {
								tabout_color = (
									<Fragment>
										<p className="cf-setting-label">
											{ __( 'Text Color', 'cartflows' ) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: submitButtonTextHoverColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={ submitButtonTextHoverColor }
											onChange={ ( colorValue ) =>
												setAttributes( {
													submitButtonTextHoverColor: colorValue,
												} )
											}
											allowReset
										/>
										<p className="cf-setting-label">
											{ __(
												'Background Color',
												'cartflows'
											) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: submitButtonBackgroundHoverColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={
												submitButtonBackgroundHoverColor
											}
											onChange={ ( colorValue ) =>
												setAttributes( {
													submitButtonBackgroundHoverColor: colorValue,
												} )
											}
											allowReset
										/>
									</Fragment>
								);
							}
							return <div>{ tabout_color }</div>;
						} }
					</TabPanel>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Border', 'cartflows' ) }</h2>
					<SelectControl
						label={ __( 'Border Style', 'cartflows' ) }
						value={ submitButtonBorderStyle }
						onChange={ ( value ) =>
							setAttributes( { submitButtonBorderStyle: value } )
						}
						options={ [
							{ value: '', label: __( 'Default', 'cartflows' ) },
							{
								value: 'solid',
								label: __( 'Solid', 'cartflows' ),
							},
							{
								value: 'dotted',
								label: __( 'Dotted', 'cartflows' ),
							},
							{
								value: 'dashed',
								label: __( 'Dashed', 'cartflows' ),
							},
							{
								value: 'double',
								label: __( 'Double', 'cartflows' ),
							},
							{
								value: 'groove',
								label: __( 'Groove', 'cartflows' ),
							},
							{
								value: 'inset',
								label: __( 'Inset', 'cartflows' ),
							},
							{
								value: 'outset',
								label: __( 'Outset', 'cartflows' ),
							},
							{
								value: 'ridge',
								label: __( 'Ridge', 'cartflows' ),
							},
						] }
					/>
					{ '' != submitButtonBorderStyle && (
						<RangeControl
							label={ __( 'Border Width', 'cartflows' ) }
							value={ submitButtonBorderWidth }
							onChange={ ( value ) =>
								setAttributes( {
									submitButtonBorderWidth: value,
								} )
							}
							min={ 0 }
							max={ 50 }
							allowReset
						/>
					) }
					{ '' != submitButtonBorderStyle && (
						<RangeControl
							label={ __( 'Border Radius', 'cartflows' ) }
							value={ submitButtonBorderRadius }
							onChange={ ( value ) =>
								setAttributes( {
									submitButtonBorderRadius: value,
								} )
							}
							min={ 0 }
							max={ 1000 }
							allowReset
						/>
					) }
					{ '' != submitButtonBorderStyle && (
						<Fragment>
							<p className="cf-setting-label">
								{ __( 'Border Color', 'cartflows' ) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: submitButtonBorderColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ submitButtonBorderColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										submitButtonBorderColor: colorValue,
									} )
								}
								allowReset
							/>
						</Fragment>
					) }
					{ '' != submitButtonBorderStyle && (
						<Fragment>
							<p className="cf-setting-label">
								{ __( 'Border Hover Color', 'cartflows' ) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: submitButtonBorderHoverColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ submitButtonBorderHoverColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										submitButtonBorderHoverColor: colorValue,
									} )
								}
								allowReset
							/>
						</Fragment>
					) }
					<BoxShadowControl
						setAttributes={ setAttributes }
						label={ __( 'Box Shadow', 'cartflows' ) }
						boxShadowColor={ {
							value: boxShadowColor,
							label: __( 'Color', 'cartflows' ),
						} }
						boxShadowHOffset={ {
							value: boxShadowHOffset,
							label: __( 'Horizontal', 'cartflows' ),
						} }
						boxShadowVOffset={ {
							value: boxShadowVOffset,
							label: __( 'Vertical', 'cartflows' ),
						} }
						boxShadowBlur={ {
							value: boxShadowBlur,
							label: __( 'Blur', 'cartflows' ),
						} }
						boxShadowSpread={ {
							value: boxShadowSpread,
							label: __( 'Spread', 'cartflows' ),
						} }
						boxShadowPosition={ {
							value: boxShadowPosition,
							label: __( 'Position', 'cartflows' ),
						} }
					/>
				</PanelBody>
			);
		};

		return (
			<Fragment>
				<BlockControls></BlockControls>
				<InspectorControls>
					{ optinFormGeneralSettings() }
					{ optinFormInputFieldsSettings() }
					{ optinFormSubmitButtonSettings() }
				</InspectorControls>
				<div
					className={ classnames(
						className,
						`cf-block-${ this.props.clientId.substr( 0, 8 ) }`
					) }
				>
					<div className="wpcf__optin-form">
						{ isHtml == true && (
							<div dangerouslySetInnerHTML={ { __html: html } } />
						) }
						{ isHtml == false && (
							<Placeholder
								icon="admin-post"
								label={ __( 'Loading', 'cartflows' ) }
							>
								<Spinner />
							</Placeholder>
						) }
					</div>
				</div>

				{ loadGeneralGoogleFonts }
				{ loadInputFieldGoogleFonts }
				{ loadSubmitButtonGoogleFonts }
			</Fragment>
		);
	}
}

// export default OptinDetailForm;

export default withSelect( ( select, props ) => {
	const { setAttributes } = props;
	const { isHtml } = props.attributes;
	const formId = cf_blocks_info.ID;
	let json_data = '';

	if ( formId && -1 != formId && 0 != formId && ! isHtml ) {
		jQuery.ajax( {
			url: cf_blocks_info.ajax_url,
			data: {
				action: 'wpcf_optin_form_shortcode',
				nonce: cf_blocks_info.wpcf_ajax_nonce,
				id: formId,
				cartflows_gb: true,
			},
			dataType: 'json',
			type: 'POST',
			success: function ( data ) {
				setAttributes( { isHtml: true } );
				setAttributes( { formJson: data } );
				json_data = data;
			},
		} );
	}

	return {
		formHTML: json_data,
	};
} )( OptinForm );
