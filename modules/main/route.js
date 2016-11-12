/**
 * Created by Administrator on 2016/11/12.
 */
(function (angular) {
    var app=angular.module('movie.mainApp')

    app.config(function ($routeProvider) {
        $routeProvider
            .otherwise({
                redirectTo:'in_theaters'
            })
    })
})(angular)