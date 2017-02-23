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
      getUsers: getUsers
    }
    return dataManager;
    function getData() {
      /*
      return $http.get(urlApi).then(success, error);
      function success(data){
        var news = data.data;
        news.map(function(item){
            item['image'] = item.hasOwnProperty('image') ? item.image:'http://lorempixel.com/300/300';
        });
      	return news;
      }
      function error(err){
      	return err;
      }*/
    }

    function setUser(user){
      users.push(user);
    }

    function getUsers(){
      return users;
    }
  }

})();
