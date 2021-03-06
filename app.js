var app = angular.module('flapperNews', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        });
        $stateProvider.state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        });

        $urlRouterProvider.otherwise('home');
    }
]);

app.controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts){

        $scope.test = 'Hello World!';
        $scope.posts = posts.posts;

        $scope.addPost = function(){
            if ($scope.title == '' || !$scope.title) {
                return;
            }
            // add website parsing, http://www.
            if ($scope.link.indexOf("www.") == -1) {
                $scope.link = "www." + $scope.link;
            }
            if ($scope.link.indexOf("https://")) {
                $scope.link = "https://" + $scope.link;
            }
            $scope.posts.push({
                title: $scope.title, 
                link: $scope.link, 
                upvotes: 0,
                comments: [
                    {author: 'Joe', body: 'Nice post!', upvotes: 0},
                    {author: 'Brian', body: 'LOL!', upvotes: 0}
                ]
            });
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function(post) {
            console.log("comment upvoted")

            post.upvotes += 1;
        };

        $scope.decrementUpvotes = function(post) {
            post.upvotes -= 1;
        }
}]);

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts) {
        $scope.post = posts.posts[$stateParams.id];

        $scope.addComment = function(){
            if ($scope.body === '') {return;}
            $scope.post.comments.push({
                body: $scope.body,
                author: 'user',
                upvotes: 0
            })
            $scope.body = '';
        }

        $scope.incrementUpvotes = function(comment) {
            console.log("comment upvoted")
            comment.upvotes += 1;
        };

        $scope.decrementUpvotes = function(comment) {
            console.log("comment downvoted")

            comment.upvotes -= 1;
        }
    }
]);

app.factory('posts', [function(){
    var o = {
        posts: []
    };
    return o;
}]);