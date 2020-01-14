// const LODOP = getCLodop();

export function printImage(top, left, width, height, imgUrl) {
    LODOP.PRINT_INIT("打印任务名");               
    LODOP.ADD_PRINT_IMAGE(top, left, width, height, `<img border='0' src='${imgUrl}' />`);
    LODOP.PRINT();  
}

export function previewImage(top, left, width, height, imgUrl) {
    LODOP.PRINT_INIT("打印任务名");               
    LODOP.ADD_PRINT_IMAGE(top, left, width, height, `<img border='0' src='${imgUrl}' />`);
    LODOP.PREVIEW(); 
}

export function previewTable(top, left, width, height) {
    LODOP.PRINT_INIT("打印任务名");
    const table = `
        <table width="100%" style="border: solid 1px black; border-collapse: collapse; text-align: center;">
            <thead>
                <tr>
                    <td>图片</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img height="100" width="100" border=0 src="https://img.alicdn.com/bao/uploaded/i2/663734805/O1CN01DBJIGA1lMjeFTryym_!!663734805.jpg"/></td>
                </tr>
            </tbody>
        </table>
    `;      
    LODOP.ADD_PRINT_TABLE(top, left, width, height, table);
    LODOP.PREVIEW();
}

export function previewHtm(top, left, width, height) {
    LODOP.PRINT_INIT("打印任务名");
    const table = `
        <table width="100%" style="border: solid 1px black; border-collapse: collapse; text-align: center;">
            <thead>
                <tr>
                    <td>图片</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img style="width:100px;height:100px;" border=0 src="https://img.alicdn.com/bao/uploaded/i2/663734805/O1CN01DBJIGA1lMjeFTryym_!!663734805.jpg"/></td>
                </tr>
            </tbody>
        </table>
    `;
    LODOP.ADD_PRINT_HTM(top, left, width, height, table);
    LODOP.PRINT_DESIGN();
}