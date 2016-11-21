const caseName="learn the basic of generator:";
const logger = require("../../util/timeLog").create();
const expect = require('expect.js');

describe(caseName, function () {
    let count = 1;
    beforeEach(function () {
        if(count===1){

            console.log(`--------${caseName}-------->>START`);
        }
        //run before each test
        console.log(`------No:${count++}----->>START`)
    });

    afterEach(function () {
        //run after each test
    });


    it('can use yield to stop/resume code execution.', function (done) {

        this.timeout(3000);

        //define a generator
        function* genFunc() {
            // (A)
            logger.log('First');
            yield;
            logger.log('Second'); //this log will appear later then pre one,delay 2 seconds.
        }
        const genObj = genFunc();

        genObj.next();

        setTimeout(function () {
            genObj.next(); //delay 2 seconds to call next

            //validate log time delay
            expect(Math.abs(logger.getLatest(1).time - logger.getLatest(2).time-2000)).to.be.lessThan(100);

            done();
        },2000);

    });



});