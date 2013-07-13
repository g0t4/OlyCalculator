define(['workout'], function (Workout) {
    describe('set tests', function () {
        var Set = Workout.Set;
        var Exercise = Workout.Exercise;
        describe('create set', function () {
            var exerciseSet = new Set(new Exercise());
            it('should default to 100 percent effort', function () {
                expect(exerciseSet.percent()).to.equal(100);
            })

            it('should default to 1 rep', function () {
                expect(exerciseSet.reps()).to.equal(1);
            })

            it('should use provided percent effort', function () {
                var exerciseSet = new Set(new Exercise(), { percent: 1});
                expect(exerciseSet.percent()).to.equal(1);
            })

            it('should use provided reps', function () {
                var exerciseSet = new Set(new Exercise(), { reps: 2});
                expect(exerciseSet.reps()).to.equal(2);
            })
        })

        it('should compute weight and weight per side', function () {
            var exerciseSet = new Set(new Exercise({ max: 100, barWeight: 20}), { percent: 50});

            expect(exerciseSet.weight()).to.equal(50);
            expect(exerciseSet.weightPerSide()).to.equal(15);
        })

        it('should serialize', function () {
            var exerciseSet = new Set(new Exercise());

            var serializedSet = exerciseSet.serialize();

            expect(serializedSet.percent).to.equal(100);
            expect(serializedSet.reps).to.equal(1);
        })
    })
});