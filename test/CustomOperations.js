import assert from "assert";
import {Apis} from "../lib";

var default_api = "wss://api.bts.mobi/ws";

describe("Storage", () => {

    let cs = default_api;

    describe("Custom API", function() {

        // Connect once for all tests
        before(function() {
            return Apis.instance(cs, true, 20000, {enableCustom: true}).init_promise.then(function (result) {
                console.log("init ok.");
            });
        });

        after(function() {
            return new Promise(function(res) {
                Apis.close().then(res);
            })
        });

        it("Get App Settings", function() {
            return new Promise( function(resolve, reject) {
                Apis.instance().custom_api().exec( "get_storage_info", ["committee-app-settings", "app.settings"]).then(function(object) {
                    console.log(object);
                    resolve();
                }).catch(err=>{
                    console.log(err);
                    reject(err);
                });
            })
        });
    });

})
