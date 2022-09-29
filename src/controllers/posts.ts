/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import leastDistanceCalculator from '../helpers/helpers';

const postPayload = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let x: number = req.body.x;
    let y: number = req.body.y;
    const bestRobot = leastDistanceCalculator(x, y);
    // add the post
    let response: AxiosResponse = await axios.post(`https://localhost:5001/api/robots/closest/`, {
        bestRobot
    });
    // return response
    return res.status(200).json({
        response
    });
};

export default { postPayload };