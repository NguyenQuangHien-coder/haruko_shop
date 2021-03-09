/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { RangeControl, ButtonGroup, Button, TabPanel, Dashicon } = wp.components;

// Extend component
const { Component, Fragment } = wp.element;

/**
 * Internal dependencies
 */
import map from 'lodash/map';

function RangeTypographyControl( props ) {
	let sizeTypes;

	if ( 'sizeTypes' in props ) {
		sizeTypes = props.sizeTypes;
	} else {
		sizeTypes = [
			{ key: 'px', name: __( 'px', 'cartflows' ) },
			{ key: 'em', name: __( 'em', 'cartflows' ) },
		];
	}

	const sizeTypesControls = (
		<ButtonGroup
			className="cf-size-type-field"
			aria-label={ __( 'Size Type', 'cartflows' ) }
		>
			{ map( sizeTypes, ( { name, key } ) => (
				<Button
					key={ key }
					className="cf-size-btn"
					isSmall
					isPrimary={ props.type.value === key }
					aria-pressed={ props.type.value === key }
					onClick={ () =>
						props.setAttributes( { [ props.typeLabel ]: key } )
					}
				>
					{ name }
				</Button>
			) ) }
		</ButtonGroup>
	);

	return (
		<div className="cf-typography-range-options">
			<TabPanel
				className="cf-size-type-field-tabs"
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
								{ sizeTypesControls }
								<RangeControl
									label={ __( props.sizeMobileText ) }
									value={ props.sizeMobile.value }
									onChange={ ( value ) =>
										props.setAttributes( {
											[ props.sizeMobileLabel ]: value,
										} )
									}
									min={ 0 }
									max={ 100 }
									step={ props.steps }
									beforeIcon="editor-textcolor"
									allowReset={ true }
									initialPosition={ 30 }
								/>
							</Fragment>
						);
					} else if ( 'tablet' === tab.name ) {
						tabout = (
							<Fragment>
								{ sizeTypesControls }
								<RangeControl
									label={ __( props.sizeTabletText ) }
									value={ props.sizeTablet.value }
									onChange={ ( value ) =>
										props.setAttributes( {
											[ props.sizeTabletLabel ]: value,
										} )
									}
									min={ 0 }
									max={ 100 }
									step={ props.steps }
									beforeIcon="editor-textcolor"
									allowReset={ true }
									initialPosition={ 30 }
								/>
							</Fragment>
						);
					} else {
						tabout = (
							<Fragment>
								{ sizeTypesControls }
								<RangeControl
									label={ __( props.sizeText ) }
									value={ props.size.value || '' }
									onChange={ ( value ) =>
										props.setAttributes( {
											[ props.sizeLabel ]: value,
										} )
									}
									min={ 0 }
									max={ 100 }
									step={ props.steps }
									beforeIcon="editor-textcolor"
									allowReset={ true }
									initialPosition={ 30 }
								/>
							</Fragment>
						);
					}

					return <div>{ tabout }</div>;
				} }
			</TabPanel>
		</div>
	);
}

export default RangeTypographyControl;
