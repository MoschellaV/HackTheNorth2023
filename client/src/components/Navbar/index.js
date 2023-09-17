import { React } from "react";
import logo from "../../DropModel-T.png";
import { useUserContext } from "../../context/UserContext";

export default function Navbar() {
    const { userData } = useUserContext();

    return (
        <header class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 bg-gray-800">
            <nav class=" w-full mx-2 px-2 flex items-center justify-between" aria-label="Global">
                <div class="flex items-center justify-between">
                    <a class="inline-flex items-center gap-x-2 text-xl font-semibold text-white" href="#">
                        <img class="w-10 h-auto text-white" src={logo} alt="Logo"></img>
                        DropModel
                    </a>
                    <div class="sm:hidden">
                        <button
                            type="button"
                            class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm bg-slate-900 hover:bg-slate-800 border-gray-700 text-gray-400 hover:text-white focus:ring-offset-gray-800"
                            data-hs-collapse="#navbar-image-and-text-2"
                            aria-controls="navbar-image-and-text-2"
                            aria-label="Toggle navigation"
                        >
                            <svg
                                class="hs-collapse-open:hidden w-4 h-4"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                />
                            </svg>
                            <svg
                                class="hs-collapse-open:block hidden w-4 h-4"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    id="navbar-image-and-text-2"
                    class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
                >
                    <div class="flex flex-col justify-center items-center gap-10 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
                        <a class="text-lg font-medium hover:text-blue-600 text-white" href="/train">
                            Train
                        </a>
                        <a class="text-lg font-medium text-white hover:text-blue-600" href="/your-models">
                            Your Models
                        </a>
                        {userData ? (
                            <a href="/logout">
                                <button
                                    type="button"
                                    class="text-white bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-4 font-medium rounded-lg text-md px-5 py-2.5 ease-in duration-100"
                                >
                                    Logout
                                </button>
                            </a>
                        ) : (
                            <>
                                <a class="text-lg font-medium text-white hover:text-blue-600" href="/login">
                                    Sign-in
                                </a>
                                <a href="/signup">
                                    <button
                                        type="button"
                                        class="text-white text-md bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-4 font-medium rounded-lg px-5 py-2.5 ease-in duration-100"
                                    >
                                        Register
                                    </button>
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
