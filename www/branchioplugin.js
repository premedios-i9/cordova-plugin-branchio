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
function BranchIO() {}

exports.initialize = function(successCallback, failureCallback, isResuming) {
    Branch.setDebug(true);
    Branch.enableTestMode(true);

    // Branch initialization
    if (isResuming) {
        Branch.initSession();
    } else {
        Branch.initSession().then(function(data) {
            if (isResuming) {
                if (data['+clicked_branch_link']) {
                    // read deep link data on click
                    alert('Deep Link Data: ' + JSON.stringify(data))
                }
            }
        });
    }
}