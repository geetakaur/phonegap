SmartLiberate_v2.Notes = function (params) {
    var PAGE_SIZE = 5;
    var USER = 'jc';
    var SERVER_URL = 'http://b2c.linetime.co.uk/mobileservices/requestservice.svc/GetReminders/';

    var viewModel = {
        dataSource: ko.observable(),
        
        viewShown: function () {
            $.ajax({
                url: SERVER_URL + USER + '/' + PAGE_SIZE,
                dataType: 'json',
                success: function (data) {
                    var mapped = $.map(data, function (item, index) {
                        return {
                            name: item.Remindernote,
                            id: item.ReminderId,
                            duedate: item.Duedate,
                            reminderdate: item.ReminderDate,
                            caseid: item.CaseId
                        };
                    })
                    viewModel.dataSource(mapped);
                }
            });
        }
    };

    return viewModel;
};