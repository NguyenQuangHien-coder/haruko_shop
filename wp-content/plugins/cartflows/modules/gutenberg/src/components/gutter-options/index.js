const { __ } = wp.i18n;

const gutterOptions = [
	{
		value: '0',
		label: __( 'None', 'cartflows' ),
		shortName: __( 'None', 'cartflows' ),
	},
	{
		value: '5',
		/* translators: abbreviation for small size */
		label: __( 'S', 'cartflows' ),
		tooltip: __( 'Small', 'cartflows' ),
	},
	{
		value: '10',
		/* translators: abbreviation for medium size */
		label: __( 'M', 'cartflows' ),
		tooltip: __( 'Medium', 'cartflows' ),
	},
	{
		value: '15',
		/* translators: abbreviation for large size */
		label: __( 'L', 'cartflows' ),
		tooltip: __( 'Large', 'cartflows' ),
	},
	{
		value: '20',
		/* translators: abbreviation for extra large size */
		label: __( 'XL', 'cartflows' ),
		tooltip: __( 'Huge', 'cartflows' ),
	},
];

export default gutterOptions;
