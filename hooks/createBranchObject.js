const fs    = require('fs');     // nodejs.org/api/fs.html
const path 	= require('path');

module.exports = function (context) {
	console.log("config.xml > Start");

	// get config.xml dir
	const cordovaCommon = context.requireCordovaModule('cordova-common');
    const appConfig = new cordovaCommon.ConfigParser('config.xml');
    const appName = appConfig.name();
	
	var iosFolder = context.opts.cordova.project 
		? context.opts.cordova.project.root
    	: path.join(context.opts.projectRoot, 'platforms/ios/');
	var iosConfig = path.join(
		iosFolder, 
		appName,
		'config.xml'
		);
	console.log("config.xml > set folder path: " + iosConfig);


	var correctConfig = new cordovaCommon.ConfigParser(iosConfig);

	var branchKey = correctConfig.getGlobalPreference('branchKey');
	var uriScheme = correctConfig.getGlobalPreference('uriScheme');
	var linkDomain = correctConfig.getGlobalPreference('branchLinkDomain');
	var iosTeamRelease = correctConfig.getGlobalPreference('iosTeamRelease');
	var iosTeamDebug = correctConfig.getGlobalPreference('iosTeamDebug');
	var androidTestmode = correctConfig.getGlobalPreference('androidTestmode');

	console.log("config.xml > got all preferences: " + branchKey " | " + uriScheme " | " + linkDomain " | " + iosTeamRelease " | " + iosTeamDebug " | " +  androidTestmode " |");
    
	let extension = "<branch-config>\n" +
        "	<branch-key value=\"" + branchKey + "\" />\n" +
        "	<uri-scheme value=\"" + uriScheme + "\" />\n" +
        "	<link-domain value=\"" + linkDomain + "\" />\n" +
        "	<ios-team-release value=\"" + iosTeamRelease + "\" />\n" +
        "	<ios-team-debug value=\"" + iosTeamDebug + "\" />" +
        "	<android-testmode value=\"" + androidTestmode + "\" />\n" +
    "</branch-config>\n" +
    "</widget>";
    console.log("config.xml > set extension: " + extension);

	var toReplace = "</widget>";
	console.log("config.xml > set toReplace: " + toReplace);
    var regexp = new RegExp(escapeRegExp(toReplace), 'g');
    console.log("config.xml > set regexp: " + regexp);
    var config = fs.readFileSync(iosConfig, 'utf8');

    console.log("config.xml > got config.xml: " + config);
	if (config.indexOf(extension) == -1) {
		console.log("config.xml > not found extension, will replace file with values");
		config = config.replace(regexp, extension);
		console.log("config.xml > repalced config.xml: " + config);
    	fs.writeFileSync(iosConfig, config);
	}
	console.log("config.xml > End");
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}