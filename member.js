function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'templates/skills-member.html',
        scope: {
            member: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('member', function(newValue, oldValue) {
                if (newValue) {
                    scope.member = newValue;
                }
            });
        }
    };
}