export const mockApplicant = {
  id: "APP-92834",
  name: "Marcus Sterling",
  email: "m.sterling@example.com",
  status: "Under Review",
  riskScore: 78, // 0-100, where higher is better
  creditScore: 742,
  income: 145000,
  debtToIncome: 0.22,
  employment: "Senior Product Designer at TechFlow",
  employmentYears: 4,
  rentAmount: 3200,
  incomeToRentRatio: 3.77,
  leaseTerm: "12 Months",
  securityDeposit: 3200,

  riskFactors: [
    { type: 'positive', message: 'Stable employment history (4+ years)' },
    { type: 'positive', message: 'Excellent rent-to-income ratio (3.8x)' },
    { type: 'neutral', message: 'One small late credit card payment in 2022' },
    { type: 'negative', message: 'Total debt includes $40k student loans' },
  ],

  documents: [
    { name: 'W-2 Statement 2024', status: 'Verified', date: '2025-02-15' },
    { name: 'Recent Pay Stubs', status: 'Verified', date: '2025-02-18' },
    { name: 'Credit Report', status: 'Verified', date: '2025-02-10' },
    { name: 'Prior Landlord Reference', status: 'Pending', date: '2025-02-19' },
  ],

  history: [
    { date: '2025-02-19 14:00', action: 'Application submitted', user: 'Applicant' },
    { date: '2025-02-19 14:15', action: 'Automated credit pull completed', user: 'System' },
    { date: '2025-02-19 14:20', action: 'W-2 verification verified', user: 'Risk Engine v4' },
    { date: '2025-02-19 14:30', action: 'Assigned to Senior EM for final review', user: 'System' },
  ],

  internalNotes: [
    { id: 1, text: "Initial automated check passed. Employment confirmed with TechFlow HR.", author: "Automated System", date: "2025-02-19 14:25" },
    { id: 2, text: "Wait for Prior Landlord Reference before final verdict.", author: "Senior Analyst", date: "2025-02-19 15:45" }
  ]
};

export const metrics = {
  totalPortionInsured: "$2.4M",
  averageRiskScore: 82,
  activePolicies: 1142,
  pendingClaims: 3
};
