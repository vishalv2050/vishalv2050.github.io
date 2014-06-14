var app = angular.module("myApp", [])

app.controller('FirstController', function($scope, $http) {
    $scope.todos = 0;
    $scope.imageUrls = [];
    $scope.counter = 0;
    $scope.foos = [1,2,3,4,5,6];
    $scope.add = function(amount) { $scope.counter += amount; };
    $scope.subtract = function(amount) { $scope.counter -= amount; };
    $scope.showInList = function() {
//            $scope.todos = $scope.todos.data;
    }

    $scope.list = [
        {id: 0, tags: ['tag1', 'tag2']},
        {id: 1, tags: ['tag2']},
        {id: 2, tags: ['tag1', 'tag3', 'tag4']},
        {id: 3, tags: ['tag3', 'tag4']}
    ];

    $scope.uniqueTags = function() {
        return _.chain($scope.list)
            .pluck('tags') // [['tag1', 'tag2'], ['tag2'], ['tag1', 'tag3', 'tag4'], ['tag3', 'tag4']]
            .flatten() // ['tag1', 'tag2', 'tag2', 'tag1', 'tag3', 'tag4', 'tag3', 'tag4']
            .unique() // ['tag1', 'tag2', 'tag3', 'tag4']
            .value();
    };

    $scope.getFavourites = function (userName) {

        $http.get("https://api.imgur.com/3/account/" + userName + "/gallery_favorites", {"headers" : {"Authorization" : "Client-ID ac07eda7d831a8a"}}).then(function(res){
            $scope.todos = res.data;
            for (i = 0; i < $scope.todos.data.length; i++) {
                var isAlbum = $scope.todos.data[i].is_album;
                if (isAlbum == false || isAlbum == undefined) {
                    $scope.todos.data[i].curatedLink = $scope.todos.data[i].link;
                    $scope.imageUrls.push($scope.todos.data[i].link)
                } else {
                    $scope.todos.data[i].curatedLink = "http://i.imgur.com/" + $scope.todos.data[i].cover + ".jpg";
                    $scope.imageUrls.push("http://i.imgur.com/" + $scope.todos.data[i].cover + ".jpg")
                }
            }
        });


    }

    $scope.entries = $scope.todos.data;

    $http.get('sampleResponse.json').then(function(res){
        $scope.todos = res.data;
        for (i = 0; i < $scope.todos.data.length; i++) {
            var isAlbum = $scope.todos.data[i].is_album;
            if (isAlbum == false || isAlbum == undefined) {
                $scope.todos.data[i].curatedLink = $scope.todos.data[i].link;
                $scope.imageUrls.push($scope.todos.data[i].link)
            } else {
                $scope.todos.data[i].curatedLink = "http://i.imgur.com/" + $scope.todos.data[i].cover + ".jpg";
                $scope.imageUrls.push("http://i.imgur.com/" + $scope.todos.data[i].cover + ".jpg")
            }
        }
    });


});