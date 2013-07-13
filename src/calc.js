require(['knockout', 'jquery', 'amplify', 'workout'], function (ko, $, amplify, Workout) {
    function Calculator() {
        var self = this;
        this.workout = ko.observable(new Workout({}));

        this.save = function () {
            var serialized = self.workout().serialize();
            amplify.store('olycalc', serialized);
        }
        this.load = function () {
            var saved = amplify.store('olycalc');
            if (saved === undefined) {
                return;
            }
            this.workout(new Workout(saved));
        }
        this.newWorkout = function () {
            self.workout(new Workout({}));
        }
    }

    var calc = null;

    $(function () {
        calc = new Calculator();
        calc.newWorkout();
        ko.applyBindings(calc);
    })

// drag and drop reorder?
// todo exercise type
// new exercise load past maxes
// reviewing history

});
