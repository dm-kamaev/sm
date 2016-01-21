// Build package using https://github.com/liip/packaging
// run packaging bin/make-deb

defined('LIB_DIR') || define('LIB_DIR', 'node_modules/deployment');
$project_release_number = getenv('packaging_release_number');

$configure = [
    'packagename' => 'school-market',
    'arch' => 'all',
    'version' => "1.$project_release_number",
    'packagetype' => 'deb',

    'tmpdir' => '/tmp',
    'templatedir' => 'templates',
    'postinst' => 'templates/postinstall',
    'preinst' => '',
    'postrm' => '',
    'prerm' => 'templates/prerm',
];

$filemapping = [
    'opt/@PACKAGENAME@/@VERSION@' => [
        '*',

        // files and folders to exclude from package
        '- /packaging',
        '- /bin/make-deb',
        '- /bin/deploy',
        '- /packaging_config.php',
    ],
    'etc/init.d/@PACKAGENAME@-node' => 'templates/@PACKAGENAME@-node',
    'etc/nginx/sites-available/schools.mel.fm' => 'environment/nginx/schools_mel_fm.conf',
    'etc/nginx/sites-available/schools' => 'environment/nginx/school-market.qa.conf',
];
