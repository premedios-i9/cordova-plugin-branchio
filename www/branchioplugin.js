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
var BranchOutSystems = function BranchIOPLugin() {
    this.capturedDeepLinks = null;
}

BranchIOPlugin.prototype.initialize = function(successCallback, failureCallback, isResuming) {
    Branch.enableLogging = true;
    Branch.enableTestMode(true);

    // Branch initialization
    if (!isResuming) {
        Branch.initSession();
    } else {
        Branch
            .initSession()
            .then(
                function(data) {
                    if (isResuming) {
                        if (data['+clicked_branch_link'] && capturedDeepLinks[data['$canonical_identifier']] == 'undefined') {
                            data['+clicked_branch_link'] = false;
                            capturedDeepLinks[data['$canonical_identifier']] = data;
                            successCallback('Captured deeplink: ' + data);
                        } else if (capturedDeepLinks[data['$canonical_identifier']] == data) {
                            successCallback('Deeplink already captured: ' + data);
                        }
                    }
                }
            ).catch(function(data) {
                failureCallback(data);
            }); 
    }
}

BranchIOPlugin.prototype.createContentReference = function(successCallback, failureCallBack, options) {
    var properties = {
        canonicalIdentifier: options['canonicalIdentifier'],
        canonicalUrl: options['canonicalUrl'],
        title: options['title'],
        contentDescription: options['contentDescription'],
        contentImageUrl: options['contentImageUrl'],
        price: options['price'],
        currency: options['currency'],
        contentIndexingMode: options['contentIndexingMode'],
        contentMetadata: options['contentMetadata']
    };

    var branchUniversalObject = null;

    Branch.createBranchUniversalObject(properties).then(function (res) {
        branchUniversalObj = res
        successCallback({
            object: branchUniversalObject,
            message: 'Content Reference Created Successfully'});
    }).catch(function (err) {
        failureCallBack({
            object: null,
            message: 'Error creating content reference: ' + JSON.stringify(err)});
    });
}

BranchIOPlugin.prototype.createDeepLink = function(successCallBack, failureCallBack, universalObject) {
// optional fields
var analytics = {
    channel: 'facebook',
    feature: 'onboarding',
    campaign: 'content 123 launch',
    stage: 'new user',
    tags: ['one', 'two', 'three']
}

// optional fields
var properties = {
    $desktop_url: 'http://www.example.com/desktop',
    $android_url: 'http://www.example.com/android',
    $ios_url: 'http://www.example.com/ios',
    $ipad_url: 'http://www.example.com/ipad',
    $match_duration: 2000,
    custom_string: 'data',
    custom_integer: Date.now(),
    custom_boolean: true
}

    universalObj.generateShortUrl(analytics, properties).then(function (res) {
        alert('Response: ' + JSON.stringify(res.url))
    }).catch(function (err) {
        alert('Error: ' + JSON.stringify(err))
    });
}

BranchIOPlugin.prototype.readDeepLink = function(successCallBack, failureCallBack) {
    Branch
        .initSession()
        .then(
            function(data) {
                if (isResuming) {
                    if (data['+clicked_branch_link'] && capturedDeepLinks[data['$canonical_identifier']] == 'undefined') {
                        data['+clicked_branch_link'] = false;
                        capturedDeepLinks[data['$canonical_identifier']] = data;
                        successCallback(data);
                    } else if (capturedDeepLinks[data['$canonical_identifier']] == data) {
                        successCallback(null);
                    }
                }
            }
        ).catch(function(data) {
            failureCallback(null);
        });
}