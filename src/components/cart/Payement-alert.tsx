import { CheckCircle2Icon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"


function PayementAlert() {
    // Simple success alert shown after a successful checkout.
    return (
        <Alert className="dark w-100 absolute animate">
            <CheckCircle2Icon />
            <AlertTitle>Checkout successful</AlertTitle>
            <AlertDescription>
                Thank you! for your purchase. A receipt has been sent to
                your email address.
            </AlertDescription>
        </Alert>
    )
}

export default PayementAlert