define(['viewmodels/createTask'], function (viewModel) {

    var 
        dataContext = require('service/dataContext'),
        router = require('plugins/router');
        // system = require('durandal/system');

    describe('viewModel [createTask]', function () {

        beforeEach(function(){
            var matchers= {
                toBeComputed: function(value){
                    this.message = function() {
                        return "Expected to be Computed";
                    }
                    return ko.isComputed(this.actual);
                }
            };
            this.addMatchers(matchers);
        });

        it('should be object', function () {
            expect(viewModel).toEqual(jasmine.any(Object));
        });

        describe('title:', function () {

            it('should be defined', function () {
                expect(viewModel.title).toBeDefined();
            });

        });

        describe('description:', function () {

            it('should be defined', function () {
                expect(viewModel.description).toBeDefined();
            });

        });

        describe('createTask:', function () {

            beforeEach(function(){
                spyOn(dataContext, 'createTask');
                spyOn(router, 'navigate');
            });

            it('should be function', function () {
                expect(viewModel.createTask).toEqual(jasmine.any(Function));
            });

            it('should add task', function () {
                var title = 'title';
                var description = 'description';
                viewModel.title(title);
                viewModel.description(description);

                viewModel.createTask();

                expect(dataContext.createTask).toHaveBeenCalledWith(title, description);

            });

            it('should return to tasks list', function(){
                viewModel.title('title');
                viewModel.description('description');
                viewModel.createTask();
                expect(router.navigate).toHaveBeenCalledWith('');
            });

            it('should set empty title and description fields after createTask', function(){
                viewModel.title('title');
                viewModel.description('description');
                viewModel.createTask();
                expect(viewModel.title(), viewModel.description()).toEqual('');
            });
        });

        
        describe('canCreate:', function(){
            it('should be computed', function(){
                // expect(ko.isComputed(viewModel.canCreate)).toBeTruthy();
                expect(viewModel.canCreate).toBeComputed();
            });

            describe('when title is empty', function(){
                it('should be false', function(){
                    viewModel.title('');
                    expect(viewModel.canCreate()).toBeFalsy();
                });

                // it('should not add task', function(){
                //     viewModel.title('');
                //     viewModel.createTask();
                //     expect(dataContext.createTask).toHaveBeenCalledWith();
                // });
            });

            describe('when title is not empty', function(){
                it('should be true', function(){
                    viewModel.title('title');
                    expect(viewModel.canCreate()).toBeTruthy();
                });
            });

        });



    });

});
