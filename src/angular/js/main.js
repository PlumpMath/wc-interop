require('angular');
// var angular = require('angular'); // why can't I make this work? :-/
var angular = window.angular;

var RandomSquare = require('../../components/RandomSquare');
var BellButton = require('../../components/BellButton');

RandomSquare.register('random-square');
BellButton.register('bell-button');

angular.module('components', [])
	.directive('tabs', function() {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			controller: function($scope, $element) {
				var panes = $scope.panes = [];

				$scope.select = function(pane) {
					angular.forEach(panes, function(pane) {
						pane.selected = false;
					});
					pane.selected = true;
				};

				this.addPane = function(pane) {
					if (panes.length == 0) $scope.select(pane);
					panes.push(pane);
				};
			},
			template:
				// Convolutely creating custom elements in a directive works, which is cool
				// (code almost verbatim from their example because it's too long and cryptic
				// to write from scratch)
				'<div class="tabbable">' +
					'<ul class="nav nav-tabs">' +
						'<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
							'<random-square></random-square>' + 
							// Attributes work with or without "" quotes
							// Warning: remember to specify which ones are to be passed down via the directive $scope
							'<random-square width="{{pane.width}}" height="{{pane.height}}"></random-square>' +
							'<random-square width={{pane.width}} height={{pane.height}}></random-square>' +
							'<button is="bell-button"></button>' +
							'<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
						'</li>' +
					'</ul>' +
					'<div class="tab-content" ng-transclude></div>' +
				'</div>',

			replace: true
		};
	})

	.directive('pane', function() {
		return {
			require: '^tabs',
			restrict: 'E',
			transclude: true,
			scope: { title: '@', width: '@', height: '@' },
			link: function(scope, element, attrs, tabsCtrl) {
				tabsCtrl.addPane(scope);
			},
			template:
				'<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
				'</div>',
			replace: true
		};
	});


angular.module('InteropApp', ['components'])
	.controller('InteropController', ['$scope', function($scope) {
		
		$scope.squares = [
			{ width: 50, height: 50 },
			{ width: 200, height: 25 },
			{ width: 100, height: 100 },
		];

		$scope.bellbuttons = [
			'<button is="bell-button"/>'
		];

	}]);
