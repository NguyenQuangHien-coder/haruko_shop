<?php
/*
 * Plugin Name: Woocommerce Vietnam Checkout
 * Plugin URI: http://levantoan.com/plugin-tinh-phi-van-chuyen-cho-quan-huyen-trong-woocommerce/
 * Version: 1.0.7
 * Description: Add province/city, district, commune/ward/town to checkout form and simplify checkout form
 * Author: Le Van Toan
 * Author URI: http://levantoan.com
 * Text Domain: devvn-vncheckout
 * Domain Path: /languages
 * License: GPLv3
 * License URI: http://www.gnu.org/licenses/gpl-3.0

Woocommerce Vietnam Checkout

Copyright (C) 2017 Le Van Toan - www.levantoan.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {

include 'cities/tinh_thanhpho.php';

register_activation_hook(   __FILE__, array( 'DevVN_Woo_Vietnam_Checkout_Class', 'on_activation' ) );
register_deactivation_hook( __FILE__, array( 'DevVN_Woo_Vietnam_Checkout_Class', 'on_deactivation' ) );
register_uninstall_hook(    __FILE__, array( 'DevVN_Woo_Vietnam_Checkout_Class', 'on_uninstall' ) );

add_action( 'plugins_loaded', array( 'DevVN_Woo_Vietnam_Checkout_Class', 'init' ) );
load_textdomain('devvn-vncheckout', dirname(__FILE__) . '/languages/devvn-vncheckout-' . get_locale() . '.mo');
class DevVN_Woo_Vietnam_Checkout_Class
{
    protected static $instance;

	protected $_version = '1.0.7';
	public $_optionName = 'devvn_woo_district';
	public $_optionGroup = 'devvn-district-options-group';
	public $_defaultOptions = array(
	    'active_village'	            =>	'',
        'required_village'	            =>	'',
        'to_vnd'	                    =>	'',
        'remove_methob_title'	        =>	'',
        'freeship_remove_other_methob'  =>  '',
        'khoiluong_quydoi'  =>  '6000',
        'tinhthanh_default'  =>  '01',
        'active_vnd2usd'    =>  0,
        'vnd_usd_rate'          =>  '22745',
        'vnd2usd_currency'          =>  'USD',

        'alepay_support'                =>  0
	);

    public static function init(){
        is_null( self::$instance ) AND self::$instance = new self;
        return self::$instance;
    }

	public function __construct(){
    	add_filter( 'woocommerce_checkout_fields' , array($this, 'custom_override_checkout_fields'), 99999 );
    	//add_filter( 'woocommerce_checkout_fields', array($this, 'order_fields'), 99999 );
    	add_filter( 'woocommerce_states', array($this, 'vietnam_cities_woocommerce'), 9999 );
        add_filter('woocommerce_get_country_locale', array($this, 'devvn_woocommerce_get_country_locale'), 99);

    	add_action( 'wp_enqueue_scripts', array($this, 'devvn_enqueue_UseAjaxInWp') );
    	add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );

    	add_action( 'wp_ajax_load_diagioihanhchinh', array($this, 'load_diagioihanhchinh_func') );
		add_action( 'wp_ajax_nopriv_load_diagioihanhchinh', array($this, 'load_diagioihanhchinh_func') );

		add_filter('woocommerce_localisation_address_formats', array($this, 'devvn_woocommerce_localisation_address_formats') );
		add_filter('woocommerce_order_formatted_billing_address', array($this, 'devvn_woocommerce_order_formatted_billing_address'), 10, 2);

		add_action( 'woocommerce_admin_order_data_after_shipping_address', array($this, 'devvn_after_shipping_address'), 10, 1 );
		add_filter('woocommerce_order_formatted_shipping_address', array($this, 'devvn_woocommerce_order_formatted_shipping_address'), 10, 2);

		add_filter('woocommerce_order_details_after_customer_details', array($this, 'devvn_woocommerce_order_details_after_customer_details'), 10);

		//my account
		add_filter('woocommerce_my_account_my_address_formatted_address',array($this, 'devvn_woocommerce_my_account_my_address_formatted_address'),10,3);

		//More action
        add_filter( 'default_checkout_billing_country', array($this, 'devvn_change_default_checkout_country'), 99 );
        add_filter( 'default_checkout_billing_state', array($this, 'devvn_change_default_checkout_state'), 99 );

		//Options
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'admin_init', array( $this, 'register_mysettings') );
        add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), array( $this, 'plugin_action_links' ) );

		add_option( $this->_optionName, $this->_defaultOptions );

        include_once( 'includes/apps.php' );

        add_filter( 'woocommerce_default_address_fields' , array( $this, 'devvn_custom_override_default_address_fields') );

        //admin order address, form billing
        add_filter('woocommerce_admin_billing_fields', array($this, 'devvn_woocommerce_admin_billing_fields'), 99);
        add_filter('woocommerce_admin_shipping_fields', array($this, 'devvn_woocommerce_admin_shipping_fields'), 99);
    }

    public static function on_activation(){
        if ( ! current_user_can( 'activate_plugins' ) )
            return false;
        $plugin = isset( $_REQUEST['plugin'] ) ? $_REQUEST['plugin'] : '';
        check_admin_referer( "activate-plugin_{$plugin}" );

    }

    public static function on_deactivation(){
        if ( ! current_user_can( 'activate_plugins' ) )
            return false;
        $plugin = isset( $_REQUEST['plugin'] ) ? $_REQUEST['plugin'] : '';
        check_admin_referer( "deactivate-plugin_{$plugin}" );

    }

    public static function on_uninstall(){
        if ( ! current_user_can( 'activate_plugins' ) )
            return false;
    }

	function admin_menu() {
		add_options_page(
			__('Woo Vietnam Checkout Setting','devvn-vncheckout'),
			__('Vietnam Checkout','devvn-vncheckout'),
			'manage_options',
			'devvn-district-address',
			array(
				$this,
				'devvn_district_setting'
			)
		);
	}

	function register_mysettings() {
		register_setting( $this->_optionGroup, $this->_optionName );
	}

	function  devvn_district_setting() {
		include 'includes/options-page.php';
	}

	function vietnam_cities_woocommerce( $states ) {
		global $tinh_thanhpho;
	  	$states['VN'] = $tinh_thanhpho;
	  	return $states;
	}

    function custom_override_checkout_fields( $fields ) {
        global $tinh_thanhpho;

        //Billing
        unset($fields['billing']['billing_first_name']);
        if(!$this->get_options('alepay_support')) {
            $fields['billing']['billing_last_name'] = array(
                'label' => __('Full name', 'devvn-vncheckout'),
                'placeholder' => _x('Type Full name', 'placeholder', 'devvn-vncheckout'),
                'required' => true,
                'class' => array('form-row-wide'),
                'clear' => true,
                'priority' => 10
            );
        }
        $fields['billing']['billing_state'] = array(
            'label'			=> __('Province/City', 'devvn-vncheckout'),
            'required' 		=> true,
            'type'			=> 'select',
            'class'    		=> array( 'form-row-wide', 'address-field', 'update_totals_on_change' ),
            'placeholder'	=> _x('Select Province/City', 'placeholder', 'devvn-vncheckout'),
            'options'   	=> $tinh_thanhpho,
            'priority'  =>  30
        );
        $fields['billing']['billing_city'] = array(
            'label'		=> __('District', 'devvn-vncheckout'),
            'required' 	=> true,
            'type'		=>	'select',
            'class'    	=> array( 'form-row-wide', 'address-field', 'update_totals_on_change' ),
            'placeholder'	=>	_x('Select District', 'placeholder', 'devvn-vncheckout'),
            'options'   => array(
                ''	=> ''
            ),
            'priority'  =>  40
        );
        if(!$this->get_options()) {
            $fields['billing']['billing_address_2'] = array(
                'label' => __('Commune/Ward/Town', 'devvn-vncheckout'),
                'required' => true,
                'type' => 'select',
                'class' => array('form-row-wide', 'address-field', 'update_totals_on_change'),
                'placeholder' => _x('Select Commune/Ward/Town', 'placeholder', 'devvn-vncheckout'),
                'options' => array(
                    '' => ''
                ),
                'priority'  =>  50
            );
            if ($this->get_options('required_village')) {
                $fields['billing']['billing_address_2']['required'] = false;
            }
        }
        $fields['billing']['billing_address_1']['placeholder'] = _x('Ex: No. 20, 90 Alley', 'placeholder', 'devvn-vncheckout');
        $fields['billing']['billing_address_1']['class'] = array('form-row-wide');

        $fields['billing']['billing_address_1']['priority']  = 60;
        if(isset($fields['billing']['billing_phone'])) {
            $fields['billing']['billing_phone']['priority'] = 20;
        }
        if(isset($fields['billing']['billing_email'])) {
            $fields['billing']['billing_email']['priority'] = 21;
        }
        if(!$this->get_options('alepay_support')) {
            unset($fields['billing']['billing_country']);
        }
        unset($fields['billing']['billing_company']);

        //Shipping
        unset($fields['shipping']['shipping_first_name']);
        if(!$this->get_options('alepay_support')) {
            $fields['shipping']['shipping_last_name'] = array(
                'label' => __('Full name', 'devvn-vncheckout'),
                'placeholder' => _x('Type Full name', 'placeholder', 'devvn-vncheckout'),
                'required' => true,
                'class' => array('form-row-wide'),
                'clear' => true,
                'priority' => 10
            );
        }
        $fields['shipping']['shipping_phone'] = array(
            'label' => __('Phone', 'devvn-vncheckout'),
            'placeholder' => _x('Phone', 'placeholder', 'devvn-vncheckout'),
            'required' => false,
            'class' => array('form-row-wide'),
            'clear' => true,
            'priority'  =>  20
        );
        $fields['shipping']['shipping_state'] = array(
            'label'		=> __('Province/City', 'devvn-vncheckout'),
            'required' 	=> true,
            'type'		=>	'select',
            'class'    	=> array( 'form-row-wide', 'address-field', 'update_totals_on_change' ),
            'placeholder'	=>	_x('Select Province/City', 'placeholder', 'devvn-vncheckout'),
            'options'   => $tinh_thanhpho,
            'priority'  =>  30
        );
        $fields['shipping']['shipping_city'] = array(
            'label'		=> __('District', 'devvn-vncheckout'),
            'required' 	=> true,
            'type'		=>	'select',
            'class'    	=> array( 'form-row-wide', 'address-field', 'update_totals_on_change' ),
            'placeholder'	=>	_x('Select District', 'placeholder', 'devvn-vncheckout'),
            'options'   => array(
                ''	=> '',
            ),
            'priority'  =>  40
        );
        if(!$this->get_options()) {
            $fields['shipping']['shipping_address_2'] = array(
                'label' => __('Commune/Ward/Town', 'devvn-vncheckout'),
                'required' => true,
                'type' => 'select',
                'class' => array('form-row-wide', 'address-field', 'update_totals_on_change'),
                'placeholder' => _x('Select Commune/Ward/Town', 'placeholder', 'devvn-vncheckout'),
                'options' => array(
                    '' => '',
                ),
                'priority'  =>  50
            );
            if ($this->get_options('required_village')) {
                $fields['shipping']['shipping_address_2']['required'] = false;
            }
        }
        $fields['shipping']['shipping_address_1']['placeholder'] = _x('Ex: No. 20, 90 Alley', 'placeholder', 'devvn-vncheckout');
        $fields['shipping']['shipping_address_1']['priority']  = 60;
        $fields['shipping']['shipping_address_1']['class']  = array('form-row-wide');

        if(!$this->get_options('alepay_support')) {
            unset($fields['shipping']['shipping_country']);
        }
        unset($fields['shipping']['shipping_company']);

        uasort( $fields['billing'], array( $this, 'sort_fields_by_order' ) );
        uasort( $fields['shipping'], array( $this, 'sort_fields_by_order' ) );

        return $fields;
    }

    function sort_fields_by_order($a, $b){
        if(!isset($a['priority']) || $a['priority'] == $b['priority']){
            return 0;
        }
        return ($a['priority'] < $b['priority']) ? -1 : 1;
    }

    function order_fields($fields)
    {

        //billing
        $order_billing = array(
            "billing_last_name",
            "billing_phone",
            "billing_email",
            "billing_state",
            "billing_city"
        );
        if (!$this->get_options()) {
            $order_billing[] = "billing_address_2";
        }
        $order_billing[] = "billing_address_1";

        foreach ($order_billing as $field_billing) {
            $ordered_fields2[$field_billing] = $fields["billing"][$field_billing];
        }
        $fields["billing"] = $ordered_fields2;

        //shipping
        $order_shipping = array(
            "shipping_last_name",
            "shipping_phone",
            "shipping_state",
            "shipping_city",
        );
        if (!$this->get_options()) {
            $order_shipping[] = "shipping_address_2";
        }
        $order_shipping[] = "shipping_address_1";

        foreach ($order_shipping as $field_shipping) {
            $ordered_fields[$field_shipping] = $fields["shipping"][$field_shipping];
        }
        $fields["shipping"] = $ordered_fields;

        return $fields;
    }

	function search_in_array($array, $key, $value)
	{
	    $results = array();

	    if (is_array($array)) {
            if (isset($array[$key]) && is_numeric($array[$key]) && $array[$key] == $value) {
                $results[] = $array;
            }elseif(isset($array[$key]) && is_serialized($array[$key]) && in_array($value,maybe_unserialize($array[$key]))){
                $results[] = $array;
            }
	        foreach ($array as $subarray) {
	            $results = array_merge($results, $this->search_in_array($subarray, $key, $value));
	        }
	    }

	    return $results;
	}

	function devvn_enqueue_UseAjaxInWp() {
		if(is_checkout()){
            wp_enqueue_style( 'dwas_styles', plugins_url( '/assets/css/devvn_dwas_style.css', __FILE__ ), array(), $this->_version, 'all' );
			wp_enqueue_script( 'devvn_tinhthanhpho', plugins_url('assets/js/devvn_tinhthanh.js', __FILE__), array('jquery','select2'), $this->_version, true);
			$php_array = array(
				'admin_ajax'		=>	admin_url( 'admin-ajax.php'),
				'home_url'			=>	home_url(),
                'formatNoMatches'   =>  __('No value', 'devvn-vncheckout')
			);
			wp_localize_script( 'devvn_tinhthanhpho', 'devvn_array', $php_array );
		}
	}

	function load_diagioihanhchinh_func() {
		$matp = isset($_POST['matp']) ? intval($_POST['matp']) : '';
		$maqh = isset($_POST['maqh']) ? intval($_POST['maqh']) : '';
		if($matp){
			$result = $this->get_list_district($matp);
			wp_send_json_success($result);
		}
		if($maqh){
			$result = $this->get_list_village($maqh);
			wp_send_json_success($result);
		}
		wp_send_json_error();
		die();
	}
	function devvn_get_name_location($arg = array(), $id = '', $key = ''){
		if(is_array($arg) && !empty($arg)){
			$nameQuan = $this->search_in_array($arg,$key,$id);
			$nameQuan = isset($nameQuan[0]['name'])?$nameQuan[0]['name']:'';
			return $nameQuan;
		}
		return false;
	}

	function get_name_city($id = ''){
		global $tinh_thanhpho;
		if(!is_array($tinh_thanhpho) || empty($tinh_thanhpho)){
			include 'cities/tinh_thanhpho.php';
		}
		$id_tinh = sprintf("%02d", intval($id));
		$tinh_thanhpho = (isset($tinh_thanhpho[$id_tinh]))?$tinh_thanhpho[$id_tinh]:'';
		return $tinh_thanhpho;
	}

	function get_name_district($id = ''){
		include 'cities/quan_huyen.php';
		$id_quan = sprintf("%03d", intval($id));
		if(is_array($quan_huyen) && !empty($quan_huyen)){
			$nameQuan = $this->search_in_array($quan_huyen,'maqh',$id_quan);
			$nameQuan = isset($nameQuan[0]['name'])?$nameQuan[0]['name']:'';
			return $nameQuan;
		}
		return false;
	}

	function get_name_village($id = ''){
		include 'cities/xa_phuong_thitran.php';
		$id_xa = sprintf("%05d", intval($id));
		if(is_array($xa_phuong_thitran) && !empty($xa_phuong_thitran)){
			$name = $this->search_in_array($xa_phuong_thitran,'xaid',$id_xa);
			$name = isset($name[0]['name'])?$name[0]['name']:'';
			return $name;
		}
		return false;
	}

	function devvn_woocommerce_localisation_address_formats($arg){
		unset($arg['default']);
		unset($arg['VN']);
		$arg['default'] = "{name}\n{company}\n{address_1}\n{address_2}\n{city}\n{state}\n{country}";
		$arg['VN'] = "{name}\n{company}\n{address_1}\n{address_2}\n{city}\n{state}\n{country}";
		return $arg;
	}

	function devvn_woocommerce_order_formatted_billing_address($eArg,$eThis){

        if(!$eArg) return array();

        if($this->devvn_check_woo_version()){
            $orderID = $eThis->get_id();
        }else {
            $orderID = $eThis->id;
        }

		$nameTinh = $this->get_name_city(get_post_meta( $orderID, '_billing_state', true ));
		$nameQuan = $this->get_name_district(get_post_meta( $orderID, '_billing_city', true ));
		$nameXa = $this->get_name_village(get_post_meta( $orderID, '_billing_address_2', true ));

		unset($eArg['state']);
		unset($eArg['city']);
		unset($eArg['address_2']);

		$eArg['state'] = $nameTinh;
		$eArg['city'] = $nameQuan;
		$eArg['address_2'] = $nameXa;

		return $eArg;
	}

	function devvn_woocommerce_order_formatted_shipping_address($eArg,$eThis){

        if(!$eArg) return array();

        if($this->devvn_check_woo_version()){
            $orderID = $eThis->get_id();
        }else {
            $orderID = $eThis->id;
        }

		$nameTinh = $this->get_name_city(get_post_meta( $orderID, '_shipping_state', true ));
		$nameQuan = $this->get_name_district(get_post_meta( $orderID, '_shipping_city', true ));
		$nameXa = $this->get_name_village(get_post_meta( $orderID, '_shipping_address_2', true ));

		unset($eArg['state']);
		unset($eArg['city']);
		unset($eArg['address_2']);

		$eArg['state'] = $nameTinh;
		$eArg['city'] = $nameQuan;
		$eArg['address_2'] = $nameXa;

		return $eArg;
	}

	function devvn_woocommerce_my_account_my_address_formatted_address($args, $customer_id, $name){

        if(!$args) return array();

		$nameTinh = $this->get_name_city(get_user_meta( $customer_id, $name.'_state', true ));
		$nameQuan = $this->get_name_district(get_user_meta( $customer_id, $name.'_city', true ));
		$nameXa = $this->get_name_village(get_user_meta( $customer_id, $name.'_address_2', true ));

		unset($args['address_2']);
		unset($args['city']);
		unset($args['state']);

		$args['state'] = $nameTinh;
		$args['city'] = $nameQuan;
		$args['address_2'] = $nameXa;

		return $args;
	}

	function get_list_district($matp = ''){
		if(!$matp) return false;
		include 'cities/quan_huyen.php';
		$matp = sprintf("%02d", intval($matp));
		$result = $this->search_in_array($quan_huyen,'matp',$matp);
		return $result;
	}

    function get_list_district_select($matp = ''){
        $district_select  = array();
        $district_select_array = $this->get_list_district($matp);
        if($district_select_array && is_array($district_select_array)){
            foreach ($district_select_array as $district){
                $district_select[$district['maqh']] = $district['name'];
            }
        }
        return $district_select;
    }

	function get_list_village($maqh = ''){
		if(!$maqh) return false;
		include 'cities/xa_phuong_thitran.php';
		$id_xa = sprintf("%05d", intval($maqh));
		$result = $this->search_in_array($xa_phuong_thitran,'maqh',$id_xa);
		return $result;
	}

    function get_list_village_select($maqh = ''){
        $village_select  = array();
        $village_select_array = $this->get_list_village($maqh);
        if($village_select_array && is_array($village_select_array)){
            foreach ($village_select_array as $village){
                $village_select[$village['xaid']] = $village['name'];
            }
        }
        return $village_select;
    }

	function devvn_after_shipping_address($order){
	    if($this->devvn_check_woo_version()){
            $orderID = $order->get_id();
        }else {
            $orderID = $order->id;
        }
	    echo '<p><strong>'.__('Phone number of the recipient', 'devvn-vncheckout').':</strong> <br>' . get_post_meta( $orderID, '_shipping_phone', true ) . '</p>';
	}

	function devvn_woocommerce_order_details_after_customer_details($order){
		ob_start();
        if($this->devvn_check_woo_version()){
            $orderID = $order->get_id();
        }else {
            $orderID = $order->id;
        }
        $sdtnguoinhan = get_post_meta( $orderID, '_shipping_phone', true );
		if ( $sdtnguoinhan ) : ?>
			<tr>
				<th><?php _e( 'Shipping Phone:', 'devvn-vncheckout' ); ?></th>
				<td><?php echo esc_html( $sdtnguoinhan ); ?></td>
			</tr>
		<?php endif;
		echo ob_get_clean();
	}

	public function get_options($option = 'active_village'){
		$flra_options = wp_parse_args(get_option($this->_optionName),$this->_defaultOptions);
		return isset($flra_options[$option])?$flra_options[$option]:false;
	}

	public function admin_enqueue_scripts() {
		wp_enqueue_style( 'woocommerce_district_shipping_styles', plugins_url( '/assets/css/admin.css', __FILE__ ), array(), $this->_version, 'all' );

        wp_enqueue_script( 'woocommerce_district_admin_order', plugins_url( '/assets/js/admin-district-admin-order.js', __FILE__ ), array( 'jquery', 'select2'), $this->_version, true );
        wp_localize_script( 'woocommerce_district_admin_order', 'woocommerce_district_admin', array(
            'ajaxurl'   =>  admin_url('admin-ajax.php'),
            'formatNoMatches'   =>  __('No value', 'devvn-vncheckout')
        ) );
	}

    public static function plugin_action_links( $links ) {
        $action_links = array(
            'upgrade_pro' => '<a href="http://levantoan.com/plugin-tinh-phi-van-chuyen-cho-quan-huyen-trong-woocommerce/"  target="_blank" style="color: #e64a19; font-weight: bold; font-size: 108%%;" title="' . esc_attr( __( 'Upgrade to Pro', 'devvn-vncheckout' ) ) . '">' . __( 'Upgrade to Pro', 'devvn-vncheckout' ) . '</a>',
            'settings' => '<a href="' . admin_url( 'options-general.php?page=devvn-district-address' ) . '" title="' . esc_attr( __( 'Settings', 'devvn-vncheckout' ) ) . '">' . __( 'Settings', 'devvn-vncheckout' ) . '</a>',
        );

        return array_merge( $action_links, $links );
    }
    public function devvn_check_woo_version($version = '3.0.0'){
        if ( defined( 'WOOCOMMERCE_VERSION' ) && version_compare( WOOCOMMERCE_VERSION, $version, '>=' ) ) {
            return true;
        }
        return false;
    }
    function devvn_change_default_checkout_country() {
        return 'VN';
    }
    function devvn_change_default_checkout_state() {
        $state = $this->get_options('tinhthanh_default');
        return ($state)?$state:'01';
    }
    function devvn_custom_override_default_address_fields( $address_fields ) {
        if(!$this->get_options('alepay_support')) {
            unset($address_fields['first_name']);
            $address_fields['last_name'] = array(
                'label' => __('Full name', 'devvn-vncheckout'),
                'placeholder' => _x('Type Full name', 'placeholder', 'devvn-vncheckout'),
                'required' => true,
                'class' => array('form-row-wide'),
                'clear' => true
            );
        }
        unset($address_fields['postcode']);
        unset($address_fields['address_2']);
        unset($address_fields['state']);
        unset($address_fields['city']);
        //order
        if(!$this->get_options('alepay_support')) {
            $order = array(
                "last_name",
                "company",
                "country",
                "address_1",
            );
        }else{
            $order = array(
                "first_name",
                "last_name",
                "company",
                "country",
                "address_1",
            );
        }
        foreach($order as $field){
            $ordered_fields[$field] = $address_fields[$field];
        }
        $address_fields = $ordered_fields;

        return $address_fields;
    }
    function devvn_woocommerce_get_country_locale($args){
        $args['VN'] = array(
            'state' => array(
                'label'        => __('Province/City', 'devvn-ghtk'),
                'priority'     => 41,
            ),
            'city' => array(
                'priority'     => 42,
            ),
            'address_2' => array(
                'hidden'   => false,
                'priority'     => 43,
            ),
            'address_1' => array(
                'priority'     => 44,
            ),
        );
        return $args;
    }
    function devvn_woocommerce_admin_billing_fields($billing_fields){
        global $thepostid, $post;
        $thepostid = empty( $thepostid ) ? $post->ID : $thepostid;
        $city = get_post_meta( $thepostid, '_billing_state', true );
        $district = get_post_meta( $thepostid, '_billing_city', true );
        $billing_fields = array(
            'first_name' => array(
                'label' => __( 'First name', 'woocommerce' ),
                'show'  => false,
            ),
            'last_name' => array(
                'label' => __( 'Last name', 'woocommerce' ),
                'show'  => false,
            ),
            'company' => array(
                'label' => __( 'Company', 'woocommerce' ),
                'show'  => false,
            ),
            'country' => array(
                'label'   => __( 'Country', 'woocommerce' ),
                'show'    => false,
                'class'   => 'js_field-country select short',
                'type'    => 'select',
                'options' => array( '' => __( 'Select a country&hellip;', 'woocommerce' ) ) + WC()->countries->get_allowed_countries(),
            ),
            'state' => array(
                'label' => __( 'Tỉnh/thành phố', 'woocommerce' ),
                'class'   => 'js_field-state select short',
                'show'  => false,
            ),
            'city' => array(
                'label' => __( 'Quận/huyện', 'woocommerce' ),
                'class'   => 'js_field-city select short',
                'type'      =>  'select',
                'show'  => false,
                'options' => array( '' => __( 'Chọn quận/huyện&hellip;', 'woocommerce' ) ) + $this->get_list_district_select($city),
            ),
            'address_2' => array(
                'label' => __( 'Xã/phường/thị trấn', 'woocommerce' ),
                'show'  => false,
                'class'   => 'js_field-address_2 select short',
                'type'      =>  'select',
                'options' => array( '' => __( 'Chọn xã/phường/thị trấn&hellip;', 'woocommerce' ) ) + $this->get_list_village_select($district),
            ),
            'address_1' => array(
                'label' => __( 'Address line 1', 'woocommerce' ),
                'show'  => false,
            ),
            'email' => array(
                'label' => __( 'Email address', 'woocommerce' ),
            ),
            'phone' => array(
                'label' => __( 'Phone', 'woocommerce' ),
            )
        );
        return $billing_fields;
    }
    function devvn_woocommerce_admin_shipping_fields($shipping_fields){
        global $thepostid, $post;
        $thepostid = empty( $thepostid ) ? $post->ID : $thepostid;
        $city = get_post_meta( $thepostid, '_shipping_state', true );
        $district = get_post_meta( $thepostid, '_shipping_city', true );
        $billing_fields = array(
            'first_name' => array(
                'label' => __( 'First name', 'woocommerce' ),
                'show'  => false,
            ),
            'last_name' => array(
                'label' => __( 'Last name', 'woocommerce' ),
                'show'  => false,
            ),
            'company' => array(
                'label' => __( 'Company', 'woocommerce' ),
                'show'  => false,
            ),
            'country' => array(
                'label'   => __( 'Country', 'woocommerce' ),
                'show'    => false,
                'type'    => 'select',
                'class'   => 'js_field-country select short',
                'options' => array( '' => __( 'Select a country&hellip;', 'woocommerce' ) ) + WC()->countries->get_shipping_countries(),
            ),
            'state' => array(
                'label' => __( 'Tỉnh/thành phố', 'woocommerce' ),
                'class'   => 'js_field-state select short',
                'show'  => false,
            ),
            'city' => array(
                'label' => __( 'Quận/huyện', 'woocommerce' ),
                'class'   => 'js_field-city select short',
                'type'      =>  'select',
                'show'  => false,
                'options' => array( '' => __( 'Chọn quận/huyện&hellip;', 'woocommerce' ) ) + $this->get_list_district_select($city),
            ),
            'address_2' => array(
                'label' => __( 'Xã/phường/thị trấn', 'woocommerce' ),
                'show'  => false,
                'class'   => 'js_field-address_2 select short',
                'type'      =>  'select',
                'options' => array( '' => __( 'Chọn xã/phường/thị trấn&hellip;', 'woocommerce' ) ) + $this->get_list_village_select($district),
            ),
            'address_1' => array(
                'label' => __( 'Address line 1', 'woocommerce' ),
                'show'  => false,
            ),
        );
        return $billing_fields;
    }
}
}//End if active woo
