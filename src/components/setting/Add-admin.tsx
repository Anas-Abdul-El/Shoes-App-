import { SignInForm } from '../auth/sign-in-form'

function AddAdmin() {
    // Small wrapper that renders the sign-up form preconfigured to create
    // an `ADMIN` user. Keeps the intent explicit at the call-site.
    return (<>
        <SignInForm role="ADMIN" />
    </>
    )
}

export default AddAdmin