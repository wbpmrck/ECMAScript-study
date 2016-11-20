const caseName="learn the basic of generator:";
const timeLog = function (content)
{
    console.log(`${new Date()}:${content}`)
}

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

        //define a generator
        function* genFunc() {
            // (A)
            timeLog('First');
            yield;
            timeLog('Second'); //this log will appear later then pre one,delay 2 seconds.
        }
        const genObj = genFunc();

        genObj.next();

        setTimeout(function () {
            genObj.next(); //delay 2 seconds to call next
            done();
        },2000);

    });

    it(' can ', function () {

    });

});