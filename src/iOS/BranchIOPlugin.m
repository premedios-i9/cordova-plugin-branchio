#import <Foundation/Foundation.h>
#import "BranchIOPlugin.h"

@implementation BranchIOPlugin: CDVPlugin

- (void) getTrackingPermissionStatus: (CDVInvokedUrlCommand *)command {
    CDVPluginResult *pluginResult;
    NSString *trackingStatus = @"";
    
    if (@available(iOS 14, *)) {
        switch (ATTrackingManager.trackingAuthorizationStatus) {
            case ATTrackingManagerAuthorizationStatusNotDetermined:
                trackingStatus = @"na";
                break;
            case ATTrackingManagerAuthorizationStatusDenied:
                trackingStatus = @"denied";
                break;
            case ATTrackingManagerAuthorizationStatusAuthorized:
                trackingStatus = @"authorized";
                break;
            case ATTrackingManagerAuthorizationStatusRestricted:
                trackingStatus = @"restricted";
                break;
        }
        
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:trackingStatus];
        
    } else {
        // Fallback on earlier versions
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"incorrect iOS version"];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}

- (void) requestTrackingPermission: (CDVInvokedUrlCommand *)command {
    CDVPluginResult __block *pluginResult;
    NSString __block *trackingStatus = @"";
    
    if (@available(iOS 14, *)) {
        if (ATTrackingManager.trackingAuthorizationStatus == ATTrackingManagerAuthorizationStatusNotDetermined) {
            [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
                switch (status) {
                    case ATTrackingManagerAuthorizationStatusNotDetermined:
                        trackingStatus = @"na";
                        break;
                    case ATTrackingManagerAuthorizationStatusDenied:
                        trackingStatus = @"denied";
                        break;
                    case ATTrackingManagerAuthorizationStatusAuthorized:
                        trackingStatus = @"authorized";
                        break;
                    case ATTrackingManagerAuthorizationStatusRestricted:
                        trackingStatus = @"restricted";
                        break;
                }
                
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:trackingStatus];
                pluginResult.keepCallback = @YES;
                
                [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            }];
        }
    } else {
        // Fallback on earlier versions
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"incorrect iOS version"];
        pluginResult.keepCallback = @YES;
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
}
@end
