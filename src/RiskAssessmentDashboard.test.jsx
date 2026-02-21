import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import RiskAssessmentDashboard from './RiskAssessmentDashboard';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('RiskAssessmentDashboard', () => {
    it('renders the dashboard title correctly', () => {
        render(<RiskAssessmentDashboard />);
        expect(screen.getByText(/Risk Assessment Dashboard/i)).toBeInTheDocument();
    });

    it('displays the applicant name from mock data', () => {
        render(<RiskAssessmentDashboard />);
        // Marcus Sterling is the name in mockData.js
        expect(screen.getByText(/Marcus Sterling/i)).toBeInTheDocument();
    });

    it('switches tabs when clicked', async () => {
        render(<RiskAssessmentDashboard />);

        // Initially on overview tab
        expect(screen.getByText(/Recommendation/i)).toBeInTheDocument();

        // Click on Factors tab
        const factorsTab = screen.getByText(/factors/i);
        fireEvent.click(factorsTab);

        // Should show factors content (one of the risk factors from mock data)
        expect(screen.getByText(/Stable employment history/i)).toBeInTheDocument();
    });

    it('adds a new internal note successfully', () => {
        render(<RiskAssessmentDashboard />);

        // Go to notes tab
        const notesTab = screen.getByText(/notes/i);
        fireEvent.click(notesTab);

        const textarea = screen.getByPlaceholderText(/Type your observations here.../i);
        const postButton = screen.getByText(/Post Note/i);

        const testNote = 'This is a test note for automation';
        fireEvent.change(textarea, { target: { value: testNote } });
        fireEvent.click(postButton);

        // Check if the note is added to the list
        expect(screen.getByText(testNote)).toBeInTheDocument();
        // Check if textarea is cleared
        expect(textarea.value).toBe('');
    });

    it('displays the correct risk badge label based on score', () => {
        render(<RiskAssessmentDashboard />);
        // Mock score is 78, which should be "Moderate"
        const badge = screen.getByText(/Moderate/i);
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass('badge-low');
    });

    it('does not add a note when the input is empty', () => {
        render(<RiskAssessmentDashboard />);

        // Go to notes tab
        const notesTab = screen.getByText(/notes/i);
        fireEvent.click(notesTab);

        const postButton = screen.getByText(/Post Note/i);
        const originalNotesCount = screen.getAllByText(/Senior Manager \(You\)|Senior Analyst|Automated System/i).length;

        // Click post without entering text
        fireEvent.click(postButton);

        // Count should remain the same
        const newNotesCount = screen.getAllByText(/Senior Manager \(You\)|Senior Analyst|Automated System/i).length;
        expect(newNotesCount).toBe(originalNotesCount);
    });
});
