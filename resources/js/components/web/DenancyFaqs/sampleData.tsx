// Sample data for testing the DenancyHelp component
const sampleFaqs = [
    {
        id: 1,
        question: "How do I create a new rental listing?",
        answer: "To create a new rental listing, go to your dashboard and click the 'Add Property' button. Fill in all the required details about your property, including location, price, amenities, and upload photos. Once completed, submit for review.",
        category: "Listings"
    },
    {
        id: 2,
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including credit cards (Visa, MasterCard, American Express), bank transfers, and digital wallets like PayPal and Stripe. All payments are securely processed through our encrypted payment gateway.",
        category: "Payments"
    },
    {
        id: 3,
        question: "How can tenants contact landlords?",
        answer: "Tenants can contact landlords directly through our messaging system. Once you've expressed interest in a property or have an active application, you'll be able to send messages to the landlord through the platform.",
        category: "Communication"
    },
    {
        id: 4,
        question: "What is your cancellation policy?",
        answer: "Cancellation policies vary depending on the booking type. For short-term rentals, cancellations made 48 hours before check-in receive a full refund. For long-term leases, please refer to your specific rental agreement terms.",
        category: "Policies"
    },
    {
        id: 5,
        question: "How do I verify my account?",
        answer: "Account verification requires submitting a government-issued ID and completing our identity verification process. This helps ensure safety and security for all users on our platform.",
        category: "Account"
    }
];

// Usage example:
// <DenancyHelp faqs={sampleFaqs} title="Frequently Asked Questions" />

// Additional sample data with different categories
const technicalFaqs = [
    {
        id: 1,
        question: "The website is not loading properly, what should I do?",
        answer: "Try clearing your browser cache and cookies, then refresh the page. If the issue persists, check your internet connection or try using a different browser. For ongoing issues, contact our support team.",
        category: "Technical"
    },
    {
        id: 2,
        question: "How do I reset my password?",
        answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. The link will expire in 24 hours for security reasons.",
        category: "Account"
    },
    {
        id: 3,
        question: "Is the mobile app available for both iOS and Android?",
        answer: "Yes, our mobile app is available for both iOS and Android devices. You can download it from the Apple App Store or Google Play Store.",
        category: "Mobile"
    }
];

// More compact sample data
const shortFaqs = [
    {
        id: 1,
        question: "What are your customer support hours?",
        answer: "Our customer support team is available 24/7 to assist you with any issues or questions.",
        category: "Support"
    },
    {
        id: 2,
        question: "Do you offer property management services?",
        answer: "Yes, we offer comprehensive property management services including tenant screening, rent collection, and maintenance coordination.",
        category: "Services"
    }
];



const sampleTestimonials = [
    {
        id: 1,
        name: "Mark Johnson",
        role: "Investor",
        content: "I've been relying on Denancy group for financial consultancy and management services for several years now, and I couldn't be happier with the results. Their team of experts took the time to understand my financial goals and risk tolerance, crafting a customized investment strategy that has consistently outperformed the market.",
        rating: 1,
        image: "/images/mark-johnson.jpg"
    },
    {
        id: 2,
        name: "Sarah Williams",
        role: "Business Owner",
        content: "The logistics solutions provided by Denancy have transformed our supply chain operations. Their innovative approach and attention to detail have saved us both time and money while improving customer satisfaction.",
        rating: 2,
        image: "/images/sarah-williams.jpg"
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "CEO",
        content: "Outstanding service and exceptional results. Denancy's strategic guidance helped us navigate complex market challenges and achieve unprecedented growth in just 12 months.",
        rating: 4,
        image: "/images/michael-chen.jpg"
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        role: "Operations Director",
        content: "Working with Denancy has been a game-changer for our organization. Their expertise in process optimization and digital transformation has streamlined our operations significantly.",
        rating: 5,
        image: "/images/emily-rodriguez.jpg"
    }
];

export { sampleFaqs, technicalFaqs, shortFaqs, sampleTestimonials };
