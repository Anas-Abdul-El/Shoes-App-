import ButtonToCollection from "./Button-to-collection";


function HeroSection() {
    return (
        <section className="relative top-20 h-8/10 w-9/11 mx-auto flex flex-col justify-evenly ">
            <div className="flex flex-col justify-evenly lg:h-100 h-70">
                <h1 className="capitalize text-6xl sm:text-7xl lg:text-9xl font-bold">
                    Beyond
                    <br />
                    <span className="italic">Performance</span>
                </h1>
                <p className="text-xl max-w-120 text-gray-200">
                    Experience the future of footwear. Where cutting-edge technology meets uncompromising style.
                </p>
            </div>
            <ButtonToCollection />
        </section>
    )
}

export default HeroSection