## ngMemory

##Dependencies
 
 + [npm](https://npmjs.org/)
 + [grunt-cli](http://gruntjs.com/)

##Install cordova

```
npm install -g cordova
```

## Start developing

```
$ git clone git@github.com:agilogy/angular-cordova-workshop.git
$ npm install
$ cordova platform add <ios|android>
$ cordova serve
$ grunt ## for development
$ grunt run ## for building and runing
```

Point your browser to http://0.0.0.0:8000/<platform>/www/index.html

###Note for windows users

`bower install` should be automatically executed after `npm install`, how ever if it fails you will have to run it manually.