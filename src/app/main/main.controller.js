(function() {
  'use strict';

  angular
    .module('tictactoe')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, MainService) {
    var vm = this;
    var moves = 0;
    angular.extend(vm, {
      users: [],
      user: {name: '', win:0},
      turnPlayerOne: true,
      nameUser: "Jugador n° 1",
      setUser: setUser,
      errorInput: false,
      play: false,
      changeValue: changeValue,
      nextMatch: nextMatch,
      resetMatch: resetMatch,
      usersList: [],
      range: false,
      showRange: showRange

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
      if( vm.arrayBoard[row][column] === 0){
        vm.arrayBoard[row][column] = vm.turnPlayerOne ? 1:2; 
        var turn = vm.turnPlayerOne ? 1:2; 
        _check(turn, vm.arrayBoard, row, column);
        vm.turnPlayerOne = !vm.turnPlayerOne;
        moves++;
      }
     
    }

    function nextMatch(){
      vm.match++;
      _resetGame();
    }
    function resetMatch(all){
      _resetGame(all);
    }

    function showRange(){
      vm.range=!vm.range;
      console.log(vm.range);
    }
    function activate() {
      _initArray();
      _initUsersList();
    }

    //Internal Functions

    // Init Array for tableboard
    function _initArray(){
       vm.arrayBoard= new Array(new Array(0,0,0), new Array(0,0,0), new Array(0,0,0));
    }

    function _resetGame(all){
      _initArray();
      vm.finishMatch = false;
      moves = 0;
      if(all){
        vm.users= []
        vm.match = 0;
        vm.play = false;
        vm.nameUser= "Jugador n° 1";
        vm.user={name: '', win:0},
        MainService.clearUsers();
      }
    }

    //Set Name Player One and Two
    function _addUser(user){
      vm.users = MainService.getUsers();
      if(vm.users.length < 3){
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
      vm.match= 0;
      vm.finishMatch = false;
    }

    /*
      Check Rows, Columns and Diagonals 
    */
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
        vm.finishMatch = true;
        vm.tieMatch = false;
        vm.users[turn-1].win++;
        vm.winner = vm.users[turn-1];
        vm.result=vm.winner.win==2 ? 'Campeón '+vm.winner.name: 'Ganó '+vm.winner.name;
      }else{
        if(moves == 8){
          vm.finishMatch = true;
          vm.result= 'Empate';
          vm.tieMatch = true;
        }
      }
     

    }



    function _initUsersList(){
      MainService.getUsersList().then(function(data){
        console.log(data);
        vm.usersList = data;
      })
    }
  }


 
})();
