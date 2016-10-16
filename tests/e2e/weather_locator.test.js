'use strict';

describe('Compucorp Home Test', function() {
//    'use strict';
    var inputLocation = element(by.model('searchCriteria'));
    var getButton = element(by.id('searchBtn'));
    var weatherInformation = element(by.id('weatherInformation'));

    beforeEach(function() {
        browser.get('http://localhost/CompucorpWeatherReport');
    });

    //test for page title just to see things are working fine for a start
    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Compucorp | Weather Reporting');
    });

    //Prepare location test cases and loop through them
    var locationInfo = [
        {
            location:'Ibadan',
            locationTxt:'Current Weather in Ibadan, NG'
        },{
            location:'united kingdom',
            locationTxt:'Current Weather in London, GB'
        },{
            location:'New York',
            locationTxt:'Current Weather in New York, US'
        }
    ];

    for (var i in locationInfo) {
        it('should return the weather for input location', function() {
            expect(inputLocation.getAttribute('value')).toBe('');
            inputLocation.sendKeys(locationInfo[i].location);

            getButton.click();
            expect(inputLocation.getAttribute('value')).toEqual(locationInfo[i].location);
            expect(weatherInformation.getText()).toEqual(locationInfo[i].locationTxt);
        });
    }
});