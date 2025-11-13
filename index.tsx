import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from './pages/HomePage';
import { AllCoursesPage } from './pages/courses';
import { CarrierRoadmapPage } from './pages/carrierRoadmap';
import { AboutUsPage } from './pages/AboutUsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { LoginModal } from './components/LoginModal';
import { SignUpModal } from './components/SignUpModal';

// --- Supabase Configuration ---
const supabaseUrl = "https://ljypfmwcqsloojghcwsf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeXBmbXdjcXNsb29qZ2hjd3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNzE3MDIsImV4cCI6MjA3Njk0NzcwMn0.hJ8bqNh7Os6HugV7aOjfCu_7eE-IxZo9GGokNukalyY";

const supabase = (supabaseUrl && supabaseKey)
    ? (window as any).supabase.createClient(supabaseUrl, supabaseKey)
    : null;

// Static data for fallback
const staticResourcesData = [
    { id: 1, type: 'course', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop', category: 'Development', title: 'HTML, CSS & JavaScript for Beginners', instructor: 'John Doe', rating: 4.8, price: '$19.99', students: 12345, likes: 125, community_link: '#', enroll_link: '#' },
    { id: 2, type: 'course', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', category: 'Data Science', title: 'Introduction to Python for Data Science', instructor: 'Jane Smith', rating: 4.9, price: '$24.99', students: 9876, likes: 230, community_link: '#', enroll_link: '#' },
    { id: 3, type: 'course', image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop', category: 'cyber security', title: 'Threat detection ,Network security ,Cryptography', instructor: 'Devcotel ai guide', rating: 4.4 , price: '75% hike', students: 5 , likes: 1, community_link: '#', enroll_link: '#' },
    { id: 4, type: 'course', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop', category: 'Programming', title: 'Fundamentals of GO Design & Advance', instructor: 'Chris Green', rating: 4.8, price: '$49.99', students: 5432, likes: 98, community_link: '#', enroll_link: '#' },
    { id: 5, type: 'bootcamp', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop', category: 'Web Development', title: 'Full-Stack Web Development Bootcamp', instructor: 'Devcotel Academy', rating: 4.9, price: '$1,299.99', students: 350, likes: 85, community_link: '#', enroll_link: '#' },
    { id: 6, type: 'bootcamp', image: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=2070&auto=format&fit=crop', category: 'Data Science', title: 'Data Science & Machine Learning Bootcamp', instructor: 'AI Guild', rating: 4.8, price: '$1,499.99', students: 280, likes: 92, community_link: '#', enroll_link: '#' },
    { id: 7, type: 'webinar', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', category: 'Career', title: 'Webinar: Landing Your First Tech Job', instructor: 'Jane Doe, Tech Recruiter', rating: 4.9, price: 'Free', students: 1500, likes: 150, community_link: '#', enroll_link: '#' },
    { id: 8, type: 'webinar', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop', category: 'DevOps', title: 'Live Webinar: Intro to Docker & Kubernetes', instructor: 'John Smith, DevOps Engineer', rating: 4.7, price: 'Free', students: 2200, likes: 210, community_link: '#', enroll_link: '#' },
    { id: 9, type: 'youtube', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop', category: 'Programming', title: 'Reference: Learn Go in 1 Hour', instructor: 'Tech Tutorials Tube', rating: 4.8, price: 'Free', students: 150000, likes: 4500, community_link: '#', enroll_link: '#' },
    { id: 10, type: 'youtube', image: 'https://images.unsplash.com/photo-1611162616805-669c3fa0de13?q=80&w=1974&auto=format&fit=crop', category: 'Design', title: 'Reference: Figma UI/UX Design Tutorial', instructor: 'Design with Us', rating: 4.9, price: 'Free', students: 250000, likes: 8200, community_link: '#', enroll_link: '#' },
    { id: 11, type: 'bootcamp', image: 'https://s44783.pcdn.co/in/wp-content/uploads/sites/3/2023/03/types-of-machine-learning.jpg.optimal.jpg', category: 'Machine learning', title: 'Data Science & Machine Learning Bootcamp', instructor: 'AI Guild', rating: 4.8, price: '1,499 rs', students: 280, likes: 92, community_link: '#', enroll_link: '#' },
    { id: 12, type: 'webinar', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop', category: 'Career', title: 'Webinar: Landing Your First Tech Job', instructor: 'Jane Doe, Tech Recruiter', rating: 4.9, price: 'Free', students: 1500, likes: 150, community_link: '#', enroll_link: '#' },
    { id: 13, type: 'webinar', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop', category: 'DevOps', title: 'Live Webinar: Intro to Docker & Kubernetes', instructor: 'John Smith, DevOps Engineer', rating: 4.7, price: 'Free', students: 2200, likes: 210, community_link: '#', enroll_link: '#' },
    { id: 14, type: 'youtube', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop', category: 'Programming', title: 'Reference: Learn Go in 1 Hour', instructor: 'Tech Tutorials Tube', rating: 4.8, price: 'Free', students: 150000, likes: 4500, community_link: '#', enroll_link: '#' },
    { id: 15, type: 'youtube', image: 'https://images.unsplash.com/photo-1611162616805-669c3fa0de13?q=80&w=1974&auto=format&fit=crop', category: 'Machine learning', title: 'Powered by freecode camp', instructor: 'Design with Us', rating: 4.9, price: 'Free', students: 250000, likes: 8200, community_link: '#', enroll_link: '#' }

];

export interface User {
    id: string;
    email?: string;
    full_name?: string;
    username?: string;
}

const App = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    const fetchResources = async () => {
        setLoading(true);
        setError(null);
        // Simulate a network request for better UX and consistency.
        setTimeout(() => {
            try {
                // As requested, we are now exclusively using the static data.
                setResources(staticResourcesData);
            } catch (e) {
                console.error("Error setting static resources:", e);
                setError("Could not load resources.");
            } finally {
                setLoading(false);
            }
        }, 300); // A small delay to simulate loading
    };

    // Fetch resources on initial load for all users
    useEffect(() => {
        fetchResources();
    }, []);

    // Listen to Supabase auth changes
    useEffect(() => {
        if (!supabase) {
            setAuthLoading(false);
            return;
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                try {
                    if (session) {
                        const { data: profile, error: profileError } = await supabase
                            .from('profiles')
                            .select('username, full_name')
                            .eq('id', session.user.id)
                            .single();

                        if (profileError) {
                            console.error('Error fetching user profile:', profileError.message);
                        }
                        
                        setCurrentUser({
                            id: session.user.id,
                            email: session.user.email,
                            username: profile?.username || session.user.email?.split('@')[0] || 'user',
                            full_name: profile?.full_name || 'New User'
                        });
                    } else {
                        setCurrentUser(null);
                    }
                } catch (e) {
                     console.error("An unexpected error occurred during auth state change:", e);
                     setCurrentUser(null);
                } finally {
                    setAuthLoading(false);
                }
            }
        );
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    };

    const handleLogout = async () => {
        if(supabase) await supabase.auth.signOut();
        setCurrentUser(null);
    };
    
    const handleEmailLogin = async (email, password) => {
        if (!supabase) return { error: { message: 'Supabase not configured.' }};
        return await supabase.auth.signInWithPassword({ email, password });
    };

    const handleGoogleLogin = async () => {
        if (!supabase) return;
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
    };
    
    const handleSignUp = async (email, password, metadata) => {
        if (!supabase) return { error: { message: 'Supabase not configured.' }};
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata,
            },
        });
    };
    
    const handleLikeCourse = async (courseId) => {
        if (!currentUser) {
            promptLogin();
            return;
        }

        const userLikedCoursesKey = `likedCourses_${currentUser.id}`;
        const likedCourses = JSON.parse(localStorage.getItem(userLikedCoursesKey) || '[]');
        
        // Prevent multiple likes
        if (likedCourses.includes(courseId)) {
            return;
        }
        
        // Optimistically update UI state
        setResources(currentResources =>
            currentResources.map(course =>
                course.id === courseId ? { ...course, likes: (course.likes || 0) + 1 } : course
            )
        );
        
        // Update localStorage to persist the like locally
        localStorage.setItem(userLikedCoursesKey, JSON.stringify([...likedCourses, courseId]));
        
        // The Supabase database update has been removed as per the request to use static data.
    };
    
    const promptLogin = () => setIsLoginModalOpen(true);
    
    const switchToSignUp = () => {
        setIsLoginModalOpen(false);
        setIsSignUpModalOpen(true);
    };
    
    const switchToLogin = () => {
        setIsSignUpModalOpen(false);
        setIsLoginModalOpen(true);
    };

    if (authLoading) {
        return <div className="fullscreen-loader">Loading...</div>;
    }

    return (
        <>
            {isLoginModalOpen && (
                <LoginModal
                    onClose={() => setIsLoginModalOpen(false)}
                    onEmailLogin={handleEmailLogin}
                    onGoogleLogin={handleGoogleLogin}
                    onSwitchToSignUp={switchToSignUp}
                />
            )}
            {isSignUpModalOpen && (
                 <SignUpModal
                    onClose={() => setIsSignUpModalOpen(false)}
                    onSignUp={handleSignUp}
                    onSwitchToLogin={switchToLogin}
                />
            )}
            <header className="header">
                <div className="container">
                    <nav className="navbar">
                        <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="logo">
                            Devcotel
                        </a>
                        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                            <ul className="nav-links">
                                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className={currentPage === 'home' ? 'active' : ''}>Home</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className={currentPage === 'about' ? 'active' : ''}>About Us</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('courses'); }} className={currentPage === 'courses' ? 'active' : ''}>Courses</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('carrier-roadmap'); }} className={currentPage === 'carrier-roadmap' ? 'active' : ''}>Roadmaps</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('reviews'); }} className={currentPage === 'reviews' ? 'active' : ''}>Reviews</a></li>
                            </ul>
                            <div className="nav-right">
                                <div className="search-bar">
                                    <i className="fas fa-search"></i>
                                    <input type="text" placeholder="Search..." />
                                </div>
                                {currentUser ? (
                                     <button className="btn btn-login" onClick={handleLogout}>Logout</button>
                                ) : (
                                     <button className="btn btn-login" onClick={promptLogin}>Login</button>
                                )}
                            </div>
                        </div>
                        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">
                            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                        </button>
                    </nav>
                </div>
            </header>

            <main>
                {currentPage === 'home' && <HomePage courses={resources.filter(r => r.type === 'course')} loading={loading} error={error} handleNavClick={handleNavClick} onLikeCourse={handleLikeCourse} currentUser={currentUser} promptLogin={promptLogin} />}
                {currentPage === 'about' && <AboutUsPage handleNavClick={handleNavClick} />}
                {currentPage === 'courses' && <AllCoursesPage courses={resources} loading={loading} error={error} onLikeCourse={handleLikeCourse} currentUser={currentUser} promptLogin={promptLogin} />}
                {currentPage === 'carrier-roadmap' && <CarrierRoadmapPage currentUser={currentUser} promptLogin={promptLogin} />}
                {currentPage === 'reviews' && <ReviewsPage currentUser={currentUser} promptLogin={promptLogin} />}
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-about">
                            <h3 className="logo">Devcotel</h3>
                            <p>Connecting students with the same passion to upskill their careers.</p>
                            <div className="social-icons">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div className="footer-links">
                            <h3>Platform</h3>
                            <ul>
                                <li><a href="#">Browse Library</a></li>
                                <li><a href="#">Library</a></li>
                                <li><a href="#">Partners</a></li>
                                <li><a href="#">News & Blogs</a></li>
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">FAQs</a></li>
                                <li><a href="#">Testimonials</a></li>
                            </ul>
                        </div>
                        <div className="footer-subscribe">
                            <h3>Subscribe to our Newsletter</h3>
                            <form className="newsletter-form">
                                <input type="email" placeholder="Your email address" />
                                <button type="submit"><i className="fas fa-paper-plane"></i></button>
                            </form>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 Devcotel. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);