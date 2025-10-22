import React, { useState, useEffect } from 'react';
import { Home, Dumbbell, BarChart3, Utensils, Settings, LogOut, Heart, Search, Zap, User, Plus, Edit, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
// --- VIBRANT DARK THEME COLORS ---
const colors = {
    bgBase: '#bdacddff', // Deepest background - Darker than original to enhance contrast
    bgCard: 'rgba(22, 10, 24, 0.95)', // Card background
    textPrimary: '#eec3f0ff', // Light purple for primary text/titles
    textSecondary: '#fffcfcff', // White for secondary text
    purple: '#e9dae9ff', // Light accent purple
    purpleDark: '#7e22ce', // Darker purple for backgrounds/details
    purpleGlow: 'rgba(255, 0, 255, 0.6)', // Vibrant magenta glow color
    red: '#f87171',
    yellow: '#facc15',
    blue: '#60a5fa',
    grayBorder: 'rgba(241, 238, 238, 0.15)', // Made border lighter for contrast
    grayBgHover: 'rgba(240, 227, 240, 0.15)',
};

// --- GLOBAL STYLES (NO BACKGROUND IMAGE) ---
const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
    }

    body {
        background-color: ${colors.bgBase}; /* Solid dark background */
        color: ${colors.textPrimary};
        line-height: 1.5;
        min-height: 100vh;
    }
    
    .dashboard-container {
        display: flex;
        min-height: 100vh;
        width: 100%;
    }

    /* --- SIDEBAR STYLES --- */
    .sidebar {
        display: none; 
        flex-direction: column;
        justify-content: space-between;
        width: 350px;
        min-width: 250px;
        background-color: rgba(22, 1, 33, 0.98); 
        border-right: 1px solid ${colors.grayBorder}; 
        padding: 35px;
        box-shadow: 4px 0 10px rgba(0, 0, 0, 0.6);
        position: sticky;
        top: 0;
        height: 100vh;
        z-index: 10;
        flex-shrink: 0;
    }

   .nav-link {
        display: flex;
        align-items: center;
        padding: 15px;
        border-radius: 12px;
        transition: all 0.2s;
        margin-bottom: 8px;
        text-decoration: none;
        color: ${colors.textSecondary};
        cursor: pointer;
    }

    .nav-link:hover {
        background-color: ${colors.grayBgHover};
        color: ${colors.purple};
    }
    
    .nav-link.active {
        background-color: ${colors.purpleDark};
        border: 1px solid ${colors.purpleGlow};
        color: ${colors.textPrimary};
        font-weight: 600;
        box-shadow: 0 0 10px ${colors.purpleGlow}50;
        transform: scale(1.01);
        color: ${colors.textPrimary} !important;
    }



    .main-content {
        flex-grow: 1;
        padding: 20px;
        overflow-x: hidden;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
    }

    .workouts-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        margin-bottom: 2px;
    }
    
    .add-form-container {
        margin-bottom: 10px;
    }

    /* --- CARD STYLES --- */
    .card {
        background-color: ${colors.bgCard};
        padding: 24px;
        border-radius: 16px;
        border: 1px solid ${colors.grayBorder};
        transition: transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 0 15px rgba(255, 0, 255, 0.1), 0 4px 10px rgba(0, 0, 0, 0.5);
    }
    
    .card-hover:hover { 
        transform: translateY(-4px);
        box-shadow: 0 0 25px ${colors.purpleGlow}50, 0 8px 20px rgba(0, 0, 0, 0.7);
    }

    /* --- FORM STYLES --- */
    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
        font-size: 16px;
        color: ${colors.purple};
    }
    
    .form-group input, .form-group select {
        width: 100%;
        padding: 12px;
        border: 1px solid ${colors.purpleDark};
        border-radius: 8px;
        background-color: ${colors.grayBgHover}; 
        color: ${colors.textPrimary};
        transition: border-color 0.2s;
    }

    .form-group select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding-right: 2em;
    }

    .form-group option {
        background-color: ${colors.bgCard}; 
        color: ${colors.textPrimary};
    }
    
    .form-group input:focus, .form-group select:focus {
        border-color: ${colors.purpleGlow};
        outline: none;
        box-shadow: 0 0 5px ${colors.purpleGlow};
    }

    /* --- BUTTON STYLES --- */
    .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(90deg, ${colors.purpleDark} 0%, ${colors.purpleGlow} 100%);
        color: white;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 15px rgba(255, 0, 255, 0.4);
        display: inline-flex;
        align-items: center;
        gap: 8px;
        width: fit-content;
       
    }

    .btn:hover {
        opacity: 0.9;
        transform: translateY(-1px);
    }
    
    /* Responsive Grid Adjustments */
    @media (min-width: 640px) {
        .workouts-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .sidebar {
            display: flex;
        }
        /* Desktop: 3 columns for better use of space */
        .workouts-grid {
            grid-template-columns: repeat(3, 1fr);
        }
        .main-content {
            padding: 32px;
        }
    }
`;

// --- Utility Components ---

const Sidebar = ({ activePage }) => (
    <div className="sidebar">
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', paddingBottom: '16px', borderBottom: '1px solid ' + colors.grayBorder }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(45deg, ${colors.purpleDark}, ${colors.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px ' + colors.purpleGlow }}>
                    <Heart size={20} color="white" />
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: '800' }}>FitSphere</h1>
            </div>
             <nav>
                <Link to="/dashboard" className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}>
                    <Home size={20} style={{ marginRight: '12px' }} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/workout" className={`nav-link ${activePage === 'workout' ? 'active' : ''}`}>
                    <Dumbbell size={20} style={{ marginRight: '12px' }} />
                    <span>Workout Plans</span>
                </Link>
            
                <Link to="/nutrition" className={`nav-link ${activePage === 'nutrition' ? 'active' : ''}`}>
                    <Utensils size={20} style={{ marginRight: '12px' }} />
                    <span>Nutrition Tracker</span>
                </Link>
                 <Link to="/progress" className={`nav-link ${activePage === 'progress' ? 'active' : ''}`}>
                    <BarChart3 size={20} style={{ marginRight: '12px' }} />
                    <span>Progress & Stats</span>
                </Link>
                <Link to="/settings" className={`nav-link ${activePage === 'settings' ? 'active' : ''}`}>
                    <Settings size={20} style={{ marginRight: '12px' }} />
                    <span>Settings</span>
                </Link>
            </nav>
        </div>
        <div style={{ paddingTop: '16px', borderTop: '1px solid ' + colors.grayBorder }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: colors.grayBgHover, borderRadius: '12px', border: '1px solid ' + colors.purpleGlow, boxShadow: '0 0 5px ' + colors.purpleGlow }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: colors.purpleDark, borderRadius: '50%', marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={18} color="white" />
                </div>
                <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: colors.textPrimary }}>Guest User</p>
                    <span style={{ fontSize: '11px', color: colors.purple }}>ID: GUEST-ABC123</span>
                </div>
            </div>
            <div className="nav-link" style={{ marginTop: '10px', justifyContent: 'center', backgroundColor: colors.red + '20', color: colors.red }}>
                <LogOut size={20} style={{ marginRight: '8px' }} />
                <span>Logout</span>
            </div>
        </div>
    </div>
);

const Header = () => (
    <header className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', padding: '24px', border: `1px solid ${colors.grayBorder}` }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px', color: colors.purple }}>Workout Plans Library</h1>
        <p style={{ color: colors.textSecondary, marginBottom: '20px', maxWidth: '800px' }}>Manage, create, and customize all your exercises here. Drag and drop exercises into your daily log to start a session.</p>
        <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
                <input type="text" placeholder="Search Exercises, e.g., 'Deadlift' or 'Chest'" style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '9999px', border: '1px solid ' + colors.purpleDark, backgroundColor: colors.bgCard, color: colors.textPrimary, boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.6)' }} />
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.purpleGlow }} />
            </div>
        </div>
    </header>
);

// Utility function to get style based on difficulty
const getDifficultyStyle = (difficulty) => {
    switch(difficulty) {
        case 'Easy': return { color: colors.blue, bg: colors.blue + '30' };
        case 'Hard': return { color: colors.red, bg: colors.red + '30' };
        default: return { color: colors.yellow, bg: colors.yellow + '30' }; // Medium
    }
}

const WorkoutCard = ({ exercise, onEdit, onDelete, onStart }) => {
    const diffStyle = getDifficultyStyle(exercise.difficulty || 'Medium');

    return (
        <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: colors.purple, textShadow: '0 0 5px rgba(255, 255, 255, 0.2)' }}>{exercise.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {/* Sets/Reps Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', borderRadius: '4px', backgroundColor: colors.purpleDark, color: colors.textPrimary, fontSize: '12px', fontWeight: '600' }}>
                            <Dumbbell size={14} color={colors.yellow} />
                            {exercise.sets}x{exercise.reps}
                        </div>
                        {/* Difficulty Badge (NEW) */}
                        <div style={{ display: 'flex', alignItems: 'center', padding: '4px 8px', borderRadius: '4px', backgroundColor: diffStyle.bg, color: diffStyle.color, fontSize: '12px', fontWeight: '600', border: `1px solid ${diffStyle.color}` }}>
                            <Zap size={14} /> {exercise.difficulty || 'Medium'}
                        </div>
                    </div>
                </div>
                <p style={{ fontSize: '14px', color: colors.textSecondary, marginBottom: '16px', minHeight: '40px' }}>{exercise.description || "No detailed description provided."}</p>
            </div>

            <div style={{ borderTop: `1px solid ${colors.grayBorder}`, paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button title="Edit Exercise" onClick={() => onEdit(exercise)} 
                            style={{ padding: '8px', background: colors.grayBgHover, border: `1px solid ${colors.blue}`, borderRadius: '6px', color: colors.blue, cursor: 'pointer', transition: 'background-color 0.2s' }}>
                        <Edit size={16} />
                    </button>
                    <button title="Delete Exercise" onClick={() => onDelete(exercise.id)} 
                            style={{ padding: '8px', background: colors.grayBgHover, border: `1px solid ${colors.red}`, borderRadius: '6px', color: colors.red, cursor: 'pointer', transition: 'background-color 0.2s' }}>
                        <Trash2 size={16} />
                    </button>
                </div>
                
                <button onClick={() => onStart(exercise)} className="btn" style={{ padding: '10px 16px', fontSize: '14px', borderRadius: '9999px' }}>
                    <Zap size={16} /> Start
                </button>
            </div>
        </div>
    );
};

// --- Modal Component ---
const CustomModal = ({ isOpen, title, message, onClose, onConfirm, showConfirm = false }) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(5px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '30px', border: `2px solid ${colors.purpleGlow}`, boxShadow: `0 0 20px ${colors.purpleGlow}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.grayBorder}`, paddingBottom: '10px', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '700', color: colors.purple }}>{title}</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>
                <p style={{ color: colors.textSecondary, marginBottom: '25px' }}>{message}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                    <button onClick={onClose} 
                            style={{ padding: '10px 20px', borderRadius: '8px', background: colors.grayBgHover, color: colors.textSecondary, border: `1px solid ${colors.grayBorder}`, fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}>
                        {showConfirm ? 'Cancel' : 'Close'}
                    </button>
                    {showConfirm && (
                        <button onClick={onConfirm} className="btn" style={{ background: colors.red, boxShadow: '0 4px 15px rgba(248, 113, 113, 0.4)' }}>
                            Confirm Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Add/Edit Form Component ---
const AddWorkoutForm = ({ onAdd, onEdit, editingExercise, setEditingExercise, onMessage }) => {
    const isEditing = !!editingExercise;
    const [form, setForm] = useState({ 
        name: '', 
        description: '', 
        sets: 3, 
        reps: 12, 
        difficulty: 'Medium', // NEW: Added difficulty
        ...editingExercise 
    });

    useEffect(() => {
        // Populate form when an exercise is selected for editing
        setForm({ name: '', description: '', sets: 3, reps: 12, difficulty: 'Medium', ...editingExercise });
    }, [editingExercise]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, sets, reps } = form;
        if (!name || !sets || !reps) {
            return onMessage('Validation Error', 'Please ensure the exercise name, sets, and reps are all filled out.', false);
        }

        const payload = { 
            ...form, 
            sets: parseInt(sets), 
            reps: isNaN(parseInt(reps)) ? reps : parseInt(reps), // Handle 'Max' or numbers
            id: isEditing ? form.id : Date.now() 
        };

        if (isEditing) {
            onEdit(payload);
            onMessage('Success', `Exercise "${name}" updated successfully.`, false);
        } else {
            onAdd(payload);
            onMessage('Success', `New exercise "${name}" added to your plan.`, false);
        }
        setEditingExercise(null);
        setForm({ name: '', description: '', sets: 3, reps: 12, difficulty: 'Medium' });
    };

    return (
        <div className="card" style={{ border: isEditing ? `2px dashed ${colors.yellow}` : `1px solid ${colors.grayBorder}`, boxShadow: isEditing ? `0 0 15px ${colors.yellow}70` : undefined }}>
            <h2 style={{ color: colors.purple, fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>{isEditing ? `Editing: ${editingExercise?.name}` : 'Add New Exercise'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Exercise Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                        <label>Sets *</label>
                        <input type="number" required min="1" value={form.sets} onChange={(e) => setForm({ ...form, sets: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Reps * (Use 'Max' for bodyweight)</label>
                        {/* Use text input to allow 'Max' or numbers */}
                        <input type="text" required value={form.reps} onChange={(e) => setForm({ ...form, reps: e.target.value })} />
                    </div>
                    {/* NEW: Difficulty Selection in the grid */}
                    <div className="form-group">
                        <label>Difficulty Level</label>
                        <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button type="submit" className="btn" style={{ flexGrow: 1 }}>
                        {isEditing ? <Edit size={18} /> : <Plus size={18} />}
                        {isEditing ? 'Save Changes' : 'Add Exercise'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={() => setEditingExercise(null)} 
                                style={{ padding: '12px 20px', border: '1px solid', borderRadius: '8px', background: colors.bgBase, color: colors.red, fontWeight: '700', cursor: 'pointer', transition: 'background-color 0.2s' }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

// --- Main Workout Component (Renamed to App) ---
const App = () => {
    const [workouts, setWorkouts] = useState([
        { id: 1, name: 'Barbell Squat', description: 'Compound movement for leg strength and size.', sets: 4, reps: 8, difficulty: 'Hard' },
        { id: 2, name: 'Bench Press (Dumbbells)', description: 'Excellent for chest development and stability.', sets: 3, reps: 10, difficulty: 'Medium' },
        { id: 3, name: 'Overhead Press (OHP)', description: 'Develops shoulder strength and core stability.', sets: 3, reps: 12, difficulty: 'Hard' },
        { id: 4, name: 'Pull-ups', description: 'Bodyweight exercise for back width and grip strength.', sets: 3, reps: 'Max', difficulty: 'Easy' },
        { id: 5, name: 'Barbell Deadlift', description: 'Total body posterior chain developer.', sets: 3, reps: 5, difficulty: 'Hard' },
        { id: 6, name: 'Bicep Curl', description: 'Isolation movement for arm peak development.', sets: 4, reps: 15, difficulty: 'Medium' },
    ]);
    const [editingExercise, setEditingExercise] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, title: '', message: '', confirmAction: null, showConfirm: false, targetId: null });

    // --- CRUD Operations ---
    const addWorkout = (newWorkout) => setWorkouts([...workouts, newWorkout]);
    
    const editWorkout = (updated) => setWorkouts(workouts.map(w => w.id === updated.id ? updated : w));

    const handleDeleteClick = (id) => {
        const exerciseToDelete = workouts.find(w => w.id === id);
        setModal({
            isOpen: true,
            title: 'Confirm Deletion',
            message: `Are you sure you want to delete the plan for "${exerciseToDelete.name}"? This action cannot be undone.`,
            confirmAction: () => deleteWorkout(id),
            showConfirm: true,
            targetId: id
        });
    };
    
    const deleteWorkout = (id) => {
        setWorkouts(workouts.filter(w => w.id !== id));
        closeModal();
        showMessage('Deleted', 'Exercise successfully removed from your plan.', false);
    };

    const handleStartWorkout = (exercise) => {
        showMessage('Workout Started', `Simulating start of session with ${exercise.name}. You would now be taken to the session log screen!`, false);
    };

    // --- Modal Handlers ---
    const closeModal = () => setModal({ isOpen: false, title: '', message: '', confirmAction: null, showConfirm: false, targetId: null });
    
    // Unified messaging handler for form alerts, starts, and simple confirmations
    const showMessage = (title, message, showConfirm = false, confirmAction = null, targetId = null) => {
        setModal({ isOpen: true, title, message, showConfirm, confirmAction, targetId });
    };


    return (
         <React.Fragment>
            <style>{globalStyles}</style>
            <div className="dashboard-container">
                <Sidebar activePage="workout" /> {/* Add this */}
                <main className="main-content">
                    <Header />
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
                        
                        {/* 1. Add/Edit Form */}
                        <div className="add-form-container">
                            <AddWorkoutForm 
                                onAdd={addWorkout} 
                                onEdit={editWorkout}
                                editingExercise={editingExercise}
                                setEditingExercise={setEditingExercise}
                                onMessage={showMessage}
                            />
                        </div>

                        {/* 2. Workout Cards Grid */}
                        <section>
                            {/* ENHANCEMENT: New header banner with black text for "Your Exercise Library" */}
                            <div style={{ 
                                background: `linear-gradient(90deg, ${colors.purpleGlow} 0%, ${colors.purple} 100%)`, 
                                borderRadius: '16px 16px 0 0', 
                                padding: '15px 24px',
                                marginBottom: '20px',
                                borderBottom: `2px solid ${colors.purpleGlow}`,
                                boxShadow: `0 4px 15px ${colors.purpleGlow}50`
                            }}>
                                <h2 style={{ 
                                    fontSize: '24px', 
                                    fontWeight: '800', 
                                    color: '#000000', 
                                    textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)' 
                                }}>
                                    Your Exercise Library ({workouts.length} total)
                                </h2>
                            </div>
                            
                            <div className="workouts-grid">
                                {workouts.map(workout => (
                                    <WorkoutCard 
                                        key={workout.id} 
                                        exercise={workout} 
                                        onEdit={setEditingExercise} 
                                        onDelete={handleDeleteClick} 
                                        onStart={handleStartWorkout}
                                    />
                                ))}
                                {workouts.length === 0 && (
                                    <p style={{ color: colors.textSecondary, gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                                        No exercises saved. Use the form above to add your first exercise!
                                    </p>
                                )}
                            </div>
                        </section>
                        
                    </div>
                </main>
            </div>
            
             <CustomModal 
                isOpen={modal.isOpen}
                title={modal.title}
                message={modal.message}
                onClose={closeModal}
                onConfirm={modal.confirmAction}
                showConfirm={modal.showConfirm}
            />
        </React.Fragment>
    );
};

export default App;
