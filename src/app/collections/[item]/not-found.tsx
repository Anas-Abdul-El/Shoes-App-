

function NotFound() {
    return (
        <main className="w-screen h-screen m-0 p-0 box-border overflow-x-hidden flex justify-center items-center ">
            <div>
                <h1 className="text-3xl font-bold text-red-400">Item Not Found</h1>
                <p className="mt-4">The item you are looking for does not exist.</p>
            </div>
        </main>
    )
}

export default NotFound