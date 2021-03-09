/**
 * BLOCK: optin-form
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import CF_Block_Icons from '../../../dist/blocks/controls/block-icons';
import './style.scss';
import './editor.scss';
import edit from './edit';

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

if ( 'optin' === cf_blocks_info.step_type && cf_blocks_info.is_woo_active ) {
	registerBlockType( 'wcfb/optin-form', {
		title: cf_blocks_info.blocks[ 'wcfb/optin-form' ][ 'title' ],
		description:
			cf_blocks_info.blocks[ 'wcfb/optin-form' ][ 'description' ],
		icon: CF_Block_Icons.optin_form,
		category: cf_blocks_info.category,
		keywords: [
			__( 'cartflows', 'cartflows' ),
			__( 'optin form', 'cartflows' ),
			__( 'cf', 'cartflows' ),
		],
		edit,
		example: {},
		save() {
			return null;
		},
	} );
}

var value_to_be_filtered = wp.hooks.applyFilters(
	'filter.registerBlockType',
	'optin/cfp-optin-filter-blocks'
);
