app.controller('LanController', ['$scope', '$window', '$compile', '$sce', function($scope, $window, $compile, $sce) {
    
    if (document.getElementById('scrollable')) {

        document.getElementById('scrollable').addEventListener("change", function() {
            var checkbox = document.getElementsByTagName('input');
            for (var i = 0; i < checkbox.length; i++) {

                if (checkbox[i].checked) {
                    $(checkbox[i]).parent().css({
                        "background": "linear-gradient(270deg, #1e5799, #019fde, #1e5799)",
                        "background-size": "250% 250%",
                        "WebkitAnimation": "selected 2s  linear infinite",
                        "animation": "selected 2s  linear infinite"
                    });
                } else {
                    $(checkbox[i]).parent().css({
                        "background": "inherit"
                    });
                }
                //$scope.$apply();
            }
        });
    }


    $scope.animationSync = function() {
        $(":checkbox").parent().css({
            "background": "linear-gradient(270deg, #1e5799, #019fde, #1e5799)",
            "background-size": "250% 250%",
            "WebkitAnimation": "selected 2s  linear infinite",
            "animation": "selected 2s  linear infinite"
        });
        $(":checkbox").parent().css({
            "background": "inherit"
        });
    };

    $scope.content = '';
    $scope.counter = 0;
    $scope.death = 0;
    $scope.match = 0;
    $scope.deathTime = [];
    $scope.matchTime = [];
    $scope.deathTips = [];
    $scope.matchTips = [];
    //$window.alert($scope.sub);

    $scope.loaded = function() {
        if ((localStorage.getItem("deathTipsStorage") === null) || (localStorage.getItem("deathTime") === null)) {
            $scope.death = 0;
        } else {
            $scope.deathTips = angular.fromJson(localStorage.getItem("deathTipsStorage"));
            $scope.death = $scope.deathTips.length;
        }
        if ((localStorage.getItem("matchTipsStorage") === null) || (localStorage.getItem("matchTime") === null)) {
            $scope.match = 0;
        } else {
            $scope.matchTips = angular.fromJson(localStorage.getItem("matchTipsStorage"));
            $scope.match = $scope.matchTips.length;
        }
        //load deathTipsStorage
        if ($scope.page == 'death') {
            $scope.deathTime = angular.fromJson(localStorage.getItem("deathTime"));
            $scope.deathTips = angular.fromJson(localStorage.getItem("deathTipsStorage"));
        }
        //load matchTipsStorage
        if ($scope.page == 'match') {
            $scope.matchTime = angular.fromJson(localStorage.getItem("matchTime"));
            $scope.matchTips = angular.fromJson(localStorage.getItem("matchTipsStorage"));
        }
    }
    return $scope.page;
}]);
