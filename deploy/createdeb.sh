#!/bin/bash
#run from project root
VERSION="01"
PROJECT_NAME="schoolmarket"
PACKAGE_NAME=$PROJECT_NAME$VERSION
INSTALL_PATH=home/gorod/$PACKAGE_NAME

echo Creating file structure
rm -rf deb
mkdir -p deb/DEBIAN deb/$INSTALL_PATH
cp -r ./{app,api,api-debug,assets,console,app.js,commander.js,config.json,gulpfile.js,package.json,README.md,soy-extend.js} deb/$INSTALL_PATH

echo Creating control file
cat <<EOT >> deb/DEBIAN/control
Package: $PACKAGE_NAME
Version: 1.0-1 
Section: misc 
Architecture: all 
Maintainer: KSakhanenko 
Description: school_market
 hi
EOT

echo Creating postinstall script
cat <<EOT >> deb/DEBIAN/postinst
#!/bin/bash
cd $INSTALL_PATH
npm i
gulp migrate 
gulp --production=true
EOT

chmod 0555 deb/DEBIAN/postinst
fakeroot dpkg-deb --build deb
echo Removing trash
mv deb.deb deploy/$PACKAGE_NAME.deb
rm -rf deb
echo Package $PACKAGE_NAME.deb created!
