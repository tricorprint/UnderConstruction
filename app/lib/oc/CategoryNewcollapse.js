// Code goes here

angular.module('Collapsetest', [])
.controller('MainController', MainController)
.directive('myMenu', myMenu)
.directive('myMenuItem', myMenuItem);

function MainController() {
  this.menu = [
    { name : 'level 1', menu : [{ name: 'level 2'}] },
    { name : 'level 1', menu : [{ name: 'level 2', menu: [{ name : 'level 3'}]}] },
    { name : 'level 1' },
  ]; 
}

function myMenu() {
    return {
      scope : {
        myMenu : '=myMenu'
      },
      template: '<li ng-repeat="item in myMenu"><my-menu-item></my-menu-item></li>',
      link: function(scope, elem) {
      }
    }
}

myMenuItem.$inject = ['$compile'];
function myMenuItem($compile) {
    return {
      template: '<a href ng-bind="item.name" ng-click="show($event)"></a>',
      link: function(scope, element) {
        if (angular.isArray(scope.item.menu)) {
              element.append($compile('<ul ng-if="collapsed" my-menu="item.menu"></ul>')(scope));
              
        }
        scope.show = function($event) {
          scope.collapsed = !scope.collapsed;
        }
      }
    }
}



