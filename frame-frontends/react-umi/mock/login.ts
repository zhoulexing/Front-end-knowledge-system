import { Request, Response } from 'express';

export default {
    'GET /api/currentUser': {
        status: 'success',
        user: {
            userName: '火麒麟',
            usertype: 'ww',
            age: 100
        }
    },
    'POST /api/login/account': (req: Request, res: Response) => {
        const { password, userName  } = req.body;
        if(userName === 'zlx' && password === '123') {
            res.send({
                status: 'success',
                userName
            }); 
        } else {
            res.send({
                status: 'error'
            });
        }
    },
}