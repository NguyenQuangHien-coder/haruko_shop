<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
$flra_options = wp_parse_args(get_option($this->_optionName),$this->_defaultOptions);
if($flra_options['to_vnd']) {
    add_filter('woocommerce_currency_symbol', 'woo_district_change_existing_currency_symbol', 10, 2);
    function woo_district_change_existing_currency_symbol($currency_symbol, $currency)
    {
        switch ($currency) {
            case 'VND':
                $currency_symbol = 'VNĐ';
                break;
        }
        return $currency_symbol;
    }
}
if($flra_options['remove_methob_title']){
    add_filter( 'woocommerce_cart_shipping_method_full_label', 'dwas_bbloomer_remove_shipping_label', 10, 2 );
    function dwas_bbloomer_remove_shipping_label($label, $method) {
        $new_label = preg_replace( '/^.+:/', '', $label );
        return $new_label;
    }
}
if($flra_options['active_vnd2usd']){
    include( 'class-vncheckout-vnd-paypal-standard.php' );
    new DevVN_vncheckout_VND_PayPal_Standard(
        $flra_options['vnd_usd_rate'],
        $flra_options['vnd2usd_currency']
    );
}