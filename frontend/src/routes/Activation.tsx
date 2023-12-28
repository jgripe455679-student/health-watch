import { FC } from "react";
import { Typography } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Activation: FC = () => {
    const location = useLocation();
    return (
        <div className="w-full h-full grid grid-cols-1 place-items-center p-4 gap-4">
            <FontAwesomeIcon className="h-12" color="green" icon={faEnvelopeCircleCheck} />
            <Typography variant="h4">Activation Email Sent!</Typography>
            <Typography variant="small">We have sent an activation email to <p className="font-semibold inline-block">{location.state.email}</p>. Please check your inbox and click on the link provided to activate your account.</Typography>
            <Typography variant="small">If you can't find the email, please check your spam or junk folder as sometimes the message may get filtered there.</Typography>
            <Typography variant="small">If you did not receive the email or have any trouble activating, contact our support team at <p className="italic inline-block">support@dev.com</p> and we will assist you promptly. <Link className="text-green-900 hover:underline" to="../../signin">Sign in</Link></Typography>
        </div>
    );
}

export default Activation;