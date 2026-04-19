# PathCredit Logger

A simple web app for logging student activities and tracking PathCredits.

## How to Run Locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## What I Built

A React-based activity logger with two main features:

1. **Log an Activity Form**
   - Input fields for activity name, category (Academic/Technical/Cultural/Sports), and date
   - Form validation to prevent empty submissions
   - Auto-resets after successful submission
   - No page reload required

2. **Activity Feed**
   - Displays all logged activities with name, category badge, and formatted date
   - Category filter dropdown (includes "All" option)
   - Empty state messages for no activities or no filtered results
   - Activities ordered by most recent first

**Additional features implemented:**
- **Persistent storage** using localStorage (data survives page refresh)
- **Input validation** (prevents empty activity names)
- **Responsive design** (works on mobile and desktop)
- **Edge case handling:**
  - Empty state when no activities exist
  - Empty state when filter returns no results
  - Form validation with user feedback
  - Graceful error handling for localStorage failures

**Tech stack:** React 18, Vite, vanilla CSS

## What I'd Add or Change With Another Hour

1. **Delete functionality** - Allow users to remove activities from the feed
2. **Edit capability** - Let users update existing activities
3. **Search feature** - Text search across activity names
4. **Statistics dashboard** - Show counts by category, recent activity trends
5. **Date range filter** - Filter activities by date period (this week, this month, etc.)
6. **Export feature** - Download activities as CSV or JSON
7. **Accessibility improvements** - Better ARIA labels, keyboard navigation
8. **Unit tests** - Test form submission, filtering logic, localStorage operations
9. **Backend integration** - Replace localStorage with a proper API/database
10. **Better date handling** - Sort by date, show relative times ("2 days ago")

## Design Decisions

- **React over vanilla JS**: Easier state management for form + list interaction
- **Vite over CRA**: Faster dev server, simpler config
- **localStorage over nothing**: Adds real value without backend complexity
- **Category badges over plain text**: Better visual scanning
- **Most recent first**: More useful default ordering
- **Inline validation**: Immediate feedback prevents bad UX
