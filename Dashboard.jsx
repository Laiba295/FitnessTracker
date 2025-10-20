import React, { useRef, useEffect, useState } from 'react';
import { Home, Dumbbell, BarChart3, Utensils, Settings, LogOut, Heart, Search, Zap, Clock, Sun, User, Droplet } from 'lucide-react';

// --- CSS-IN-JS: STYLE OBJECTS AND GLOBAL STYLE BLOCK ---

// VIBRANT DARK THEME COLORS
const colors = {
    bgBase: '#bdacddff', // Deepest background
    bgCard: 'rgba(22, 10, 24, 0.9)', // Card background with slight transparency
    textPrimary: '#eec3f0ff',
    textSecondary: '#fffcfcff',
    // Theme Colors
    purple: '#e7dfe7ff', // Vibrant Magenta/Purple for main highlights
    purpleDark: '#7e22ce',
    purpleGlow: 'rgba(255, 0, 255, 0.6)', // For shadows/borders
    red: '#f87171',
    yellow: '#facc15',
    blue: '#60a5fa',
    green: '#4ade80',
    grayBorder: 'rgba(241, 238, 238, 0.88)',
    grayBgHover: 'rgba(240, 227, 240, 0.1)', // Light purple hover
};

// Global CSS Block (Jismein Media Queries aur classes hain)
const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
    }

    body {
        background-color: ${colors.bgBase};
        color: ${colors.textPrimary};
        line-height: 1.5;
        min-height: 100vh; 
        
        /* Background Image with Dark Overlay - Using provided asset image_3a926a.jpg */
        background-image: url('image_3a926a.jpg');
        background-size: cover;
        position: relative; /* For the overlay */
    }
    
    /* Dark Overlay for Readability */
    body::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(13, 0, 20, 0.8); /* Stronger dark overlay */
        z-index: -1;
    }

    /* --- DASHBOARD LAYOUT --- */
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
    }

    .nav-link:hover {
        background-color: ${colors.grayBgHover};
        color: ${colors.purple};
    }
    
    .nav-link.active {
        background-color: ${colors.purpleGlow};
        color: ${colors.textPrimary};
        font-weight: 600;
        box-shadow: 0 4px 15px ${colors.purpleGlow};
        transform: scale(1.01);
        color: ${colors.textPrimary} !important;
    }

    /* --- MAIN CONTENT STYLES --- */
    .main-content {
        flex-grow: 1;
        padding: 20px;
        overflow-x: hidden;
        width: 100%;
    }

    .stats-grid, .logs-grid, .charts-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        margin-bottom: 20px;
    }
    
    /* CARD STYLING with Faux-Gradient Border/Glow */
    .card {
        background-color: ${colors.bgCard};
        padding: 24px;
        border-radius: 16px;
        border: 1px solid ${colors.grayBorder}; 
        transition: transform 0.3s, box-shadow 0.3s;
        /* Gradient Glow Effect */
        box-shadow: 
            0 0 15px rgba(255, 0, 255, 0.2), /* Purple/Magenta glow */
            0 4px 10px rgba(0, 0, 0, 0.5); /* Regular dark shadow */
    }
    
    .card:hover {
        transform: translateY(-4px);
        box-shadow: 
            0 0 25px ${colors.purple}, /* Stronger glow on hover */
            0 8px 20px rgba(0, 0, 0, 0.7);
    }

    /* Chart specific styling */
    .chart-container {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 10px;
        cursor: crosshair;
    }
    .chart-canvas {
        display: block;
        width: 100% !important;
        height: 100% !important;
        max-height: 300px; 
    }

    /* Tooltip Styling */
    .tooltip {
        position: absolute;
        padding: 8px 12px;
        background-color: ${colors.purpleDark};
        color: ${colors.textPrimary};
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        pointer-events: none;
        z-index: 20;
        transition: opacity 0.1s;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }


    /* --- RESPONSIVENESS (Media Queries) --- */

    /* Tablet (sm: >= 640px) */
    @media (min-width: 640px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        .logs-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    /* Desktop (lg: >= 1024px) */
    @media (min-width: 1024px) {
        .sidebar {
            display: flex; 
        }
        .stats-grid {
            grid-template-columns: repeat(4, 1fr);
        }
        .charts-grid {
            grid-template-columns: 2fr 1fr; 
        }
        .logs-grid {
            grid-template-columns: repeat(3, 1fr);
        }
        .main-content {
            padding: 32px;
        }
        .chart-canvas {
            max-height: 350px;
        }
    }
`;

// --- CANVAS LINE CHART COMPONENT (Pure JS/Canvas with Hover) ---

const LineChart = ({ data, labels, color, dotColor, setTooltip }) => {
    const canvasRef = useRef(null);

    // Function to find the nearest data point on hover
    const getNearestPointIndex = (mouseX, points) => {
        let nearestIndex = -1;
        let minDistance = Infinity;

        points.forEach((point, index) => {
            const distance = Math.abs(point.x - mouseX);
            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = index;
            }
        });
        // Only trigger if the mouse is close enough to the point (e.g., within 30px)
        return minDistance < 30 ? nearestIndex : -1;
    };

    const drawChart = (hoverIndex = -1, points = []) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const container = canvas.parentElement;
        // Correctly get dimensions from the container
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, width, height);

        const padding = 30;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const range = maxValue - minValue;
        
        let calculatedPoints = [];

        // --- Draw X-Axis Labels (Days) ---
        ctx.fillStyle = colors.textSecondary;
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        
        labels.forEach((label, i) => {
            const x = padding + (i / (labels.length - 1)) * chartWidth;
            ctx.fillText(label, x, height - 5);
        });

        // --- Draw Line ---
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        data.forEach((value, i) => {
            const x = padding + (i / (data.length - 1)) * chartWidth;
            const normalizedValue = range > 0 ? (value - minValue) / range : 0.5;
            // Adjust y to start higher if min/max are too close
            const adjustedChartHeight = chartHeight * 0.8;
            const y = height - padding - (normalizedValue * adjustedChartHeight) - (chartHeight - adjustedChartHeight) / 2;


            calculatedPoints.push({ x, y, value, label: labels[i] });

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // --- Draw data points (dots) ---
        calculatedPoints.forEach((point, i) => {
            // Draw regular dot
            ctx.beginPath();
            ctx.arc(point.x, point.y, 6, 0, Math.PI * 2, true);
            ctx.fillStyle = dotColor;
            ctx.fill();

            // Draw hover/highlight effect
            if (i === hoverIndex) {
                 ctx.beginPath();
                 ctx.arc(point.x, point.y, 10, 0, Math.PI * 2, true);
                 ctx.fillStyle = dotColor + '40'; // Semi-transparent
                 ctx.fill();
            }
        });

        return calculatedPoints; // Return points for mouse move handler
    };


    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        // Calculate mouse position relative to the canvas
        const mouseX = e.clientX - rect.left;
        
        // Re-draw chart with no hover index to get point coordinates
        const points = drawChart(); 
        
        const nearestIndex = getNearestPointIndex(mouseX, points);

        if (nearestIndex !== -1) {
            const point = points[nearestIndex];
            // Update Tooltip state
            setTooltip({
                visible: true,
                // Position relative to viewport + scroll offset for absolute positioning
                x: rect.left + point.x,
                y: rect.top + point.y - 10, // Adjust position above the point
                label: point.label,
                value: point.value.toFixed(1) + ' kg'
            });
            // Re-draw chart with the specific point highlighted
            drawChart(nearestIndex, points); 
        } else {
            // Hide Tooltip if mouse is not near any point
            setTooltip({ visible: false });
            drawChart(); // Re-draw clean chart
        }
    };

    const handleMouseOut = () => {
        setTooltip({ visible: false });
        drawChart();
    };

    useEffect(() => {
        // Initial draw and setup resize listener
        drawChart();
        window.addEventListener('resize', drawChart);

        return () => {
            window.removeEventListener('resize', drawChart);
        };
    }, [data, labels, color, dotColor]); // Dependencies ensure redraw on data/style change

    return (
        <div 
            className="chart-container" 
            style={{ height: 'calc(100% - 20px)' }}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
        > 
            <canvas ref={canvasRef} className="chart-canvas" />
        </div>
    );
};


// --- COMPONENTS ---

const Sidebar = () => (
    <div className="sidebar">
        {/* Logo and Nav */}
        <div>
            {/* ERROR FIX: Corrected inline style string concatenation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', paddingBottom: '16px', borderBottom: '1px solid ' + colors.grayBorder }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(45deg, ${colors.purpleDark}, ${colors.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px ' + colors.purpleGlow }}>
                    <Heart size={20} color="white" />
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: '800' }}>FitSphere</h1>
            </div>

            {/* Navigation */}
            <nav>
                <a href="#" className="nav-link active" style={{ color: colors.textPrimary, fontWeight: '600' }}>
                    <Home size={20} style={{ marginRight: '12px' }} />
                    <span>Dashboard</span>
                </a>
                <a href="#" className="nav-link">
                    <Dumbbell size={20} style={{ marginRight: '12px' }} />
                    <span>Workout Plans</span>
                </a>
                <a href="#" className="nav-link">
                    <BarChart3 size={20} style={{ marginRight: '12px' }} />
                    <span>Progress & Stats</span>
                </a>
                <a href="#" className="nav-link">
                    <Utensils size={20} style={{ marginRight: '12px' }} />
                    <span>Nutrition Tracker</span>
                </a>
                <a href="#" className="nav-link">
                    <Settings size={20} style={{ marginRight: '12px' }} />
                    <span>Settings</span>
                </a>
            </nav>
        </div>

        {/* User Info */}
        <div style={{ paddingTop: '16px', borderTop: '1px solid ' + colors.grayBorder }}>
            {/* ERROR FIX: Corrected inline style string concatenation */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '10px', // Reduced padding
                backgroundColor: colors.grayBgHover, 
                borderRadius: '12px', 
                border: '1px solid ' + colors.purpleGlow, 
                boxShadow: '0 0 5px ' + colors.purpleGlow,
            }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: colors.purpleDark, borderRadius: '50%', marginRight: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={18} color="white" />
                </div>
                <div>
                    <p style={{ fontSize: '13px', fontWeight: '600' }}>Guest User</p>
                    <span style={{ fontSize: '11px', color: colors.purple }}>guest@fitsphere.com</span>
                </div>
            </div>
        </div>
    </div>
);

const Header = () => (
    <header className="header-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', backgroundColor: colors.bgCard, padding: '16px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', border: '1px solid ' + colors.grayBorder, position: 'sticky', top: 0, zIndex: 5 }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>Fitness Dashboard</h1>
        <div className="header-controls" style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
                <input 
                    type="text" 
                    placeholder="Search Workouts or Meals..." 
                    style={{ 
                        width: '100%', 
                        padding: '12px 12px 12px 40px', 
                        borderRadius: '9999px', 
                        // ERROR FIX: Corrected inline style string concatenation
                        border: '1px solid ' + colors.purpleDark, 
                        backgroundColor: colors.bgBase, 
                        color: colors.textPrimary, 
                        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4)',
                        transition: 'border-color 0.2s',
                    }}
                />
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.purple }} />
            </div>
        </div>
    </header>
);

const StatCard = ({ title, value, unit, icon: Icon, iconColor, bgColor }) => (
    <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</div>
            <div style={{ padding: '12px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)', display: 'flex', backgroundColor: bgColor }}>
                <Icon size={24} color={iconColor} />
            </div>
        </div>
        <div style={{ fontSize: '36px', fontWeight: '800', color: colors.textPrimary }}>{value}</div>
        <span style={{ fontSize: '18px', fontWeight: '600', color: colors.textSecondary, display: 'block', marginTop: '4px' }}>{unit}</span>
    </div>
);

const ChartCard = ({ title, children, height = '400px' }) => (
    <div className="card" style={{ minHeight: height, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: colors.textPrimary, fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>{title}</h2>
        {children}
    </div>
);

const LogCard = ({ title, detail, subDetail, icon: Icon, iconColor, bgColor }) => (
    <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '500', color: colors.textSecondary, textTransform: 'uppercase' }}>{title}</h3>
            <div style={{ padding: '8px', borderRadius: '8px', opacity: 0.8, display: 'flex', backgroundColor: bgColor }}>
                <Icon size={20} color={iconColor} />
            </div>
        </div>
        <p style={{ fontSize: '20px', fontWeight: '700', color: colors.textPrimary, lineHeight: 1.2 }}>{detail}</p>
        <p style={{ fontSize: '14px', fontWeight: '500', color: colors.textSecondary, marginTop: '4px' }}>{subDetail}</p>
        <div style={{ paddingTop: '12px', marginTop: '12px', borderTop: '1px solid ' + colors.grayBorder, fontSize: '12px', color: colors.textSecondary }}>
            {/* Mock time */}
            {title.includes('Workout') ? '1 hour ago' : title.includes('Meal') ? '3 hours ago' : 'Updated now'}
        </div>
    </div>
);

// --- MAIN APP COMPONENT ---
const App = () => {
    // Mock Data for the Line Chart
    const weeklyWeightData = [75.2, 74.5, 74.8, 73.9, 74.2, 73.5, 73.1]; // Weight in kg
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // State for Tooltip (used by the LineChart component)
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, label: '', value: '' });

    return (
        <React.Fragment>
            <style>{globalStyles}</style>

            {/* Global Tooltip Component */}
            {tooltip.visible && (
                <div 
                    className="tooltip" 
                    style={{ 
                        // Using fixed position and window.scrollY ensures the tooltip stays correctly positioned even when the main content scrolls
                        position: 'fixed',
                        top: tooltip.y - window.scrollY, 
                        left: tooltip.x, 
                        transform: 'translate(-50%, -100%)', // Center the tooltip above the point
                        backgroundColor: colors.purpleDark // Use a dark purple background for the tooltip
                    }}
                >
                    <p style={{ margin: 0 }}>{tooltip.label}: {tooltip.value}</p>
                </div>
            )}

            <div className="dashboard-container">
                <Sidebar />
                <main className="main-content">
                    <Header />

                    {/* Stat Cards Section */}
                    <section className="stats-grid">
                        <StatCard 
                            title="Calories Burned (Today)" 
                            value="850" 
                            unit="kcal" 
                            icon={Zap} 
                            iconColor={colors.red} 
                            bgColor="rgba(248, 113, 113, 0.2)"
                        />
                        <StatCard 
                            title="Active Minutes" 
                            value="60" 
                            unit="min" 
                            icon={Clock} 
                            iconColor={colors.yellow} 
                            bgColor="rgba(252, 211, 77, 0.2)"
                        />
                        <StatCard 
                            title="Steps Count (Today)" 
                            value="11,200" 
                            unit="steps" 
                            icon={BarChart3} 
                            iconColor={colors.blue} 
                            bgColor="rgba(96, 165, 250, 0.2)"
                        />
                        <StatCard 
                            title="Water Intake" 
                            value="2.0" 
                            unit="L / 3.0 L" 
                            icon={Droplet} 
                            iconColor={colors.green} 
                            bgColor="rgba(76, 232, 128, 0.2)"
                        />
                    </section>

                    {/* Charts Section */}
                    <section className="charts-grid">
                        {/* 1. Weekly Progress Chart - Now Interactive */}
                        <ChartCard title="Weekly Progress: Weight (kg) - Hover for Details" height="400px">
                            <LineChart 
                                data={weeklyWeightData} 
                                labels={days} 
                                color={colors.purple} 
                                dotColor={colors.purple} 
                                setTooltip={setTooltip} // Pass setter function for interactivity
                            />
                        </ChartCard>

                        {/* 2. Today's Focus Card */}
                        <ChartCard title="Today's Focus" height="400px">
                            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                {/* Simple Ring Placeholder */}
                                <div style={{ 
                                    width: '200px', 
                                    height: '200px', 
                                    margin: '0 auto', 
                                    borderRadius: '50%', 
                                    border: '30px solid ' + colors.grayBorder, 
                                    borderTop: '30px solid ' + colors.purple, 
                                    transform: 'rotate(-45deg)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    boxShadow: '0 0 20px ' + colors.purpleGlow
                                }}>
                                    <span style={{ fontSize: '32px', fontWeight: '800', color: colors.purple, transform: 'rotate(45deg)' }}>75%</span>
                                </div>
                                <p style={{ fontSize: '14px', fontWeight: '500', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '20px' }}>Cardio Target</p>
                                <p style={{ fontSize: '16px', color: colors.purple, fontWeight: '500' }}>Status: 45/60 min achieved</p>
                            </div>
                        </ChartCard>
                    </section>

                    {/* Log Cards Section */}
                    <section className="logs-grid">
                        <LogCard 
                            title="Workout Log (Last Entry)" 
                            detail="Full Body Strength" 
                            subDetail="(60 min, 550 Kcal)" 
                            icon={Dumbbell} 
                            iconColor={colors.purple} 
                            bgColor="rgba(255, 0, 255, 0.1)"
                        />
                        <LogCard 
                            title="Meal Tracker (Last Meal)" 
                            detail="Dinner: Salmon & Veggies" 
                            subDetail="(620 Kcal, High Protein)" 
                            icon={Utensils} 
                            iconColor="#ec4899" 
                            bgColor="rgba(236, 72, 153, 0.1)"
                        />
                        <LogCard 
                            title="Sleep (Last Night)" 
                            detail="Duration: 7h 45m" 
                            subDetail="Deep Sleep: 1h 30m" 
                            icon={Sun} 
                            iconColor="#22d3ee" 
                            bgColor="rgba(6, 182, 212, 0.1)"
                        />
                    </section>
                </main>
            </div>
        </React.Fragment>
    );
};

export default App;
