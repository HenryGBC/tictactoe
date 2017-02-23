(function() {
  'use strict';

  angular
      .module('tictactoe')
      .service('MainService', MainService);

  /** @ngInject */
  function MainService($http) {
    var users = [];
    var dataManager = {
    	getData: getData,
      setUser: setUser,
      getUsers: getUsers,
      clearUsers: clearUsers
    }
    return dataManager;
    function getData() {
      
      return $http.get('data/users.json').then(success, error);
      function success(data){
        var news = data.data;
      	return news;
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
