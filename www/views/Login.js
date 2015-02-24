SmartLiberate_v2.Login = function (params) {
  
    var viewModel = {
        //  Put the binding properties here
        username: ko.observable(""),
        password: ko.observable(""),
        visible: ko.observable(false),
        
        show: function(redirectParams) {
        this.visible(true);
        this.redirectParams = redirectParams;
        },
        close: function () {
            this.visible(false);
            delete this.redirectParams;
        },

        Signin: function (e) {
        pass = this.password();
        user = this.username();
            //Authenticate a user here
        var authenticated = true;
        var SERVICE_URL = "http://b2c.linetime.co.uk/MobileServices/UserRegistration.svc/Login"

        var options = {
            url: SERVICE_URL,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({ username: user, password: pass }),
            xhrFields: {
                withCredentials: true
            }
        };
        $.ajax(options)
            .done(function (response) {
                // this is the callback method that gets passed in
                //handleResponse(response);
                DevExpress.ui.notify("Signed In Successfully!", "info", 1000);
              //  RegisterDevice();
                SmartLiberate_v2.app.navigate("Home");
            })
        .fail(function (msg) {
            DevExpress.ui.notify("Problem with Sign in", "info", 1000);
        });
            // ajax call
        //$.ajax({
        //    url: SERVICE_URL,
        //    type: "POST",
        //    data: JSON.stringify({username: user,password:pass}),
        //    contentType: 'application/json; charset=utf-8',
        //    dataType: 'json',
        //    xhrFields: {
        //        withCredentials: true
        //    },
           
        //    //beforeSend: function (xhr) {
        //    //    xhr.setRequestHeader('Authorization', make_base_auth(username, password));
        //    //// generate encrypted username + password
        //    ////var encrypted = CryptoJS.TripleDES.encrypt(username + ":" + password,"L1n3t1m3");
        //    ////  var base64 = Crypto.util.bytesToBase64(bytes);
        //    //// set header
        //    //// xhr.setRequestHeader("Authorization", encrypted);
        //    //},
        //    error: function () {
        //        // error handler
        //        authenticated = false;
        //    },
        //    success: function (data) {
        //        // success handler
        //        DevExpress.ui.notify(data, "info", 1000);
        //    }

        //});

            //

        if (authenticated) {
            SmartLiberate_v2.loggedOn = true;
            if (this.redirectParams) {
                SmartLiberate_v2.app.navigate(this.redirectParams.uri, this.redirectParams.options);
            }
            this.close();
        }
        else {
            //Process unsuccessful attempt here
            DevExpress.ui.notify("Problem with sign in", "info", 1000);
        }
            //  console.log(e);

    }
    };
    
    return viewModel;

    function make_base_auth(user, password) {

        var tok = user + ':' + password;
        var hash = btoa(tok);
        return "Basic " + hash;
    }


    
};