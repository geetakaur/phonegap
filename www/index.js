
$(function() {
    var startupView = "Login";
    

    var SERVICE_URL = "http://b2c.linetime.co.uk/MobileServices/"
    var sender_ID = "788632910351";
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    if(DevExpress.devices.real().platform === "win8") {
        $("body").css("background-color", "#000");
    }


    SmartLiberate_v2.app = new DevExpress.framework.html.HtmlApplication({
        namespace: SmartLiberate_v2,
        layoutSet: DevExpress.framework.html.layoutSets[SmartLiberate_v2.config.layoutSet],
        navigation: SmartLiberate_v2.config.navigation,
        commandMapping: SmartLiberate_v2.config.commandMapping
    });

    
    function RegisterDevice() {
        SmartLiberate_v2.PushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android') {
            SmartLiberate_v2.PushNotification.register(
                successHandler,
                errorHandler, {
                    "senderID": "788632910351",
                    "ecb": "onNotificationGCM"
                });
        }

      

    }
    SmartLiberate_v2.MessageContent = ko.observable("");
    function successHandler(result)
    { //alert('Callback Success! Result = ' + result)
        SmartLiberate_v2.MessageContent(SmartLiberate_v2.MessageContent() + '<li>Callback Success! Result: '   + result + '</li>');
    }
    function errorHandler(error)
    {  SmartLiberate_v2.MessageContent(SmartLiberate_v2.MessageContent() + '<li>ERROR -> MSG: ' + error + '</li>'); }
    function onNotificationGCM(e) {
        SmartLiberate_v2.MessageContent(SmartLiberate_v2.MessageContent() + '<li>EVENT -> RECEIVED: ' + e.event + '</li>');
        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    SmartLiberate_v2.MessageContent(SmartLiberate_v2.MessageContent() + '<li>REGISTERED -> REGID: ' + e.regid + "</li>");
                }
                break;

            case 'message':
                if (e.foreground) {
                    SmartLiberate_v2.MessageContent(SmartLiberate_v2.MessageContent() + '<li>--INLINE NOTIFICATION--' + '</li>');
                }
                else {
                    if (e.coldstart) {
                        SmartLiberate_v2.MessageContent(SmartLiberate_v2.MessageContent() + '<li>--COLDSTART NOTIFICATION--' + '</li>');
                    }
                    else {
                        SmartLiberate_v2.MessageContent(SmartLiberate_v2.MessageContent() + '<li>--BACKGROUND NOTIFICATION--' + '</li>');
                    }
                }
                SmartLiberate_v2.MessageContent(SmartLiberate_v2.MessageContent() + '<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                break;

            case 'error':
                SmartLiberate_v2.MessageContent(SmartLiberate_v2.MessageContent() + '<li>ERROR -> MSG: ' + e.msg + '</li>');
                break;

            default:
                SmartLiberate_v2.MessageContent(SmartLiberate_v2.MessageContent() + '<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                break;

    }

    $(document).on("deviceready", function () {
        navigator.splashscreen.hide();
        if (window.devextremeaddon) {
            window.devextremeaddon.setup();
        }
        $(document).on("backbutton", function () {
            DevExpress.processHardwareBackButton();
        });
        
        RegisterDevice();
        
    });

    function onNavigatingBack(e) {
        if(e.isHardwareButton && !SmartLiberate_v2.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "tizen":
                tizen.application.getCurrentApplication().exit();
                break;
            case "android":
                if (SmartLiberate_v2.PushNotification)
                    SmartLiberate_v2.PushNotification.unregister(successHandler, errorHandler);
                    navigator.app.exitApp();
                break;
            case "win8":
                window.external.Notify("DevExpress.ExitApp");
                break;
        }
    }
 
   

    $(window).unload(function() {
        SmartLiberate_v2.app.saveState();
    });

    SmartLiberate_v2.app.router.register(":view/:id", { view: startupView, id: undefined });
    SmartLiberate_v2.app.on("navigatingBack", onNavigatingBack);

    SmartLiberate_v2.app.initialized.add(function () {
        var $view = SmartLiberate_v2.app.getViewTemplate("Login");
       $view.appendTo(".dxcontent");
        SmartLiberate_v2.app.loggedOn = ko.observable(false);
        SmartLiberate_v2.loginViewModel = SmartLiberate_v2.Login();
        ko.applyBindings(SmartLiberate_v2.loginViewModel, $view[0]);

    });

    SmartLiberate_v2.app.navigating.add(function (e) {
        var params = SmartLiberate_v2.app.router.parse(e.uri),
           viewInfo = SmartLiberate_v2.app.getViewTemplateInfo(params.view);
        if (viewInfo.secure && !SmartLiberate_v2.loggedOn) {
            e.cancel = true;
            SmartLiberate_v2.loginViewModel.show(e);
        }
    });
    SmartLiberate_v2.app.navigate();
});