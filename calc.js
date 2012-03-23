function Workout() {
	var self = this;
	self.exercises = ko.observableArray([]);
	self.addExercise = function() {
		var exercise = new Exercise()
		self.exercises.push(exercise);
	};
	self.removeExercise = function(exercise) {
		self.exercises.remove(exercise);
	};
}

function Exercise() {
	var self = this;
	self.max = ko.observable(100);
	self.barWeight = ko.observable(20.4);
	self.sets = ko.observableArray([]);
	self.addSet = function() {
		self.sets.push(new Set(self, 100));
	};
	self.removeSet = function(set) {
		self.sets.remove(set);
	};
	Enumerable.Range(1, 10).Select(function(p) {
		return 5 * p + 50;
	}).ForEach(function(p) {
		self.sets.push(new Set(self, p))
	})
}

function Set(exercise, percent) {
	var self = this;
	self.percent = ko.observable(percent);
	self.reps = ko.observable(1);
	self.weight = ko.computed(function() {
		var weight = exercise.max() * self.percent() / 100;
		return Math.round(weight);
	});
	self.weightPerSide = ko.computed(function() {
		var weightPerSide = (self.weight() - exercise.barWeight()) / 2.0;
		return Math.round(weightPerSide);
	});
}

var calc = null;

$(function() {
	calc = new Workout();
	ko.applyBindings(calc);
	Enumerable.Range(1, 3).ForEach(function(i) {
		calc.addExercise()
	})
})

// todo saving
// drag and drop reorder?
// todo exercise type
// new exercise load past maxes
// reviewing history
