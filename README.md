# Zenman gulp Setup 2.1.0
## Description
The standard gulp setup for Zenman automates common tasks when building websites.

## Setup
To start using gulp, first you'll need to [install node](http://nodejs.org/) and [install gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) on your system. With these installed system-wide, you're ready to add gulp to your project.

1. Download this repository and add the ``gulpfile.js``, ``package.json``, and ``zen-config.js`` files to the root of your project.
2. Run the command ``npm install`` in the root of your project to install the necessary modules.
3. Open the ``zen-config.js`` file and modify the values to match those of your project.

**Note:** *if it's not already present you'll also want to make sure you add the  ``node_modules`` directory to your ``.gitignore`` file and commit that change before any other commits.*

## Usage
Gulp handles a variety of common tasks and can be configured to handle many more. If you want to contribute, please update the README.md file to explain how to use what you have added.

### The Default ``gulp`` Command
By default, if you ``cd`` into the root of your project and run the command ``gulp``, you will be running the ``watch`` task. This task will handle several tasks:

1. It will run the ``gulp css`` task.
2. It will run all of your ``gulp js-foo`` tasks.
4. It will refresh the browser using [BrowserSync](http://www.browsersync.io/) if it detects changes to ``.css``, ``.html``, ``.php``, or ``.js`` files.

**Note:** *since compilation of ``.scss`` files will result in ``.css`` file changes, the browser will refresh after compiling ``.scss`` as well.*

### The ``gulp css`` Command

You can add just one set of a source SASS and destination CSS folder to the ``zen-config.js`` file.

The ``gulp css`` command will run [gulp-compass](https://www.npmjs.org/package/gulp-compass) to compile your SASS files. It will require [sass-globbing](https://github.com/chriseppstein/sass-globbing), run [gulp-autoprefixer](https://www.npmjs.org/package/gulp-autoprefixer) to smartly prefix your CSS, and will result in a compressed CSS file. The gulp-compass module will also output a sourcemap file so your dev tool can match the compiled script to the original files _(note: sourcemap not currently working due to autoprefixer issue)_.

### The ``gulp js-foo`` Command
You can add any number of JavaScript objects for processing in the ``zen-config.js`` file. In general, it is best to format these like ``scripts-src`` to compile to ``scripts.min.js``, ``nav-src`` to compile to ``nav.min.js``, and so on to keep everything organized alphabetically. You will link to the ``foo.min.js`` files in your theme.

The ``gulp js-foo`` command will run [gulp-jshint](https://www.npmjs.org/package/gulp-jshint) to lint your JavaScript for the ``foo`` object in the ``zen-config.js`` file. The hints will output on the command line to help you keep your code clean. It will then run [gulp-uglifyjs](https://www.npmjs.org/package/gulp-uglifyjs) (not gulp-uglify) which will concatenate JavaScript files, uglify them, and output a single minified file. It will also output a sourcemap file so your dev tool can match the compiled script to the original files.

### The ``gulp svg-foo`` Command

You can add any number of SVG sprite objects for processing in the ``zen-config.js`` file. In general, it is best to format these like ``general-src`` to compile to the ``general-sprite/`` directory, ``social-src`` to compile to the ``social-sprite/`` directory, and so on to keep everything organized alphabetically. You will link to the generated ``foo-sprite/symbol/svg/sprite.symbol.svg`` files in your theme as your [SVG sprite](http://css-tricks.com/svg-sprites-use-better-icon-fonts/).

The ``gulp svg-foo`` command will run [gulp-svg-sprite](https://www.npmjs.org/package/gulp-svg-sprites) (not to be confused with the deprecated gulp-svg-sprites) to compile SVG files from the ``foo`` object in the ``zen-config.js`` file.

### The ``gulp db-exp`` Command

You can specify your database credentials and dump destination in the ``zen-config.js`` file.

The ``gulp db-exp`` command will create the dump directory if it doesn't exist. It will then ``mysqldump`` your database into it. Lastly, it will print the dump's rough file size on the command line (useful for debugging purposes as it's common to be zero bites if something when wrong).

### The ``gulp db-imp`` Command

You can specify your database credentials and backup location in the ``zen-config.js`` file.

The ``gulp db-imp`` command actually calls ``gulp db-drop-and-import`` and ``gulp db-far`` synchronously.

**SEE IMPORTANT NOTES FOR** ``gulp db-far``

### The ``gulp db-drop-and-import`` Command

You can specify your database credentials and backup location in the ``zen-config.js`` file.

The ``gulp db-drop-and-import`` command will drop all tables in your database, then import the backup dump into your database.

### The ``gulp db-far`` Command

**Important Note**
This script assumes you have a WordPress database. It also has a dependency: it relies on a [script by interconnect/it](https://interconnectit.com/products/search-and-replace-for-wordpress-databases/) installed at the specific location ``/Applications/MAMP/htdocs/_far/srdb.cli.php`` as there is no satisfactory gulp plugin that provides this functionality.

You can specify your database credentials in the ``zen-config.js`` file, and also the root URL of your site (the path to the home page).

The ``gulp db-far`` command will look for the siteurl reported by the database. It will then perform a serialized find and replace for that string with the root URL from the ``zen-config.js`` file.

## Changelog

15.04.12 gulp_2.1.0_beta
15.04.06 gulp_2.0.2
15.03.30 gulp_2.0.1
15.03.30 gulp_2.0.0
15.03.30 gulp_1.3.0
15.03.30 gulp_1.2.0
15.03.30 gulp_1.1.1
15.03.30 gulp_1.1.0
15.03.30 gulp_1.0.0
14.05.16 grunt_1.1.0

## To Do:
Feel free to contribute additional functionality to the Zenman gulp setup.

### Future Features List
- Initialize New Website.
    -  Clone repository from gitlab.
    -  Ask if it's a WordPress site.
        -  Set up local hooks.
            - Set up hook configuration file with project values.
            - Set up pre-commit calls to scripts.
                - Set up database dump.
        - Set up wp-config.php file.
        - Create database.
        - Import default plugins.
        - Download zemplate theme.
        - Send URL to browser for WordPress installation.
- Development Helpers.
    - ~~Compile SASS/SCSS~~.
    - ~~Watch for file changes~~.
    - ~~Livereload when files change~~.
    - ~~Run shell commands (used in other tasks)~~.
    - ~~Handle databases for merging/checkout etc.~~
        - ~~Export databases.~~
        - ~~Import databases.~~
        - ~~Serialized find and replace of database URLs.~~
        - Perform serialized find and replace without dependencies
    - ~~Generate SVG sprites~~.
    - ~~Generate data URIs.~~
    - ~~Ensure Gulp uses latest version of dependencies~~.
    - ~~Ensure those dependencies are documented in the package.json~~.
    - ~~Generate icon fonts~~.
    - ~~Autoprefix vender prefixes~~.
    - ~~Compress CSS.~~
    - ~~Output sitemaps for CSS.~~
    - ~~Lint JavaScript (don't force fixes though)~~.
    - ~~Concatenate JavaScript files.~~
    - ~~Compress JavaScript files.~~
    - ~~Establish JavaScript sourcemap.~~
    - ~~Compress images.~~
    - ~~Add system Notifications.~~
- Prep for Deployment.
    - ~~Run shell commands (used in other tasks)~~.
    - Dump database to use for deployment.
    - Serialized find and replace of database URLs.
    - Remove unneeded development files.
    - Tar and Gzip site files.
