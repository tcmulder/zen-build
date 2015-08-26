    <?php
/**
 * The header for our theme.
 *
 *
 * @package WordPress
 * @subpackage Zemplate
 * @since Zemplate 2.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <title><?php bloginfo('name'); ?> | <?php is_front_page() ? bloginfo('description') : wp_title(''); ?></title>

    <?php //<meta name="viewport" content="width=device-width, initial-scale=1.0" /> ?>
    <link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

    <!--[if lt IE 9]>
        <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <?php wp_head(); //mandatory ?>
    <?php //get_template_part('templates/parts/header', 'analytics'); ?>
</head>

<body <?php body_class('page-'.$post->post_name); ?>>
<div class="wrap-all-the-things">
    <header class="main-head">
        <br>svg symlink:<br>
        <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <use xlink:href="<?php echo get_template_directory_uri(); ?>/images/general.sprite.svg#svg-arrow" />
        </svg>
        <br>svg symbol:<br>
        <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <use xlink:href="<?php echo get_template_directory_uri(); ?>/images/general-sprite/symbol/svg/sprite.symbol.svg#svg-cancel" />
        </svg>
        <div class="main-head__inner">
            <div class="main-head__nav">
                <?php
                    $attr = array(
                        'theme_location'  => 'head-menu',
                        'container'       => 'nav',
                        'container_class' => 'head-nav',
                        'menu_class'      => 'menu'
                    );
                    wp_nav_menu($attr);
                ?>
            </div>
        </div> <!-- //__inner -->
    </header> <!-- //main-head -->