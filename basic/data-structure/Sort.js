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

// 快速
function quickSort(list) {
    quick(list, 0, list.length - 1);
    console.log(list);
}
function quick(list, left, right) {
    if (list.length > 1) {
        const index = partition(list, left, right);

        if (left < index - 1) {
            quick(list, left, index - 1);
        }

        if (index < right) {
            quick(list, index, right);
        }
    }
}
function partition(list, left, right) {
    const mid = Math.floor((left + right) / 2);
    const pivot = list[mid];

    let i = left;
    let j = right;

    while(i <= j) {
        while(list[i] < pivot) {
            i++;
        }

        while(list[j] > pivot) {
            j--
        }

        if (i <= j) {
            [list[i], list[j]] = [list[j], list[i]];
            i++;
            j--;
        }
    }
    return i;
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


function heapSort(list) {
    let heapSize = list.length;
    buildHeap(list);


    console.log(list);

    while (heapSize > 1) {
        heapSize--;
        [list[0], list[heapSize]] = [list[heapSize], list[0]];
        heapify(list, heapSize,     );
    }

    console.log(list);
}
function buildHeap(list) {
    const heapSize = list.length;
    for(let i = Math.floor(heapSize / 2); i >= 0; i--) {
        heapify(list, heapSize, i);
    }
}
function heapify(list, heapSize, i) {
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    let largest = i;

    if (left < heapSize && list[left] > list[largest]) {
        largest = left;
    }

    if (right < heapSize && list[right] > list[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [list[i], list[largest]] = [list[largest], list[i]];
        heapify(list, heapSize, largest);
    }
}


// bubbleSort(arr);
// selectionSort(arr);
// insertionSort(arr);
// quickSort(arr);
heapSort(arr);
// console.log(mergeSort(arr));






