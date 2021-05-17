var fs = require("fs"); // nodejs.org/api/fs.html
var plist = require("plist");
//var xmlParser = require("xml2json"); // www.npmjs.com/package/plist
var path = require("path");

module.exports = function (context) {
    const cordovaCommon = context.requireCordovaModule("cordova-common");

    var configXMLContents = cordovaCommon.ConfigParser("config.xml");

    var userTrackingUsageDescription = configXMLContents.getGlobalPreference("UserTrackingUsageDescription");

    //var configXMLPath = path.join(context.opts.projectRoot, "config.xml");
    var platformPath = path.join(context.opts.projectRoot, "platforms/ios");

    //var projectRootDirElements = context.opts.projectRoot.split("/");
    //var iOSDir = path.join(platformPath, projectRootDirElements[projectRootDirElements.length - 1]);
    var iOSDir = path.join(platformPath, configXMLContents.name());

    var plistPath = path.join(iOSDir, configXMLContents.name() + "-Info.plist");
    var xml = fs.readFileSync(plistPath, "utf8");
    var pListObj = plist.parse(xml);
    //console.log(pListObj);

    pListObj.NSUserTrackingUsageDescription = userTrackingUsageDescription;

    xml = plist.build(pListObj);
    fs.writeFileSync(plistPath, xml, { encoding: "utf8" });

    // fs.readFile(configXMLPath, function (err, data) {
    //     const xmlObj = xmlParser.toJson(data, { reversible: true, object: true, coerce: true });
    //     //console.log(xmlObj.widget.preference.filter((el) => el.name == "UserTrackingUsageDescription")[0].value);
    //     var projectRootDirElements = context.opts.projectRoot.split("/");
    //     //var iOSDir = path.join(platformPath, projectRootDirElements[projectRootDirElements.length - 1]);
    //     var iOSDir = path.join(platformPath, xmlObj.widget.name["$t"]);
    //     console.log(xmlObj.widget.name["$t"]);

    //     var plistPath = path.join(iOSDir, xmlObj.widget.name["$t"] + "-Info.plist");
    //     var xml = fs.readFileSync(plistPath, "utf8");
    //     var pListObj = plist.parse(xml);
    //     //console.log(pListObj);

    //     pListObj.NSUserTrackingUsageDescription = xmlObj.widget.preference.filter(
    //         (el) => el.name == "UserTrackingUsageDescription"
    //     )[0].value;

    //     xml = plist.build(pListObj);
    //     fs.writeFileSync(plistPath, xml, { encoding: "utf8" });

    //     // fs.readdir(iOSDir, { withFileTypes: true }, function (_err, files) {
    //     //     files.every(function (obj, _index, dirArray) {
    //     //         if (obj.name.includes("-Info.plist")) {
    //     //             //console.log(obj);

    //     //             var plistPath = path.join(iOSDir, obj.name);
    //     //             var xml = fs.readFileSync(plistPath, "utf8");
    //     //             var pListObj = plist.parse(xml);
    //     //             //console.log(pListObj);

    //     //             pListObj.NSUserTrackingUsageDescription = xmlObj.widget.preference.filter(
    //     //                 (el) => el.name == "UserTrackingUsageDescription"
    //     //             )[0].value;

    //     //             xml = plist.build(pListObj);
    //     //             fs.writeFileSync(plistPath, xml, { encoding: "utf8" });

    //     //             return false;
    //     //         }
    //     //         return true;
    //     //     });
    //     // });
    // });
};
