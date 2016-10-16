/**
 * Created by Compiler on 15-Oct-16.
 */
describe('Compucorp Weather Locator Unit Tests', function() {

    beforeEach(module('weatherApp'));
    describe("weatherApp Module Controllers:", function() {

        beforeEach(inject(function(_$controller_) {
            $controller = _$controller_;
        }));

        it('should have a WeatherController controller', function () {
            var $scope = {};
            var controller = $controller('WeatherController', { $scope: $scope });
            expect(controller).toBeDefined();
        });

        it('should have a manualInput controller', function () {
            var $scope = {};
            var controller = $controller('manualInput', { $scope: $scope });
            expect(controller).toBeDefined();
        });
    });

    describe("weatherApp geolocation service", function(){
        beforeEach(inject(function(_$geolocation_){
            geoLocation = _$geolocation_;
        }));
        it('should contain a $geolocation service', function(){
            expect(geoLocation).toBeDefined();
        });

        it('should contain a get function', function(){
            expect(geoLocation.get()).toBeDefined();
        });
    });

    describe("the weatherApp Module Service:", function(){
        var coords = {
            latitude: 51.524126,
            longitude: -0.073896
        };
        var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&units=metric&appid=20d5975a307c88f89e58d0541ce81bb6&lat='+coords.latitude+'&lon='+coords.longitude;

        var RESPONSE_SUCCESS = {
            "coord" : {
                "lon" : 7.49,
                "lat" : 9.06
            },
            "weather" : [{
                "id" : 801,
                "main" : "Clouds",
                "description" : "few clouds",
                "icon" : "02d"
            }
            ],
            "base" : "stations",
            "main" : {
                "temp" : 27.74,
                "pressure" : 986.65,
                "humidity" : 87,
                "temp_min" : 27.74,
                "temp_max" : 27.74,
                "sea_level" : 1026.29,
                "grnd_level" : 986.65
            },
            "wind" : {
                "speed" : 2.86,
                "deg" : 177.001
            },
            "clouds" : {
                "all" : 12
            },
            "dt" : 1476607985,
            "sys" : {
                "message" : 0.0026,
                "country" : "NG",
                "sunrise" : 1476595077,
                "sunset" : 1476637965
            },
            "id" : 2352778,
            "name" : "Abuja",
            "cod" : 200
        };

        beforeEach(inject(function(_$weather_){
            weather = _$weather_;
        }));
        var $q, $httpBackend;
        beforeEach(inject(function(_$q_, _$httpBackend_) {
            $q = _$q_;
            $httpBackend = _$httpBackend_;
        }));

        it('should contain a $weather service', function(){
            expect(weather).toBeDefined();
        });

        it('should contain an apiKey',function(){
            expect(weather.apiKey).toBe('20d5975a307c88f89e58d0541ce81bb6');
        });

        it('should contain a URL which contains the apiKey',function(){
            expect(weather.API_ROOT).toBe('http://api.openweathermap.org/data/2.5/weather?callback=JSON_CALLBACK&units=metric&appid='+weather.apiKey);
        });

        it('should contain a byPostOrCountry function', function(){
            expect(weather.byPostOrCountry()).toBeDefined();
        });

        describe('http call',function(){
            var result;

            beforeEach(function() {
                // Initialize result object to an empty object before each test
                result = {};
                // Spy on service call and allow it to continue implementation
                spyOn(weather, "byLocation").and.callThrough();
            });

            it('should contain a byLocation function', function(){
                expect(weather).toBeDefined();
            });

            it('should contain a byLocation function', function(){
                expect(weather.byLocation(coords)).toBeDefined();
            });

            it('should return a weather result when called with a coords', function() {
                // The endpoint we expect our service to hit and provide it with our mocked RESPONSE_SUCCESS return values
                $httpBackend.whenJSONP(apiUrl).respond(200, $q.when(RESPONSE_SUCCESS));

                expect(weather.byLocation).not.toHaveBeenCalled();
                expect(result).toEqual({});

                weather.byLocation(coords).then(function(result) {
                    result = result;
                });

                // Flush pending HTTP requests
                $httpBackend.flush();
                expect(weather.byLocation).toHaveBeenCalledWith(coords);
            });
        });
    });

});