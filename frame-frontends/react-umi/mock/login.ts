import { Request, Response } from 'express';

export default {
    'POST /api/login/account': (req: Request, res: Response) => {
        const { password, userName, mobile, captcha  } = req.body;
        if(userName === 'zlx' && password === '123') {
            res.send({
                status: 'success',
                data: {
                    userName
                }
            }); 
            return;
        }
        if(mobile === '13003696610' && captcha === '123456') {
            res.send({
                status: 'success',
                data: {
                    userName: mobile
                }
            });
            return; 
        }
        res.send({
            status: 'error',
            data: null
        });
    },
    'GET /api/login/captcha': {
        status: 'success',
        data: '123456'
    },
}