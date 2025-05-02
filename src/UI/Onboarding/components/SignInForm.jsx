import Link from "next/link";

export default function SignInForm() {
    return (
        <form
            action=""
            className="w-full h-full md:w-fit "
        >
            <div>
                <label
                    htmlFor="Email"
                    className="text-sm"
                >
                    Email
                </label>

                <input
                    type="email"
                    name="Email"
                    id="Email"
                    placeholder="Email address"
                    className="block p-3 pl-4 mt-1 border border-gray-400 rounded-md w-full md:w-[360px] opacity-50"
                />
            </div>

            <div className="mt-6">
                <label
                    htmlFor="Password"
                    className="text-sm"
                >
                    Password
                </label>

                <input
                    type="password"
                    name="Password"
                    id="Password"
                    placeholder="Password address"
                    className="block p-3 pl-4 mt-1 border border-gray-400 rounded-md w-full md:w-[360px] opacity-50"
                />
            </div>

            <Link
                href="#"
                className="block w-full mt-2 text-sm text-end text-complementary"
            >
                Forgot Password?
            </Link>

            <button className="w-full mt-6 btn-primary">Login</button>
        </form>
    )
}
