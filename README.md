# Zenman gulp Setup
## Description
The standard gulp setup for Zenman automates common tasks when working on WordPress projects.

## Setup
To start using gulp, first you'll need to [install node](http://nodejs.org/) and [install gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) on your system. With these installed system-wide, you're ready to add gulp to your project.

1. Download this repository and add the ``gulpfile.js``, ``icons-template.scss-template``, and ``package.json`` files to the root of your project.
2. Run the command ``npm update --save-dev`` in the root of your project to install the necessary modules.
3. Open the ``gulpfile.js`` file and modify the values to match those of your project.

**Note:** *if it's not already present you'll also want to make sure you add the  ``node_modules`` directory to your ``.gitignore`` file and commit that change before any other commits.*

## Usage
Gulp handles a variety of common tasks and can be configured to handle many more. If you want to contribute, please update the README.md file to explain how to use what you have added.

### The Default ``gulp`` Command
By default, if you ``cd`` into the root of your project and run the command ``gulp``, you will be running the ``watch`` task. This task will handle several tasks:

1. It will run ``css`` task when it detects changes in ``sass/**/*.scss``.
2. It will run ``js`` task when it detects changes in ``js/src/**/*.js``.
3. It will run ``icons`` task when it detects changes in ``fonts/icons-raw/*.svg``.
4. It will run ``sprite`` task when it detects changes in ``images/svg-raw/*.svg``.
5. It will refresh the browser using a [livereload extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) if it detects changes to ``.css``, ``.html``, ``.php``, ``.js``, or ``.svg`` files in  the theme folder.

**Note:** *since compilation of ``.scss`` files will result in ``.css`` file changes, the browser will refresh after compiling ``.scss`` as well.*

### The ``gulp js`` Command
The ``gulp js`` command will run [gulp-jshint](https://www.npmjs.org/package/gulp-jshint) to lint your JavaScript. The hints will output on the command line to help you keep your code clean. It will then run [gulp-uglifyjs](https://www.npmjs.org/package/gulp-uglifyjs) (not gulp-uglify) which will concatenate ``js/src/**/*.js`` files, uglify them, resulting in a ``js/scripts.min.js`` file. It will also output a ``js/src/sourcemap.map`` file so your dev tool can match the compiled script to the original files.

### The ``gulp css`` Command
The ``gulp css`` command will run [gulp-compass](https://www.npmjs.org/package/gulp-compass) to compile your ``sass/*.scss`` files. It will require [sass-globbing](https://github.com/chriseppstein/sass-globbing), run [gulp-autoprefixer](https://www.npmjs.org/package/gulp-autoprefixer) to smartly prefix your CSS, and will result in a compressed ``style.css`` file. The gulp-compass module will also output a ``style.css.map`` file so your dev tool can match the compiled script to the original files.

### The ``gulp icons`` Command
The ``gulp icons`` command will run [gulp-iconfont](https://www.npmjs.org/package/gulp-iconfont) and [gulp-iconfont-css](https://www.npmjs.org/package/gulp-iconfont-css) to compile ``fonts/icons-raw/*.svg`` files into fonts within the ``fonts/icons/`` file. It will output a ``sass/planets/base/_icons.scss`` file you can use in your project. The output for this file is customize using the ``icons-template.scss-template`` file in the root of your WordPress site (i.e. same level as the gulpfile.js).

### The ``gulp sprite`` Command
The ``gulp sprite`` command will run [gulp-svg-sprites](https://www.npmjs.org/package/gulp-svg-sprites) to compile ``images/svg-raw/*.svg`` files into the ``images/svg-sprites/sprites/svg-defs.svg`` file. You can use this file as your [SVG sprite](http://css-tricks.com/svg-sprites-use-better-icon-fonts/).

### The ``gulp img`` Command
The ``gulp img`` command will run [gulp-imagemin](https://www.npmjs.org/package/gulp-imagemin) to compress ``jpg png svg`` and ``gif`` files into the ``images`` folder. Compression is set to 5 of 7 and the ``viewbox`` is set to be ignored to retain dimensions from illustrator.

## To Do:
Feel free to contribute additional functionality to the Zenman gulp setup.

- Think up cool, "zen" name for our gulp script.
- Decide all functionality we would eventually like to add.
    - Decide on command names for each piece of functionality.

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
    - Handle databases for merging/checkout etc.
        - Export databases.
        - Import databases.
        - Serialized find and replace of database URLs.
    - ~~Generate SVG sprites~~.
    - Generate data URIs.
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
