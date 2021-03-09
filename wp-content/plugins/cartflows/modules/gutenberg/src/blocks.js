/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

import './blocks/order-detail-form/block.js';
import './blocks/next-step-button/block.js';
import './blocks/checkout-form/block.js'
import './blocks/optin-form/block.js';

import CF_Block_Icons from "../dist/blocks/controls/block-icons"

const { updateCategory } = wp.blocks

updateCategory( "cartflows", {
	icon: CF_Block_Icons.logo,
}, )