import { useEffect, useRef, useState } from "react"


const useOutsideClick = () => {

    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target) && isVisible) {
                setVisible(false);
            }
        }
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, [ref, isVisible, setVisible])


    return [ref, isVisible, setVisible]
}

export default useOutsideClick;
