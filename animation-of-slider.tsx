"use client";
import { useEffect, useState } from "react";

const cards = [
    { title: "Card 1", content: "This is the content of card one." },
    { title: "Card 2", content: "This is the content of card two." },
    { title: "Card 3", content: "This is the content of card three." },
];

export default function Home() {
    const [index, setIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const transitionTime = 700;

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevIndex(index);
            setDirection("forward");
            setIndex((prev) => (prev + 1) % cards.length);
        }, 9000);

        return () => clearInterval(interval);
    }, [index]);

    useEffect(() => {
        if (prevIndex !== null) {
            const timer = setTimeout(() => setPrevIndex(null), transitionTime);
            return () => clearTimeout(timer);
        }
    }, [prevIndex]);

    const slideIn = direction === "forward" ? "slide-in-right" : "slide-in-left";
    const slideOut = direction === "forward" ? "slide-out-left" : "slide-out-right";

    return (
        <div className="p-2 w-screen h-screen flex justify-center items-center">

            <div className="relative w-10/11 md:h-10/11 h-1/5 overflow-hidden">
                {prevIndex !== null && (
                    <Card
                        key={prevIndex}
                        title={cards[prevIndex].title}
                        content={cards[prevIndex].content}
                        animation={`${slideOut} ${transitionTime}ms cubic-bezier(0.4,0,0.2,1)`}
                        zIndex={20}
                    />
                )}
                <Card
                    key={index}
                    title={cards[index].title}
                    content={cards[index].content}
                    animation={prevIndex !== null ? `${slideIn} ${transitionTime}ms cubic-bezier(0.4,0,0.2,1)` : "none"}
                    zIndex={30}
                />
                <style jsx>{`
        @keyframes slide-in-right { from { transform: translateX(100%); opacity:0 } to { transform: translateX(0); opacity:1 } }
        @keyframes slide-in-left { from { transform: translateX(-100%); opacity:0 } to { transform: translateX(0); opacity:1 } }
        @keyframes slide-out-left { from { transform: translateX(0); opacity:1 } to { transform: translateX(-100%); opacity:0 } }
        @keyframes slide-out-right { from { transform: translateX(0); opacity:1 } to { transform: translateX(100%); opacity:0 } }
      `}</style>
            </div>
        </div>
    );
}

function Card({ title, content, animation, zIndex }: any) {
    return (
        <div
            className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center rounded-xl shadow-lg p-8 bg-card text-card-foreground"
            style={{ animation, zIndex }}
        >
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p>{content}</p>
        </div>
    );
}