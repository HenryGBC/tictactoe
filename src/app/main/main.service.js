(function() {
  'use strict';

  angular
      .module('tictactoe')
      .service('MainService', MainService);

  /** @ngInject */
  function MainService($http) {
    var users = [];
    var dataManager = {
    	getUsersList: getUsersList,
      setUser: setUser,
      getUsers: getUsers,
      clearUsers: clearUsers
    }
    return dataManager;
    function getUsersList() {
      
      return $http.get('data/users.json').then(success, error);
      function success(data){
        return data.data;
      }
      function error(err){
      	return err;
      }
    }

    function setUser(user){
      users.push(user);
    }

    function getUsers(){
      return users;
    }

    function clearUsers(){
      users = [];
    }
  }

})();
