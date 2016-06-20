function hudumiaJirani($http,$q,$rootScope,TARAKILISHI){



        return {

          ulizaSwali: function(regno) {
                                var req = {
                                                  method: 'POST',
                                                  url: TARAKILISHI.JIRANI,
                                                  headers: {
                                                      'Content-Type': 'application/x-www-form-urlencoded'
                                                    },
                                                  params: { regno: regno }
                                              };
                                  //console.log(req);
                                  return $http(req).then(function(response) {
                                      //console.log(response);
                                      return response.data;
                                  });
          },
          ulizaDereva: function(idno) {
                                var req = {
                                                  method: 'POST',
                                                  url: TARAKILISHI.MADEREVA,
                                                  headers: {
                                                      'Content-Type': 'application/x-www-form-urlencoded'
                                                    },
                                                  params: { usahihino: idno }
                                              };
                                  //console.log(req);
                                  return $http(req).then(function(response) {
                                      //console.log(response);
                                      return response.data;
                                  });
          },
          ulizaMagari: function(pinno) {
                                var req = {
                                                  method: 'POST',
                                                  url: TARAKILISHI.MTUGARI,
                                                  headers: {
                                                      'Content-Type': 'application/x-www-form-urlencoded'
                                                    },
                                                  params: { p: pinno }
                                              };
                                    //console.log(req);

                                    return $http(req).then(function(response) {
                                            //console.log(response);
                                            //console.log("we need to search here");
                                            return response.data;
                                    });
                                }


            }
}

function watuDb($http,$q,$rootScope,TARAKILISHI){

        var watuDb = this;
        watuDb.listOfWatus = {};

        watuDb.getWatus = function(){
          var defer = $q.defer();

          $http.get(TARAKILISHI.MARAFIKI)
               .success(function(res){
                   watuDb.listOfWatus = res;
                   defer.resolve(res);
                  // console.log('Promise fulfilled');
               })
               .error(function(err,status){
                 defer.reject(err);
               });

          //console.log('You have my promise');
          return defer.promise;

        }
}



function authService($window, $location) {
  var self = this;

  // Add JWT methods here
    self.parseJwt = function(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }

    self.saveToken = function(token) {
        if( self.localStorageSupported() ) {
            $window.localStorage['jwtToken'] = token;
         } else {
             $window.localStorage['jwtToken'] = token;
            // docCookies.setItem( 'localstorage.jwtToken', token );
         }
    }

    self.removeToken = function(token) {
      if( self.localStorageSupported() ) {
          $window.localStorage.removeItem('jwtToken');
      } else {
          // docCookies.setItem( 'localstorage.jwtToken', '');
      }

    }

    self.getToken = function() {
      if( self.localStorageSupported() ) {
          return $window.localStorage['jwtToken'];
      } else {
          // var myNewToken = user.ingia();
          // console.log(myNewToken);
        //  return docCookies.getItem( 'localstorage.jwtToken');
      }

    }

    self.isAuthed = function() {
      var token = self.getToken();
      if(token) {
        var params = self.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp; //unix is in seconds and javascrips is in milliseconds
      } else {
        return false;
      }
    }

    self.logout = function() {
      $window.localStorage.removeItem('jwtToken');
    }

    self.go = function(myUrl) {
      $location.path(myUrl);

    }

    self.gStorageSupported = undefined;

    self.localStorageSupported = function() {

      if( self.gStorageSupported === undefined ) {
          try {
               $window.localStorage.setItem('test', '1');
               $window.localStorage.removeItem('test');
               self.gStorageSupported = true;

          } catch (err) {
              self.gStorageSupported = false;
          }
      }

      //console.log(self.gStorageSupported);
      return self.gStorageSupported;

}


}

function userService($http, TARAKILISHI, mushene, auth,$rootScope) {

  var self = this;

  return {
    ingia: function(jina, siri) {
                          var req = {
                                            method: 'POST',
                                            url: TARAKILISHI.WATCHIE,
                                            headers: {
                                                'Content-Type': undefined
                                              },
                                            params: {
                                                      username: jina,
                                                      password: siri
                                                    }
                                        };
                            //console.log("checking request for post");
                            //console.log(req);
                            return $http(req).then(function(response) {
                                //console.log("got a response from ingia function ....");
                                mushene.vitu.userDetails = response.data
                                mushene.vitu.logo = "images/"+response.data.company.shortname+".jpg"
                                console.log("self.myUserLoginDetails --->");
                                console.log(mushene.vitu.logo);
                            return response.data;
                              });
                          }

  };

  // add authentication methods here
}

//authInterceptor is a factory for injecting every request with the authintication token
function authInterceptor(auth, $location) {
  return {

    // automatically attach Authorization header
    request: function(config) {
      //console.log("You are about to be injected with KITUTAMU .. all_requests pass here ....");
      //console.log(config);
      var token = auth.getToken();
      //console.log("This is the token we got -->"+token);
      if(token) { //if token is defined
        config.headers.Authorization = 'Bearer ' + token;
      }else{
        config.headers.Authorization = 'Bearer Denied';
        auth.removeToken();
      }

      return config;

    },
    // If a token was sent back, save it
    response: function(res) {
      //console.log("You have sent me something SWEET. Lete...");
      //console.log(res);
      if(res.data.token) { // === is equal value and type
        auth.saveToken(res.data.token); //sent during login process
        //console.log("Mtunguiyaz ... hapo sawa ingia ba");
      }else{
        if(res.data.success === false){
          auth.removeToken();
        }else{
          //console.log("chapa ilale ama ni pepeta iwake?");
        }
      }
      //console.log("checking response injection..");
      //console.log(res);
      return res;
    }
  }
}

//set server details here
//UPGRADE in next version: link to Gruntfile and nodejs index

function hudumiaTarakilishi($location) {

  var host = "www.sam.co.ke";
  var serverPort = 84;
  var serverProtocol = "http";
  var serverUrl = serverProtocol+'://'+host+':'+serverPort;
  //console.log('serverUrl is .....>'+serverUrl);

  return {
        MTAA: serverUrl ,
        JIRANI: serverUrl  + '/ntsa',
        MARAFIKI: serverUrl  + '/api/registeredUsers',
        WATCHIE: serverUrl + '/authenticate',
        MADEREVA: serverUrl + '/usahihi',
        MTUGARI: serverUrl + '/mtugari',

  }
};

function sharedService() {

  return {
    vitu: {
      userDetails: '',
      logo:'',
      colorScheme: ''
    }
  };

};


angular
    .module('riskmanagementapp')
    .factory('authInterceptor', authInterceptor)
    .factory('mushene', sharedService)
    .service('user', userService)
    .service('auth', authService)
    .service('hudumiaJirani',hudumiaJirani)
    .service('watuDb',watuDb)
    .factory('TARAKILISHI',hudumiaTarakilishi);
