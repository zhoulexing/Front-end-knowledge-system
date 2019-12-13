function identity<T>(arg: T): T {
    return arg;
}
function loggingIdentity<T>(arg: T[]): T[] {
    return arg;
}

class GetMin<T> {
    arr: T[] = [];
    add(ele: T) {
        this.arr.push(ele);
    }
    min(): T {
        var min = this.arr[0];
        this.arr.forEach(function (value) {
            if(value<min){
                min=value;
            }
        });  
        return min;
    }
}