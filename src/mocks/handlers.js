import {rest} from "msw"

export const handlers = [
    rest.post(`${process.env.REACT_APP_BASE_URL}/login`, (req, res, ctx)=> {
        console.log("req : ", req)
        return res(ctx.status(200),
            ctx.json({status_code: 200, message: "Authentication Success!"})
            )
    })
]