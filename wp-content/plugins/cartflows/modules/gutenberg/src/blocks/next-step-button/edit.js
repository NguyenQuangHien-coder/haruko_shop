/**
 * BLOCK: Next Step Button Block
 */

// Import block dependencies and components.
import classnames from 'classnames';
import styling from './styling';
import CF_Block_Icons from '../../../dist/blocks/controls/block-icons';

import CFIcon from '../../../dist/blocks/controls/CFIcon.json';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import renderSVG from '../../../dist/blocks/controls/render-icon';
// Import all of our Text Options requirements.
import TypographyControl from '../../components/typography';
import GradientSettings from '../../components/gradient-settings';

// Import Web font loader for google fonts.
import WebfontLoader from '../../components/typography/fontloader';

const { __ } = wp.i18n;

const {
	BlockAlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	ColorPalette,
	MediaUpload,
} = wp.blockEditor;

const {
	PanelBody,
	SelectControl,
	RangeControl,
	ButtonGroup,
	Button,
	TabPanel,
	Dashicon,
	BaseControl,
} = wp.components;

let svg_icons = Object.keys( CFIcon );

const { Component, Fragment } = wp.element;

class NextStepButton extends Component {
	constructor() {
		super( ...arguments );
		this.getIcon = this.getIcon.bind( this );
		// this.splitBlock = this.splitBlock.bind( this )
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onSelectImage = this.onSelectImage.bind( this );
	}

	getIcon( value ) {
		this.props.setAttributes( { icon: value } );
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

	componentDidMount() {
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
			'wpcf-next-step-button-style-' + this.props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}

	componentDidUpdate( prevProps, prevState ) {
		var element = document.getElementById(
			'wpcf-next-step-button-style-' + this.props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props );
		}
	}

	render() {
		// Setup the attributes
		const {
			className,
			attributes,
			setAttributes,
			attributes: {
				// Icon
				icon,
				iconColor,
				iconHoverColor,
				iconSize,
				iconPosition,
				iconSpacing,
				nextStepButtonTitle,
				nextStepButtonSubTitle,
				align,
				malign,
				talign,
				titletextTransform,
				subtitletextTransform,
				titleletterSpacing,
				subtitleletterSpacing,
				// Alignment
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
				backgroundType,
				backgroundImage,
				backgroundColor,
				backgroundPosition,
				backgroundAttachment,
				backgroundRepeat,
				backgroundSize,
				backgroundOpacity,
				backgroundImageColor,
			},
		} = this.props;

		let loadTitleGoogleFonts;
		let loadSubTitleGoogleFonts;

		if ( titleLoadGoogleFonts == true ) {
			const titleconfig = {
				google: {
					families: [
						titleFontFamily +
							( titleFontWeight ? ':' + titleFontWeight : '' ),
					],
				},
			};

			loadTitleGoogleFonts = (
				<WebfontLoader config={ titleconfig }></WebfontLoader>
			);
		}

		if ( subTitleLoadGoogleFonts == true ) {
			const subtitleconfig = {
				google: {
					families: [
						subTitleFontFamily +
							( subTitleFontWeight
								? ':' + subTitleFontWeight
								: '' ),
					],
				},
			};

			loadSubTitleGoogleFonts = (
				<WebfontLoader config={ subtitleconfig }></WebfontLoader>
			);
		}

		// Icon properties.
		const icon_props = {
			icons: svg_icons,
			value: icon,
			onChange: this.getIcon,
			isMulti: false,
			renderFunc: renderSVG,
			noSelectedPlaceholder: __( 'Select Icon', 'cartflows' ),
		};

		let icon_html = '';

		if ( '' != icon ) {
			icon_html = (
				<div className="wpcf__next-step-button-icon">
					{ renderSVG( icon ) }
				</div>
			);
		}

		const nextStepButtonGeneralSettings = () => {
			return (
				<PanelBody
					title={ __( 'General', 'cartflows' ) }
					initialOpen={ true }
				>
					<TabPanel
						className="cf-size-type-field-tabs cf-size-type-field__common-tabs cf-inline-margin"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'desktop',
								title: <Dashicon icon="desktop" />,
								className: 'cf-desktop-tab cf-responsive-tabs',
							},
							{
								name: 'tablet',
								title: <Dashicon icon="tablet" />,
								className: 'cf-tablet-tab cf-responsive-tabs',
							},
							{
								name: 'mobile',
								title: <Dashicon icon="smartphone" />,
								className: 'cf-mobile-tab cf-responsive-tabs',
							},
						] }
					>
						{ ( tab ) => {
							let tabout;

							if ( 'mobile' === tab.name ) {
								tabout = (
									<Fragment>
										<h2>
											{ __( 'Alignment', 'cartflows' ) }
										</h2>
										<BaseControl>
											<BlockAlignmentToolbar
												value={ malign }
												onChange={ ( value ) =>
													setAttributes( {
														malign: value,
													} )
												}
												controls={ [
													'left',
													'center',
													'right',
												] }
												isCollapsed={ false }
											/>
										</BaseControl>
									</Fragment>
								);
							} else if ( 'tablet' === tab.name ) {
								tabout = (
									<Fragment>
										<h2>
											{ __( 'Alignment', 'cartflows' ) }
										</h2>
										<BaseControl>
											<BlockAlignmentToolbar
												value={ talign }
												onChange={ ( value ) =>
													setAttributes( {
														talign: value,
													} )
												}
												controls={ [
													'left',
													'center',
													'right',
												] }
												isCollapsed={ false }
											/>
										</BaseControl>
									</Fragment>
								);
							} else {
								tabout = (
									<Fragment>
										<h2>
											{ __( 'Alignment', 'cartflows' ) }
										</h2>
										<BaseControl>
											<BlockAlignmentToolbar
												value={ align }
												onChange={ ( value ) =>
													setAttributes( {
														align: value,
													} )
												}
												controls={ [
													'left',
													'center',
													'right',
													'full',
												] }
												isCollapsed={ false }
											/>
										</BaseControl>
										{ 'full' != align && (
											<SelectControl
												label={ __(
													'Text Alignment',
													'cartflows'
												) }
												value={ textAlignment }
												onChange={ ( value ) =>
													setAttributes( {
														textAlignment: value,
													} )
												}
												options={ [
													{
														value: 'center',
														label: __(
															'Center',
															'cartflows'
														),
													},
													{
														value: 'left',
														label: __(
															'Left',
															'cartflows'
														),
													},
													{
														value: 'right',
														label: __(
															'Right',
															'cartflows'
														),
													},
												] }
											/>
										) }
									</Fragment>
								);
							}
							return <div>{ tabout }</div>;
						} }
					</TabPanel>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Icon', 'cartflows' ) }</h2>
					<FontIconPicker { ...icon_props } />
					{ '' != icon && (
						<Fragment>
							<SelectControl
								label={ __( 'Icon Position', 'cartflows' ) }
								value={ iconPosition }
								onChange={ ( value ) =>
									setAttributes( { iconPosition: value } )
								}
								options={ [
									{
										value: 'before_title',
										label: __(
											'Before Title',
											'cartflows'
										),
									},
									{
										value: 'after_title',
										label: __( 'After Title', 'cartflows' ),
									},
									{
										value: 'before_title_sub_title',
										label: __(
											'Before Title & Sub Title',
											'cartflows'
										),
									},
									{
										value: 'after_title_sub_title',
										label: __(
											'After Title & Sub Title',
											'cartflows'
										),
									},
								] }
							/>
							<RangeControl
								label={ __( 'Icon Size', 'cartflows' ) }
								value={ iconSize }
								onChange={ ( value ) =>
									setAttributes( { iconSize: value } )
								}
								min={ 0 }
								max={ 300 }
								beforeIcon=""
								allowReset
							/>
							<RangeControl
								label={ __( 'Icon Spacing', 'cartflows' ) }
								value={ iconSpacing }
								onChange={ ( value ) =>
									setAttributes( { iconSpacing: value } )
								}
								min={ 0 }
								max={ 300 }
								beforeIcon=""
								allowReset
							/>
						</Fragment>
					) }
				</PanelBody>
			);
		};

		const nextStepButtonContentSettings = () => {
			return (
				<PanelBody
					title={ __( 'Content', 'cartflows' ) }
					initialOpen={ false }
				>
					<h2>{ __( 'Text', 'cartflows' ) }</h2>
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
											{ __( 'Color', 'cartflows' ) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: textColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={ textColor }
											onChange={ ( colorValue ) =>
												setAttributes( {
													textColor: colorValue,
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
											{ __( 'Hover Color', 'cartflows' ) }
											<span className="components-base-control__label">
												<span
													className="component-color-indicator"
													style={ {
														backgroundColor: textHoverColor,
													} }
												></span>
											</span>
										</p>
										<ColorPalette
											value={ textHoverColor }
											onChange={ ( colorValue ) =>
												setAttributes( {
													textHoverColor: colorValue,
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
					<h2>{ __( 'Title', 'cartflows' ) }</h2>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: titleLoadGoogleFonts,
							label: 'titleLoadGoogleFonts',
						} }
						fontFamily={ {
							value: titleFontFamily,
							label: 'titleFontFamily',
						} }
						fontWeight={ {
							value: titleFontWeight,
							label: 'titleFontWeight',
						} }
						fontSubset={ {
							value: titleFontSubset,
							label: 'titleFontSubset',
						} }
						fontSizeType={ {
							value: titleFontSizeType,
							label: 'titleFontSizeType',
						} }
						fontSize={ {
							value: titleFontSize,
							label: 'titleFontSize',
						} }
						fontSizeMobile={ {
							value: titleFontSizeMobile,
							label: 'titleFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: titleFontSizeTablet,
							label: 'titleFontSizeTablet',
						} }
						lineHeightType={ {
							value: titleLineHeightType,
							label: 'titleLineHeightType',
						} }
						lineHeight={ {
							value: titleLineHeight,
							label: 'titleLineHeight',
						} }
						lineHeightMobile={ {
							value: titleLineHeightMobile,
							label: 'titleLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: titleLineHeightTablet,
							label: 'titleLineHeightTablet',
						} }
					/>
					<hr className="cf-editor__separator" />
					<SelectControl
						label={ __( 'Text Transform', 'cartflows' ) }
						value={ titletextTransform }
						onChange={ ( value ) =>
							setAttributes( { titletextTransform: value } )
						}
						options={ [
							{ value: 'none', label: __( 'None', 'cartflows' ) },
							{
								value: 'capitalize',
								label: __( 'Capitalize', 'cartflows' ),
							},
							{
								value: 'uppercase',
								label: __( 'Uppercase', 'cartflows' ),
							},
							{
								value: 'lowercase',
								label: __( 'Lowercase', 'cartflows' ),
							},
						] }
					/>
					<h2>{ __( 'Letter Spacing (px)', 'cartflows' ) }</h2>
					<RangeControl
						className={ 'cf-margin-control' }
						value={ titleletterSpacing }
						onChange={ ( value ) =>
							setAttributes( { titleletterSpacing: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Sub Title', 'cartflows' ) }</h2>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: subTitleLoadGoogleFonts,
							label: 'subTitleLoadGoogleFonts',
						} }
						fontFamily={ {
							value: subTitleFontFamily,
							label: 'subTitleFontFamily',
						} }
						fontWeight={ {
							value: subTitleFontWeight,
							label: 'subTitleFontWeight',
						} }
						fontSubset={ {
							value: subTitleFontSubset,
							label: 'subTitleFontSubset',
						} }
						fontSizeType={ {
							value: subTitleFontSizeType,
							label: 'subTitleFontSizeType',
						} }
						fontSize={ {
							value: subTitleFontSize,
							label: 'subTitleFontSize',
						} }
						fontSizeMobile={ {
							value: subTitleFontSizeMobile,
							label: 'subTitleFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: subTitleFontSizeTablet,
							label: 'subTitleFontSizeTablet',
						} }
						lineHeightType={ {
							value: subTitleLineHeightType,
							label: 'subTitleLineHeightType',
						} }
						lineHeight={ {
							value: subTitleLineHeight,
							label: 'subTitleLineHeight',
						} }
						lineHeightMobile={ {
							value: subTitleLineHeightMobile,
							label: 'subTitleLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: subTitleLineHeightTablet,
							label: 'subTitleLineHeightTablet',
						} }
					/>
					<hr className="cf-editor__separator" />
					<SelectControl
						label={ __( 'Text Transform', 'cartflows' ) }
						value={ subtitletextTransform }
						onChange={ ( value ) =>
							setAttributes( { subtitletextTransform: value } )
						}
						options={ [
							{ value: 'none', label: __( 'None', 'cartflows' ) },
							{
								value: 'capitalize',
								label: __( 'Capitalize', 'cartflows' ),
							},
							{
								value: 'uppercase',
								label: __( 'Uppercase', 'cartflows' ),
							},
							{
								value: 'lowercase',
								label: __( 'Lowercase', 'cartflows' ),
							},
						] }
					/>
					<h2>{ __( 'Letter Spacing (px)', 'cartflows' ) }</h2>
					<RangeControl
						className={ 'cf-margin-control' }
						value={ subtitleletterSpacing }
						onChange={ ( value ) =>
							setAttributes( { subtitleletterSpacing: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
					/>
				</PanelBody>
			);
		};

		const nextStepButtonStyleSettings = () => {
			return (
				<PanelBody
					title={ __( 'Style', 'cartflows' ) }
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
													'Button Hover Color',
													'cartflows'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: buttonHoverColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ buttonHoverColor }
												onChange={ ( colorValue ) =>
													setAttributes( {
														buttonHoverColor: colorValue,
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
														'Select Background Image',
														'cartflows'
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
					{ '' != icon && (
						<Fragment>
							<hr className="cf-editor__separator" />
							<h2>{ __( 'Icon', 'cartflows' ) }</h2>
							<p className="cf-setting-label">
								{ __( 'Icon Color', 'cartflows' ) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ { backgroundColor: iconColor } }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ iconColor }
								onChange={ ( colorValue ) =>
									setAttributes( { iconColor: colorValue } )
								}
								allowReset
							/>
							<p className="cf-setting-label">
								{ __( 'Icon Hover Color', 'cartflows' ) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: iconHoverColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ iconHoverColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										iconHoverColor: colorValue,
									} )
								}
								allowReset
							/>
						</Fragment>
					) }
					<hr className="cf-editor__separator" />
					<SelectControl
						label={ __( 'Border Style', 'cartflows' ) }
						value={ borderStyle }
						onChange={ ( value ) =>
							setAttributes( { borderStyle: value } )
						}
						options={ [
							{ value: 'none', label: __( 'None', 'cartflows' ) },
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
					{ 'none' != borderStyle && (
						<RangeControl
							label={ __( 'Border Width', 'cartflows' ) }
							value={ borderWidth }
							onChange={ ( value ) =>
								setAttributes( { borderWidth: value } )
							}
							min={ 0 }
							max={ 50 }
							allowReset
						/>
					) }
					{ 'none' != borderStyle && (
						<RangeControl
							label={ __( 'Border Radius', 'cartflows' ) }
							value={ borderRadius }
							onChange={ ( value ) =>
								setAttributes( { borderRadius: value } )
							}
							min={ 0 }
							max={ 1000 }
							allowReset
						/>
					) }
					{ 'none' != borderStyle && (
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
													'Border Color',
													'cartflows'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: borderColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ borderColor }
												onChange={ ( colorValue ) =>
													setAttributes( {
														borderColor: colorValue,
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
													'Border Hover Color',
													'cartflows'
												) }
												<span className="components-base-control__label">
													<span
														className="component-color-indicator"
														style={ {
															backgroundColor: borderHoverColor,
														} }
													></span>
												</span>
											</p>
											<ColorPalette
												value={ borderHoverColor }
												onChange={ ( colorValue ) =>
													setAttributes( {
														borderHoverColor: colorValue,
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
					<TabPanel
						className="cf-size-type-field-tabs cf-size-type-field__common-tabs cf-inline-margin"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'desktop',
								title: <Dashicon icon="desktop" />,
								className: 'cf-desktop-tab cf-responsive-tabs',
							},
							{
								name: 'tablet',
								title: <Dashicon icon="tablet" />,
								className: 'cf-tablet-tab cf-responsive-tabs',
							},
							{
								name: 'mobile',
								title: <Dashicon icon="smartphone" />,
								className: 'cf-mobile-tab cf-responsive-tabs',
							},
						] }
					>
						{ ( tab ) => {
							let tabout;

							if ( 'mobile' === tab.name ) {
								tabout = (
									<Fragment>
										<ButtonGroup
											className="cf-size-type-field"
											aria-label={ __(
												'Size Type',
												'cartflows'
											) }
										>
											<Button
												key={ 'px' }
												className="cf-size-btn"
												isSmall
												isPrimary={
													paddingTypeMobile === 'px'
												}
												aria-pressed={
													paddingTypeMobile === 'px'
												}
												onClick={ () =>
													setAttributes( {
														paddingTypeMobile: 'px',
													} )
												}
											>
												{ 'px' }
											</Button>
											<Button
												key={ '%' }
												className="cf-size-btn"
												isSmall
												isPrimary={
													paddingTypeMobile === '%'
												}
												aria-pressed={
													paddingTypeMobile === '%'
												}
												onClick={ () =>
													setAttributes( {
														paddingTypeMobile: '%',
													} )
												}
											>
												{ '%' }
											</Button>
										</ButtonGroup>
										<h2>
											{ __( 'Padding', 'cartflows' ) }
										</h2>
										<RangeControl
											label={
												CF_Block_Icons.vertical_spacing
											}
											className={ 'cf-margin-control' }
											value={ vPaddingMobile }
											onChange={ ( value ) =>
												setAttributes( {
													vPaddingMobile: value,
												} )
											}
											min={ 0 }
											max={ 100 }
											allowReset
										/>
										<RangeControl
											label={
												CF_Block_Icons.horizontal_spacing
											}
											className={ 'cf-margin-control' }
											value={ hPaddingMobile }
											onChange={ ( value ) =>
												setAttributes( {
													hPaddingMobile: value,
												} )
											}
											min={ 0 }
											max={ 100 }
											allowReset
										/>
									</Fragment>
								);
							} else if ( 'tablet' === tab.name ) {
								tabout = (
									<Fragment>
										<ButtonGroup
											className="cf-size-type-field"
											aria-label={ __(
												'Size Type',
												'cartflows'
											) }
										>
											<Button
												key={ 'px' }
												className="cf-size-btn"
												isSmall
												isPrimary={
													paddingTypeTablet === 'px'
												}
												aria-pressed={
													paddingTypeTablet === 'px'
												}
												onClick={ () =>
													setAttributes( {
														paddingTypeTablet: 'px',
													} )
												}
											>
												{ 'px' }
											</Button>
											<Button
												key={ '%' }
												className="cf-size-btn"
												isSmall
												isPrimary={
													paddingTypeTablet === '%'
												}
												aria-pressed={
													paddingTypeTablet === '%'
												}
												onClick={ () =>
													setAttributes( {
														paddingTypeTablet: '%',
													} )
												}
											>
												{ '%' }
											</Button>
										</ButtonGroup>
										<h2>
											{ __( 'Padding', 'cartflows' ) }
										</h2>
										<RangeControl
											label={
												CF_Block_Icons.vertical_spacing
											}
											className={ 'cf-margin-control' }
											value={ vPaddingTablet }
											onChange={ ( value ) =>
												setAttributes( {
													vPaddingTablet: value,
												} )
											}
											min={ 0 }
											max={ 100 }
											allowReset
										/>
										<RangeControl
											label={
												CF_Block_Icons.horizontal_spacing
											}
											className={ 'cf-margin-control' }
											value={ hPaddingTablet }
											onChange={ ( value ) =>
												setAttributes( {
													hPaddingTablet: value,
												} )
											}
											min={ 0 }
											max={ 100 }
											allowReset
										/>
									</Fragment>
								);
							} else {
								tabout = (
									<Fragment>
										<ButtonGroup className="cf-size-type-field">
											<Button
												key={ 'px' }
												className="cf-size-btn"
												isSmall
												isPrimary={
													paddingTypeDesktop === 'px'
												}
												aria-pressed={
													paddingTypeDesktop === 'px'
												}
												onClick={ () =>
													setAttributes( {
														paddingTypeDesktop:
															'px',
													} )
												}
											>
												{ 'px' }
											</Button>
											<Button
												key={ '%' }
												className="cf-size-btn"
												isSmall
												isPrimary={
													paddingTypeDesktop === '%'
												}
												aria-pressed={
													paddingTypeDesktop === '%'
												}
												onClick={ () =>
													setAttributes( {
														paddingTypeDesktop: '%',
													} )
												}
											>
												{ '%' }
											</Button>
										</ButtonGroup>
										<h2>
											{ __( 'Padding', 'cartflows' ) }
										</h2>
										<RangeControl
											label={
												CF_Block_Icons.vertical_spacing
											}
											className={ 'cf-margin-control' }
											value={ vPaddingDesktop }
											onChange={ ( value ) =>
												setAttributes( {
													vPaddingDesktop: value,
												} )
											}
											min={ 0 }
											max={ 100 }
											allowReset
										/>
										<RangeControl
											label={
												CF_Block_Icons.horizontal_spacing
											}
											className={ 'cf-margin-control' }
											value={ hPaddingDesktop }
											onChange={ ( value ) =>
												setAttributes( {
													hPaddingDesktop: value,
												} )
											}
											min={ 0 }
											max={ 100 }
											allowReset
										/>
									</Fragment>
								);
							}

							return <div>{ tabout }</div>;
						} }
					</TabPanel>
					<hr className="cf-editor__separator" />
					<RangeControl
						label={ __( 'Title Bottom Spacing (px)', 'cartflows' ) }
						value={ titleBottomSpacing }
						onChange={ ( value ) =>
							setAttributes( { titleBottomSpacing: value } )
						}
						min={ 0 }
						max={ 500 }
						beforeIcon=""
						allowReset
						initialPosition={ 0 }
					/>
				</PanelBody>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					{ nextStepButtonGeneralSettings() }
					{ nextStepButtonStyleSettings() }
					{ nextStepButtonContentSettings() }
				</InspectorControls>
				<div
					className={ classnames(
						className,
						`cf-block-${ this.props.clientId.substr( 0, 8 ) }`
					) }
				>
					<div className="wpcf__next-step-button">
						<div className="wpcf__next-step-button-wrap">
							<a href="#" className="wpcf__next-step-button-link">
								{ iconPosition === 'before_title_sub_title' &&
									icon_html }
								<span className="wpcf__next-step-button-content-wrap">
									<div className="wpcf__next-step-button-title-wrap">
										{ iconPosition === 'before_title' &&
											icon_html }
										<RichText
											placeholder={ __(
												'Add text…',
												'cartflows'
											) }
											value={ nextStepButtonTitle }
											tagName="span"
											onChange={ ( value ) => {
												setAttributes( {
													nextStepButtonTitle: value,
												} );
											} }
											className="wpcf__next-step-button-title"
										/>
										{ iconPosition === 'after_title' &&
											icon_html }
									</div>
									<RichText
										placeholder={ __(
											'Add text…',
											'cartflows'
										) }
										value={ nextStepButtonSubTitle }
										tagName="div"
										onChange={ ( value ) => {
											setAttributes( {
												nextStepButtonSubTitle: value,
											} );
										} }
										className="wpcf__next-step-button-sub-title"
									/>
								</span>
								{ iconPosition === 'after_title_sub_title' &&
									icon_html }
							</a>
						</div>
					</div>
				</div>
				{ loadTitleGoogleFonts }
				{ loadSubTitleGoogleFonts }
			</Fragment>
		);
	}
}

export default NextStepButton;
