<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'l1_PROJECTNAME');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '(`zF9spae_H+4-N](}M(:QIw^`:=h)Q{B=_-Zf]AyC!lPxR8P}:V01$9Q/dy[p-i');
define('SECURE_AUTH_KEY',  '/p:xXjJ10<X&;D-F/U-e?w?vVp-%zLw]0>,0.L4!WS~U&VE&h<,!+}Q,,{C%E7ta');
define('LOGGED_IN_KEY',    'fz+fwJc_s9vLx+)8.gQA71NF/]OPfgCQ+YnR Y-bc]0e2R*+?iT+?4vsoDJ>7vO$');
define('NONCE_KEY',        '* :6-D@XlIuaceG-UaLQVxseCUyR ;T|l8XR+m2&tkul-3lez?5O6fFbDO6[|udm');
define('AUTH_SALT',        'uCVu;,]9TqjumV kuI:A!>ez@+OH&K5#-Sn2u0twEkPd8h}w9W~]e {3kkSE7UW.');
define('SECURE_AUTH_SALT', 'eJ{@zi>xn=3<raJNG]]3Eaf|2!#uNzi@i+ta_!pm>3JK$wQ>Qa*Ft5ijI(_qAmfi');
define('LOGGED_IN_SALT',   'IP%l$tN.{A/5rr>HgsZ|xc *Fv![ h6:i^T^ISht,8i5kh,E)61 IuG/P~x%+D?U');
define('NONCE_SALT',       '`OVNl;9a6#6rJ{%hDlw6a5QW]U3&+N-KO&pRq,2+^(>IGz+d,RlF`Oos3Mugn(D^');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
