<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'haruko_shop' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '*xME*$G-OAr$UIsFckI`Ko=c 9KKX(q,,SocsB[hmb~)OLHF-s|h-x,Ka*r>WN?H' );
define( 'SECURE_AUTH_KEY',  'x7E[Lcc]Hx^IF.sm(exrzrj3/]~Un%S1cm@F1p[`paj2u!g]G`f1nf!(-r2@p,xI' );
define( 'LOGGED_IN_KEY',    'Ktp|&=%0=y^k@ItNJ$HzK0Tya_^%5>A{<<i!TU5{I94>X{s^xG/nyH~ _D+ciw#3' );
define( 'NONCE_KEY',        'f0/IY(_ %4lsGI$E>pfJ>IRtr/miBJ}uq@X,KdkSvJ_,D{cy)X!gXq`Q*ku#b57p' );
define( 'AUTH_SALT',        'yc/OBV,4|BK^yl^][q6JCZ1Wb5c5<8/W&8g+HQH<~a`M#748A=a@f~AjbV0!Pe.S' );
define( 'SECURE_AUTH_SALT', 'fj|98Tm<zS<Sb$fw-y%sKEqdM8HX[}&S_RkrY%G#q|KFa 74q];zC2YPJWo^*-)Q' );
define( 'LOGGED_IN_SALT',   ']<ERhy.K*j_.l>Ftu;&lzY~jE@p+RW,(v VAZ z2+4=Vv<7F@y|Y;yp8&^`+-A$[' );
define( 'NONCE_SALT',       'KByt:|4lcwY|uY/mk)lVR9XY7OsA;L*x4z>8@y>lDm{/kcIRubglve,bCzm_T{p~' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
