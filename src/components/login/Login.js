import {Link, useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import {useState} from "react";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import _ from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useSnackbar} from "notistack";
import AuthService from "../../data-access/services/AuthService";

export const validateSchema = yup.object().shape({
    email: yup
        .string()
        .required("You Must Enter Email")
        .email("You Must Enter Valid Email"),
    password: yup
        .string()
        .required("You Must Enter Your Password")
        .min(4, "Password Must be At Least 4 Digit")
});

const defaultValues = {
    email : "",
    password : ""
}

export default function Login({login}) {
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = useState(false)
    const { control, formState, handleSubmit, reset } = useForm({
        mode: "onChange",
        defaultValues,
        resolver: yupResolver(validateSchema),
    });
    const { isValid, dirtyFields, errors } = formState;

    const onSubmit = async (values) => {
        // login(values)
        AuthService.login(values)
            .then((res)=> {
              if (res?.status_code === 200) {
                  enqueueSnackbar(res?.message, {variant: "success"})
              }
            })
            .catch((err)=> {
              enqueueSnackbar(err, {variant: "error"})
            })
    };

    return (
        <div className="w-full flex justify-center">
            <form
                name="loginForm"
                noValidate
                className="flex flex-col justify-center gap-4 w-[50%] px-0 md:px-20 mt-32"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-24"
                            label="Email"
                            // data-testid="email"
                            type="text"
                            autoComplete="off"
                            error={!!errors.email}
                            helperText={
                                errors?.email?.message || ""
                            }
                            inputProps={{ "data-testid": "email" }}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mb-24"
                            label="Password"
                            type="password"
                            error={!!errors.password}
                            helperText={
                                errors?.password?.message || ""
                            }
                            variant="outlined"
                            required
                            autoComplete="off"
                            fullWidth
                            inputProps={{ "data-testid": "password" }}
                        />
                    )}
                />

                <LoadingButton
                    variant="contained"
                    data-testid="login-btn"
                    color="success"
                    className=" w-full mt-16 rounded-4 button2 button-min-height"
                    aria-label="Log in"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                    size="large"
                    loading={loading}
                    loadingPosition="center"
                >
                    Login
                </LoadingButton>
            </form>
        </div>
    )
}