import React from "react";

type DialogProps = {
    isOpen: boolean;
    closeModal: () => void;
    titleText: string;
    bodyMessage: string;
    selectedIds: Set<number>;
    entity: string;
    onPerformAction: (Ids: Set<number>) => Promise<void>;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, closeModal, titleText, bodyMessage, selectedIds, entity, onPerformAction }) => {
    return (
        <dialog open={isOpen} className="modal">
            <div className="modal-box rounded-none">
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeModal}
                    >
                        x
                    </button>
                </form>
                <div className="flex items-center gap-1.5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="#FF0000"
                        viewBox="0 0 512 512"
                    >
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                    </svg>
                    <span className="text-error">{titleText}</span>
                </div>
                <p className="my-2.5">
                    {bodyMessage} {selectedIds.size > 1 ? `the selected ${entity}s` : `this ${entity}`}
                </p>
                <div className="join flex justify-end gap-x-1.5">
                    <button
                        className="btn btn-sm btn-ghost rounded-none"
                        onClick={() => onPerformAction(selectedIds)}
                    >
                        Confirm
                    </button>
                    <button
                        className="btn btn-sm btn-ghost rounded-none"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default Dialog;