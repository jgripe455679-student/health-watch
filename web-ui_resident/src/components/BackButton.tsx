import { FC, MouseEventHandler } from "react";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface BackButtonProps {
    onClick?: MouseEventHandler<HTMLElement> | undefined;
}

const BackButton: FC<BackButtonProps> = ({ onClick }) => {
    return (
        <Button type="button" className="!absolute top-0 left-0 mt-4 ml-3 flex items-center gap-3 rounded-full" variant="text" color="gray" size="sm" onClick={onClick}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
            </Button>
    );
}

export default BackButton;