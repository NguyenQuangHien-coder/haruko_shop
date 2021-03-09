<?php
/**
 * CartFlows Flows ajax actions.
 *
 * @package CartFlows
 */

namespace CartflowsAdmin\AdminCore\Ajax;

use CartflowsAdmin\AdminCore\Ajax\AjaxBase;
use CartflowsAdmin\AdminCore\Inc\AdminHelper;

/**
 * Class Steps.
 */
class AbSteps extends AjaxBase {

	/**
	 * Instance
	 *
	 * @access private
	 * @var object Class object.
	 * @since 1.0.0
	 */
	private static $instance;

	/**
	 * Initiator
	 *
	 * @since 1.0.0
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Register ajax events.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_ajax_events() {

		$ajax_events = array(
			'hide_archive_ab_test_variation',
			'save_ab_test_setting',
		);

		$this->init_ajax_events( $ajax_events );
	}

	/**
	 * Register ajax events.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function hide_archive_ab_test_variation() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		check_ajax_referer( 'cartflows_hide_archive_ab_test_variation', 'security' );

		if ( isset( $_POST['step_id'] ) ) {
			$step_id = intval( $_POST['step_id'] );
		}
		$result = array(
			'status' => false,
			/* translators: %s step id */
			'text'   => sprintf( __( 'Can\'t create a variation for this step - %s', 'cartflows' ), $step_id ),
		);

		if ( ! $step_id ) {
			wp_send_json( $result );
		}

		update_post_meta( $step_id, 'wcf-hide-step', true );

		$result = array(
			'status' => true,
			/* translators: %s flow id */
			'text'   => sprintf( __( 'Step successfully hidden - %s', 'cartflows' ), $step_id ),
		);

		wp_send_json( $result );
	}


	/**
	 * Save Ab test settings.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function save_ab_test_setting() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		check_ajax_referer( 'cartflows_save_ab_test_setting', 'security' );

		if ( isset( $_POST['step_id'] ) ) {
			$step_id = intval( $_POST['step_id'] );
		}

		if ( isset( $_POST['flow_id'] ) ) {
			$flow_id = intval( $_POST['flow_id'] );
		}
		$result = array(
			'status' => false,
			/* translators: %s step id */
			'text'   => sprintf( __( 'Can\'t create a variation for this step - %s', 'cartflows' ), $step_id ),
		);

		if ( ! $step_id ) {
			wp_send_json( $result );
		}

		if ( isset( $_POST['formdata'] ) ) {
			$form_data = array();

			$form_raw_data = wp_unslash( $_POST['formdata'] ); // phpcs:ignore

			/*
			Commented
				// parse_str( $form_raw_data, $form_data );
				// $form_data = wcf_clean( $form_data );
				// $settings   = isset( $form_data['wcf_ab_settings'] ) ? $form_data['wcf_ab_settings'] : array();
				// $traffic    = isset( $settings['traffic'] ) ? $settings['traffic'] : array();
			*/
			$flow_steps = get_post_meta( $flow_id, 'wcf-steps', true );

			foreach ( $flow_steps as $index => $step_data ) {

				if ( $step_data['id'] === $step_id ) {

					if ( isset( $step_data['ab-test-variations'] ) ) {

						$all_variations = $step_data['ab-test-variations'];

						foreach ( $all_variations as $var_key => $var_data ) {

							$var_id = intval( $var_data['id'] );

							if ( in_array( 'wcf_ab_settings[traffic][' . $var_id . '][value]', $form_data, true ) ) {
								$all_variations[ $var_key ]['traffic'] = intval( $form_data[ 'wcf_ab_settings[traffic][' . $var_id . '][value]' ] );
							}
						}

						$flow_steps[ $index ]['ab-test-variations'] = $all_variations;
					}
				}
			}

			update_post_meta( $flow_id, 'wcf-steps', $flow_steps );

			$result = array(
				'status' => true,
				/* translators: %s step id */
				'text'   => sprintf( __( 'A/B test settings updated for this step - %s', 'cartflows' ), $step_id ),
			);

		}
		wp_send_json( $result );
	}
}
