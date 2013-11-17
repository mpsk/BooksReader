ko.bindingHandlers.calendar = {
    init: function (element, valueAccessor) {
        var selectedDate = valueAccessor();

        $(element).datepicker({
            startDate: selectedDate()
        }).on('changeDate', function (e) {
            selectedDate(e.date);
        });
    }
};

ko.bindingHandlers.editableText = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        $(element).attr('contenteditable', true)
            .text(value())
            .on('blur', function () {
                value($(this).text());
            });
    }
}