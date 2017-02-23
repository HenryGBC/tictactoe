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
      user: {name: '', win:0},
      turnPlayerOne: true,
      nameUser: "Jugador n° 1",
      setUser: setUser,
      errorInput: false,
      play: false,
      changeValue: changeValue

    });
    activate();

    function setUser(user) {
        if(!vm.user.name){
          vm.errorInput = true;
          return ;
        }else{
           vm.errorInput = false;
           _addUser(user);
        }
    }
    function changeValue(row, column){
      vm.arrayBoard[row][column] = vm.turnPlayerOne ? 1:2; 
      vm.turnPlayerOne = !vm.turnPlayerOne;
       var turn = vm.turnPlayerOne ? 1:2; 
      _sheck(turn, vm.arrayBoard, row, column, 0);
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
    function _addUser(user){
      vm.users = MainService.getUsers();
      if(vm.users.length < 3){
        console.log(user);
         var userName = {
          name: user,
          win: 0
         };
         MainService.setUser(userName);
         vm.user.name='';
         vm.nameUser= "Jugador n° 2";
      }

      if(vm.users.length === 2){
        _initPlay();
      }
    }

    //Init play tictactoe
    function _initPlay(){
      vm.play = true;
      console.log(vm.users);
      console.log(vm.users.length);
    }

    function _sheck(turn, array, row, column, cont){
      if(row >= 0 && row <=3){
        console.log(array[row][column+1]);
         if(array[row][column+1]==turn){
              console.log(cont);
            _sheck(turn, array, row+1, column, cont+1);
         }
        
      }
       if(array[row][column+1]==turn){
              console.log(cont);
            _sheck(turn, array, row+1, column, cont+1);
         }
      
    }
  }


 
})();
