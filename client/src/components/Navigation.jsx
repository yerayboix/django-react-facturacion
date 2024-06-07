import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div>
            <Link to="/books" style={{ textDecoration: 'none' }}>
                <h1 style={{ fontFamily: 'Britney-Bold', color: 'brown', display: 'flex', justifyContent: 'center' }}>
                    ALMACÉN WTT
                </h1>
            </Link>
        </div>
    )
}
