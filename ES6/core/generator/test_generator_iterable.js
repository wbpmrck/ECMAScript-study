const caseName="[ES6.core.generator]  [serveral ways to iterate generator]:";
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

    it('can use <for of> to iterate generateObject(to the end)', function () {

        //define a generator
        function* genFunc() {
            yield 1;
            yield 2;
            yield 3;
        }
        const genObj = genFunc();

        for(let val of genObj){
            logger.log(val);
        }

        expect(logger.getLog(0).content).to.eql(1);
        expect(logger.getLog(1).content).to.eql(2);
        expect(logger.getLog(2).content).to.eql(3);

        expect(logger.getLength()).to.eql(3); // for of loop,will ignore the generator value when "done":true
    });

    it('can use <spread operator (...) > to iterate generateObject(to the end)', function () {

        //define a generator
        function* genFunc() {
            logger.log(1);
            yield 1;
            logger.log(2);
            yield 2;
            logger.log(3);
            yield 3;
            logger.log(4);
            yield 4;
            logger.log(5);
            yield 5;
            logger.log(6);
        }
        const genObj = genFunc();

        const arr = [...genObj]


        expect(logger.getLength()).to.eql(6);

        console.log(`arr is ${arr}`);
        expect(arr).to.eql([1,2,3,4,5]); // ... operator,will ignore the generator value when "done":true
    });

    it('can use < array destructuring [x,x,x] > to iterate generateObject(to the index)', function () {

        //define a generator
        function* genFunc() {
            logger.log(1);
            yield 1;
            logger.log(2);
            yield 2;
            logger.log(3);
            yield 3;
            logger.log(4);
            yield 4;
            logger.log(5);
            yield 5;
            logger.log(6);
        }
        const genObj = genFunc();

        const [x,,y] =genObj;


        expect(logger.getLength()).to.eql(3);
        expect(x).to.eql(1);
        expect(y).to.eql(3);

    });
});