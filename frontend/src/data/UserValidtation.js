

import * as yup from 'yup';

export const userSchema= yup.object().shape({
    name:yup.string().required(),
    email:yup.string().email().required(),
    password:yup.string().min(4).max(9).required(),
    phone:yup.string().max(10).required(),
    address:yup.string().required(),
})
