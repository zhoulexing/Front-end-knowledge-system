const arr = [10, 6, 2, 7, 1, 9, 11, 4];

// 冒泡
function bubbleSort(list) {
    for(let i = 0; i < list.length; i++) {
        for(let j = i + 1; j < list.length; j++) {
            if(list[i] > list[j]) {
                let temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            } 
        }
    }
    console.log(list);
}


// 选择
function selectionSort(list) {
    let minIndex;
    for(let i = 0; i < list.length; i++) {
        minIndex = i;
        for(let j = i + 1; j < list.length; j++) {
            if(list[minIndex] > list[j]) {
                minIndex = j;
            }
        }
        if(minIndex !== i) {
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
    }
    console.log(list);
}

// 插入
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

// 归并
function mergeSort(list) {
    const length = list.length;
    if(length === 1) {
        return list;
    }
    const position = Math.floor(length / 2);
    const left = list.slice(0, position);
    const right = list.slice(position, length);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    const result = [];
    let li = 0;
    let ri = 0;
    while(li < left.length && ri < right.length) {
        if(left[li] < right[ri]) {
            result.push(left[li++]);
        } else {
            result.push(right[ri++]);
        }
    }

    while(li < left.length) {
        result.push(left[li++]);
    }

    while(ri < right.length) {
        result.push(right[ri++]);
    }

    return result;
}



// bubbleSort(arr);
// selectionSort(arr);
insertionSort(arr);
// console.log(mergeSort(arr));






