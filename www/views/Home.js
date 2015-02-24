SmartLiberate_v2.Home = function (params) {

    var viewModel = {
        //  Put the binding properties here
        buttonClicked: function (e) {
            SmartLiberate_v2.app.navigate("Notes");
        }
        
    };

    return viewModel;
};