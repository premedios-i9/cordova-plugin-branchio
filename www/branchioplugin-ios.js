/**
 * cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) Matt Kane 2010
 * Copyright (c) 2011, IBM Corporation
 */

var exec = require("cordova/exec");

/**
 * Constructor.
 *
 * @returns {BranchIO}
 */
var BranchOutSystems = function BranchOutSystems() {
    this.capturedDeepLinks = {};
};

BranchOutSystems.prototype.isProduction = function (successCallBack, failureCallBack) {
    exec(successCallBack, failureCallBack, "BranchIO", "isProduction");
};

BranchOutSystems.prototype.initialize = function (successCallback, failureCallback, isResuming, isProduction) {
    successCallback("Branch initialized successfully");
};

BranchOutSystems.prototype.createContentReference = function (successCallback, failureCallBack, options) {
    successCallback({
        object: {},
        message: "Content Reference Created Successfully",
    });
};

BranchOutSystems.prototype.createDeepLink = function (
    successCallBack,
    failureCallBack,
    universalObject,
    analyticsProperties,
    controlProperties
) {
    successCallBack("");
};

BranchOutSystems.prototype.readDeepLink = function (successCallBack, failureCallBack) {
    successCallBack({});
};

BranchOutSystems.prototype.trackUser = function (successCallBack, failureCallBack, userId) {
    successCallBack("User successfully logged in");
};

BranchOutSystems.prototype.untrackUser = function (successCallBack, failureCallBack) {
    successCallBack("User successfully logged out");
};

BranchOutSystems.prototype.displayContentSpotlight = function (successCallBack, failureCallBack, universalObject) {
    successCallBack({});
};

BranchOutSystems.prototype.shareDeepLink = function (
    successCallBack,
    failureCallBack,
    universalObject,
    analyticsProperties,
    controlProperties,
    message
) {
    successCallBack("Shared successfully");
};

BranchOutSystems.prototype.trackContent = function (successCallBack, failureCallBack, universalObject) {
    successCallBack({});
};

BranchOutSystems.prototype.enableTracking = function (successCallBack, failureCallBack, canTrack) {
    successCallBack("toggled Tracking to true");
};

BranchOutSystems.prototype.getTrackingPermissionStatus = function (successCallBack, failureCallBack) {
    successCallBack("authorized");
};

BranchOutSystems.prototype.requestTrackingPermission = function (successCallBack, failureCallBack) {
    successCallBack("authorized");
};

module.exports = new BranchOutSystems();
