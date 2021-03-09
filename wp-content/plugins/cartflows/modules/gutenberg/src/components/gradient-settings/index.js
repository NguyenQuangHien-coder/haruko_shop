import hexToRgba from '../../../dist/blocks/controls/hex-to-rgba';
const { __ } = wp.i18n;
const { __experimentalPanelColorGradientSettings } = wp.blockEditor;

function GradientSettings( { attributes, setAttributes } ) {
	const {
		gradientValue,
		gradientAngle,
		gradientColor1,
		gradientColor2,
		gradientLocation1,
		gradientLocation2,
		gradientPosition,
		gradientType,
	} = attributes;

	//set the gradient value to settings if new gradientvalue is not set
	if ( '' === gradientValue ) {
		const rgb_gradientColor1 = hexToRgba( gradientColor1 );
		const rgb_gradientColor2 = hexToRgba( gradientColor2 );

		if ( 'linear' === gradientType ) {
			var value = `linear-gradient(${ gradientAngle }deg,${ rgb_gradientColor1 } ${ gradientLocation1 }%, ${ rgb_gradientColor2 } ${ gradientLocation2 }%)`;
			setAttributes( { gradientValue: value } );
		} else {
			var value = `radial-gradient(at ${ gradientPosition }, ${ rgb_gradientColor1 } ${ gradientLocation1 }%, ${ rgb_gradientColor2 } ${ gradientLocation2 }%)`;
			setAttributes( { gradientValue: value } );
		}
	}

	const onGradientChange = ( value ) => {
		setAttributes( { gradientValue: value } );
		setAttributes( {
			gradientAngle: '',
			gradientColor1: '',
			gradientColor2: '',
			gradientLocation1: '',
			gradientLocation2: '',
		} );
	};

	return (
		<__experimentalPanelColorGradientSettings
			title={ __( 'Color Settings', 'cartflows' ) }
			initialOpen={ true }
			settings={ [
				{
					label: __( 'Overlay Color', 'cartflows' ),
					gradientValue,
					onGradientChange,
				},
			] }
		/>
	);
}

export default GradientSettings;
