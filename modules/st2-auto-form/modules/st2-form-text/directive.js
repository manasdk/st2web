'use strict';
angular.module('main')
  .directive('st2FormText', function () {
    var showLabel = function() {
      // We may need to be able to hide labels some time in the future.
      return true;
    };
    var generateLink = function(name) {
      switch (name) {
        case 'action':
          return 'actions.general({ref: rawResult})';
        default:
          return false;
      }
    };
    return {
      restrict: 'C',
      require: 'ngModel',
      scope: {
        'spec': '=',
        'options': '=',
        'ngModel': '=',
        'disabled': '='
      },
      templateUrl: 'modules/st2-auto-form/modules/st2-form-text/template.html',
      link: function (scope, element, attrs, ctrl) {
        scope.name = ctrl.$name;
        scope.showLabel = showLabel(scope.name);

        ctrl.$render = function () {
          scope.rawResult = ctrl.$viewValue;
          scope.link = generateLink(scope.name, scope.rawResult);
        };

        scope.$watch('rawResult', function (rawResult) {
          ctrl.$setViewValue({
            number: function () {
              return _.isUndefined(rawResult) ? rawResult : parseFloat(rawResult);
            },
            integer: function () {
              return _.isUndefined(rawResult) ? rawResult : parseInt(rawResult);
            },
            string: function () {
              return rawResult;
            }
          }[scope.spec && scope.spec.type || 'string']());
        });
      }
    };

  })

  ;
