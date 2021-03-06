import { Business } from "../resources/business.modal";
import { generateNewToken, verifyToken } from "./jwtService";

export const signup = async (req, res) => {

    if (!req.body.email || !req.body.password) {

        return res.status(400).send({ msg: 'email and password are mandatory' });
    }

    try {
        let business = await Business.create(req.body);
        let token = generateNewToken(business);
        return res.status(201).send({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }

}



export const login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {

            return res.status(400).send({ msg: 'need email and password' });
        }
        const business = await Business.findOne({ email: req.body.email }).select('email password').exec();
        if (business.password != req.body.password) {
            return res.status(401).send({ msg: "email password combination is incorrect" });
        }

        return res.status(200).send({ token: generateNewToken(business) })



        res.status(401).send({ msg: "email doest not exists" });
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }

}


export const editBusiness = async (req, res) => {
    if (!req.body.email) {
        // console.log('Email:',req.body);
        return res.send({ msg: 'New email not Provided' })
    }
    const id = req.business._id;

    const business = await Business.findByIdAndUpdate(id, { email: req.body.email }, { new: true }).exec();
    console.log(business);
    return res.send({ msg: 'Email Updated', Newemail: req.body.email });
}

export const validateRequest = async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || bearer.indexOf('Bearer ') == -1) {

        return res.status(401).send({ msg: "Bearer token missing" });
    }



    let token = bearer.split(' ')[1]


    let payload;

    try {
        payload = await verifyToken(token);

        const business = await Business.findById(payload.sub).select('-password').exec();


        if (!business) {
            return res.status(401).end();
        }

        req["business"] = business;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({ msg: "Bearer token not valid" });
    }
}

