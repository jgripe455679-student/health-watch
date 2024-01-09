import { FC, useContext, useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import NewUserContext from "../components/AuthContext";
import type { NewUserContextType } from "../@types/auth";
import axios from "axios";

const Activation: FC = () => {
    const { newUser } = useContext(NewUserContext) as NewUserContextType;
    const initialButtonText = "Resend";
    const initialCountdown = 120;
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [buttonText, setButtonText] = useState(initialButtonText);
    const [countdownTimer, setCountdownTimer] = useState(initialCountdown);
    const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
    const client = axios.create({
        baseURL: "http://localhost:8000/api/v1/users/resend_activation/"
    });
    useEffect(() => {
        if (countdownTimer <= 0) {
            clearInterval(intervalId);
            setButtonDisabled(!isButtonDisabled);
            setCountdownTimer(initialCountdown);
            setButtonText(initialButtonText);
        }
    }, [countdownTimer]);
    const handleOnClick = async () => {
        try {
            await client.post("", {
                email: newUser.email,
            });
            setButtonDisabled(!isButtonDisabled);
            setButtonText("Resent");
            const id = setInterval(() => {
                setCountdownTimer((prevSeconds) => prevSeconds - 1);
            }, 1000)
            setIntervalId(id);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="w-full h-full grid grid-cols-1 place-items-center p-4 gap-4">
            <FontAwesomeIcon className="h-12" color="green" icon={faEnvelopeCircleCheck} />
            <Typography variant="h4">Activation Email Sent!</Typography>
            <Typography variant="small">We have sent an activation email to <span className="font-semibold">{newUser.email}</span>. Please check your inbox and click on the link provided to activate your account.</Typography>
            <Typography variant="small">If you can't find the email, please check your spam or junk folder as sometimes the message may get filtered there.</Typography>
            <Typography variant="small">If you did not receive the email or have any trouble activating, contact our support team at <span className="italic">support@dev.com</span> and we will assist you promptly.</Typography>
            <div className="w-full p-1 flex justify-between">
                <div className="flex items-center space-x-1">
                    <Typography variant="small">Already Activated?</Typography>
                    <Link className="text-green-900 hover:underline" to="../../signin">Sign in</Link>
                </div>
                <Button disabled={isButtonDisabled} onClick={handleOnClick} type="button" variant="filled" size="sm" color="green">{countdownTimer !== initialCountdown ? buttonText + " (" + countdownTimer + ")" : buttonText}</Button>
            </div>
        </div>
    );
}

export default Activation;