import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Home from "./routes/Home";

function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Coins/>
            <Routes>
                <Route path="/:coinId/*" element={<Coin />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
