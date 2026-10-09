import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises";
import Workouts from "./pages/Workouts";
import Nutrition from "./pages/Nutrition";
import Progress from "./pages/Progress";
import ExerciseDetails from "./pages/ExerciseDetails";
import WorkoutDetails from "./pages/WorkoutDetails";
import WorkoutSession from "./pages/WorkoutSession";
import SessionDetails from "./pages/SessionDetails";
import Sessions from "./pages/Sessions";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/workouts" element={<Workouts />} />
                    <Route path="/nutrition" element={<Nutrition />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/sessions" element={<Sessions />} />

                    <Route path = "/exercises/:id" element = {<ExerciseDetails />} />
                    <Route path = "/workouts/:id" element = {<WorkoutDetails />} />
                    <Route path="/workouts/:id/session" element={<WorkoutSession />} />
                    <Route path="/workouts/session/:sessionId" element={<SessionDetails />} />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;