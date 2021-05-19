package com.fidelidade.plugins;

import android.content.Context;
import android.content.res.XmlResourceParser;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class BranchIOPlugin extends CordovaPlugin {

    private CallbackContext callbackContext;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        this.callbackContext = callbackContext;
        if (action.equals("isProduction")) {
            getTestModeSetting();
        }
    }

    private void getTestModeSetting() {
        this.callbackContext.success(getAPIKeyFromConfigXML(cordova.getContext(), "BRANCH_ISPRODUCTION"));
    }

    public static String getAPIKeyFromConfigXML(Context context, String keyName) {
        String config = "";
        int id = context.getResources().getIdentifier("config", "xml", context.getPackageName());
        if (id == 0) {
            return config;
        }

        XmlResourceParser xml = context.getResources().getXml(id);

        int eventType = -1;
        while (eventType != XmlResourceParser.END_DOCUMENT) {

            if (eventType == XmlResourceParser.START_TAG) {
                if (xml.getName().equals("preference")) {
                    String name = xml.getAttributeValue(null, "name");
                    String value = xml.getAttributeValue(null, "value");

                    if (name.equals(keyName) && value != null) {
                        config = value;
                    }
                }
            }

            try {
                eventType = xml.next();
            } catch (Exception e) {
                // PluginLogger.error(e, "Error parsing config file");
            }
        }

        return config;
    }
}
