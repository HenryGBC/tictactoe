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
      var turn = vm.turnPlayerOne ? 1:2; 
      _check(turn, vm.arrayBoard, row, column);
      vm.turnPlayerOne = !vm.turnPlayerOne;
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
      vm.matc= 0;
    }
    function _checkColumn(turn, turnCount, array, row, index){
      turnCount = array[row][index] == turn ? turnCount+1: turnCount;
      var returnValue = turnCount == 3 ? 3:2;
      if(index == 2){
        return returnValue;
      }else{
        return _checkColumn(turn, turnCount, array, row, index+1);
      }
    }
    function _checkRow(turn, turnCount, array, column, index){
      turnCount = array[index][column] == turn ? turnCount+1: turnCount;
      var returnValue = turnCount == 3 ? 3:2;
      if(index == 2){
        return returnValue;
      }else{
        return _checkRow(turn, turnCount, array, column, index+1);
      }
    }
    function _checkLineFirst(turn, turnCount, array, indexRow, indexCol){
      turnCount = array[indexRow][indexCol] == turn ? turnCount+1: turnCount;
      var returnValue = turnCount == 3 ? 3:2;
      if(indexRow == 2){
        return returnValue;
      }else{
        return _checkLineFirst(turn, turnCount, array, indexRow+1, indexCol+1);
      }
    }
    function _checkLineSecond(turn, turnCount, array, indexRow, indexCol){
      turnCount = array[indexRow][indexCol] == turn ? turnCount+1: turnCount;
      var returnValue = turnCount == 3 ? 3:2;
      if(indexCol == 2){
        return returnValue;
      }else{
        return _checkLineSecond(turn, turnCount, array, indexRow-1, indexCol+1);
      }
    }

    function _check(turn, array, row, column){
      var countRow = _checkColumn(turn, 0, array, row, 0);
      var countCol = _checkRow(turn, 0, array, column, 0);
      var countLineFirst = _checkLineFirst(turn, 0, array, 0, 0);
      var countLineSecond = _checkLineSecond(turn, 0, array, 2, 0);
      if( countRow== 3 || countCol === 3 || countLineFirst === 3 ||  countLineSecond === 3){
        vm.match ++;
        console.log(turn);
        console.log(vm.users[turn-1]);
      }

    }
  }


 
})();
