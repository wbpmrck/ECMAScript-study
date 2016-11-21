/**
 * Created by kaicui on 16/11/21.
 */

class Log{
    constructor(){
        var self = this;
        self.logs=[]
    }

    /**
     * 添加一个日志，可以附带数据项
     * @param content
     * @param data
     */
    log(content,data=undefined){
        var self = this;
        let item = {time:new Date(),content:content,data:data};
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

    /**
     * 按照插入顺序，获取日志
     * @param seq:从0开始
     * @returns {*}
     */
    getLog(seq){
        return this.logs[seq];
    }

    getLength(){
        return this.logs.length
    }

    clear(){
        this.logs=[];
        return this;
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