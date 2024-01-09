import { useNavigate } from "react-router-dom";
import { Input, Typography, Button } from "@material-tailwind/react";

const SignIn = () => {
    const navigate = useNavigate();
    const createAccount = (): void => {
        const path = `/signup/basic`;
        navigate(path);
    }
    return (
        <div className="w-4/5 h-full grid grid-cols-1 gap-4">
            <Typography variant="h3">Sign in</Typography>
            <Input color="green" variant="outlined" label="Email" type="email" size="md" />
            <Input color="green" variant="outlined" label="Password" type="password" size="md" />
            <div className="flex justify-between">
                <Button className="rounded-full" variant="text" size="sm" color="green" onClick={createAccount}>Create account</Button>
                <Button className="rounded-full" variant="filled" size="sm" color="green">Sign in</Button>
            </div>
        </div>
    );
}

export default SignIn;