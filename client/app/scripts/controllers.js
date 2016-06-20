// LoadingCtrl
//dashboardCtrl


//function to handle authenitaction requests
  function accessCtrl($scope, user, auth,  $state) {
    var self = this;

    function handleRequest(res) {
            //console.log("we are at the promise....:)");
            //console.log(res);
      var token = res.token ? res.token : null;
            //console.log("your token is --->"+token);
      if(token) {
            //console.log('Your access token:', token);

            //DECIDE here where to send User

              //muchene.vitu.userDetails = res;
              console.log("at accessCtrl in Controller--->");
              //console.log(muchene.userDetails);

            //console.log("---->"+$scope.loggedUserDetails);
            self.message = res.message;
          var goUrl = "index.underwrite";
          $state.go(goUrl);
            //console.log(token);

          auth.saveToken(token);
            //console.log("have we left yet ....? "+goUrl);
      }else{
        self.message = res.message;
      }


    }

    self.ingia = function() {
      user.ingia(self.jina, self.siri)
        .then(handleRequest, handleRequest)
    }

    self.toka = function() {
      auth.logout && auth.logout()
    }

    self.isAuthed = function() {
      return auth.isAuthed ? auth.isAuthed() : false
    }

  };


function MainCtrl($scope) {
  console.log("at MainCtr in Controller--->");
  console.log("...................<");
  $scope.userDetails = "";
  //this.userName = 'NIC Bank Staff';
  //this.helloText = 'Welcome in riskmanagement.co.ke';
  //this.descriptionText = 'Your risk based financing portal';


};


  function dashboardCtrl() {

      var data1 = [
          [0,4],[1,8],[2,5],[3,10],[4,4],[5,16],[6,5],[7,11],[8,6],[9,11],[10,20],[11,10],[12,13],[13,4],[14,7],[15,8],[16,12]
      ];
      var data2 = [
          [0,0],[1,2],[2,7],[3,4],[4,11],[5,4],[6,2],[7,5],[8,11],[9,5],[10,4],[11,1],[12,5],[13,2],[14,5],[15,2],[16,0]
      ];

      var options = {
          series: {
              lines: {
                  show: false,
                  fill: true
              },
              splines: {
                  show: true,
                  tension: 0.4,
                  lineWidth: 1,
                  fill: 0.4
              },
              points: {
                  radius: 0,
                  show: true
              },
              shadowSize: 2
          },
          grid: {
              hoverable: true,
              clickable: true,

              borderWidth: 2,
              color: 'transparent'
          },
          colors: ["#1ab394", "#1C84C6"],
          xaxis:{
          },
          yaxis: {
          },
          tooltip: false
      };

      /**
       * Definition of variables
       * Flot chart
       */
      this.flotData = [data1, data2];
      this.flotOptions = options;


      var sparkline1Data = [34, 43, 43, 35, 44, 32, 44, 52];
      var sparkline1Options = {
          type: 'line',
          width: '100%',
          height: '50',
          lineColor: '#1ab394',
          fillColor: "transparent"
      };

      var sparkline2Data = [32, 11, 25, 37, 41, 32, 34, 42];
      var sparkline2Options = {
          type: 'line',
          width: '100%',
          height: '50',
          lineColor: '#1ab394',
          fillColor: "transparent"
      };

      this.sparkline1 = sparkline1Data;
      this.sparkline1Options = sparkline1Options;
      this.sparkline2 = sparkline2Data;
      this.sparkline2Options = sparkline2Options;

  };


//talk to Jirani

    function ulizaJirani(user,mushene, hudumiaJirani, $scope) {

      console.log("at ulizaJirani in Controller--->");



            var self = this;

            //Set User VARIABLES
            this.userDetails = mushene.vitu.userDetails;
            this.logo = mushene.vitu.logo;
            console.log(this.userDetails);

            //INITIALISE VARIABLES
            self.status = 0;

            self.magariZake = [];
            self.magariZakeRegNo = [];
            self.magariZakeOwners = [];
            self.mambo = "";
            self.madereva = "";
            self.OtherCarsOwned = 0;
            self.TotalCarsOwned = 0;
            self.carAgeAtReg = 0;
            self.showInsuranceButton = 0;

            self.clearMagari = function($scope) {
                self.mambo = "";
            };

            self.clearMadereva = function($scope) {
                  self.madereva = "";
            };

            self.clearVariableUsed = function($scope) {
              self.status = 0;
              self.magariZake = [];
              self.magariZakeRegNo = [];
              self.magariZakeOwners = [];
              self.OtherCarsOwned = 0;
              self.TotalCarsOwned = 0;
              self.carAgeAtReg = 0;
              self.showInsuranceButton = 0;
            };

            self.clearEveryone = function($scope) {
              self.clearMagari();
              self.clearMadereva();
              self.clearVariableUsed();
            };;



            self.kilamtu  = function() {

                self.clearEveryone();

                self.habari(self.regno);
                self.maderevaje();

            };

            self.habari = function(myRegNo) {

                var mypromise = hudumiaJirani.ulizaSwali(myRegNo)
                                              .then(function(res) {

                                                    self.mambo = res;
                                                    self.status = 1;

                                                    //Show Insurance button
                                                    self.showInsuranceButton = 1;
                                                    // work on dates abit
                                                    var carRegDate = Date.parse(self.mambo.vehicle.registrationDate);
                                                    var carManufactureYear = Number(self.mambo.vehicle.yearOfManufacture)+0.5;

                                                    if (carManufactureYear < 30){
                                                          carManufactureYear = carManufactureYear + 2000;
                                                    }else if (carManufactureYear < 100) {
                                                          carManufactureYear = carManufactureYear + 1900;
                                                    }else{
                                                          carManufactureYear = carManufactureYear;
                                                    }

                                                    self.carRegYear = carRegDate / ( 1000 * 60 * 60 * 24 * 365) + 1970;
                                                    self.carAgeAtReg = self.carRegYear - carManufactureYear;


                                                    //get the cars owned - loop through owners

                                                    for (i = 0; i < self.mambo.owner.length; i++) {
                                                        self.thisOwnerPin = self.mambo.owner[i].PIN;
                                                        if (self.thisOwnerPin.charAt(0) == "A"){ //only get vehicles not owned by companies
                                                            console.log(self.thisOwnerPin);
                                                            self.magariZakeJe(self.thisOwnerPin);
                                                        }
                                                    }
                                            }).catch(function(fallback) {
                                              console.log('CATCHME');
                                            });

                self.loadingPage = 1;
            };

            self.maderevaje = function() {
            var mypromise = hudumiaJirani.ulizaDereva(self.idno)
                                         .then(function(res) {
                                                                self.madereva = res;
                                                                self.status = 1;
                                                                //console.log(self.madereva);
                                                              }).catch(function(fallback) {
                                                                console.log('CATCHME');
                                                              });
            };

            // self.leteGari = function(chassisNdioHii) {
            // var mypromise = hudumiaJirani.ulizaSwali(chassisNdioHii)
            //                              .then(function(res) {
            //                                                     console.log(res);
            //                                                     return res.regNo;
            //
            //                                                   }).catch(function(fallback) {
            //                                                     console.log('CATCHME');
            //                                                   });
            // };

            self.magariZakeJe = function(thisOwnerPin) {
            var mypromise = hudumiaJirani.ulizaMagari(thisOwnerPin)
                                         .then(function(res) {
                                                                //console.log(thisOwnerPin);
                                                                self.magariZake = res;
                                                                self.status = 1;
                                                                self.TotalCarsOwned = self.magariZake.length;
                                                                self.OtherCarsOwned = self.TotalCarsOwned - 1;

                                                                console.log(self.magariZake);
                                                                console.log("Count of cars "+self.magariZake.length);

                                                                for (i = 0; i < self.magariZake.length; i++) { //get the vehicles of each car and push it to an array
                                                                    var thisCarChassis = self.magariZake[i];
                                                                    console.log(thisCarChassis);
                                                                    console.log(i);
                                                                    var mypromiseforRegNo = hudumiaJirani.ulizaSwali(thisCarChassis)
                                                                                                         .then(function(res) {
                                                                                                              console.log(res);
                                                                                                              //loop and get car owners
                                                                                                              var thisCarOwners = "";
                                                                                                              for (j = 0; j < res.owner.length; j++) {
                                                                                                                  var ownernames = [res.owner[j].NAME,"", res.owner[j].FIRSTNAME," ",res.owner[j].MIDDLENAME," ", res.owner[j].LASTNAME].join('');
                                                                                                                  if(j == 0){
                                                                                                                      	  thisCarOwners = ownernames ;
                                                                                                                  } else{
                                                                                                                          thisCarOwners = thisCarOwners + ", " + ownernames ;
                                                                                                                  }

                                                                                                              }
                                                                                                              self.magariZakeRegNo.push(res.regNo);
                                                                                                              self.magariZakeOwners.push(thisCarOwners.toString());

                                                                                                              console.log(self.magariZakeRegNo);
                                                                                                              console.log(self.magariZakeOwners);

                                                                                                              return res;
                                                                                                          }).catch(function(fallback) {
                                                                                                            console.log('CATCHME - Could not Add all vehicles');
                                                                                                          });
                                                                }//end for loop

                                        }).catch(function(fallback) {
                                          console.log('CATCHME');
                                        }); //end promise to get motis by ownerpin
            };



    };



    function watuCtrl(watuList){
            this.watuList = watuList;
    }

    function serverDetails(location){
      var host = "www.sam.co.ke";
      var serverPort = 84;
      var serverProtocol = "http";
      var serverUrl = serverProtocol+'://'+host+':'+serverPort;
      console.log(serverUrl);

      return {
            MTAA: serverUrl ,
            JIRANI: serverUrl  + '/ntsa',
            MARAFIKI: serverUrl  + '/api/registeredUsers',
            WATCHIE: serverUrl + '/authenticate'
      }

    }

angular
    .module('riskmanagementapp')
    .controller('accessCtrl',accessCtrl)
    .controller('MainCtrl', MainCtrl)
    .controller('dashboardCtrl', dashboardCtrl)
    .controller('ulizaJirani', ulizaJirani)
    // .controller('ulizaDereva', ulizaDereva)

    .controller('watuCtrl', watuCtrl)


///// todo list
// 1. Remove duplicates in car owners
// 2. Highligh current vehicle and put in JSON
// 3. Secure server from undefined
// 4. Enable click to see more information
// 0. Crear user profiles linked to companies and differentiating by API. Change Interface based on company profile.
// 5. Linking to insurance company data
// 6. Put in new server, start Bid Data Project
// 7.  Find use for previous owners
// 8. Add claim data
