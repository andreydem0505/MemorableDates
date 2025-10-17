import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllEvents from "./components/AllEvents.jsx";
import Event from "./components/Event.jsx";
import Mark from "./components/Mark.jsx";

export default function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<AllEvents />} />
                    <Route path="/events/:id" element={<Event />} />
                    <Route path="/marks/:id" element={<Mark />} />
                </Routes>
            </div>
        </Router>
    );
}