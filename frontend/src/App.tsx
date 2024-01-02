import { Routes, Route } from "react-router-dom";
import AuthLayout from './components/AuthLayout'
import SignIn from './routes/SignIn'
import Basic from './routes/Basic'
import Address from './routes/Address'
import Error from './routes/Error'
import Credential from './routes/Credential'
import Activation from './routes/Activation'
import SignUp from './routes/SignUp'

export default function App() {
    return (
        <Routes>
            <Route element={<AuthLayout />} errorElement={<Error />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />}>
                    <Route path="basic" element={<Basic />} />
                    <Route path="address" element={<Address />} />
                    <Route path="credential" element={<Credential />} />
                    <Route path="activate" element={<Activation />} />
                </Route>
            </Route>
        </Routes>
    );
}