(function() {
  'use strict';

  angular
    .module('tictactoe')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
