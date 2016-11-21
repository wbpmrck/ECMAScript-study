const caseName="[ES6.core.generator]  [learn the basic of generator]:";
const logger = require("../../util/timeLog").create();
const expect = require('chai').expect;

describe(caseName, function () {
    let count = 1;
    beforeEach(function () {
        logger.clear();
        if(count===1){
            console.log(`\r\n--------${caseName}-------->>START`);
        }
        //run before each test
        console.log(`\r\n\r\n------No:${count}----->>START`)
    });

    afterEach(function () {
        //run after each test
        console.log(`------No:${count++}----->>END`)
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
    
    it("generator can implement iterator", function () {


        function* objectEntries(obj) {
            const propKeys = Reflect.ownKeys(obj);

            for (const propKey of propKeys) {
                // `yield` returns a value and then pauses
                // the generator. Later, execution continues
                // where it was previously paused.
                yield [propKey, obj[propKey]]; //this yield return an array to the outside
            }
        }

        const jane = { first: 'Jane', last: 'Doe' };
        for (const [key,value] of objectEntries(jane)) {
            logger.log(`${key}:${value}`);
        }
        //assert log content
        expect(logger.getLog(0).content).to.eql("first:Jane");
        expect(logger.getLog(1).content).to.eql("last:Doe");
    });

    it("generator return results/receive params", function () {

        function* genFunc() {
            logger.log("gen begin");
            yield 1;
            let paramIn = yield 2;
            logger.log(`receive data:${paramIn}`,paramIn)
            return 3;
        }
        let execution = genFunc(); //execute generator function,the func will not execute
        expect(logger.getLength()).to.equal(0);
        expect(execution.__proto__.toString()).to.equal("[object Generator]"); //return obj is an instance of Generator
        expect(execution.__proto__["next"]).to.not.be.undefined; //has next function
        expect(execution.__proto__["return"]).to.not.be.undefined; //has next function
        expect(execution.__proto__["throw"]).to.not.be.undefined; //has next function

        let step1 = execution.next(); //step to next break point
        expect(logger.getLength()).to.equal(1); //this demonstrate programme been executed
        expect(logger.getLatest(1).content).to.equal("gen begin"); //this demonstrate programme been executed
        expect(step1).to.have.all.keys(['value', 'done']); //the first yield pass param to the outside
        expect(step1.value).to.equal(1); //value means the param after 'yield'
        expect(step1.done).to.not.be.true; //done means weather the generator func has to the end.

        let step2 = execution.next(); //execute to next breakpoint
        expect(step2.value).to.equal(2); //value means the param after 'yield'
        expect(step2.done).to.not.be.true; //done means weather the generator func has to the end.
        expect(logger.getLength()).to.equal(1); //this demonstrate programme stuck at yield

        let step3 = execution.next(); //execute to next breakpoint
        expect(step3.value).to.equal(3); //the last value can return by 'return' statement
        expect(step3.done).to.be.true; //done means weather the generator func has to the end.
        expect(logger.getLength()).to.equal(2); //this demonstrate programme end

    });
});