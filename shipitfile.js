module.exports = function (shipit) {

    require('shipit-deploy')(shipit);
    require('shipit-db')(shipit);

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
            shallowClone: true,
            db: {
                local: {
                    host     : 'localhost',
                    adapter  : 'mysql',
                    username : 'root',
                    password : 'root',
                    socket   : '/Applications/MAMP/tmp/mysql/mysql.sock',
                    database : 'l1_panorama',
                },
                remote: {
                    host     : 'localhost',
                    adapter  : 'mysql',
                    username : 'root',
                    password : 'vagrant',
                    database : 'wp_panorama',
                }
            }
        },
        staging: {
            branch: 'dev_shipit',
            workspace: '../shipit',
            deployTo: '/vagrant/html/stage',
            key: '/Users/tcmulder/.vagrant.d/insecure_private_key',
            servers: 'vagrant@127.0.0.1:2222'
        }
    });


    // var credentialParams = function credentialParams(dbConfig) {
    //     var params = {
    //       '-u': dbConfig.username || null,
    //       '-p': dbConfig.password || null,
    //       '-h': dbConfig.host || null,
    //       '-S': dbConfig.socket || null,
    //       '-P': dbConfig.port || null,
    //     };

    // }

    //     shipit.task('test', function () {
    //         shipit.log(anotherTest('staging'));
    //         return anotherTest('staging');
    //     });
    //     function anotherTest(environment){
    //         return shipit.config.db[environment];
    //     }


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