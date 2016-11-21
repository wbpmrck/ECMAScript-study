/**
 * Created by kaicui on 16/11/21.
 */

class Log{
    constructor(){
        var self = this;
        self.logs=[]
    }

    log(content){
        var self = this;
        let item = {time:new Date(),content:content};
        self.logs.push(item);
        console.log(`${item.time}:${item.content}`)
    }

    /**
     * 返回最近插入的第n条记录。n从1开始
     * @param seq：从1开始。 1=最后插入的一条记录
     * @returns {*}
     */
    getLatest(seq){
        let index = this.logs.length-seq;
        return this.logs[index];
    }
}

module.exports = {
    /**
     * 创建一个新的日志对象
     * @returns {Log}
     */
    create:function () {
        return new Log();
    }
}