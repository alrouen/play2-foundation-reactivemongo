userApp.directive('validateStrength', function() {
    return {
        require: '?ngModel',
        replace: false,
        restrict: 'A',
        template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>',
        link: function (scope, elm, attrs, ctrl) {
            scope.$watch(attrs.validateStrengthWatch, function (val) {
                if (val) {
                    var colors = ['#F00', '#F90', '#F0F000', '#8EED00', '#00EB00', '#0DA30D'];
                    var score = passwordStrength(val)
                    putObject(attrs.ngModel,scope,score);

                    if(score >= attrs.validateStrength) {
                        ctrl.$setValidity("passwordStrength",true);
                    } else {
                        ctrl.$setValidity("passwordStrength",false);
                    }

                    elm.css({ "display": "inline" });
                    elm.children('li')
                        .css({ "background": "#DDD" })
                        .slice(0, score)
                        .css({ "background": colors[score] });

                } else {
                    putObject(attrs.ngModel,scope,0);
                    ctrl.$setValidity("passwordStrength",false);
                    elm.css({ "display": "none"  });
                }
            });

        }
    }
});