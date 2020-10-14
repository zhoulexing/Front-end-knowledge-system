import React from 'react';
import { Button } from 'antd';

const ClodopPrint = () => {
    const preview = () => {
        CLODOP.PRINT_INIT('预览');
        CLODOP.SET_PRINT_PAGESIZE(1, 1000, 1000);

        LODOP.SET_PRINT_STYLEA(0, "Stretch", 10);
        LODOP.ADD_PRINT_TEXT(0, 0, 500, 500, 'hello');
        LODOP.SET_PRINT_STYLEA(0, "Stretch", 10);
        // LODOP.ADD_PRINT_TEXT(0, 0, 100, 100, 'word');
        // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 20);
		// LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -1);
		// LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -1);
        LODOP.ADD_PRINT_TABLE(25, 0, 500, '100%', '<table width="100%" style= "border: dashed 1px black;border-collapse: collapse"><thead><tr style="height:5.8;border: dashed 1px black;border-collapse: collapse"><td style="height:5.8;border: dashed 1px black;border-collapse: collapse;font-size:16px;font-family:宋体;text-align:center;line-height:undefined;font-weight:normal;font-style:normal;text-decoration:none">序号</td><td style="height:5.8;border: dashed 1px black;border-collapse: collapse;font-size:16px;font-family:宋体;text-align:center;line-height:undefined;font-weight:normal;font-style:normal;text-decoration:none">商品名称</td><td style="height:5.8;border: dashed 1px black;border-collapse: collapse;font-size:16px;font-family:宋体;text-align:center;line-height:undefined;font-weight:normal;font-style:normal;text-decoration:none">数量</td><td style="height:5.8;border: dashed 1px black;border-collapse: collapse;font-size:16px;font-family:宋体;text-align:center;line-height:undefined;font-weight:normal;font-style:normal;text-decoration:none">金额</td></tr></thead><tbody><tr style="border: dashed 1px black;border-collapse:collapse"><td style="border: dashed 1px black;border-collapse:collapse;text-align:center;font-size:16px;font-family:宋体;width: 42px;font-weight:normal;font-style:normal;text-decoration: none">1</td><td style="border: dashed 1px black;border-collapse:collapse;text-align:left;font-size:16px;font-family:宋体;width: 530px;font-weight:normal;font-style:normal;text-decoration: none">阿狸三四五六七八九十阿狸三四五六七八九十阿狸三四五六七八九十</td><td style="border: dashed 1px black;border-collapse:collapse;text-align:center;font-size:16px;font-family:宋体;width: 40px;font-weight:normal;font-style:normal;text-decoration: none">1</td><td style="border: dashed 1px black;border-collapse:collapse;text-align:right;font-size:16px;font-family:宋体;width: 76px;font-weight:normal;font-style:normal;text-decoration: none">0.01</td></tr><tr style="border: dashed 1px black;border-collapse:collapse"><td style="border: dashed 1px black;border-collapse:collapse;text-align:center;font-size:16px;font-family:宋体"> 总计</td><td style="border: dashed 1px black;border-collapse:collapse;text-align:left;font-size:16px;font-family:宋体"></td><td style="border: dashed 1px black;border-collapse:collapse;text-align:center;font-size:16px;font-family:宋体">1</td><td style="border: dashed 1px black;border-collapse:collapse;text-align:right;font-size:16px;font-family:宋体">0.01</td></tbody></table>');
        // LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -2);
        LODOP.ADD_PRINT_TEXT(10, 10, 100, 100, '特朗普');
        LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -1);
        LODOP.ADD_PRINT_TEXT(25, 10, 100, 100, '特朗普1');
        LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -2);
        LODOP.ADD_PRINT_TEXT(0, 0, 100, 100, '特朗普2');
        LODOP.SET_PRINT_STYLEA(0, "LinkedItem", -1);
		LODOP.PREVIEW();
    }

    return (
        <div>
            <Button onClick={preview}>预览</Button>
        </div>
    )
}

export default ClodopPrint;