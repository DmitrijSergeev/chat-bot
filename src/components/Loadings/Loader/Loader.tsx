import s from "./Loader.module.scss";
import {clsx} from "clsx";

type Loader = {
    className?: string;
};

export const Loader = (props: Loader) => {
    const {className} = props;
    const classNames = {
        loader: clsx(s.loader, className),
    };

    return <div className={classNames.loader}></div>;
};
