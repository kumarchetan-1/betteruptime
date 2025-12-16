import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export function AuthMiddleware(req:Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith("Bearer ")? authHeader.substring(7): null
    if (!token){
        res.status(401).json({
            message: "token not provided"
        })
        return
    }

    if (!process.env.JWT_SECRET) {
        res.status(500).json({
            message: "JWT secret not configured"
        })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: String }
        (req as any).userId = decoded.id
        next()
    } catch (error) {
        res.status(401).json({
            error,
            message: "Invalid or expired token"
        })
        return
    }

    
}