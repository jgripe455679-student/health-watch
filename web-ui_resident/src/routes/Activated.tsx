import { Typography } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Activated: FC = () => {
    const { uid, token } = useParams();
    const [status, setStatus] = useState("");
    const client = axios.create({
        baseURL: "http://localhost:8000/api/v1/users/activation/"
    });
    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await client.post("", {
                    uid: uid,
                    token: token
                });
                setStatus(response.statusText);
            } catch (err) {
                console.error(err);
            }
        }
        activateAccount();
    }, [])
    return (
        <div className="w-11/12 h-full grid grid-cols-1 place-items-center gap-4">
            <Typography variant="h4">{status ? "Account Activated" : "Account Not Activated"}</Typography>
            {status ? <div className="flex items-center space-x-1">
                <Typography variant="small">Your account is now activated.</Typography>
                <Link className="text-green-900 hover:underline" to="/signin">Sign in</Link>
            </div> : <Typography variant="small">If you did not receive the email or have any trouble activating, contact our support team at <span className="italic">support@dev.com</span> and we will assist you promptly.</Typography>}
        </div>
    );
}

export default Activated;