import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Login from './Login';
import {act} from "react-dom/test-utils";
import AuthService from "../../data-access/services/AuthService";

const mockLogin = jest.fn((email, password) => {
    return Promise.resolve({ email, password })
})

const mockSubmit = jest.fn();

describe("Login", ()=> {

    describe("Email Field", ()=> {
        test('renders email field', () => {
            render(<Login />);
            const emailField = screen.getByTestId("email")
            expect(emailField).toBeInTheDocument();
        });

        test('renders invalid email error', async () => {
            const {getByTestId, container} = render(<Login />)

            await act(async ()=> {
                const emailInput = getByTestId("email")
                fireEvent.change(emailInput, {target : { value : "jksutradhor"}})
                fireEvent.blur(emailInput)
            })

            expect(container.innerHTML).toMatch("You Must Enter Valid Email")
        });

        test('renders email error', async () => {
            const {getByTestId, container} = render(<Login />)

            await act(async ()=> {
                const emailInput = getByTestId("email")
                fireEvent.change(emailInput, {target : { value : "jk"}})
                fireEvent.change(emailInput, {target : { value : ""}})
                fireEvent.blur(emailInput)
            })
            expect(container.innerHTML).toMatch("You Must Enter Email")
        });
    })

    describe("Password Field", ()=> {
        test('renders password field', () => {
            render(<Login />);
            const passwordField = screen.getByTestId("password")
            expect(passwordField).toBeInTheDocument();
        });

        test('renders password required', async () => {
            const {getByTestId, container} = render(<Login />)

            await act(async ()=> {
                const passwordInput = getByTestId("password")
                fireEvent.change(passwordInput, {target : { value : "jk"}})
                fireEvent.change(passwordInput, {target : { value : ""}})
                fireEvent.blur(passwordInput)
            })
            expect(container.innerHTML).toMatch("You Must Enter Your Password")
        });

        test('renders password validation', async () => {
            const {getByTestId, container} = render(<Login />)

            await act(async ()=> {
                const passwordInput = getByTestId("password")
                fireEvent.change(passwordInput, {target : { value : "jks"}})
                fireEvent.blur(passwordInput)
            })

            expect(container.innerHTML).toMatch("Password Must be At Least 4 Digit")
        });
    })

    describe("Login Button", ()=> {
        test('renders login button', () => {
            render(<Login />);
            const loginBtn = screen.getByTestId("login-btn")
            expect(loginBtn).toBeInTheDocument();
        });

        test("disable login button while invalid email", ()=> {
            render(<Login />);
            const emailField = screen.getByTestId("email")
            const loginBtn = screen.getByTestId("login-btn")
            fireEvent.change(emailField, {target : {value : "jks@"}})
            fireEvent.blur(emailField)
            expect(loginBtn).toBeDisabled()
        })

        test("disable login button while unsatisfied password", ()=> {
            render(<Login />);
            const passwordField = screen.getByTestId("password")
            const loginBtn = screen.getByTestId("login-btn")
            fireEvent.change(passwordField, {target : {value : "jks"}})
            fireEvent.blur(passwordField)
            expect(loginBtn).toBeDisabled()
        })
    })

    describe("Login Action", ()=> {
        test("Login Success", async ()=> {
            const {getByTestId, container} = render(<Login  login={mockLogin}/>)
            await act(async ()=> {
                const emailInput = getByTestId("email")
                fireEvent.change(emailInput, {target : { value : "jks@jk.com.bd"}})
                const passwordInput = getByTestId("password")
                fireEvent.change(passwordInput, {target : { value : "joni"}})
                const loginBtn = getByTestId("login-btn")
                fireEvent.submit(loginBtn)
            })
            expect(mockLogin).toBeCalled()
        })
    })

})
