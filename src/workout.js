define(['knockout', 'knockout.mapping', 'linq'], function (ko, mapper) {

    function Workout(initial) {
        var self = this;
        initial = initial || {};
        initial.exercises = initial.exercises || [];
        var mapping = {
            'exercises': {
                create: function (options) {
                    return new Exercise(options.data);
                }
            }
        }
        mapper.fromJS(initial, mapping, self);
        self.addExercise = function () {
            var exercise = new Exercise({})
            self.exercises.push(exercise);
        };
        self.removeExercise = function (exercise) {
            self.exercises.remove(exercise);
        };
        self.serialize = function () {
            return {
                exercises: Enumerable.From(self.exercises()).Select(function (e) {
                    return e.serialize()
                }).ToArray()
            };
        }
        if (self.exercises().length < 1) {
            Enumerable.Range(1, 3).ForEach(function (i) {
                self.addExercise()
            })
        }
    }

    function Exercise(initial) {
        var self = this;
        initial = initial || {};
        initial.max = initial.max || 100;
        initial.barWeight = initial.barWeight || 20.4;
        initial.sets = initial.sets || []
        var mapping = {
            'sets': {
                create: function (options) {
                    return new Set(self, options.data);
                }
            }
        }
        mapper.fromJS(initial, mapping, self);
        self.addSet = function () {
            self.sets.push(new Set(self, {}));
        };
        self.removeSet = function (set) {
            self.sets.remove(set);
        };
        if (self.sets().length < 1) {
            Enumerable.Range(1, 10).Select(function (p) {
                return 5 * p + 50;
            }).ForEach(function (p) {
                    var initial = {
                        percent: p
                    }
                    self.sets.push(new Set(self, initial))
                })
        }
        self.serialize = function () {
            return {
                max: self.max(),
                barWeight: self.barWeight(),
                sets: Enumerable.From(self.sets()).Select(function (s) {
                    return s.serialize()
                }).ToArray()
            };
        }
    }

    function Set(exercise, initial) {
        var self = this;
        initial = initial || {};
        initial.percent = initial.percent || 100;
        initial.reps = initial.reps || 1;
        mapper.fromJS(initial, {}, self);
        self.weight = ko.computed(function () {
            var weight = exercise.max() * self.percent() / 100;
            return Math.round(weight);
        });
        self.weightPerSide = ko.computed(function () {
            var weightPerSide = (self.weight() - exercise.barWeight()) / 2.0;
            return Math.round(weightPerSide);
        });
        self.serialize = function () {
            return {
                percent: self.percent(),
                reps: self.reps()
            };
        }
    }

    Workout.Exercise = Exercise;
    Workout.Set = Set;
    return Workout;
});