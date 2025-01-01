import { onAuthnticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
    const auth = await onAuthnticateUser()
    if (auth.status === 200 || auth.status === 201) {
        return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`)
    }
    if (auth.status === 400 || auth.status === 404 || auth.status === 500) {
        return redirect('/auth/sign-in')
    }
    return (
        <div>Dashboard</div>
    )
}

export default AuthCallbackPage