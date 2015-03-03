// Angular app
angular.module('app', ['ngRoute', 'ngResource'])

// Services
.factory('Employees', ['$resource', function ($resource) {
    return $resource('/employees/:id', null, {
        'update': {
            method: 'PUT'
        }
    });
}])

.factory('EmployeeHours', ['$resource', function ($resource) {
    return $resource('/employees/:id/hours', null, {
        'update': {
            method: 'PUT'
        }
    });
}])

// Controllers
.controller('EmployeeController', ['$scope', 'Employees', function ($scope, Employees) {
    $scope.employees = Employees.query();

    $scope.save = function () {
        if (!$scope.newEmployee || $scope.newEmployee.length < 1) return;
        var employee = new Employees({
            name: $scope.newEmployee,
            birthday: $scope.newEmployeeBirthdate,
            gender: $scope.newEmployeeGender,
            photo: $scope.newEmployeePhoto
        });
        employee.$save(function () {
            $scope.employees.push(employee);
            $scope.newEmployee = ''; // clear textboxes
            $scope.newEmployeeBirthdate = '';
            $scope.newEmployeeGender = '';
            $scope.newEmployeePhoto = '';
        });
    }

    $scope.remove = function (index) {
        var employee = $scope.employees[index];
        Employees.remove({
            id: employee._id
        }, function () {
            $scope.employees.splice(index, 1);
        });
    }

}])

.controller('EmployeeDetailCtrl', ['$scope', '$routeParams', 'Employees', 'EmployeeHours', '$location', function ($scope, $routeParams, Employees, EmployeeHours, $location) {
    $scope.employeehours = EmployeeHours.get({
        id: $routeParams.id
    });

    $scope.employee = Employees.get({
        id: $routeParams.id
    });
    
    $scope.remove = function () {
        Employees.remove({
            id: $scope.employee._id
        }, function () {
            $location.url('/');
        });
    }

}])

// Routes
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/employees.html',
            controller: 'EmployeeController'
        })

    .when('/:id', {
        templateUrl: '/employeeDetails.html',
        controller: 'EmployeeDetailCtrl'
    });
}]);