import React, { useEffect } from 'react';
import QRCode from 'qrcode.react';
import logo from '@/assets/logo.png';
import light from '@/assets/light.jpg';

function getImage(src: string) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject('error');
        img.src = src;
    });
}

const Example: React.FC = () => {
    useEffect(() => {
        async function compositePoster() {
            const oldCanvas = document.querySelector('#test') as HTMLCanvasElement;
            const oldImgSrc = oldCanvas.toDataURL('image/png');
            const oldImg = await getImage(oldImgSrc) as HTMLImageElement;

            const newCanvas = document.createElement('canvas');
            const newCanvasCtx = newCanvas.getContext('2d');
            newCanvas.width = 300;
            newCanvas.height = 300;

            const bgImg = await getImage(light) as HTMLImageElement;
            const logoImg = await getImage(logo) as HTMLImageElement;

            newCanvasCtx?.drawImage(bgImg, 0, 0, 300, 300);
            newCanvasCtx?.drawImage(oldImg, 50, 50, 200, 200);
            newCanvasCtx?.drawImage(logoImg, 125, 125, 50, 50);

            oldCanvas.parentNode?.replaceChild(newCanvas, oldCanvas);
        }
        compositePoster();
    }, []);

    return (
        <div>
            <QRCode
                id="test"
                value="https://www.baidu.com/"
                size={100}
                imageSettings={{
                    src: logo,
                    height: 10,
                    width: 10,
                    excavate: true,
                }}
            ></QRCode>
        </div>
    );
};

export default Example;
