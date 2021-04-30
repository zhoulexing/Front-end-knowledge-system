function insertionSort(list) {
    for (let i = 1; i < list.length; i++) {
        const temp = list[i];
        let j = i;
        while(j > 0 && list[j - 1] > temp) {
            list[j] = list[j - 1];
            j--;
        }
        list[j] = temp;
    }
    console.log(list);
}

const test = "111111111111111111111";

export function test() {
    insertionSort([]);
}


