import React from "react";
import { Link } from "react-router-dom";

const Funny404: React.FC = () => {
    return (
        <div style={styles.container}>
            <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                style={styles.svg}
            >
                {/* Corpo do robô */}
                <rect
                    x="50"
                    y="60"
                    width="100"
                    height="100"
                    fill="#b0bec5"
                    stroke="#263238"
                    strokeWidth="3"
                />

                {/* Cabeça do robô */}
                <rect
                    x="70"
                    y="20"
                    width="60"
                    height="40"
                    fill="#b0bec5"
                    stroke="#263238"
                    strokeWidth="3"
                />

                {/* Olhos do robô */}
                <circle cx="85" cy="35" r="5" fill="#263238" />
                <circle cx="115" cy="35" r="5" fill="#263238" />

                {/* Boca do robô */}
                <rect x="85" y="50" width="30" height="5" fill="#263238" />

                {/* Antena do robô */}
                <line
                    x1="100"
                    y1="20"
                    x2="100"
                    y2="10"
                    stroke="#263238"
                    strokeWidth="3"
                />
                <circle cx="100" cy="10" r="5" fill="#f44336" />

                {/* Braços do robô */}
                <rect
                    x="20"
                    y="60"
                    width="20"
                    height="60"
                    fill="#b0bec5"
                    stroke="#263238"
                    strokeWidth="3"
                />
                <rect
                    x="160"
                    y="60"
                    width="20"
                    height="60"
                    fill="#b0bec5"
                    stroke="#263238"
                    strokeWidth="3"
                />

                {/* Pernas do robô */}
                <rect
                    x="70"
                    y="160"
                    width="20"
                    height="20"
                    fill="#b0bec5"
                    stroke="#263238"
                    strokeWidth="3"
                />
                <rect
                    x="110"
                    y="160"
                    width="20"
                    height="20"
                    fill="#b0bec5"
                    stroke="#263238"
                    strokeWidth="3"
                />

                {/* Mensagem engraçada */}
                <text
                    x="50%"
                    y="195"
                    fontSize="16"
                    textAnchor="middle"
                    fill="#263238"
                    fontFamily="Arial, sans-serif"
                >
                    Onde está minha página?
                </text>
            </svg>
            <p style={styles.message}>
                Ops! A página que você está procurando não existe.
            </p>
            <Link to="/">Retornar para a página inicial</Link>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
    },
    svg: {
        maxWidth: "100%",
        height: "auto",
    },
    message: {
        marginTop: "20px",
        fontSize: "18px",
        color: "#263238",
    },
};

export default Funny404;
