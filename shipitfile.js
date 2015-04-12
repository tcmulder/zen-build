module.exports = function (shipit) {

    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            repositoryUrl: 'git@git.zenman.com:zen/panorama.git',
            ignores: [
                '.git',
                'node_modules',
                'zen-config.php'
            ],
            rsync: ['--del'],
            keepReleases: 2,
            shallowClone: true
        },
        staging: {
            branch: 'dev_shipit',
            workspace: '../shipit',
            deployTo: '/vagrant/html/stage',
            key: '/Users/tcmulder/.vagrant.d/insecure_private_key',
            servers: 'vagrant@127.0.0.1:2222'
        }
    });


    shipit.task('db', function () {
        shipit.log('Database stuff');
        shipit.local('ls')
            .then(function () {
              return shipit.remote('mysql -uroot -pvagrant -Dwp_panorama -e \'SHOW TABLES\'');
            })
            .then(function () {
              shipit.remote('ls -lah');
            });
      });
    // shipit.task('deploy', function () {
    //     shipit.log('Deploy the current build of PaperQuik.com.');
    //     shipit.local('grunt build')
    //         .then(function () {
    //           return shipit.remoteCopy('dist/*', '/tmp/' + tmpDir);
    //         })
    //         .then(function () {
    //           shipit.log('Move folder to web root');
    //           return shipit.remote('sudo cp -R /tmp/' + tmpDir + '/*' + ' /var/www/paperquik')
    //         })
    //         .then(function () {
    //           shipit.remote('rm -rf /tmp/' + tmpDir);
    //         });
    //   });

    shipit.task('hello', function () {
        return shipit.remote('echo "hello world"');
    });

};