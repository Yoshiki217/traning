import {FC} from "react"

interface messageProps {
    message: string
}

export const Message: FC<messageProps> = (props) => {
    return (
        <>
            {
                props.message!=undefined && props.message!=""?
                <div className="alert alert-error shadow-lg">
                    <div>
                        <span>{props.message}</span>
                    </div>
                </div>
                :<></>
            }
            
        </>
    )
}