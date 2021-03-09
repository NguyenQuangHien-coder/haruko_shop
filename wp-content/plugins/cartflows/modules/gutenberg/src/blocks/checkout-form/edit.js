// Import block dependencies and components
import classnames from 'classnames';
import styling from './styling';
import CF_Block_Icons from '../../../dist/blocks/controls/block-icons';
import GradientSettings from '../../components/gradient-settings';
import BoxShadowControl from '../../components/box-shadow';

// Import all of our Text Options requirements.
import TypographyControl from '../../components/typography';

// Import Web font loader for google fonts.
import WebfontLoader from '../../components/typography/fontloader';

const {
	PanelBody,
	SelectControl,
	RangeControl,
	TabPanel,
	ButtonGroup,
	Button,
	Placeholder,
	Spinner,
	BaseControl,
} = wp.components;

const { __ } = wp.i18n;

const { InspectorControls, ColorPalette, MediaUpload } = wp.blockEditor;

const { Component, Fragment } = wp.element;

const { withSelect } = wp.data;

class CFCheckoutFormEdit extends Component {
	constructor() {
		super( ...arguments );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onSelectImage = this.onSelectImage.bind( this );
	}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { setAttributes } = this.props;

		setAttributes( { backgroundImage: null } );
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {
		const { setAttributes } = this.props;

		if ( ! media || ! media.url ) {
			setAttributes( { backgroundImage: null } );
			return;
		}

		if ( ! media.type || 'image' != media.type ) {
			return;
		}

		setAttributes( { backgroundImage: media } );
	}

	render() {
		const {
			attributes: {
				block_id,
				isHtml,
				inputSkins,
				layout,
				formJson,
				inputFontSize,
				inputFontSizeType,
				inputFontSizeTablet,
				inputFontSizeMobile,
				inputFontFamily,
				inputFontWeight,
				inputFontSubset,
				inputLineHeightType,
				inputLineHeight,
				inputLineHeightTablet,
				inputLineHeightMobile,
				inputLoadGoogleFonts,
				fieldBgColor,
				fieldLabelColor,
				fieldInputColor,
				fieldBorderStyle,
				fieldBorderWidth,
				fieldBorderRadius,
				fieldBorderColor,
				errorMsgColor,
				errorMsgBgColor,
				errorMsgBorderColor,
				paymentdescriptionColor,
				paymenttitleColor,
				sectionbgColor,
				informationbgColor,
				sectionhrPadding,
				sectionvrPadding,
				sectionhrMargin,
				sectionvrMargin,
				sectionBorderRadius,
				buttonFontSize,
				buttonFontSizeType,
				buttonFontSizeTablet,
				buttonFontSizeMobile,
				buttonFontFamily,
				buttonFontWeight,
				buttonFontSubset,
				buttonLineHeightType,
				buttonLineHeight,
				buttonLineHeightTablet,
				buttonLineHeightMobile,
				buttonLoadGoogleFonts,
				buttonTextColor,
				buttonBgColor,
				buttonTextHoverColor,
				buttonBgHoverColor,
				buttonBorderColor,
				buttonBorderHoverColor,
				buttonBorderStyle,
				buttonBorderRadiusType,
				buttonBorderWidth,
				buttonBorderRadius,
				headBgColor,
				headFontSize,
				headFontSizeType,
				headFontSizeTablet,
				headFontSizeMobile,
				headFontFamily,
				headFontWeight,
				headFontSubset,
				headLineHeightType,
				headLineHeight,
				headLineHeightTablet,
				headLineHeightMobile,
				headLoadGoogleFonts,
				globaltextColor,
				globalbgColor,
				globalFontSize,
				globalFontSizeType,
				globalFontSizeTablet,
				globalFontSizeMobile,
				globalFontFamily,
				globalFontWeight,
				globalFontSubset,
				globalLineHeightType,
				globalLineHeight,
				globalLineHeightTablet,
				globalLineHeightMobile,
				globalLoadGoogleFonts,
				backgroundType,
				backgroundImage,
				backgroundColor,
				backgroundHoverColor,
				backgroundPosition,
				backgroundAttachment,
				backgroundRepeat,
				backgroundSize,
				backgroundOpacity,
				backgroundImageColor,
				boxShadowColor,
				boxShadowHOffset,
				boxShadowVOffset,
				boxShadowBlur,
				boxShadowSpread,
				boxShadowPosition,
				errorLabelColor,
				errorFieldBorderColor,
			},
			setAttributes,
			className,
			attributes,
		} = this.props;

		let html = '';

		if ( formJson && formJson.data.html ) {
			html = formJson.data.html;
		}

		let loadButtonGoogleFonts;
		let loadheadGoogleFonts;
		let loadglobalGoogleFonts;
		let loadinputLoadGoogleFonts;

		if ( inputLoadGoogleFonts == true ) {
			const inputconfig = {
				google: {
					families: [
						globalFontFamily +
							( globalFontWeight ? ':' + globalFontWeight : '' ),
					],
				},
			};

			loadinputLoadGoogleFonts = (
				<WebfontLoader config={ inputconfig }></WebfontLoader>
			);
		}

		if ( globalLoadGoogleFonts == true ) {
			const globalconfig = {
				google: {
					families: [
						globalFontFamily +
							( globalFontWeight ? ':' + globalFontWeight : '' ),
					],
				},
			};

			loadglobalGoogleFonts = (
				<WebfontLoader config={ globalconfig }></WebfontLoader>
			);
		}

		if ( buttonLoadGoogleFonts == true ) {
			const buttonconfig = {
				google: {
					families: [
						buttonFontFamily +
							( buttonFontWeight ? ':' + buttonFontWeight : '' ),
					],
				},
			};

			loadButtonGoogleFonts = (
				<WebfontLoader config={ buttonconfig }></WebfontLoader>
			);
		}

		if ( headLoadGoogleFonts == true ) {
			const headconfig = {
				google: {
					families: [
						headFontFamily +
							( headFontWeight ? ':' + headFontWeight : '' ),
					],
				},
			};

			loadheadGoogleFonts = (
				<WebfontLoader config={ headconfig }></WebfontLoader>
			);
		}

		let Options = [];

		if ( cf_blocks_info.is_cartflows_pro_install === '' ) {
			Options = [
				{ value: 'two-column', label: __( 'Two Column', 'cartflows' ) },
				{
					value: 'one-column',
					label: __( 'One Column ( Pro )', 'cartflows' ),
				},
				{
					value: 'two-step',
					label: __( 'Two Step ( Pro )', 'cartflows' ),
				},
			];
		} else {
			Options = [
				{ value: 'two-column', label: __( 'Two Column', 'cartflows' ) },
				{ value: 'one-column', label: __( 'One Column', 'cartflows' ) },
				{ value: 'two-step', label: __( 'Two Step', 'cartflows' ) },
			];
		}

		const layout_settings = () => {
			return (
				<PanelBody
					title={ __( 'Layout', 'cartflows' ) }
					initialOpen={ true }
				>
					<Fragment>
						<SelectControl
							label={ __( 'Select Layout', 'cartflows' ) }
							value={ layout }
							onChange={ ( value ) =>
								setAttributes( { layout: value } )
							}
							options={ Options }
						/>
						{ 'two-step' == layout &&
							cf_blocks_info.is_cartflows_pro_install === '' && (
								<p className="cf-settings-notice">
									{ __(
										'Note: This feature is available in the CartFlows Pro. Upgrade Now!.',
										'cartflows'
									) }
								</p>
							) }
						{ 'one-column' == layout &&
							cf_blocks_info.is_cartflows_pro_install === '' && (
								<p className="cf-settings-notice">
									{ __(
										'Note: This feature is available in the CartFlows Pro. Upgrade Now!.',
										'cartflows'
									) }
								</p>
							) }
					</Fragment>
				</PanelBody>
			);
		};

		const global_settings = () => {
			return (
				<PanelBody
					title={ __( 'Global', 'cartflows' ) }
					initialOpen={ false }
				>
					<p className="cf-setting-label">
						{ __( 'Primary Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: globalbgColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ globalbgColor }
						onChange={ ( colorValue ) =>
							setAttributes( { globalbgColor: colorValue } )
						}
						allowReset
					/>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: globaltextColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ globaltextColor }
						onChange={ ( colorValue ) =>
							setAttributes( { globaltextColor: colorValue } )
						}
						allowReset
					/>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: globalLoadGoogleFonts,
							label: 'globalLoadGoogleFonts',
						} }
						fontFamily={ {
							value: globalFontFamily,
							label: 'globalFontFamily',
						} }
						fontWeight={ {
							value: globalFontWeight,
							label: 'globalFontWeight',
						} }
						fontSubset={ {
							value: globalFontSubset,
							label: 'globalFontSubset',
						} }
						fontSizeType={ {
							value: globalFontSizeType,
							label: 'globalFontSizeType',
						} }
						fontSize={ {
							value: globalFontSize,
							label: 'globalFontSize',
						} }
						fontSizeMobile={ {
							value: globalFontSizeMobile,
							label: 'globalFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: globalFontSizeTablet,
							label: 'globalFontSizeTablet',
						} }
						lineHeightType={ {
							value: globalLineHeightType,
							label: 'globalLineHeightType',
						} }
						lineHeight={ {
							value: globalLineHeight,
							label: 'globalLineHeight',
						} }
						lineHeightMobile={ {
							value: globalLineHeightMobile,
							label: 'globalLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: globalLineHeightTablet,
							label: 'globalLineHeightTablet',
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
					value: 'style-one',
					label: __( 'Floating label ( Pro )', 'cartflows' ),
				},
			];
		} else {
			skinOption = [
				{ value: 'deafult', label: __( 'Default', 'cartflows' ) },
				{
					value: 'style-one',
					label: __( 'Floating label', 'cartflows' ),
				},
			];
		}

		const field_border_setting = () => {
			return (
				<PanelBody
					title={ __( 'Input Field', 'cartflows' ) }
					initialOpen={ false }
				>
					{ 'two-column' == layout && (
						<Fragment>
							<SelectControl
								label={ __( 'Style', 'cartflows' ) }
								value={ inputSkins }
								onChange={ ( value ) =>
									setAttributes( { inputSkins: value } )
								}
								options={ skinOption }
							/>
							{ 'style-one' == inputSkins &&
								cf_blocks_info.is_cartflows_pro_install ===
									'' && (
									<p className="cf-settings-notice">
										{ __(
											'Note: This feature is available in the CartFlows Pro. Upgrade Now!.',
											'cartflows'
										) }
									</p>
								) }
						</Fragment>
					) }
					<h2>{ __( 'Label', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: fieldLabelColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ fieldLabelColor }
						onChange={ ( colorValue ) =>
							setAttributes( { fieldLabelColor: colorValue } )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<h2>
						{ __( 'Input/Text Placeholder Color', 'cartflows' ) }
					</h2>
					<p className="cf-setting-label">
						{ __( 'Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: fieldInputColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ fieldInputColor }
						onChange={ ( colorValue ) =>
							setAttributes( { fieldInputColor: colorValue } )
						}
						allowReset
					/>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: inputLoadGoogleFonts,
							label: 'inputLoadGoogleFonts',
						} }
						fontFamily={ {
							value: inputFontFamily,
							label: 'inputFontFamily',
						} }
						fontWeight={ {
							value: inputFontWeight,
							label: 'inputFontWeight',
						} }
						fontSubset={ {
							value: inputFontSubset,
							label: 'inputFontSubset',
						} }
						fontSizeType={ {
							value: inputFontSizeType,
							label: 'inputFontSizeType',
						} }
						fontSize={ {
							value: inputFontSize,
							label: 'inputFontSize',
						} }
						fontSizeMobile={ {
							value: inputFontSizeMobile,
							label: 'inputFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: inputFontSizeTablet,
							label: 'inputFontSizeTablet',
						} }
						lineHeightType={ {
							value: inputLineHeightType,
							label: 'inputLineHeightType',
						} }
						lineHeight={ {
							value: inputLineHeight,
							label: 'inputLineHeight',
						} }
						lineHeightMobile={ {
							value: inputLineHeightMobile,
							label: 'inputLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: inputLineHeightTablet,
							label: 'inputLineHeightTablet',
						} }
					/>
					<hr className="cf-editor__separator" />
					<p className="cf-setting-label">
						{ __( 'Field Background Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: fieldBgColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ fieldBgColor }
						onChange={ ( colorValue ) =>
							setAttributes( { fieldBgColor: colorValue } )
						}
						allowReset
					/>
					<SelectControl
						label={ __( 'Border Style', 'cartflows' ) }
						value={ fieldBorderStyle }
						onChange={ ( value ) =>
							setAttributes( { fieldBorderStyle: value } )
						}
						options={ [
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
					<RangeControl
						label={ __( 'Border Width (px)', 'cartflows' ) }
						value={ fieldBorderWidth }
						onChange={ ( value ) =>
							setAttributes( { fieldBorderWidth: value } )
						}
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( 'Border Radius (px)', 'cartflows' ) }
						value={ fieldBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { fieldBorderRadius: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
					/>
					<Fragment>
						<p className="uagb-setting-label">
							{ __( 'Border Color', 'cartflows' ) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: fieldBorderColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ fieldBorderColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									fieldBorderColor: colorValue,
								} )
							}
							allowReset
						/>
					</Fragment>
				</PanelBody>
			);
		};

		const headingSettings = () => {
			return (
				<PanelBody
					title={ __( 'Heading', 'cartflows' ) }
					initialOpen={ false }
				>
					<p className="cf-setting-label">
						{ __( 'Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: headBgColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ headBgColor }
						onChange={ ( colorValue ) =>
							setAttributes( { headBgColor: colorValue } )
						}
						allowReset
					/>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: headLoadGoogleFonts,
							label: 'headLoadGoogleFonts',
						} }
						fontFamily={ {
							value: headFontFamily,
							label: 'headFontFamily',
						} }
						fontWeight={ {
							value: headFontWeight,
							label: 'headFontWeight',
						} }
						fontSubset={ {
							value: headFontSubset,
							label: 'headFontSubset',
						} }
						fontSizeType={ {
							value: headFontSizeType,
							label: 'headFontSizeType',
						} }
						fontSize={ {
							value: headFontSize,
							label: 'headFontSize',
						} }
						fontSizeMobile={ {
							value: headFontSizeMobile,
							label: 'headFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: headFontSizeTablet,
							label: 'headFontSizeTablet',
						} }
						lineHeightType={ {
							value: headLineHeightType,
							label: 'headLineHeightType',
						} }
						lineHeight={ {
							value: headLineHeight,
							label: 'headLineHeight',
						} }
						lineHeightMobile={ {
							value: headLineHeightMobile,
							label: 'headLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: headLineHeightTablet,
							label: 'headLineHeightTablet',
						} }
					/>
				</PanelBody>
			);
		};

		const buttonsSettings = () => {
			return (
				<PanelBody
					title={ __( 'Button', 'cartflows' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Background Type', 'cartflows' ) }
						value={ backgroundType }
						onChange={ ( value ) =>
							setAttributes( { backgroundType: value } )
						}
						options={ [
							{
								value: 'color',
								label: __( 'Color', 'cartflows' ),
							},
							{
								value: 'gradient',
								label: __( 'Gradient', 'cartflows' ),
							},
							{
								value: 'image',
								label: __( 'Image', 'cartflows' ),
							},
						] }
					/>
					{ 'color' === backgroundType && (
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
								let tabout;
								if ( 'normal' === tabName.name ) {
									tabout = (
										<Fragment>
											<p className="cf-setting-label">
												{ __(
													'Text Color',
													'cartflows'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: buttonTextColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ buttonTextColor }
												onChange={ ( colorValue ) =>
													setAttributes( {
														buttonTextColor: colorValue,
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
															backgroundColor: backgroundColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ backgroundColor }
												onChange={ ( colorValue ) =>
													setAttributes( {
														backgroundColor: colorValue,
													} )
												}
												allowReset
											/>
										</Fragment>
									);
								} else {
									tabout = (
										<Fragment>
											<p className="cf-setting-label">
												{ __(
													'Text Hover Color',
													'cartflows'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: buttonTextHoverColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ buttonTextHoverColor }
												onChange={ ( colorValue ) =>
													setAttributes( {
														buttonTextHoverColor: colorValue,
													} )
												}
												allowReset
											/>
											<p className="cf-setting-label">
												{ __(
													'Background Hover Color'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: backgroundHoverColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ backgroundHoverColor }
												onChange={ ( colorValue ) =>
													setAttributes( {
														backgroundHoverColor: colorValue,
													} )
												}
												allowReset
											/>
										</Fragment>
									);
								}
								return <div>{ tabout }</div>;
							} }
						</TabPanel>
					) }
					{ 'image' == backgroundType && (
						<Fragment>
							<BaseControl
								className="editor-bg-image-control"
								label={ __( 'Background Image', 'cartflows' ) }
							>
								<MediaUpload
									title={ __(
										'Select Background Image',
										'cartflows'
									) }
									onSelect={ this.onSelectImage }
									allowedTypes={ [ 'image' ] }
									value={ backgroundImage }
									render={ ( { open } ) => (
										<Button isDefault onClick={ open }>
											{ ! backgroundImage
												? __(
														'Select Background Image'
												  )
												: __(
														'Replace image',
														'cartflows'
												  ) }
										</Button>
									) }
								/>
								{ backgroundImage && (
									<Button
										className="cf-rm-btn"
										onClick={ this.onRemoveImage }
										isLink
										isDestructive
									>
										{ __( 'Remove Image', 'cartflows' ) }
									</Button>
								) }
							</BaseControl>
							{ backgroundImage && (
								<Fragment>
									<SelectControl
										label={ __(
											'Image Position',
											'cartflows'
										) }
										value={ backgroundPosition }
										onChange={ ( value ) =>
											setAttributes( {
												backgroundPosition: value,
											} )
										}
										options={ [
											{
												value: 'top-left',
												label: __(
													'Top Left',
													'cartflows'
												),
											},
											{
												value: 'top-center',
												label: __(
													'Top Center',
													'cartflows'
												),
											},
											{
												value: 'top-right',
												label: __(
													'Top Right',
													'cartflows'
												),
											},
											{
												value: 'center-left',
												label: __(
													'Center Left',
													'cartflows'
												),
											},
											{
												value: 'center-center',
												label: __(
													'Center Center',
													'cartflows'
												),
											},
											{
												value: 'center-right',
												label: __(
													'Center Right',
													'cartflows'
												),
											},
											{
												value: 'bottom-left',
												label: __(
													'Bottom Left',
													'cartflows'
												),
											},
											{
												value: 'bottom-center',
												label: __(
													'Bottom Center',
													'cartflows'
												),
											},
											{
												value: 'bottom-right',
												label: __(
													'Bottom Right',
													'cartflows'
												),
											},
										] }
									/>
									<SelectControl
										label={ __(
											'Attachment',
											'cartflows'
										) }
										value={ backgroundAttachment }
										onChange={ ( value ) =>
											setAttributes( {
												backgroundAttachment: value,
											} )
										}
										options={ [
											{
												value: 'fixed',
												label: __(
													'Fixed',
													'cartflows'
												),
											},
											{
												value: 'scroll',
												label: __(
													'Scroll',
													'cartflows'
												),
											},
										] }
									/>
									<SelectControl
										label={ __( 'Repeat', 'cartflows' ) }
										value={ backgroundRepeat }
										onChange={ ( value ) =>
											setAttributes( {
												backgroundRepeat: value,
											} )
										}
										options={ [
											{
												value: 'no-repeat',
												label: __(
													'No Repeat',
													'cartflows'
												),
											},
											{
												value: 'repeat',
												label: __(
													'Repeat',
													'cartflows'
												),
											},
											{
												value: 'repeat-x',
												label: __(
													'Repeat-x',
													'cartflows'
												),
											},
											{
												value: 'repeat-y',
												label: __(
													'Repeat-y',
													'cartflows'
												),
											},
										] }
									/>
									<SelectControl
										label={ __( 'Size', 'cartflows' ) }
										value={ backgroundSize }
										onChange={ ( value ) =>
											setAttributes( {
												backgroundSize: value,
											} )
										}
										options={ [
											{
												value: 'auto',
												label: __(
													'Auto',
													'cartflows'
												),
											},
											{
												value: 'cover',
												label: __(
													'Cover',
													'cartflows'
												),
											},
											{
												value: 'contain',
												label: __(
													'Contain',
													'cartflows'
												),
											},
										] }
									/>
								</Fragment>
							) }
						</Fragment>
					) }
					{ 'gradient' == backgroundType && (
						<Fragment>
							<GradientSettings
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
						</Fragment>
					) }
					{ ( 'color' == backgroundType ||
						( 'image' == backgroundType && backgroundImage ) ||
						'gradient' == backgroundType ) && (
						<RangeControl
							label={ __( 'Opacity', 'cartflows' ) }
							value={ backgroundOpacity }
							onChange={ ( value ) =>
								setAttributes( { backgroundOpacity: value } )
							}
							min={ 0 }
							max={ 100 }
							allowReset
							initialPosition={ 0 }
						/>
					) }
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: buttonLoadGoogleFonts,
							label: 'buttonLoadGoogleFonts',
						} }
						fontFamily={ {
							value: buttonFontFamily,
							label: 'buttonFontFamily',
						} }
						fontWeight={ {
							value: buttonFontWeight,
							label: 'buttonFontWeight',
						} }
						fontSubset={ {
							value: buttonFontSubset,
							label: 'buttonFontSubset',
						} }
						fontSizeType={ {
							value: buttonFontSizeType,
							label: 'buttonFontSizeType',
						} }
						fontSize={ {
							value: buttonFontSize,
							label: 'buttonFontSize',
						} }
						fontSizeMobile={ {
							value: buttonFontSizeMobile,
							label: 'buttonFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: buttonFontSizeTablet,
							label: 'buttonFontSizeTablet',
						} }
						lineHeightType={ {
							value: buttonLineHeightType,
							label: 'buttonLineHeightType',
						} }
						lineHeight={ {
							value: buttonLineHeight,
							label: 'buttonLineHeight',
						} }
						lineHeightMobile={ {
							value: buttonLineHeightMobile,
							label: 'buttonLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: buttonLineHeightTablet,
							label: 'buttonLineHeightTablet',
						} }
					/>
					<hr className="cf-editor__separator" />
					{ btn_border_setting }
					<hr className="cf-editor__separator" />
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
							let tabout;
							if ( 'normal' === tabName.name ) {
								tabout = buttonNormalSettings;
							} else {
								tabout = buttonHoverSettings;
							}
							return <div>{ tabout }</div>;
						} }
					</TabPanel>
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

		//Submit button settings.
		const btn_border_setting = (
			<Fragment>
				<SelectControl
					label={ __( 'Border Style', 'cartflows' ) }
					value={ buttonBorderStyle }
					onChange={ ( value ) =>
						setAttributes( { buttonBorderStyle: value } )
					}
					options={ [
						{ value: 'solid', label: __( 'Solid', 'cartflows' ) },
						{ value: 'dotted', label: __( 'Dotted', 'cartflows' ) },
						{ value: 'dashed', label: __( 'Dashed', 'cartflows' ) },
						{ value: 'double', label: __( 'Double', 'cartflows' ) },
						{ value: 'groove', label: __( 'Groove', 'cartflows' ) },
						{ value: 'inset', label: __( 'Inset', 'cartflows' ) },
						{ value: 'outset', label: __( 'Outset', 'cartflows' ) },
						{ value: 'ridge', label: __( 'Ridge', 'cartflows' ) },
					] }
				/>
				<RangeControl
					label={ __( 'Border Width (px)', 'cartflows' ) }
					value={ buttonBorderWidth }
					onChange={ ( value ) =>
						setAttributes( { buttonBorderWidth: value } )
					}
					min={ 0 }
					max={ 5 }
					allowReset
				/>
				<ButtonGroup
					className="cf-size-type-field"
					aria-label={ __( 'Size Type', 'cartflows' ) }
				>
					<Button
						key={ 'px' }
						className="cf-size-btn"
						isSmall
						isPrimary={ buttonBorderRadiusType === 'px' }
						aria-pressed={ buttonBorderRadiusType === 'px' }
						onClick={ () =>
							setAttributes( { buttonBorderRadiusType: 'px' } )
						}
					>
						{ 'px' }
					</Button>
					<Button
						key={ '%' }
						className="cf-size-btn"
						isSmall
						isPrimary={ buttonBorderRadiusType === '%' }
						aria-pressed={ buttonBorderRadiusType === '%' }
						onClick={ () =>
							setAttributes( { buttonBorderRadiusType: '%' } )
						}
					>
						{ '%' }
					</Button>
				</ButtonGroup>
				<RangeControl
					label={ __( 'Border Radius', 'cartflows' ) }
					value={ buttonBorderRadius }
					onChange={ ( value ) =>
						setAttributes( { buttonBorderRadius: value } )
					}
					min={ 0 }
					max={ 100 }
					allowReset
				/>
			</Fragment>
		);

		const buttonNormalSettings = (
			<Fragment>
				{ 'none' != buttonBorderStyle && (
					<Fragment>
						<p className="cf-setting-label">
							{ __( 'Border Color', 'cartflows' ) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: buttonBorderColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ buttonBorderColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									buttonBorderColor: colorValue,
								} )
							}
							allowReset
						/>
					</Fragment>
				) }
			</Fragment>
		);

		const buttonHoverSettings = (
			<Fragment>
				{ 'none' != buttonBorderStyle && (
					<Fragment>
						<p className="cf-setting-label">
							{ __( 'Border Hover Color', 'cartflows' ) }
							<span className="components-base-control__label">
								<span
									className="component-color-indicator"
									style={ {
										backgroundColor: buttonBorderHoverColor,
									} }
								></span>
							</span>
						</p>
						<ColorPalette
							value={ buttonBorderHoverColor }
							onChange={ ( colorValue ) =>
								setAttributes( {
									buttonBorderHoverColor: colorValue,
								} )
							}
							allowReset
						/>
					</Fragment>
				) }
			</Fragment>
		);

		const payment_Settings = () => {
			return (
				<PanelBody
					title={ __( 'Payment Section', 'cartflows' ) }
					initialOpen={ false }
				>
					<p className="cf-setting-label">
						{ __( 'Title Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: paymenttitleColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ paymenttitleColor }
						onChange={ ( value ) =>
							setAttributes( { paymenttitleColor: value } )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<p className="cf-setting-label">
						{ __( 'Description Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: paymentdescriptionColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ paymentdescriptionColor }
						onChange={ ( value ) =>
							setAttributes( { paymentdescriptionColor: value } )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<p className="cf-setting-label">
						{ __( 'Section Background Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: sectionbgColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ sectionbgColor }
						onChange={ ( value ) =>
							setAttributes( { sectionbgColor: value } )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<p className="cf-setting-label">
						{ __( 'Information Background Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: informationbgColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ informationbgColor }
						onChange={ ( value ) =>
							setAttributes( { informationbgColor: value } )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Section Padding (px)', 'cartflows' ) }</h2>
					<RangeControl
						label={ CF_Block_Icons.horizontal_spacing }
						className={ 'cf-margin-control' }
						value={ sectionvrPadding }
						onChange={ ( value ) =>
							setAttributes( { sectionvrPadding: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
					/>
					<RangeControl
						label={ CF_Block_Icons.vertical_spacing }
						className={ 'cf-margin-control' }
						value={ sectionhrPadding }
						onChange={ ( value ) =>
							setAttributes( { sectionhrPadding: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
					/>
					<h2>{ __( 'Section Margin (px)', 'cartflows' ) }</h2>
					<RangeControl
						label={ CF_Block_Icons.horizontal_spacing }
						className={ 'cf-margin-control' }
						value={ sectionvrMargin }
						onChange={ ( value ) =>
							setAttributes( { sectionvrMargin: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
					/>
					<RangeControl
						label={ CF_Block_Icons.vertical_spacing }
						className={ 'cf-margin-control' }
						value={ sectionhrMargin }
						onChange={ ( value ) =>
							setAttributes( { sectionhrMargin: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
					/>
					<h2>{ __( 'Section Rounded Corners', 'cartflows' ) }</h2>
					<RangeControl
						value={ sectionBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { sectionBorderRadius: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
					/>
				</PanelBody>
			);
		};

		const msg_settings = () => {
			return (
				<PanelBody
					title={ __( 'Success / Error Message', 'cartflows' ) }
					initialOpen={ false }
				>
					<p className="cf-settings-notice">
						{ __(
							'Note: This styling can be only seen at frontend'
						) }
					</p>
					<h2>
						{ __( 'Form success / Error validation', 'cartflows' ) }
					</h2>
					<h2>{ __( 'Field Validation', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Label Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: errorLabelColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ errorLabelColor }
						onChange={ ( colorValue ) =>
							setAttributes( { errorLabelColor: colorValue } )
						}
						allowReset
					/>
					<p className="cf-setting-label">
						{ __( 'Border Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: errorFieldBorderColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ errorFieldBorderColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								errorFieldBorderColor: colorValue,
							} )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Error Message', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Message Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: errorMsgColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ errorMsgColor }
						onChange={ ( colorValue ) =>
							setAttributes( { errorMsgColor: colorValue } )
						}
						allowReset
					/>
					<p className="cf-setting-label">
						{ __( 'Background Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: errorMsgBgColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ errorMsgBgColor }
						onChange={ ( colorValue ) =>
							setAttributes( { errorMsgBgColor: colorValue } )
						}
						allowReset
					/>
					<p className="cf-setting-label">
						{ __( 'Border Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: errorMsgBorderColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ errorMsgBorderColor }
						onChange={ ( colorValue ) =>
							setAttributes( { errorMsgBorderColor: colorValue } )
						}
						allowReset
					/>
				</PanelBody>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					{ layout_settings() }
					{ global_settings() }
					{ headingSettings() }
					{ field_border_setting() }
					{ buttonsSettings() }
					{ payment_Settings() }
					{ msg_settings() }
				</InspectorControls>
				<div
					className={ classnames(
						className,
						'wcf-gb-checkout-form cartflows-gutenberg__checkout-form',
						`cf-block-${ this.props.clientId.substr( 0, 8 ) }`
					) }
				>
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
				{ loadglobalGoogleFonts }
				{ loadButtonGoogleFonts }
				{ loadheadGoogleFonts }
				{ loadinputLoadGoogleFonts }
			</Fragment>
		);
	}
	componentDidMount() {
		this.props.setAttributes( { showprecheckoutoffer: false } );
		// Assigning block_id in the attribute.
		this.props.setAttributes( { isHtml: false } );
		this.props.setAttributes( {
			block_id: this.props.clientId.substr( 0, 8 ),
		} );

		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'cf-checkout-form-style-' + this.props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}

	componentDidUpdate( prevProps, prevState ) {
		var element = document.getElementById(
			'cf-checkout-form-style-' + this.props.clientId.substr( 0, 8 )
		);

		if ( prevProps.attributes.layout != this.props.attributes.layout ) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		// if ( prevProps.attributes.obposition != this.props.attributes.obposition ) {
		// 	const { setAttributes } = this.props
		// 	setAttributes( { isHtml: false } )
		// }

		if (
			prevProps.attributes.orderBumpSkin !=
			this.props.attributes.orderBumpSkin
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.orderBumpCheckboxArrow !=
			this.props.attributes.orderBumpCheckboxArrow
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.orderBumpCheckboxArrowAnimation !=
			this.props.attributes.orderBumpCheckboxArrowAnimation
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.sectionposition !=
			this.props.attributes.sectionposition
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.productOptionsSkin !=
			this.props.attributes.productOptionsSkin
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.productOptionsImages !=
			this.props.attributes.productOptionsImages
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.productOptionsSectionTitleText !=
			this.props.attributes.productOptionsSectionTitleText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.PreSkipText !=
			this.props.attributes.PreSkipText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.PreOrderText !=
			this.props.attributes.PreOrderText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.PreProductTitleText !=
			this.props.attributes.PreProductTitleText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.preSubTitleText !=
			this.props.attributes.preSubTitleText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.preTitleText !=
			this.props.attributes.preTitleText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.PreProductDescText !=
			this.props.attributes.PreProductDescText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		// if ( prevProps.attributes.orderBumpCheckboxLabel != this.props.attributes.orderBumpCheckboxLabel ) {
		// 	const { setAttributes } = this.props
		// 	setAttributes( { isHtml: false } )
		// }

		// if ( prevProps.attributes.orderBumpHighlightText != this.props.attributes.orderBumpHighlightText ) {
		// 	const { setAttributes } = this.props
		// 	setAttributes( { isHtml: false } )
		// }

		// if ( prevProps.attributes.orderBumpCheckboxProductDescription != this.props.attributes.orderBumpCheckboxProductDescription ) {
		// 	const { setAttributes } = this.props
		// 	setAttributes( { isHtml: false } )
		// }

		if (
			prevProps.attributes.inputSkins != this.props.attributes.inputSkins
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.enableNote != this.props.attributes.enableNote
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if ( prevProps.attributes.noteText != this.props.attributes.noteText ) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.stepOneTitleText !=
			this.props.attributes.stepOneTitleText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.stepOneSubTitleText !=
			this.props.attributes.stepOneSubTitleText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.stepTwoTitleText !=
			this.props.attributes.stepTwoTitleText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.stepTwoSubTitleText !=
			this.props.attributes.stepTwoSubTitleText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.offerButtonTitleText !=
			this.props.attributes.offerButtonTitleText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if (
			prevProps.attributes.offerButtonSubTitleText !=
			this.props.attributes.offerButtonSubTitleText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}
	}
}

export default withSelect( ( select, props ) => {
	const { setAttributes } = props;
	const { isHtml } = props.attributes;
	const formId = cf_blocks_info.ID;
	let json_data = '';

	if ( formId && -1 != formId && 0 != formId && ! isHtml ) {
		jQuery.ajax( {
			url: cf_blocks_info.ajax_url,
			data: {
				action: 'wpcf_order_checkout_form_shortcode',
				nonce: cf_blocks_info.wpcf_ajax_nonce,
				id: formId,
				cartflows_gb: true,
				layout: props.attributes.layout,
				// obposition: props.attributes.obposition,
				orderBumpSkin: props.attributes.orderBumpSkin,
				orderBumpCheckboxArrow: props.attributes.orderBumpCheckboxArrow,
				orderBumpCheckboxArrowAnimation:
					props.attributes.orderBumpCheckboxArrowAnimation,
				sectionposition: props.attributes.sectionposition,
				productOptionsSkin: props.attributes.productOptionsSkin,
				productOptionsImages: props.attributes.productOptionsImages,
				productOptionsSectionTitleText:
					props.attributes.productOptionsSectionTitleText,
				PreSkipText: props.attributes.PreSkipText,
				PreOrderText: props.attributes.PreOrderText,
				PreProductTitleText: props.attributes.PreProductTitleText,
				preSubTitleText: props.attributes.preSubTitleText,
				preTitleText: props.attributes.preTitleText,
				PreProductDescText: props.attributes.PreProductDescText,
				// orderBumpCheckboxLabel : props.attributes.orderBumpCheckboxLabel,
				// orderBumpHighlightText : props.attributes.orderBumpHighlightText,
				// orderBumpCheckboxProductDescription : props.attributes.orderBumpCheckboxProductDescription,
				inputSkins: props.attributes.inputSkins,
				enableNote: props.attributes.enableNote,
				noteText: props.attributes.noteText,
				stepOneTitleText: props.attributes.stepOneTitleText,
				stepOneSubTitleText: props.attributes.stepOneSubTitleText,
				stepTwoTitleText: props.attributes.stepTwoTitleText,
				stepTwoSubTitleText: props.attributes.stepTwoSubTitleText,
				offerButtonTitleText: props.attributes.offerButtonTitleText,
				offerButtonSubTitleText:
					props.attributes.offerButtonSubTitleText,
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
} )( CFCheckoutFormEdit );

// export default cfCheckoutFormEdit
