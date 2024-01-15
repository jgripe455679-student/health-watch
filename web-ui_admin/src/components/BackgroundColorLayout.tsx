interface Props {
    children: JSX.Element | JSX.Element[];
}

const BackgroundColorLayout = ({ children }: Props) => {
    return (
        <div className="bg-blue-gray-50">
            {children}
        </div>
    );
}

export default BackgroundColorLayout;