define(['workout', 'linq'], function (Workout) {
    describe('exercise tests', function () {
        var Exercise = Workout.Exercise;
        describe('create exercise', function () {
            var exercise = new Exercise();
            it('should add 10 sets with 55% to 100% by increments of 5% if none provided', function () {
                var sets = exercise.sets();
                expect(sets.length).to.equal(10);

                var percents = Enumerable.From(sets)
                    .Select(function (exerciseSet) { return exerciseSet.percent(); })
                    .ToArray()
                expect(percents).to.eql([55, 60, 65, 70, 75, 80, 85, 90, 95, 100]);
            })

            it('should default to a one rep max of 100', function () {
                expect(exercise.max()).to.equal(100);
            })

            it('should default to a bar weight of 20.4kg', function () {
                expect(exercise.barWeight()).to.equal(20.4);
            })

            it('should copy initial sets if provided', function () {
                var exercise = new Exercise({sets: [
                    {}
                ]});

                expect(exercise.sets().length).to.equal(1);
            })

            it('should use provided one rep max', function () {
                var exercise = new Exercise({max: 1});
                expect(exercise.max()).to.equal(1);
            })

            it('should use provided bar weight', function () {
                var exercise = new Exercise({barWeight: 1});
                expect(exercise.barWeight()).to.equal(1);
            })
        })

        function exerciseWithNoSets() {
            var exercise = new Exercise();
            exercise.sets([])
            return exercise;
        }

        it('should add a set', function () {
            var exercise = exerciseWithNoSets();

            exercise.addSet();

            expect(exercise.sets().length).to.equal(1);
        })

        it('should remove a set', function () {
            var exercise = exerciseWithNoSets();
            exercise.addSet();

            exercise.removeSet();

            expect(exercise.sets().length).to.equal(1);
        })

        it('should serialize', function () {
            var exercise = new Exercise();

            var serializedExercise = exercise.serialize();

            expect(serializedExercise.sets.length).to.equal(10);
            expect(serializedExercise.max).to.equal(100);
            expect(serializedExercise.barWeight).to.equal(20.4);
        })
    })
});