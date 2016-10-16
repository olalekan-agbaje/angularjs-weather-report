/**
 * Created by Compiler on 07-Oct-16.
 */
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'e2e/*.test.js'
    ]//,
   // prefs: {'profile.managed_default_content_settings.geolocation': 1}
};
