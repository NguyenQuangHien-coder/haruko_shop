/**
 * BLOCK: Next Step Button
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import CF_Block_Icons from '../../../dist/blocks/controls/block-icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

if ( 'landing' === cf_blocks_info.step_type ) {
	registerBlockType( 'wcfb/next-step-button', {
		title: cf_blocks_info.blocks[ 'wcfb/next-step-button' ][ 'title' ],
		description:
			cf_blocks_info.blocks[ 'wcfb/next-step-button' ][ 'description' ],
		icon: CF_Block_Icons.next_step,
		category: cf_blocks_info.category,
		keywords: [
			__( 'cartflows', 'cartflows' ),
			__( 'next step button', 'cartflows' ),
			__( 'cf', 'cartflows' ),
		],
		supports: {
			anchor: true,
		},
		attributes,
		example: {},
		edit,
		save,
	} );
}
