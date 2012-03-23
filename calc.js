var Workout = function(){
	var me = this;
	this.exercises = ko.observableArray([]);
	this.addExercise = function(){
		var exercise = new Exercise()
		me.exercises.push(exercise);
	};
	this.removeExercise = function(exercise){
		me.exercises.remove(exercise);
	}
}

var Exercise = function(){
	var me = this;
	this.max = ko.observable(100);
	this.barWeight = ko.observable(20.4);
	this.sets = ko.observableArray([]);
	this.addSet = function(){
		me.sets.push(new Set(me, 100));
	};
	this.removeSet = function(set){
		me.sets.remove(set);
	};
	Enumerable.Range(1, 10).Select(function(p){ return 5*p+50;})
		.ForEach(function(p){ me.sets.push(new Set(me, p))})
}

var Set = function(exercise, percent) {
	var me = this;
	this.percent = ko.observable(percent);
	this.reps = ko.observable(1);
	this.weight = ko.computed(function() {
		var weight = exercise.max() * me.percent() / 100;
		return Math.round(weight);
	});
	this.weightPerSide = ko.computed(function() {
		var weightPerSide = (me.weight() - exercise.barWeight()) / 2.0;
		return Math.round(weightPerSide);
	});
}

var calc = null;

$(function() {
	calc = new Workout();
	ko.applyBindings(calc);
	Enumerable.Range(1, 3).ForEach(function(i) { calc.addExercise() })
})

// todo saving
// drag and drop reorder?
// todo exercise type
// new exercise load past maxes
// reviewing history