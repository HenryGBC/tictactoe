(function() {
  'use strict';

  angular
    .module('tictactoe')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, MainService) {
    var vm = this;
    angular.extend(vm, {
      users: [],
      userName: '',
      turnPlayerOne: true,
      nameUser: "Jugador n° 1",
      setUser: setUser,
      errorInput: false,
      play: false,
      changeValue: changeValue

    });
    activate();

    function setUser() {
        if(!vm.userName){
          vm.errorInput = true;
          return ;
        }else{
           vm.errorInput = false;
           _addUser();
        }
    }
    function changeValue(row, column){
      vm.arrayBoard[row][column] = 2;
    }
    function activate() {
      _initArray();
    }

    //Internal Functions

    // Init Array for tableboard
    function _initArray(){
       vm.arrayBoard= new Array(new Array(0,0,0), new Array(0,0,0), new Array(0,0,0));
    }

    //Set Name Player One and Two
    function _addUser(){
      vm.users = MainService.getUsers();
      console.log(vm.users);
      console.log(vm.users.length);
      if(vm.users.length < 3){
         MainService.setUser(vm.userName);
         vm.userName='';
         vm.nameUser= "Jugador n° 2";
      }

      if(vm.users.length === 2){
        _play();
      }
    }

    //Init play tictactoe
    function _play(){
      vm.play = true;
      console.log(vm.users);
      console.log(vm.users.length);
    }
  }


 
})();
