import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    User,
    Briefcase,
    CreditCard,
    FileText,
    CheckCircle,
    AlertTriangle,
    Info,
    Clock,
    ArrowRight,
    TrendingUp,
    Download,
    Share2,
    MessageSquare,
    Plus
} from 'lucide-react';
import { mockApplicant } from './mockData';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="premium-card flex flex-col gap-2"
        style={{ flex: 1 }}
    >
        <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15`, color }}>
                <Icon size={20} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{label}</span>
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</div>
    </motion.div>
);

const RiskAssessmentDashboard = () => {
    const [applicant] = useState(mockApplicant);
    const [activeTab, setActiveTab] = useState('overview');
    const [notes, setNotes] = useState(mockApplicant.internalNotes);
    const [newNote, setNewNote] = useState('');

    const handleAddNote = () => {
        if (!newNote.trim()) return;
        const note = {
            id: Date.now(),
            text: newNote,
            author: "Senior Manager (You)",
            date: new Date().toISOString().replace('T', ' ').slice(0, 16)
        };
        setNotes([note, ...notes]);
        setNewNote('');
    };

    const getRiskColor = (score) => {
        if (score > 80) return 'var(--success)';
        if (score > 60) return 'var(--warning)';
        return 'var(--danger)';
    };

    const getRiskLabel = (score) => {
        if (score > 80) return 'Low Risk';
        if (score > 60) return 'Moderate';
        return 'High Risk';
    };

    return (
        <div className="app-container">
            {/* Header */}
            <header className="flex justify-between items-center mb-8 animate-fade-in">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Shield className="text-blue-500" fill="currentColor" size={24} />
                        <span style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.1em' }}>NOVARISK<span style={{ color: 'var(--accent-primary)' }}>AI</span></span>
                    </div>
                    <h1 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>Risk Assessment Dashboard</h1>
                </div>
                <div className="flex gap-3">
                    <button className="button-secondary flex items-center gap-2">
                        <Share2 size={18} /> Export PDF
                    </button>
                    <button className="button-primary">
                        Final Verdict <ArrowRight size={18} />
                    </button>
                </div>
            </header>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>

                {/* Left Column: Applicant Profile */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6"
                >
                    <div className="premium-card">
                        <div className="flex items-center gap-4 mb-6">
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))',
                                display: 'flex',
                                align_items: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 700
                            }}>
                                {applicant.name.charAt(0)}
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.25rem' }}>{applicant.name}</h2>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{applicant.id}</div>
                                <span className="badge badge-mid" style={{ marginTop: '0.5rem', display: 'inline-block' }}>{applicant.status}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="flex items-center gap-2 text-secondary"><User size={16} /> Credit Score</span>
                                <span style={{ fontWeight: 600 }}>{applicant.creditScore}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="flex items-center gap-2 text-secondary"><Briefcase size={16} /> Annual Income</span>
                                <span style={{ fontWeight: 600 }}>${applicant.income.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="flex items-center gap-2 text-secondary"><CreditCard size={16} /> Debt-to-Income</span>
                                <span style={{ fontWeight: 600 }}>{(applicant.debtToIncome * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="flex items-center gap-2 text-secondary"><Clock size={16} /> Employment</span>
                                <span style={{ fontWeight: 600 }}>{applicant.employmentYears}y Tenure</span>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card">
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            <TrendingUp size={20} className="text-secondary" /> Confidence Metrics
                        </h3>
                        <div style={{ position: 'relative', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${applicant.riskScore}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                style={{
                                    height: '100%',
                                    background: `linear-gradient(to right, var(--danger), var(--warning), var(--success))`,
                                    width: `${applicant.riskScore}%`
                                }}
                            />
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: getRiskColor(applicant.riskScore) }}>{applicant.riskScore}%</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Proprietary Risk Score</div>
                            </div>
                            <div className="text-right">
                                <span className={`badge ${applicant.riskScore > 75 ? 'badge-low' : 'badge-mid'}`}>{getRiskLabel(applicant.riskScore)}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Tabbed Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Navigation Tabs */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '1rem', width: 'fit-content' }}>
                        {['overview', 'factors', 'documents', 'history', 'notes'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.5rem 1.25rem',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    background: activeTab === tab ? 'rgba(255,255,255,0.08)' : 'transparent',
                                    color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    textTransform: 'capitalize',
                                    transition: 'var(--transition)'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div style={{ minHeight: '500px' }}>
                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col gap-6"
                                >
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                                        <StatCard icon={FileText} label="Monthly Rent" value={`$${applicant.rentAmount}`} color="#3b82f6" />
                                        <StatCard icon={TrendingUp} label="Rent Ratio" value={`${applicant.incomeToRentRatio}x`} color="#8b5cf6" />
                                        <StatCard icon={Shield} label="Lease Term" value={applicant.leaseTerm} color="#10b981" />
                                    </div>

                                    <div className="premium-card">
                                        <h3 style={{ marginBottom: '1.5rem' }}>Recommendation</h3>
                                        <div className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                            <CheckCircle className="text-blue-400 mt-1" size={24} />
                                            <div>
                                                <h4 style={{ color: '#60a5fa' }}>NovaRisk Coverage Eligible</h4>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                                                    Applicant meets the primary criteria for the Resident Protection Program.
                                                    The individual demonstrates high financial stability despite a minor history flag.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'factors' && (
                                <motion.div
                                    key="factors"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col gap-4"
                                >
                                    {applicant.riskFactors.map((factor, idx) => (
                                        <div key={idx} className="premium-card flex items-center gap-4 py-4" style={{
                                            borderLeft: `4px solid ${factor.type === 'positive' ? 'var(--success)' : factor.type === 'negative' ? 'var(--danger)' : 'var(--warning)'}`
                                        }}>
                                            {factor.type === 'positive' ? <CheckCircle className="text-success" /> : factor.type === 'negative' ? <AlertTriangle className="text-danger" /> : <Info className="text-warning" />}
                                            <span>{factor.message}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {activeTab === 'documents' && (
                                <motion.div
                                    key="documents"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="premium-card"
                                >
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                                                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Document</th>
                                                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Status</th>
                                                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Date</th>
                                                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applicant.documents.map((doc, idx) => (
                                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{doc.name}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span className={`badge ${doc.status === 'Verified' ? 'badge-low' : 'badge-mid'}`}>{doc.status}</span>
                                                    </td>
                                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{doc.date}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <button style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer' }}>View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}

                            {activeTab === 'history' && (
                                <motion.div
                                    key="history"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col gap-6"
                                >
                                    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                                        <div style={{ position: 'absolute', left: '7px', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.05)' }} />
                                        {applicant.history.map((event, idx) => (
                                            <div key={idx} style={{ position: 'relative', marginBottom: '2rem' }}>
                                                <div style={{ position: 'absolute', left: '-1.85rem', top: '0.25rem', width: '12px', height: '12px', background: 'var(--accent-primary)', borderRadius: '50%', border: '4px solid var(--bg-color)' }} />
                                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{event.date}</div>
                                                <div style={{ fontWeight: 600 }}>{event.action}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Initiated by {event.user}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            {activeTab === 'notes' && (
                                <motion.div
                                    key="notes"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="premium-card">
                                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <MessageSquare size={18} /> Add Internal Note
                                        </h3>
                                        <textarea
                                            value={newNote}
                                            onChange={(e) => setNewNote(e.target.value)}
                                            placeholder="Type your observations here..."
                                            style={{
                                                width: '100%',
                                                minHeight: '100px',
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid var(--card-border)',
                                                borderRadius: '0.75rem',
                                                color: 'white',
                                                padding: '1rem',
                                                marginBottom: '1rem',
                                                fontFamily: 'inherit',
                                                outline: 'none focus:border-blue-500'
                                            }}
                                        />
                                        <button
                                            onClick={handleAddNote}
                                            className="button-primary"
                                            style={{ alignSelf: 'flex-end' }}
                                        >
                                            <Plus size={18} /> Post Note
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        {notes.map(note => (
                                            <div key={note.id} className="premium-card" style={{ borderLeft: '3px solid var(--accent-primary)' }}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{note.author}</span>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{note.date}</span>
                                                </div>
                                                <p style={{ fontSize: '0.95rem' }}>{note.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* CSS Utility Classes (Injected because we're using vanilla CSS in JS for some parts) */}
            <style>{`
        .text-secondary { color: var(--text-secondary); }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mt-1 { margin-top: 0.25rem; }
        .p-2 { padding: 0.5rem; }
        .p-4 { padding: 1rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .text-blue-500 { color: #3b82f6; }
        .text-blue-400 { color: #60a5fa; }
        .text-success { color: var(--success); }
        .text-warning { color: var(--warning); }
        .text-danger { color: var(--danger); }
        .border-b { border-bottom: 1px solid; }
        .border-white\\/5 { border-color: rgba(255,255,255,0.05); }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-xl { border-radius: 1rem; }
        .w-fit { width: fit-content; }
        .text-right { text-align: right; }
      `}</style>
        </div>
    );
};

export default RiskAssessmentDashboard;
