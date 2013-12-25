# Zenman grunt Setup
## Description
The standard grunt setup for Zenman automates common tasks when working on WordPress projects.

## Setup
To start using the standard Zenman grunt setup, first you'll need to [install node](http://nodejs.org/) and [install grunt](http://gruntjs.com/getting-started#working-with-an-existing-grunt-project) on your system. With these installed system-wide, you're ready to add grunt to your project.

1. Download this repository and add the ``.grunt`` directory to the root of your project.
2. ``cd`` into the ``.grunt`` directory.
3. Run the command ``npm install`` to install the necessary dependencies.
4. Open the ``config.json`` file and modify the values to match those of your project.

## Usage
The Zenman grunt setup handles a variety of common tasks and can be configured to handle many more. If you want to contribute, please update the README.md file to explain how to use what you have added.

### The Default ``grunt`` Command
By default, if you ``cd`` into the ``.grunt`` directory and run the command ``grunt``, you will be running the ``watch`` task. This task will handle several tasks:

1. It will watch ``.scss`` and ``.sass`` files and compile them when modified.
2. It will refresh the browser using a [livereload extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) if changes to ``.css``, ``.html``, ``.php``, or ``.js`` files are detected.

Note that since compilation of SASS will result in CSS file changes, the browser will refresh after SASS compilation.

### The ``impdb`` and ``expdb`` Commands
The main purpose of these database commands is to assist with ``git`` and version controlling your database.

The ``impdb`` command will reestablish the database stored in the ``/.db/db.sql`` file by dropping your database's data and then importing the SQL file.

This is particularly useful for resetting the database to a particular branch or commit. For example, if you were on the ``dev`` branch and decided to ``git checkout test`` to view the ``test`` branch, you could then run ``grunt impdb``. This gives you the exact files and database that existed in the last commit rather than connecting older files to a newer database.

The ``expdb`` command will export your database as the file ``/.db/db.sql``. You may want to instead add a git pre-commit hook that will dump and track your database on commit, but the ``expdb`` command gives you the option to dump your database without committing changes.

### The ``datauri`` Command
Running the ``grunt datauri`` command will cause all ``.png``, ``.jpg``, and ``.gif`` files in the ``images/datauris`` directory to be written as [data URIs](http://css-tricks.com/data-uris/) in a sass partial located in ``sass/partials/_datauris.scss`` in your WordPress theme.

These data URIs will be accessible as [SASS placeholders](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_), so you can add as many as you want and only the ones that get used will actually be added to the outputted CSS file. The placeholders will be formatted as ``%datauri-image-filename``. For example, if you added an image into ``images/datauris`` called ``dotted-background.png`` and wanted to use it in the ``.main-footer``, you would write:

    .main-footer {
        @extend %datauri-dotted-background;
    }
which would compile to

    .main-footer {
        background-image: url("data:someCrazyLongDataString");
    }

Data URIs are particularly useful for creating a sort of image sprite for images that must be tiled. Normal sprites won't allow you to just repeat one pattern from the file, but using data URIs you can still save HTTP requests by combining a few images in your CSS.

## To Do:
Feel free to contribute additional functionality to the standard Zenman grunt setup.

- Think up cool, "zen" name for our grunt script rather than "standard Zenman grunt setup".
- Decide all functionality we would eventually like to add.
    - Decide on command names for each piece of functionality.
    - Decide the bare minimum needed in ``config.json`` to support this functionality.