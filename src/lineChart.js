partyApp
    .directive('linechart', ['$http', function() {

    return {


        controller : function($scope){


            $scope.indicators = [
                    {
                        id:"_samtliga",
                        name:"Hela väljarkåren",

                        data : [
                            {party : "m", values : [
                                {x: 2000, y : 30},
                                {x: 2006, y : 40},
                                {x: 2012, y : 42}
                            ]},

                            {party : "s", values : [
                                {x: 2000, y : 32},
                                {x: 2006, y : 42},
                                {x: 2012, y : 44}
                            ]}
                        ]
                    },

                    {
                        id:"_kvinnor",
                        name:"Kvinnor",
                        data : [
                            {party : "m", values : [
                                {x: 2000, y : 20},
                                {x: 2006, y : 25},
                                {x: 2012, y : 42}
                            ]},

                            {party : "s", values : [
                                {x: 2000, y : 22},
                                {x: 2006, y : 32},
                                {x: 2012, y : 24}
                            ]}
                        ]
                    },

                    {
                        id:"_man",
                        name:"Män",
                        data : [
                            {party : "m", values : [
                                {x: 2000, y : 25},
                                {x: 2006, y : 26},
                                {x: 2012, y : 30}
                            ]},

                            {party : "s", values : [
                                {x: 2000, y : 12},
                                {x: 2006, y : 32},
                                {x: 2012, y : 54}
                            ]}
                        ]

                    }
                ];


            $scope.model = {
                indicator : "_kvinnor",
            }



        },

        restrict : "EA",
        templateUrl : "linechartTemplate.html",



        link: function(scope, element, attrs) {


            scope.$watch('model',
                function(newModel, oldModel) {

                    scope.render(newModel);


                }, "true")



            scope.render = function(newModel){
                
                var lookup = _.where(scope.indicators, {id : newModel.indicator})

                console.log("Lookup", lookup)
                
                var lines = svg.selectAll(".line")
                    .data(lookup[0].data,function(d){
                        return d.party;
                    });

                lines.enter()
                    .append("path")
                    .attr("class", "line")
                    .attr("stroke", function(d){
                        if(d.party == "m"){
                            return "blue";
                        }
                        else{
                            return "red";
                        }
                    })

                lines.transition().duration(3000)
                    .attr("d", function(d){
                        return lineMaker(d.values);
                    });




            }


            var margin = {top: 20, right: 20, bottom: 30, left: 50},
                width = 760 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;


            var svg = d3.select(element[0]).select(".chart-container")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var x = d3.scale.linear()
                .domain([2000,2012])
                .range([0, width]);

            var y = d3.scale.linear()
                .domain([0,70])
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .ticks(10)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");


            function lineMaker(values){
                return line = d3.svg.line()
                    .x(function(d) { return x(d.x); })
                    .y(function(d) { return y(d.y); })(values)
            }


            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Percent");


   

        }
    }
}]);







