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

BranchOutSystems.prototype.initialize = function (successCallback, failureCallback, isResuming) {
    Branch.enableLogging = true;
    Branch.enableTestMode(true);

    // Branch initialization
    if (!isResuming) {
        Branch.initSession()
            .then(function () {
                successCallback("Branch initialized successfully");
            })
            .catch(function (e) {
                if (!Branch.sessionInitialized) {
                    failureCallback("Error initializing Branch: " + e);
                } else {
                    successCallback("Branch initialized successfully");
                }
            });
    } else {
        Branch.initSession()
            .then(function (data) {
                if (isResuming) {
                    if (data["+clicked_branch_link"]) {
                        successCallback("Captured deeplink: " + data);
                    }
                }
            })
            .catch(function (data) {
                failureCallback(data);
            });
    }
};

BranchOutSystems.prototype.createContentReference = function (successCallback, failureCallBack, options) {
    var properties = {
        canonicalIdentifier: options["canonicalIdentifier"],
        canonicalUrl: options["canonicalUrl"],
        title: options["title"],
        contentDescription: options["contentDescription"],
        contentImageUrl: options["contentImageUrl"],
        price: options["price"],
        currency: options["currency"],
        contentIndexingMode: options["contentIndexingMode"],
        contentMetadata: options["contentMetadata"],
    };

    var branchUniversalObject = null;

    Branch.createBranchUniversalObject(properties)
        .then(function (res) {
            branchUniversalObject = res;
            successCallback({
                object: branchUniversalObject,
                message: "Content Reference Created Successfully",
            });
        })
        .catch(function (err) {
            failureCallBack({
                object: null,
                message: "Error creating content reference: " + JSON.stringify(err),
            });
        });
};

BranchOutSystems.prototype.createDeepLink = function (
    successCallBack,
    failureCallBack,
    universalObject,
    analyticsProperties,
    controlProperties
) {
    universalObject
        .generateShortUrl(analyticsProperties, controlProperties)
        .then(function (res) {
            successCallBack(res.url);
        })
        .catch(function (err) {
            failureCallBack("Error creating deep link: " + JSON.stringify(err));
        });
};

BranchOutSystems.prototype.readDeepLink = function (successCallBack, failureCallBack) {
    Branch.initSession()
        .then(function (data) {
            if (data["+clicked_branch_link"]) {
                successCallBack(data);
            }
        })
        .catch(function (err) {
            failureCallBack(err);
        });
};

BranchOutSystems.prototype.trackUser = function (successCallBack, failureCallBack, userId) {
    Branch.setIdentity(userId)
        .then(function (res) {
            successCallBack("User successfully logged in");
        })
        .catch(function (e) {
            failureCallBack("Error logging in user: " + e);
        });
};

BranchOutSystems.prototype.untrackUser = function (successCallBack, failureCallBack) {
    Branch.logOut()
        .then(function (res) {
            successCallBack("User successfully logged out");
        })
        .catch(function (e) {
            failureCallBack("Error logging out user: " + e);
        });
};

BranchOutSystems.prototype.displayContentSpotlight = function (successCallBack, failureCallBack, universalObject) {
    universalObject
        .listOnSpotlight()
        .then(function (res) {
            successCallBack(res);
        })
        .catch(function (e) {
            failureCallBack(e);
        });
};

BranchOutSystems.prototype.shareDeepLink = function (
    successCallBack,
    failureCallBack,
    universalObject,
    analysticProteries,
    controlProperties,
    message
) {
    universalObject.showShareSheet(analyticsProperties, controlProperties, message);
    successCallBack("Shared successfully");
};

BranchOutSystems.prototype.trackContent = function (successCallBack, failureCallBack, universalObject) {
    universalObject
        .registerView()
        .then(function (res) {
            successCallBack(res);
        })
        .catch(function (err) {
            failureCallBack(err);
        });
};

BranchOutSystems.prototype.enableTracking = function (successCallBack, failureCallBack, canTrack) {
    Branch.disableTracking(!canTrack);
    successCallBack("toggled Tracking to" + canTrack);
};

module.exports = new BranchOutSystems();
