/**
 * BLOCK: Order Detail Form Block
 */

// Import block dependencies and components.
import classnames from 'classnames';
import styling from './styling';

// Import all of our Text Options requirements.
import TypographyControl from '../../components/typography';

// Import Web font loader for google fonts.
import WebfontLoader from '../../components/typography/fontloader';

const { __ } = wp.i18n;

const {
	BlockControls,
	InspectorControls,
	ColorPalette,
	MediaUpload,
} = wp.blockEditor;

const { withSelect } = wp.data;

const {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	RangeControl,
	Placeholder,
	Spinner,
	BaseControl,
	Button,
} = wp.components;

const { Component, Fragment } = wp.element;

class OrderDetailForm extends Component {
	constructor() {
		super( ...arguments );
		this.getIcon = this.getIcon.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.onSelectImage = this.onSelectImage.bind( this );
		//order review
		this.onOdRemoveImage = this.onOdRemoveImage.bind( this );
		this.onOdSelectImage = this.onOdSelectImage.bind( this );
		//downloads
		this.ondRemoveImage = this.ondRemoveImage.bind( this );
		this.ondSelectImage = this.ondSelectImage.bind( this );
		//Order details
		this.onorderdetailRemoveImage = this.onorderdetailRemoveImage.bind(
			this
		);
		this.onorderdetailSelectImage = this.onorderdetailSelectImage.bind(
			this
		);
		//customer details
		this.oncdRemoveImage = this.oncdRemoveImage.bind( this );
		this.oncdSelectImage = this.oncdSelectImage.bind( this );
	}

	/*
	 * Event to set Image as null while removing customer detail.
	 */
	oncdRemoveImage() {
		const { setAttributes } = this.props;

		setAttributes( { cdetailbackgroundImage: null } );
	}

	/*
	 * Event to set Image as while adding customer detail.
	 */
	oncdSelectImage( media ) {
		const { setAttributes } = this.props;

		if ( ! media || ! media.url ) {
			setAttributes( { cdetailbackgroundImage: null } );
			return;
		}

		if ( ! media.type || 'image' != media.type ) {
			return;
		}

		setAttributes( { cdetailbackgroundImage: media } );
	}

	/*
	 * Event to set Image as null while removing orderdetail.
	 */
	onorderdetailRemoveImage() {
		const { setAttributes } = this.props;

		setAttributes( { odetailbackgroundImage: null } );
	}

	/*
	 * Event to set Image as while adding orderdetail.
	 */
	onorderdetailSelectImage( media ) {
		const { setAttributes } = this.props;

		if ( ! media || ! media.url ) {
			setAttributes( { odetailbackgroundImage: null } );
			return;
		}

		if ( ! media.type || 'image' != media.type ) {
			return;
		}

		setAttributes( { odetailbackgroundImage: media } );
	}

	/*
	 * Event to set Image as null while removing downloads.
	 */
	ondRemoveImage() {
		const { setAttributes } = this.props;

		setAttributes( { dbackgroundImage: null } );
	}

	/*
	 * Event to set Image as while adding downloads.
	 */
	ondSelectImage( media ) {
		const { setAttributes } = this.props;

		if ( ! media || ! media.url ) {
			setAttributes( { dbackgroundImage: null } );
			return;
		}

		if ( ! media.type || 'image' != media.type ) {
			return;
		}

		setAttributes( { dbackgroundImage: media } );
	}

	/*
	 * Event to set Image as null while removing order review.
	 */
	onOdRemoveImage() {
		const { setAttributes } = this.props;

		setAttributes( { odbackgroundImage: null } );
	}

	/*
	 * Event to set Image as while adding order review.
	 */
	onOdSelectImage( media ) {
		const { setAttributes } = this.props;

		if ( ! media || ! media.url ) {
			setAttributes( { odbackgroundImage: null } );
			return;
		}

		if ( ! media.type || 'image' != media.type ) {
			return;
		}

		setAttributes( { odbackgroundImage: media } );
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
			'wpcf-order-detail-form-style-' + this.props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );
	}

	componentDidUpdate( prevProps, prevState ) {
		var element = document.getElementById(
			'wpcf-order-detail-form-style-' + this.props.clientId.substr( 0, 8 )
		);

		if (
			prevProps.attributes.thanyouText !=
			this.props.attributes.thanyouText
		) {
			const { setAttributes } = this.props;
			setAttributes( { isHtml: false } );
		}

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
				formJson,
				isHtml,
				// Genaral
				orderOverview,
				orderDetails,
				billingAddress,
				shippingAddress,
				// Thank you text
				thanyouText,
				// Spacing
				headingBottomSpacing,
				sectionSpacing,
				// Heading
				headingAlignment,
				headingColor,
				headingLoadGoogleFonts,
				headingFontFamily,
				headingFontWeight,
				headingFontSubset,
				headingFontSizeType,
				headingLineHeightType,
				headingFontSize,
				headingFontSizeTablet,
				headingFontSizeMobile,
				headingLineHeight,
				headingLineHeightTablet,
				headingLineHeightMobile,
				// Sections
				sectionHeadingColor,
				sectionHeadingLoadGoogleFonts,
				sectionHeadingFontFamily,
				sectionHeadingFontWeight,
				sectionHeadingFontSubset,
				sectionHeadingFontSizeType,
				sectionHeadingLineHeightType,
				sectionHeadingFontSize,
				sectionHeadingFontSizeTablet,
				sectionHeadingFontSizeMobile,
				sectionHeadingLineHeight,
				sectionHeadingLineHeightTablet,
				sectionHeadingLineHeightMobile,
				sectionContentColor,
				sectionContentLoadGoogleFonts,
				sectionContentFontFamily,
				sectionContentFontWeight,
				sectionContentFontSubset,
				sectionContentFontSizeType,
				sectionContentLineHeightType,
				sectionContentFontSize,
				sectionContentFontSizeTablet,
				sectionContentFontSizeMobile,
				sectionContentLineHeight,
				sectionContentLineHeightTablet,
				sectionContentLineHeightMobile,
				sectionBackgroundColor,
				// Order Overview
				orderOverviewTextColor,
				orderOverviewBackgroundColor,
				orderOverviewLoadGoogleFonts,
				orderOverviewFontFamily,
				orderOverviewFontWeight,
				orderOverviewFontSubset,
				orderOverviewFontSizeType,
				orderOverviewLineHeightType,
				orderOverviewFontSize,
				orderOverviewFontSizeTablet,
				orderOverviewFontSizeMobile,
				orderOverviewLineHeight,
				orderOverviewLineHeightTablet,
				orderOverviewLineHeightMobile,
				// Downloads
				downloadHeadingColor,
				downloadHeadingLoadGoogleFonts,
				downloadHeadingFontFamily,
				downloadHeadingFontWeight,
				downloadHeadingFontSubset,
				downloadHeadingFontSizeType,
				downloadHeadingLineHeightType,
				downloadHeadingFontSize,
				downloadHeadingFontSizeTablet,
				downloadHeadingFontSizeMobile,
				downloadHeadingLineHeight,
				downloadHeadingLineHeightTablet,
				downloadHeadingLineHeightMobile,
				downloadContentColor,
				downloadContentLoadGoogleFonts,
				downloadContentFontFamily,
				downloadContentFontWeight,
				downloadContentFontSubset,
				downloadContentFontSizeType,
				downloadContentLineHeightType,
				downloadContentFontSize,
				downloadContentFontSizeTablet,
				downloadContentFontSizeMobile,
				downloadContentLineHeight,
				downloadContentLineHeightTablet,
				downloadContentLineHeightMobile,
				downloadBackgroundColor,
				// Order Details
				orderDetailHeadingColor,
				orderDetailHeadingLoadGoogleFonts,
				orderDetailHeadingFontFamily,
				orderDetailHeadingFontWeight,
				orderDetailHeadingFontSubset,
				orderDetailHeadingFontSizeType,
				orderDetailHeadingLineHeightType,
				orderDetailHeadingFontSize,
				orderDetailHeadingFontSizeTablet,
				orderDetailHeadingFontSizeMobile,
				orderDetailHeadingLineHeight,
				orderDetailHeadingLineHeightTablet,
				orderDetailHeadingLineHeightMobile,
				orderDetailContentColor,
				orderDetailContentLoadGoogleFonts,
				orderDetailContentFontFamily,
				orderDetailContentFontWeight,
				orderDetailContentFontSubset,
				orderDetailContentFontSizeType,
				orderDetailContentLineHeightType,
				orderDetailContentFontSize,
				orderDetailContentFontSizeTablet,
				orderDetailContentFontSizeMobile,
				orderDetailContentLineHeight,
				orderDetailContentLineHeightTablet,
				orderDetailContentLineHeightMobile,
				orderDetailBackgroundColor,
				// Customer Details
				customerDetailHeadingColor,
				customerDetailHeadingLoadGoogleFonts,
				customerDetailHeadingFontFamily,
				customerDetailHeadingFontWeight,
				customerDetailHeadingFontSubset,
				customerDetailHeadingFontSizeType,
				customerDetailHeadingLineHeightType,
				customerDetailHeadingFontSize,
				customerDetailHeadingFontSizeTablet,
				customerDetailHeadingFontSizeMobile,
				customerDetailHeadingLineHeight,
				customerDetailHeadingLineHeightTablet,
				customerDetailHeadingLineHeightMobile,
				customerDetailContentColor,
				customerDetailContentLoadGoogleFonts,
				customerDetailContentFontFamily,
				customerDetailContentFontWeight,
				customerDetailContentFontSubset,
				customerDetailContentFontSizeType,
				customerDetailContentLineHeightType,
				customerDetailContentFontSize,
				customerDetailContentFontSizeTablet,
				customerDetailContentFontSizeMobile,
				customerDetailContentLineHeight,
				customerDetailContentLineHeightTablet,
				customerDetailContentLineHeightMobile,
				customerDetailBackgroundColor,
				backgroundType,
				backgroundImage,
				backgroundColor,
				backgroundPosition,
				backgroundAttachment,
				backgroundRepeat,
				backgroundSize,
				backgroundOpacity,
				backgroundImageColor,
				odbackgroundType,
				odbackgroundImage,
				odbackgroundColor,
				odbackgroundPosition,
				odbackgroundAttachment,
				odbackgroundRepeat,
				odbackgroundSize,
				odbackgroundOpacity,
				odbackgroundImageColor,
				dbackgroundType,
				dbackgroundImage,
				dbackgroundColor,
				dbackgroundPosition,
				dbackgroundAttachment,
				dbackgroundRepeat,
				dbackgroundSize,
				dbackgroundOpacity,
				dbackgroundImageColor,
				odetailbackgroundType,
				odetailbackgroundImageColor,
				odetailbackgroundImage,
				odetailbackgroundColor,
				odetailbackgroundPosition,
				odetailbackgroundAttachment,
				odetailbackgroundRepeat,
				odetailbackgroundSize,
				odetailbackgroundOpacity,
				cdetailbackgroundType,
				cdetailbackgroundImageColor,
				cdetailbackgroundImage,
				cdetailbackgroundColor,
				cdetailbackgroundPosition,
				cdetailbackgroundAttachment,
				cdetailbackgroundRepeat,
				cdetailbackgroundSize,
				cdetailbackgroundOpacity,
			},
		} = this.props;

		let html = '';

		if ( formJson && formJson.data.html ) {
			html = formJson.data.html;
		}

		let loadHeadingGoogleFonts;
		let loadSectionHeadingGoogleFonts;
		let loadSectionContentGoogleFonts;
		let loadOrderOverviewGoogleFonts;
		let loadDownloadHeadingGoogleFonts;
		let loadDownloadContentGoogleFonts;
		let loadOrderDetailHeadingGoogleFonts;
		let loadOrderDetailContentGoogleFonts;
		let loadCustomerDetailHeadingGoogleFonts;
		let loadCustomerDetailContentGoogleFonts;

		if ( true === headingLoadGoogleFonts ) {
			const hconfig = {
				google: {
					families: [
						headingFontFamily +
							( headingFontWeight
								? ':' + headingFontWeight
								: '' ),
					],
				},
			};
			loadHeadingGoogleFonts = (
				<WebfontLoader config={ hconfig }></WebfontLoader>
			);
		}

		if ( true === sectionHeadingLoadGoogleFonts ) {
			const shconfig = {
				google: {
					families: [
						sectionHeadingFontFamily +
							( sectionHeadingFontWeight
								? ':' + sectionHeadingFontWeight
								: '' ),
					],
				},
			};
			loadSectionHeadingGoogleFonts = (
				<WebfontLoader config={ shconfig }></WebfontLoader>
			);
		}
		if ( true === sectionContentLoadGoogleFonts ) {
			const scconfig = {
				google: {
					families: [
						sectionContentFontFamily +
							( sectionContentFontWeight
								? ':' + sectionContentFontWeight
								: '' ),
					],
				},
			};
			loadSectionContentGoogleFonts = (
				<WebfontLoader config={ scconfig }></WebfontLoader>
			);
		}

		if ( true === orderOverviewLoadGoogleFonts ) {
			const ooconfig = {
				google: {
					families: [
						orderOverviewFontFamily +
							( orderOverviewFontWeight
								? ':' + orderOverviewFontWeight
								: '' ),
					],
				},
			};
			loadOrderOverviewGoogleFonts = (
				<WebfontLoader config={ ooconfig }></WebfontLoader>
			);
		}

		if ( true === downloadHeadingLoadGoogleFonts ) {
			const dhconfig = {
				google: {
					families: [
						downloadHeadingFontFamily +
							( downloadHeadingFontWeight
								? ':' + downloadHeadingFontWeight
								: '' ),
					],
				},
			};
			loadDownloadHeadingGoogleFonts = (
				<WebfontLoader config={ dhconfig }></WebfontLoader>
			);
		}
		if ( true === downloadContentLoadGoogleFonts ) {
			const dcconfig = {
				google: {
					families: [
						downloadContentFontFamily +
							( downloadContentFontWeight
								? ':' + downloadContentFontWeight
								: '' ),
					],
				},
			};
			loadDownloadContentGoogleFonts = (
				<WebfontLoader config={ dcconfig }></WebfontLoader>
			);
		}

		if ( true === orderDetailHeadingLoadGoogleFonts ) {
			const odhconfig = {
				google: {
					families: [
						orderDetailHeadingFontFamily +
							( orderDetailHeadingFontWeight
								? ':' + orderDetailHeadingFontWeight
								: '' ),
					],
				},
			};
			loadOrderDetailHeadingGoogleFonts = (
				<WebfontLoader config={ odhconfig }></WebfontLoader>
			);
		}
		if ( true === orderDetailContentLoadGoogleFonts ) {
			const odcconfig = {
				google: {
					families: [
						orderDetailContentFontFamily +
							( orderDetailContentFontWeight
								? ':' + orderDetailContentFontWeight
								: '' ),
					],
				},
			};
			loadOrderDetailContentGoogleFonts = (
				<WebfontLoader config={ odcconfig }></WebfontLoader>
			);
		}

		if ( true === customerDetailHeadingLoadGoogleFonts ) {
			const cdhconfig = {
				google: {
					families: [
						customerDetailHeadingFontFamily +
							( customerDetailHeadingFontWeight
								? ':' + customerDetailHeadingFontWeight
								: '' ),
					],
				},
			};
			loadCustomerDetailHeadingGoogleFonts = (
				<WebfontLoader config={ cdhconfig }></WebfontLoader>
			);
		}
		if ( true === customerDetailContentLoadGoogleFonts ) {
			const cddcconfig = {
				google: {
					families: [
						customerDetailContentFontFamily +
							( customerDetailContentFontWeight
								? ':' + customerDetailContentFontWeight
								: '' ),
					],
				},
			};
			loadCustomerDetailContentGoogleFonts = (
				<WebfontLoader config={ cddcconfig }></WebfontLoader>
			);
		}

		const orderDetailFormGeneralSettings = () => {
			return (
				<PanelBody
					title={ __( 'General', 'cartflows' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Order Overview', 'cartflows' ) }
						checked={ orderOverview }
						help={ __( 'Hide/Show Order Overview.', 'cartflows' ) }
						onChange={ ( value ) =>
							setAttributes( { orderOverview: ! orderOverview } )
						}
					/>
					<ToggleControl
						label={ __( 'Order Detail', 'cartflows' ) }
						checked={ orderDetails }
						help={ __( 'Hide/Show Order Detail.', 'cartflows' ) }
						onChange={ ( value ) =>
							setAttributes( { orderDetails: ! orderDetails } )
						}
					/>
					<ToggleControl
						label={ __( 'Billing Address', 'cartflows' ) }
						checked={ billingAddress }
						help={ __( 'Hide/Show Billing Address.', 'cartflows' ) }
						onChange={ ( value ) =>
							setAttributes( {
								billingAddress: ! billingAddress,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Shipping Address', 'cartflows' ) }
						checked={ shippingAddress }
						help={ __(
							'Hide/Show Shipping Address.',
							'cartflows'
						) }
						onChange={ ( value ) =>
							setAttributes( {
								shippingAddress: ! shippingAddress,
							} )
						}
					/>
				</PanelBody>
			);
		};

		const orderDetailFormSpacingSettings = () => {
			return (
				<PanelBody
					title={ __( 'Spacing', 'cartflows' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __(
							'Heading Bottom Spacing(px)',
							'cartflows'
						) }
						value={ headingBottomSpacing }
						onChange={ ( value ) =>
							setAttributes( { headingBottomSpacing: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
					/>
					<RangeControl
						label={ __(
							'Spacing Between Sections(px)',
							'cartflows'
						) }
						value={ sectionSpacing }
						onChange={ ( value ) =>
							setAttributes( { sectionSpacing: value } )
						}
						min={ 0 }
						max={ 100 }
						allowReset
					/>
				</PanelBody>
			);
		};

		const orderDetailFormHeadingSettings = () => {
			return (
				<PanelBody
					title={ __( 'Heading', 'cartflows' ) }
					initialOpen={ false }
				>
					<p className="components-base-control__label">
						{ __( 'Thank You Text', 'cartflows' ) }
					</p>
					<TextControl
						value={ thanyouText }
						onChange={ ( value ) =>
							setAttributes( { thanyouText: value } )
						}
						placeholder={ __(
							'Thank you. Your order has been received.',
							'cartflows'
						) }
					/>
					<SelectControl
						label={ __( 'Alignment', 'cartflows' ) }
						value={ headingAlignment }
						onChange={ ( value ) =>
							setAttributes( { headingAlignment: value } )
						}
						options={ [
							{
								value: 'center',
								label: __( 'Center', 'cartflows' ),
							},
							{ value: 'left', label: __( 'Left', 'cartflows' ) },
							{
								value: 'right',
								label: __( 'Right', 'cartflows' ),
							},
						] }
					/>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ { backgroundColor: headingColor } }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ headingColor }
						onChange={ ( colorValue ) =>
							setAttributes( { headingColor: colorValue } )
						}
						allowReset
					/>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: headingLoadGoogleFonts,
							label: 'headingLoadGoogleFonts',
						} }
						fontFamily={ {
							value: headingFontFamily,
							label: 'headingFontFamily',
						} }
						fontWeight={ {
							value: headingFontWeight,
							label: 'headingFontWeight',
						} }
						fontSubset={ {
							value: headingFontSubset,
							label: 'headingFontSubset',
						} }
						fontSizeType={ {
							value: headingFontSizeType,
							label: 'headingFontSizeType',
						} }
						fontSize={ {
							value: headingFontSize,
							label: 'headingFontSize',
						} }
						fontSizeMobile={ {
							value: headingFontSizeMobile,
							label: 'headingFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: headingFontSizeTablet,
							label: 'headingFontSizeTablet',
						} }
						lineHeightType={ {
							value: headingLineHeightType,
							label: 'headingLineHeightType',
						} }
						lineHeight={ {
							value: headingLineHeight,
							label: 'headingLineHeight',
						} }
						lineHeightMobile={ {
							value: headingLineHeightMobile,
							label: 'headingLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: headingLineHeightTablet,
							label: 'headingLineHeightTablet',
						} }
					/>
				</PanelBody>
			);
		};

		const orderDetailFormSectionsSettings = () => {
			return (
				<PanelBody
					title={ __( 'Sections', 'cartflows' ) }
					initialOpen={ false }
				>
					<h2>{ __( 'Heading', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: sectionHeadingColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ sectionHeadingColor }
						onChange={ ( colorValue ) =>
							setAttributes( { sectionHeadingColor: colorValue } )
						}
						allowReset
					/>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: sectionHeadingLoadGoogleFonts,
							label: 'sectionHeadingLoadGoogleFonts',
						} }
						fontFamily={ {
							value: sectionHeadingFontFamily,
							label: 'sectionHeadingFontFamily',
						} }
						fontWeight={ {
							value: sectionHeadingFontWeight,
							label: 'sectionHeadingFontWeight',
						} }
						fontSubset={ {
							value: sectionHeadingFontSubset,
							label: 'sectionHeadingFontSubset',
						} }
						fontSizeType={ {
							value: sectionHeadingFontSizeType,
							label: 'sectionHeadingFontSizeType',
						} }
						fontSize={ {
							value: sectionHeadingFontSize,
							label: 'sectionHeadingFontSize',
						} }
						fontSizeMobile={ {
							value: sectionHeadingFontSizeMobile,
							label: 'sectionHeadingFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: sectionHeadingFontSizeTablet,
							label: 'sectionHeadingFontSizeTablet',
						} }
						lineHeightType={ {
							value: sectionHeadingLineHeightType,
							label: 'sectionHeadingLineHeightType',
						} }
						lineHeight={ {
							value: sectionHeadingLineHeight,
							label: 'sectionHeadingLineHeight',
						} }
						lineHeightMobile={ {
							value: sectionHeadingLineHeightMobile,
							label: 'sectionHeadingLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: sectionHeadingLineHeightTablet,
							label: 'sectionHeadingLineHeightTablet',
						} }
					/>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Content', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: sectionContentColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ sectionContentColor }
						onChange={ ( colorValue ) =>
							setAttributes( { sectionContentColor: colorValue } )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
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
								value: 'image',
								label: __( 'Image', 'cartflows' ),
							},
						] }
					/>
					{ 'color' === backgroundType && (
						<Fragment>
							<p className="cf-setting-label">
								{ __( 'Background Color', 'cartflows' ) }
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
					{ ( 'color' == backgroundType ||
						( 'image' == backgroundType && backgroundImage ) ) && (
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
							value: sectionContentLoadGoogleFonts,
							label: 'sectionContentLoadGoogleFonts',
						} }
						fontFamily={ {
							value: sectionContentFontFamily,
							label: 'sectionContentFontFamily',
						} }
						fontWeight={ {
							value: sectionContentFontWeight,
							label: 'sectionContentFontWeight',
						} }
						fontSubset={ {
							value: sectionContentFontSubset,
							label: 'sectionContentFontSubset',
						} }
						fontSizeType={ {
							value: sectionContentFontSizeType,
							label: 'sectionContentFontSizeType',
						} }
						fontSize={ {
							value: sectionContentFontSize,
							label: 'sectionContentFontSize',
						} }
						fontSizeMobile={ {
							value: sectionContentFontSizeMobile,
							label: 'sectionContentFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: sectionContentFontSizeTablet,
							label: 'sectionContentFontSizeTablet',
						} }
						lineHeightType={ {
							value: sectionContentLineHeightType,
							label: 'sectionContentLineHeightType',
						} }
						lineHeight={ {
							value: sectionContentLineHeight,
							label: 'sectionContentLineHeight',
						} }
						lineHeightMobile={ {
							value: sectionContentLineHeightMobile,
							label: 'sectionContentLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: sectionContentLineHeightTablet,
							label: 'sectionContentLineHeightTablet',
						} }
					/>
				</PanelBody>
			);
		};

		const orderDetailFormOrderOverviewSettings = () => {
			return (
				<PanelBody
					title={ __( 'Order Overview', 'cartflows' ) }
					initialOpen={ false }
				>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: orderOverviewTextColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ orderOverviewTextColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								orderOverviewTextColor: colorValue,
							} )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<SelectControl
						label={ __( 'Background Type', 'cartflows' ) }
						value={ odbackgroundType }
						onChange={ ( value ) =>
							setAttributes( { odbackgroundType: value } )
						}
						options={ [
							{
								value: 'color',
								label: __( 'Color', 'cartflows' ),
							},
							{
								value: 'image',
								label: __( 'Image', 'cartflows' ),
							},
						] }
					/>
					{ 'color' === odbackgroundType && (
						<Fragment>
							<p className="cf-setting-label">
								{ __( 'Background Color', 'cartflows' ) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: odbackgroundColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ odbackgroundColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										odbackgroundColor: colorValue,
									} )
								}
								allowReset
							/>
						</Fragment>
					) }
					{ 'image' == odbackgroundType && (
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
									onSelect={ this.onOdSelectImage }
									allowedTypes={ [ 'image' ] }
									value={ odbackgroundImage }
									render={ ( { open } ) => (
										<Button isDefault onClick={ open }>
											{ ! odbackgroundImage
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
								{ odbackgroundImage && (
									<Button
										className="cf-rm-btn"
										onClick={ this.onOdRemoveImage }
										isLink
										isDestructive
									>
										{ __( 'Remove Image', 'cartflows' ) }
									</Button>
								) }
							</BaseControl>
							{ odbackgroundImage && (
								<Fragment>
									<SelectControl
										label={ __(
											'Image Position',
											'cartflows'
										) }
										value={ odbackgroundPosition }
										onChange={ ( value ) =>
											setAttributes( {
												odbackgroundPosition: value,
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
										value={ odbackgroundAttachment }
										onChange={ ( value ) =>
											setAttributes( {
												odbackgroundAttachment: value,
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
										value={ odbackgroundRepeat }
										onChange={ ( value ) =>
											setAttributes( {
												odbackgroundRepeat: value,
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
										value={ odbackgroundSize }
										onChange={ ( value ) =>
											setAttributes( {
												odbackgroundSize: value,
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
					{ ( 'color' == odbackgroundType ||
						( 'image' == odbackgroundType &&
							odbackgroundImage ) ) && (
						<RangeControl
							label={ __( 'Opacity', 'cartflows' ) }
							value={ odbackgroundOpacity }
							onChange={ ( value ) =>
								setAttributes( { odbackgroundOpacity: value } )
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
							value: orderOverviewLoadGoogleFonts,
							label: 'orderOverviewLoadGoogleFonts',
						} }
						fontFamily={ {
							value: orderOverviewFontFamily,
							label: 'orderOverviewFontFamily',
						} }
						fontWeight={ {
							value: orderOverviewFontWeight,
							label: 'orderOverviewFontWeight',
						} }
						fontSubset={ {
							value: orderOverviewFontSubset,
							label: 'orderOverviewFontSubset',
						} }
						fontSizeType={ {
							value: orderOverviewFontSizeType,
							label: 'orderOverviewFontSizeType',
						} }
						fontSize={ {
							value: orderOverviewFontSize,
							label: 'orderOverviewFontSize',
						} }
						fontSizeMobile={ {
							value: orderOverviewFontSizeMobile,
							label: 'orderOverviewFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: orderOverviewFontSizeTablet,
							label: 'orderOverviewFontSizeTablet',
						} }
						lineHeightType={ {
							value: orderOverviewLineHeightType,
							label: 'orderOverviewLineHeightType',
						} }
						lineHeight={ {
							value: orderOverviewLineHeight,
							label: 'orderOverviewLineHeight',
						} }
						lineHeightMobile={ {
							value: orderOverviewLineHeightMobile,
							label: 'orderOverviewLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: orderOverviewLineHeightTablet,
							label: 'orderOverviewLineHeightTablet',
						} }
					/>
				</PanelBody>
			);
		};

		const orderDetailFormDownloadsSettings = () => {
			return (
				<PanelBody
					title={ __( 'Downloads', 'cartflows' ) }
					initialOpen={ false }
				>
					<h2>{ __( 'Heading', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: downloadHeadingColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ downloadHeadingColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								downloadHeadingColor: colorValue,
							} )
						}
						allowReset
					/>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: downloadHeadingLoadGoogleFonts,
							label: 'downloadHeadingLoadGoogleFonts',
						} }
						fontFamily={ {
							value: downloadHeadingFontFamily,
							label: 'downloadHeadingFontFamily',
						} }
						fontWeight={ {
							value: downloadHeadingFontWeight,
							label: 'downloadHeadingFontWeight',
						} }
						fontSubset={ {
							value: downloadHeadingFontSubset,
							label: 'downloadHeadingFontSubset',
						} }
						fontSizeType={ {
							value: downloadHeadingFontSizeType,
							label: 'downloadHeadingFontSizeType',
						} }
						fontSize={ {
							value: downloadHeadingFontSize,
							label: 'downloadHeadingFontSize',
						} }
						fontSizeMobile={ {
							value: downloadHeadingFontSizeMobile,
							label: 'downloadHeadingFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: downloadHeadingFontSizeTablet,
							label: 'downloadHeadingFontSizeTablet',
						} }
						lineHeightType={ {
							value: downloadHeadingLineHeightType,
							label: 'downloadHeadingLineHeightType',
						} }
						lineHeight={ {
							value: downloadHeadingLineHeight,
							label: 'downloadHeadingLineHeight',
						} }
						lineHeightMobile={ {
							value: downloadHeadingLineHeightMobile,
							label: 'downloadHeadingLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: downloadHeadingLineHeightTablet,
							label: 'downloadHeadingLineHeightTablet',
						} }
					/>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Content', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: downloadContentColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ downloadContentColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								downloadContentColor: colorValue,
							} )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<SelectControl
						label={ __( 'Background Type', 'cartflows' ) }
						value={ dbackgroundType }
						onChange={ ( value ) =>
							setAttributes( { dbackgroundType: value } )
						}
						options={ [
							{
								value: 'color',
								label: __( 'Color', 'cartflows' ),
							},
							{
								value: 'image',
								label: __( 'Image', 'cartflows' ),
							},
						] }
					/>
					{ 'color' === dbackgroundType && (
						<Fragment>
							<p className="cf-setting-label">
								{ __( 'Background Color', 'cartflows' ) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: dbackgroundColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ dbackgroundColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										dbackgroundColor: colorValue,
									} )
								}
								allowReset
							/>
						</Fragment>
					) }
					{ 'image' == dbackgroundType && (
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
									onSelect={ this.ondSelectImage }
									allowedTypes={ [ 'image' ] }
									value={ dbackgroundImage }
									render={ ( { open } ) => (
										<Button isDefault onClick={ open }>
											{ ! dbackgroundImage
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
								{ dbackgroundImage && (
									<Button
										className="cf-rm-btn"
										onClick={ this.ondRemoveImage }
										isLink
										isDestructive
									>
										{ __( 'Remove Image', 'cartflows' ) }
									</Button>
								) }
							</BaseControl>
							{ dbackgroundImage && (
								<Fragment>
									<SelectControl
										label={ __(
											'Image Position',
											'cartflows'
										) }
										value={ dbackgroundPosition }
										onChange={ ( value ) =>
											setAttributes( {
												dbackgroundPosition: value,
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
										value={ dbackgroundAttachment }
										onChange={ ( value ) =>
											setAttributes( {
												dbackgroundAttachment: value,
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
										value={ dbackgroundRepeat }
										onChange={ ( value ) =>
											setAttributes( {
												dbackgroundRepeat: value,
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
										value={ dbackgroundSize }
										onChange={ ( value ) =>
											setAttributes( {
												dbackgroundSize: value,
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
					{ ( 'color' == dbackgroundType ||
						( 'image' == dbackgroundType &&
							dbackgroundImage ) ) && (
						<RangeControl
							label={ __( 'Opacity', 'cartflows' ) }
							value={ dbackgroundOpacity }
							onChange={ ( value ) =>
								setAttributes( { dbackgroundOpacity: value } )
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
							value: downloadContentLoadGoogleFonts,
							label: 'downloadContentLoadGoogleFonts',
						} }
						fontFamily={ {
							value: downloadContentFontFamily,
							label: 'downloadContentFontFamily',
						} }
						fontWeight={ {
							value: downloadContentFontWeight,
							label: 'downloadContentFontWeight',
						} }
						fontSubset={ {
							value: downloadContentFontSubset,
							label: 'downloadContentFontSubset',
						} }
						fontSizeType={ {
							value: downloadContentFontSizeType,
							label: 'downloadContentFontSizeType',
						} }
						fontSize={ {
							value: downloadContentFontSize,
							label: 'downloadContentFontSize',
						} }
						fontSizeMobile={ {
							value: downloadContentFontSizeMobile,
							label: 'downloadContentFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: downloadContentFontSizeTablet,
							label: 'downloadContentFontSizeTablet',
						} }
						lineHeightType={ {
							value: downloadContentLineHeightType,
							label: 'downloadContentLineHeightType',
						} }
						lineHeight={ {
							value: downloadContentLineHeight,
							label: 'downloadContentLineHeight',
						} }
						lineHeightMobile={ {
							value: downloadContentLineHeightMobile,
							label: 'downloadContentLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: downloadContentLineHeightTablet,
							label: 'downloadContentLineHeightTablet',
						} }
					/>
				</PanelBody>
			);
		};

		const orderDetailFormOrderDetailsSettings = () => {
			return (
				<PanelBody
					title={ __( 'Order Details', 'cartflows' ) }
					initialOpen={ false }
				>
					<h2>{ __( 'Heading', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: orderDetailHeadingColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ orderDetailHeadingColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								orderDetailHeadingColor: colorValue,
							} )
						}
						allowReset
					/>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: orderDetailHeadingLoadGoogleFonts,
							label: 'orderDetailHeadingLoadGoogleFonts',
						} }
						fontFamily={ {
							value: orderDetailHeadingFontFamily,
							label: 'orderDetailHeadingFontFamily',
						} }
						fontWeight={ {
							value: orderDetailHeadingFontWeight,
							label: 'orderDetailHeadingFontWeight',
						} }
						fontSubset={ {
							value: orderDetailHeadingFontSubset,
							label: 'orderDetailHeadingFontSubset',
						} }
						fontSizeType={ {
							value: orderDetailHeadingFontSizeType,
							label: 'orderDetailHeadingFontSizeType',
						} }
						fontSize={ {
							value: orderDetailHeadingFontSize,
							label: 'orderDetailHeadingFontSize',
						} }
						fontSizeMobile={ {
							value: orderDetailHeadingFontSizeMobile,
							label: 'orderDetailHeadingFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: orderDetailHeadingFontSizeTablet,
							label: 'orderDetailHeadingFontSizeTablet',
						} }
						lineHeightType={ {
							value: orderDetailHeadingLineHeightType,
							label: 'orderDetailHeadingLineHeightType',
						} }
						lineHeight={ {
							value: orderDetailHeadingLineHeight,
							label: 'orderDetailHeadingLineHeight',
						} }
						lineHeightMobile={ {
							value: orderDetailHeadingLineHeightMobile,
							label: 'orderDetailHeadingLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: orderDetailHeadingLineHeightTablet,
							label: 'orderDetailHeadingLineHeightTablet',
						} }
					/>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Content', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: orderDetailContentColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ orderDetailContentColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								orderDetailContentColor: colorValue,
							} )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<SelectControl
						label={ __( 'Background Type', 'cartflows' ) }
						value={ odetailbackgroundType }
						onChange={ ( value ) =>
							setAttributes( { odetailbackgroundType: value } )
						}
						options={ [
							{
								value: 'color',
								label: __( 'Color', 'cartflows' ),
							},
							{
								value: 'image',
								label: __( 'Image', 'cartflows' ),
							},
						] }
					/>
					{ 'color' === odetailbackgroundType && (
						<Fragment>
							<p className="cf-setting-label">
								{ __( 'Background Color', 'cartflows' ) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: odetailbackgroundColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ odetailbackgroundColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										odetailbackgroundColor: colorValue,
									} )
								}
								allowReset
							/>
						</Fragment>
					) }
					{ 'image' == odetailbackgroundType && (
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
									onSelect={ this.onorderdetailSelectImage }
									allowedTypes={ [ 'image' ] }
									value={ odetailbackgroundImage }
									render={ ( { open } ) => (
										<Button isDefault onClick={ open }>
											{ ! odetailbackgroundImage
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
								{ odetailbackgroundImage && (
									<Button
										className="cf-rm-btn"
										onClick={
											this.onorderdetailRemoveImage
										}
										isLink
										isDestructive
									>
										{ __( 'Remove Image', 'cartflows' ) }
									</Button>
								) }
							</BaseControl>
							{ odetailbackgroundImage && (
								<Fragment>
									<SelectControl
										label={ __(
											'Image Position',
											'cartflows'
										) }
										value={ odetailbackgroundPosition }
										onChange={ ( value ) =>
											setAttributes( {
												odetailbackgroundPosition: value,
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
										value={ odetailbackgroundAttachment }
										onChange={ ( value ) =>
											setAttributes( {
												odetailbackgroundAttachment: value,
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
										value={ odetailbackgroundRepeat }
										onChange={ ( value ) =>
											setAttributes( {
												odetailbackgroundRepeat: value,
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
										value={ odetailbackgroundSize }
										onChange={ ( value ) =>
											setAttributes( {
												odetailbackgroundSize: value,
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
					{ ( 'color' == odetailbackgroundType ||
						( 'image' == odetailbackgroundType &&
							odetailbackgroundImage ) ) && (
						<RangeControl
							label={ __( 'Opacity', 'cartflows' ) }
							value={ odetailbackgroundOpacity }
							onChange={ ( value ) =>
								setAttributes( {
									odetailbackgroundOpacity: value,
								} )
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
							value: orderDetailContentLoadGoogleFonts,
							label: 'orderDetailContentLoadGoogleFonts',
						} }
						fontFamily={ {
							value: orderDetailContentFontFamily,
							label: 'orderDetailContentFontFamily',
						} }
						fontWeight={ {
							value: orderDetailContentFontWeight,
							label: 'orderDetailContentFontWeight',
						} }
						fontSubset={ {
							value: orderDetailContentFontSubset,
							label: 'orderDetailContentFontSubset',
						} }
						fontSizeType={ {
							value: orderDetailContentFontSizeType,
							label: 'orderDetailContentFontSizeType',
						} }
						fontSize={ {
							value: orderDetailContentFontSize,
							label: 'orderDetailContentFontSize',
						} }
						fontSizeMobile={ {
							value: orderDetailContentFontSizeMobile,
							label: 'orderDetailContentFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: orderDetailContentFontSizeTablet,
							label: 'orderDetailContentFontSizeTablet',
						} }
						lineHeightType={ {
							value: orderDetailContentLineHeightType,
							label: 'orderDetailContentLineHeightType',
						} }
						lineHeight={ {
							value: orderDetailContentLineHeight,
							label: 'orderDetailContentLineHeight',
						} }
						lineHeightMobile={ {
							value: orderDetailContentLineHeightMobile,
							label: 'orderDetailContentLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: orderDetailContentLineHeightTablet,
							label: 'orderDetailContentLineHeightTablet',
						} }
					/>
				</PanelBody>
			);
		};

		const orderDetailFormCustomerDetailsSettings = () => {
			return (
				<PanelBody
					title={ __( 'Customer Details', 'cartflows' ) }
					initialOpen={ false }
				>
					<h2>{ __( 'Heading', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: customerDetailHeadingColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ customerDetailHeadingColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								customerDetailHeadingColor: colorValue,
							} )
						}
						allowReset
					/>
					<TypographyControl
						label={ __( 'Typography', 'cartflows' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loadGoogleFonts={ {
							value: customerDetailHeadingLoadGoogleFonts,
							label: 'customerDetailHeadingLoadGoogleFonts',
						} }
						fontFamily={ {
							value: customerDetailHeadingFontFamily,
							label: 'customerDetailHeadingFontFamily',
						} }
						fontWeight={ {
							value: customerDetailHeadingFontWeight,
							label: 'customerDetailHeadingFontWeight',
						} }
						fontSubset={ {
							value: customerDetailHeadingFontSubset,
							label: 'customerDetailHeadingFontSubset',
						} }
						fontSizeType={ {
							value: customerDetailHeadingFontSizeType,
							label: 'customerDetailHeadingFontSizeType',
						} }
						fontSize={ {
							value: customerDetailHeadingFontSize,
							label: 'customerDetailHeadingFontSize',
						} }
						fontSizeMobile={ {
							value: customerDetailHeadingFontSizeMobile,
							label: 'customerDetailHeadingFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: customerDetailHeadingFontSizeTablet,
							label: 'customerDetailHeadingFontSizeTablet',
						} }
						lineHeightType={ {
							value: customerDetailHeadingLineHeightType,
							label: 'customerDetailHeadingLineHeightType',
						} }
						lineHeight={ {
							value: customerDetailHeadingLineHeight,
							label: 'customerDetailHeadingLineHeight',
						} }
						lineHeightMobile={ {
							value: customerDetailHeadingLineHeightMobile,
							label: 'customerDetailHeadingLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: customerDetailHeadingLineHeightTablet,
							label: 'customerDetailHeadingLineHeightTablet',
						} }
					/>
					<hr className="cf-editor__separator" />
					<h2>{ __( 'Content', 'cartflows' ) }</h2>
					<p className="cf-setting-label">
						{ __( 'Text Color', 'cartflows' ) }
						<span className="components-base-control__label">
							<span
								className="component-color-indicator"
								style={ {
									backgroundColor: customerDetailContentColor,
								} }
							></span>
						</span>
					</p>
					<ColorPalette
						value={ customerDetailContentColor }
						onChange={ ( colorValue ) =>
							setAttributes( {
								customerDetailContentColor: colorValue,
							} )
						}
						allowReset
					/>
					<hr className="cf-editor__separator" />
					<SelectControl
						label={ __( 'Background Type', 'cartflows' ) }
						value={ cdetailbackgroundType }
						onChange={ ( value ) =>
							setAttributes( { cdetailbackgroundType: value } )
						}
						options={ [
							{
								value: 'color',
								label: __( 'Color', 'cartflows' ),
							},
							{
								value: 'image',
								label: __( 'Image', 'cartflows' ),
							},
						] }
					/>
					{ 'color' === cdetailbackgroundType && (
						<Fragment>
							<p className="cf-setting-label">
								{ __( 'Background Color', 'cartflows' ) }
								<span className="components-base-control__label">
									<span
										className="component-color-indicator"
										style={ {
											backgroundColor: cdetailbackgroundColor,
										} }
									></span>
								</span>
							</p>
							<ColorPalette
								value={ cdetailbackgroundColor }
								onChange={ ( colorValue ) =>
									setAttributes( {
										cdetailbackgroundColor: colorValue,
									} )
								}
								allowReset
							/>
						</Fragment>
					) }
					{ 'image' == cdetailbackgroundType && (
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
									onSelect={ this.oncdSelectImage }
									allowedTypes={ [ 'image' ] }
									value={ cdetailbackgroundImage }
									render={ ( { open } ) => (
										<Button isDefault onClick={ open }>
											{ ! cdetailbackgroundImage
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
								{ cdetailbackgroundImage && (
									<Button
										className="cf-rm-btn"
										onClick={ this.oncdRemoveImage }
										isLink
										isDestructive
									>
										{ __( 'Remove Image', 'cartflows' ) }
									</Button>
								) }
							</BaseControl>
							{ cdetailbackgroundImage && (
								<Fragment>
									<SelectControl
										label={ __(
											'Image Position',
											'cartflows'
										) }
										value={ cdetailbackgroundPosition }
										onChange={ ( value ) =>
											setAttributes( {
												cdetailbackgroundPosition: value,
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
										value={ cdetailbackgroundAttachment }
										onChange={ ( value ) =>
											setAttributes( {
												cdetailbackgroundAttachment: value,
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
										value={ cdetailbackgroundRepeat }
										onChange={ ( value ) =>
											setAttributes( {
												cdetailbackgroundRepeat: value,
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
										value={ cdetailbackgroundSize }
										onChange={ ( value ) =>
											setAttributes( {
												cdetailbackgroundSize: value,
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
					{ ( 'color' == cdetailbackgroundType ||
						( 'image' == cdetailbackgroundType &&
							cdetailbackgroundImage ) ) && (
						<RangeControl
							label={ __( 'Opacity', 'cartflows' ) }
							value={ cdetailbackgroundOpacity }
							onChange={ ( value ) =>
								setAttributes( {
									cdetailbackgroundOpacity: value,
								} )
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
							value: customerDetailContentLoadGoogleFonts,
							label: 'customerDetailContentLoadGoogleFonts',
						} }
						fontFamily={ {
							value: customerDetailContentFontFamily,
							label: 'customerDetailContentFontFamily',
						} }
						fontWeight={ {
							value: customerDetailContentFontWeight,
							label: 'customerDetailContentFontWeight',
						} }
						fontSubset={ {
							value: customerDetailContentFontSubset,
							label: 'customerDetailContentFontSubset',
						} }
						fontSizeType={ {
							value: customerDetailContentFontSizeType,
							label: 'customerDetailContentFontSizeType',
						} }
						fontSize={ {
							value: customerDetailContentFontSize,
							label: 'customerDetailContentFontSize',
						} }
						fontSizeMobile={ {
							value: customerDetailContentFontSizeMobile,
							label: 'customerDetailContentFontSizeMobile',
						} }
						fontSizeTablet={ {
							value: customerDetailContentFontSizeTablet,
							label: 'customerDetailContentFontSizeTablet',
						} }
						lineHeightType={ {
							value: customerDetailContentLineHeightType,
							label: 'customerDetailContentLineHeightType',
						} }
						lineHeight={ {
							value: customerDetailContentLineHeight,
							label: 'customerDetailContentLineHeight',
						} }
						lineHeightMobile={ {
							value: customerDetailContentLineHeightMobile,
							label: 'customerDetailContentLineHeightMobile',
						} }
						lineHeightTablet={ {
							value: customerDetailContentLineHeightTablet,
							label: 'customerDetailContentLineHeightTablet',
						} }
					/>
				</PanelBody>
			);
		};

		return (
			<Fragment>
				<BlockControls></BlockControls>
				<InspectorControls>
					{ orderDetailFormGeneralSettings() }
					{ orderDetailFormSpacingSettings() }
					{ orderDetailFormHeadingSettings() }
					{ orderDetailFormSectionsSettings() }
					{ orderOverview && orderDetailFormOrderOverviewSettings() }
					{ orderDetailFormDownloadsSettings() }
					{ orderDetails && orderDetailFormOrderDetailsSettings() }
					{ ( billingAddress || shippingAddress ) &&
						orderDetailFormCustomerDetailsSettings() }
				</InspectorControls>
				<div
					className={ classnames(
						className,
						`cf-block-${ this.props.clientId.substr( 0, 8 ) }`
					) }
				>
					<div className="wpcf__order-detail-form">
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

				{ loadHeadingGoogleFonts }
				{ loadSectionHeadingGoogleFonts }
				{ loadSectionContentGoogleFonts }
				{ loadOrderOverviewGoogleFonts }
				{ loadDownloadHeadingGoogleFonts }
				{ loadDownloadContentGoogleFonts }
				{ loadOrderDetailHeadingGoogleFonts }
				{ loadOrderDetailContentGoogleFonts }
				{ loadCustomerDetailHeadingGoogleFonts }
				{ loadCustomerDetailContentGoogleFonts }
			</Fragment>
		);
	}
}

// export default OrderDetailForm;

export default withSelect( ( select, props ) => {
	const { setAttributes } = props;
	const { isHtml } = props.attributes;
	const formId = cf_blocks_info.ID;
	let json_data = '';

	if ( ! isHtml ) {
		jQuery.ajax( {
			url: cf_blocks_info.ajax_url,
			data: {
				action: 'wpcf_order_detail_form_shortcode',
				nonce: cf_blocks_info.wpcf_ajax_nonce,
				thanyouText: props.attributes.thanyouText,
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
} )( OrderDetailForm );
