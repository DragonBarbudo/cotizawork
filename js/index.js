var app = angular.module('MyApp');

app.controller('ProductosCtrl', function($scope, $filter) {
  //#### Var

  //Productos
  $scope.failed = false;
  $scope.fetching = true;
  var api = 'https://api.mongolab.com/api/1/databases/cotizawork/collections/productos?apiKey=cwqOL4LsQryNA-Joen-QCiequYWRGCae';
  //Cotizador
  $scope.quoters = [];
  $scope.activos;

  $scope.total = {};
  $scope.total.dias = 0;
  $scope.total.costo = 0;


  //###### Fn

  //Load Products
  $.ajax({
    url: api,
    dataType:'json',
    success: function(items){
      $scope.$apply(function(){
        $scope.items = items;
        $scope.fetching = false;
        $scope.failed = false;
      });
    },
    error: function(error){
      $scope.$apply(function(){
        $scope.failed = true;
        $scope.fetching = false;
      });
    }
  });
  
  $scope.filterThis = function(changeto){
    $scope.buscarProducto = changeto;
    $scope.$apply;
  }
  


  //Add products to quote
  $scope.addToQuote = function(indx){
    var FItem = $filter('filter')($scope.items, {_id:indx})[0];
    $scope.quoters.push(FItem);
    $scope.getTotal();
  }
  $scope.removeFromQuote = function(indx){
    $scope.quoters.splice(indx, 1);
    $scope.getTotal();
  }

  $scope.getTotal = function(){
    $scope.total.costo = 0;
    $scope.total.dias = 0;
    for(var i=0; i<$scope.quoters.length; i++){
      var precio = $scope.quoters[i].Costo;
      var tiempoD = $scope.quoters[i].Tiempo;
      $scope.total.costo += precio;
      $scope.total.dias += tiempoD;
    }
  }




});


app.controller('CotizacionCtrl', function($scope){
  $scope.items = [];
});
