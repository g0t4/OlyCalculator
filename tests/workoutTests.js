define(['workout'], function (Workout) {
    describe('workout tests', function () {
        describe('create workout', function () {

            it('should create 3 exercises if no exercises provided', function () {
                var workout = new Workout();
                expect(workout.exercises().length).to.equal(3);
            });

            it('should use initial exercises if provided', function () {
                var workout = new Workout({ exercises: [{}] });

                expect(workout.exercises().length).to.equal(1);
            })

            it('should serialize with exercises', function () {
                var workout = new Workout();

                var serializedWorkout = workout.serialize();

                expect(serializedWorkout.exercises.length).to.equal(3);
            })
        })

        function workoutWithNoExercises() {
            var workout = new Workout();
            workout.exercises([])
            return workout;
        }

        it('should add an exercise', function () {
            var workout = workoutWithNoExercises();

            workout.addExercise();

            expect(workout.exercises().length).to.equal(1);
        })

        it('should remove an exercise', function () {
            var workout = workoutWithNoExercises();
            workout.addExercise();

            workout.removeExercise(workout.exercises()[0]);

            expect(workout.exercises()).to.be.empty;
        })
    })

})

