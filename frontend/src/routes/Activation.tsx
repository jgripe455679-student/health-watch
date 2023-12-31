import { FC, useContext } from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import NewUserContext from "../components/AuthContext";
import type { NewUserContextType } from "../@types/auth";

const Activation: FC = () => {
    const { newUser } = useContext(NewUserContext) as NewUserContextType;
    return (
        <div className="w-full h-full grid grid-cols-1 place-items-center p-4 gap-4">
            <FontAwesomeIcon className="h-12" color="green" icon={faEnvelopeCircleCheck} />
            <Typography variant="h4">Activation Email Sent!</Typography>
            <Typography variant="small">We have sent an activation email to <span className="font-semibold">{newUser.email}</span>. Please check your inbox and click on the link provided to activate your account.</Typography>
            <Typography variant="small">If you can't find the email, please check your spam or junk folder as sometimes the message may get filtered there.</Typography>
            <Typography variant="small">If you did not receive the email or have any trouble activating, contact our support team at <span className="italic">support@dev.com</span> and we will assist you promptly. <Link className="text-green-900 hover:underline" to="../../signin">Sign in</Link></Typography>
        </div>
    );
}

export default Activation;