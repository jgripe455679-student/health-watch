import { Typography } from "@material-tailwind/react";
import { FC } from "react";
import { useRouteError } from "react-router-dom";

const Error: FC = () => {
    const error: any = useRouteError();
    return (
        <div className="grid place-items-center min-h-screen">
            <div className="w-1/2 h-3/4 grid grid-cols-1 place-items-center content-center gap-3">
            <Typography variant="h3">Oops!</Typography>
            <Typography variant="paragraph">
                Something went wrong on our end and we couldn't complete your request. Our team has been notified to look into this issue. Please try again later or contact us if the problem persists. We apologize for the inconvenience.
            </Typography>
            <Typography variant="small"><i>{error.statusText || error.message}</i></Typography>
        </div>
        </div>
    );
}

export default Error;
