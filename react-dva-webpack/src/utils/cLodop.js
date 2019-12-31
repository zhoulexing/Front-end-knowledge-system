const LODOP = getCLodop();

export function addPrintImage(top, left, width, height, imgUrl) {
    LODOP.PRINT_INIT("打印任务名");               //首先一个初始化语句
    LODOP.ADD_PRINT_TEXT(0,0,100,20,"文本内容一");//然后多个ADD语句及SET语句
    LODOP.ADD_PRINT_IMAGE(top, left, width, height, `<img border='0' src='${imgUrl}' />`);
    LODOP.PRINT();  
}