angular.module('directives', [])
	.directive('recommendation', function(){
		return {
			restrict: 'C',
			scope: {
				data: '='
			},
			template: '<span>{{data.hero}}: {{data.percent}}</span>'
		}
	});