import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises";
import Workouts from "./pages/Workouts";
import Nutrition from "./pages/Nutrition";
import Progress from "./pages/Progress";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
                <Route path="/exercises" element={<ProtectedRoute> <Exercises /> </ProtectedRoute>} />
                <Route path="/workouts" element={<ProtectedRoute> <Workouts /> </ProtectedRoute>} />
                <Route path="/nutrition" element={<ProtectedRoute> <Nutrition /> </ProtectedRoute>} />
                <Route path="/progress" element={<ProtectedRoute> <Progress /> </ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;