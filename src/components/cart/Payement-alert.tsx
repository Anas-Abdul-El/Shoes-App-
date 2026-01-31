import { CheckCircle2Icon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"


function PayementAlert() {
    return (
        <Alert className="dark w-100 absolute animate">
            <CheckCircle2Icon />
            <AlertTitle>Checkout successful</AlertTitle>
            <AlertDescription>
                Your payment of $29.99 has been processed. A receipt has been sent to
                your email address.
            </AlertDescription>
        </Alert>
    )
}

export default PayementAlert